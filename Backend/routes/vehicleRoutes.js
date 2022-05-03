var express = require("express");
var router = express.Router();
var vehicle = require("../models/vehicle.model");
var mqtt = require("mqtt");
const { Authentication } = require("../middleware/auth");

var obd;
var speed;
var rpm;

var client = mqtt.connect("mqtt://io.adafruit.com", {
  username: "arij",
  password: process.env['API_KEY'],
});

/** MQTT CONNECTION**/
var espTopic = `${client.options.username}/f/obd`;
client.on("connect", () => {
  console.log("MQTT connected");
});
client.subscribe(espTopic, (err, data) => {
  if (!err) {
    console.log("subscribed");
  }
});
client.on("message", async (topic, message) => {
  var array = message.toString().split("/");
  (obd = array[0]), (speed = array[1]), (rpm = array[2]);
  if (obd && speed && rpm) {
   /* let veh = await vehicle.findOne({ obd_token: obd });
    veh.infos[0].SPEED = speed;
    console.log(veh.infos[0].SPEED +"  sss")
    veh.save();*/
   var inf ={SPEED: speed, RPM:rpm, Date:new Date()}
   vehicle.findOneAndUpdate({obd_token: obd},
    {$push:{infos:inf}},{upsert:true}).exec();
    console.log(obd + " s : " + speed, " r: " + rpm);
  } 
});
/**  ROUTES **/

/**
 * GET: ALL THE VEHICLES
 */
router.get("/all", async (req, res) => {
  const resultat = await vehicle.find();
  return res.send(resultat);
});
/**
 * GET: Get all vehicles of a specific user
 */
router.get("/listmycars", Authentication, (req, res) => {
  vehicle
    .find({
      _userID: req.user_id,
    })
    .then((veh) => {
      res.send(veh);
    });
});
/**
 * POST: User create a vehicle
 */
router.post("/add", Authentication, async (req, res) => {
  const obdexist = await vehicle.findOne({ obd_token: req.body.obd_token });
  user
    .findById(req.user_id)
    .then((us) => {
      if (us) {
        return true;
      }
      return false;
    })
    .then((UserAuth, err) => {
      if (UserAuth && !obdexist) {
        let newcar = new vehicle({
          CarName: req.body.CarName,
          obd_token: req.body.obd_token,
          _userID: req.user_id,
        });
        newcar.save().then((newvehDoc) => {
          res.send(newvehDoc);
        });
      } else {
        res.status(403).send("OBD DUPLICATED");
      }
    });
});
/**
 * PUT : UPDATE an existing vehicle
 */
router.put("/update/:id", Authentication, (req, res) => {
  vehicle.findOneAndUpdate(
    {
      id: req.params.id,
      _userID: req.user_id,
    },
    {
      $set: req.body,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Vehicle updated successfully!");
      }
    }
  );
});
/**
 * DELETE : DELETE an existing veh
 */
router.delete("/delete/:id", Authentication, (req, res) => {
  vehicle.findOneAndDelete(
    {
      id: req.params.id,
      _userID: req.user_id,
    },
    (error, data) => {
      if (error) {
        return next(error);
        console.log(error);
      } else {
        res.json(data);
        console.log("Vehicle deleted successfully!");
      }
    }
  );
});
module.exports = router;
