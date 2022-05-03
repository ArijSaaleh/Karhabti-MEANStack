export class vehicle{
  CarName!:String;
  obd_token!:String;
  infos!:[{
    SPEED: Number;
    RPM: Number;
    Date: Date;
  }]

}
