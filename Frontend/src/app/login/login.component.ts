import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  constructor(private formBuilder: FormBuilder, private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email:'',
      password:''
    })
  }
  submit():void{
    this.userService.login(this.form.getRawValue()).subscribe(()=>{
      this.router.navigate(['/mycars']);
    });
  }
}
