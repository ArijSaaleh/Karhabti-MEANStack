const mongoose = require("mongoose");
const vehicles = new mongoose.Schema({
  CarName: { type: String, required: true },
  obd_token: { type: String, required: true, unique:[true, "OBD DUPLICATED"]},
  Matricule:{type:String},
  infos: [
    {
      SPEED:{type:Number, default:0} ,
      RPM: {type:Number, default:0},
      Date: Date,
    },
  ],
  _userID: {
    type: mongoose.Types.ObjectId,
    required: true,
  },
});
const vehicle = mongoose.model("Vehicles", vehicles);
module.exports = vehicle;
