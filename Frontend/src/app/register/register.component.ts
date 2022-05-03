import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form !: FormGroup
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name:'',
      lastname:'',
      email:'',
      password:'',
      phone:''
    });
  }
  submit():void{
    this.userService.register(this.form.getRawValue()).subscribe(res=>{
      this.router.navigate(['/login']);
    });
  }

}
