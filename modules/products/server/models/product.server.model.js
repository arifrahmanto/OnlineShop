'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema,
  validator = require('validator'),
  uniqueValidator = require('mongoose-unique-validator');

/**
 * Product Schema
 */
var ProductSchema = new Schema({
  title: {
    type: String,
    default: '',
    required: 'Please fill Product name',
    trim: true
  },
  isbn: {
    type: String,
    required: 'Please fill correct ISBN',
    unique: 'ISBN already exists',
    trim: true,
    default: ''
  },
  author: {
    type: String,
    default: '',
    trim: true
  },
  description: {
    type: String,
    default: '',
    trim: true
  },
  category: {
    type: String,
    default: '',
    trim: true
  },
  imageUrl: {
    type: String,
    default: '',
    trim: true
  },
  price: {
    type: Number,
    default: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    default: 'A',
    trim: true
  },
  googleId: {
    type: String,
    default: '',
    trim: true
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

ProductSchema.plugin(uniqueValidator);
mongoose.model('Product', ProductSchema);
