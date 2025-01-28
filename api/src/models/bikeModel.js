/**
 * src/models/bikeModel.js
 */

const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const bikeSchema = new mongoose.Schema(
  {
    bike_id: {
      type: Number,
      unique: true,
      immutable: true, // Förhindrar att man kan ändra detta värde
      index: true,
    },
    status: {
      type: String,
      enum: ["available", "in-use", "charging", "maintenance"],
      default: "available",
    },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number], // Longitude, Latitude
        default: [0, 0],
      },
    },
    battery_level: {
      type: Number,
      default: 100, // Defaultvärde
    },
    last_service_date: Date,
    message: {
      type: String,
    },
    speed: {
      type: Number,
      default: 0,

    },
  },
  { timestamps: true },
);

// Automatisk tilldelnign av ID
bikeSchema.plugin(autoIncrement, { inc_field: "bike_id" });

// Index för geografisk sökning
bikeSchema.index({ location: "2dsphere" });

bikeSchema.pre("save", function (next) {
  // Clamp battery_level between 0 and 100
  this.battery_level = Math.max(0, Math.min(this.battery_level, 100));

  // Clamp speed between 0 and 20
  this.speed = Math.max(0, Math.min(this.speed, 20));

  next();
});

module.exports = mongoose.model("Bike", bikeSchema);
