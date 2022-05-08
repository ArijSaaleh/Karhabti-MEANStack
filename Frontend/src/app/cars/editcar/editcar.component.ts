import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { vehicle } from 'models/vehicle';
import { VehicleService } from 'src/app/services/vehicle.service';
import { UserService } from '../../services/user.service';
import { Emitters } from '../../emitters/emitters';

@Component({
  selector: 'app-editcar',
  templateUrl: './editcar.component.html',
  styleUrls: ['./editcar.component.css'],
})
export class EditcarComponent implements OnInit {
  currentVeh!: vehicle;
  message = '';
  message1 = '';
  authenticated = false;
  constructor(
    private userService: UserService,
    private vehService: VehicleService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.verifyUser();
    this.message = '';
    this.getVeh(this.route.snapshot.paramMap.get('id'));
  }
  getVeh(id: any): void {
    this.vehService.get(id).subscribe(
      (data) => {
        this.currentVeh = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  updateCar(): void {
    this.vehService.update(this.currentVeh._id, this.currentVeh).subscribe(
      (response) => {
        console.log(response);
        this.message = 'The tutorial was updated successfully!';
      },
      (error) => {
        console.log("errrooooooor");
        console.log(error);
      }

    );
    console.log(this.currentVeh._id);
    console.log(this.currentVeh);
  }
  deleteVeh(): void {
    this.vehService.delete(this.currentVeh._id).subscribe(
      (response) => {
        console.log(response);
        this.router.navigate(['/mycars']);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  verifyUser(): void {
    this.userService.getUser().subscribe(
      (res: any) => {
        this.message1 = `Hi ${res.name}`;
        Emitters.authEmitter.emit(true);
      },
      (err) => {
        this.message1 = 'You are not logged in';
        console.log(err);
        Emitters.authEmitter.emit(false);
      }
    );
  }
}
