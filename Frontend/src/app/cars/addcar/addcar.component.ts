import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { Emitters } from '../../emitters/emitters';
import { VehicleService } from '../../services/vehicle.service';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-addcar',
  templateUrl: './addcar.component.html',
  styleUrls: ['./addcar.component.css']
})
export class AddcarComponent implements OnInit {
  authenticated = false;
  message = '';
  form !: FormGroup
  constructor(
    private vehService: VehicleService, private formBuilder: FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.verifyUser();
    this.form = this.formBuilder.group({
      CarName:'',
      obd_token:'',
      Matricule:'',
      Cartegrise:''
    });
  }
  verifyUser(): void {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.message = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message = 'You are not logged in';
        console.log(err);
        Emitters.authEmitter.emit(false);
      }
    );
  }
  submit():void{
    this.vehService.create(this.form.getRawValue()).subscribe(res=>{
      this.router.navigate(['/mycars']);
    })
  }
}
