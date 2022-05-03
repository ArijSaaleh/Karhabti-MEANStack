import { Component, OnInit } from '@angular/core';
import { Emitters } from '../emitters/emitters';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  message = '';
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUser().subscribe(
      (res:any) => {
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
}
