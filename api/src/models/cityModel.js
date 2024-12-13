const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
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
      required: true
    },
    coordinates: {
      type: [Number],
      required: true
    }
  },
  boundary: {
    type: {
      type: String,
      enum: ['Polygon', 'MultiPolygon'],
      required: true
    },
    coordinates: {
      type: [[[Number]]],
      required: true
    }
  },
  color: {
    type: String,
  }
});

citySchema.index({ position: '2dsphere' })
citySchema.index({ boundary: '2dsphere' })

module.exports = mongoose.model('City', citySchema)