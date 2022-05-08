export class vehicle{
  _id!:String;
  CarName!:String;
  obd_token!:String;
  Matricule!:String;
  infos!:[{
    SPEED: number;
    RPM: Number;
    Date: Date;
  }]

}
