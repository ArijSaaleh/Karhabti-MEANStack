import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { Emitters } from '../emitters/emitters';
import { VehicleService } from '../services/vehicle.service';
import { vehicle } from 'models/vehicle';


@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css'],
})
export class MycarsComponent implements OnInit {
  message = '';
  vehicles!: vehicle[];
  currentVeh!: vehicle;
  currentIndex = -1;
  authenticated = false;

    gaugeType = "semi";
    gaugeValue = 80;
    gaugeLabel = "Speed";
    gaugeAppendText = "km/hr";
    thresholdConfig = {
      '0': {color: 'green'},
      '40': {color: 'orange'},
      '75.5': {color: 'red'}
  };
  constructor(
    private userService: UserService,
    private vehService: VehicleService
  ) {}

  ngOnInit(): void {
    Emitters.authEmitter.subscribe((auth: boolean) => {
      this.authenticated = auth;
    });
    this.verifyUser();
    this.retrieveVehicles();
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
  retrieveVehicles(): void {
    this.vehService.getMyCars().subscribe(
      (data:any) => {
        this.vehicles = data;
        console.log(data);
      },
      (error) => {
        console.log(error);
      }
    );
  }
  refreshList(): void {
    this.retrieveVehicles();
    this.currentVeh = new vehicle();
    this.currentIndex = -1;
  }
  setActiveVeh(veh: any, index: any): void {
    this.currentVeh = veh;
    this.currentIndex = index;
  }
}
