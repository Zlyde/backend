const mongoose = require('mongoose');
const autoIncrement = require('mongoose-sequence')(mongoose)

const citySchema = new mongoose.Schema({
  city_id: {
    type: Number
  },
  name: {
    type: String,
    required: true,
    index: true
  },
  position: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
    },
    coordinates: {
      type: [Number],
    }
  },
  boundary: {
    type: {
      type: String,
      enum: ['Polygon', 'MultiPolygon'],
    },
    coordinates: {
      type: [[[Number]]],
    }
  },
  color: {
    type: String,
  }
}, {timestamps: true});

citySchema.plugin(autoIncrement, {inc_field: 'city_id'})

citySchema.index({ position: '2dsphere' })
citySchema.index({ boundary: '2dsphere' })

module.exports = mongoose.model('City', citySchema)