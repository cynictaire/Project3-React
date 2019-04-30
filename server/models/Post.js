const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const _ = require('underscore');

let PostModel = {};

// mongoose.Types.ObjectId is a function that
// converts string ID to a real mongo ID

const convertId = mongoose.Types.ObjectId;
const setName = (name) => _.escape(name).trim();

const PostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  nicks: {
    type: String,
    required: false,
    trim: true,
  },

  age: {
    type: Number,
    min: 0,
    required: true,
  },
    
  species: {
    type: String,
    required: true,
    trim: true,
  },
    
  race: {
    type: String,
    required: false,
    trim: true,
  },
    
  job: {
    type: String,
    required: true,
    trim: true,
  },

  post: {
    type: String,
    required: true,
    trim: true,
  },

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdData: {
    type: Date,
    default: Date.now,
  },
});

PostSchema.statics.toAPI = (doc) => ({
  title: doc.charName,
  nicks: doc.charNicks,
  age: doc.charAge,
  species: doc.charSpecies,
  race: doc.charRace,
  job: doc.charJob,
  post: doc.charDesc,
});


PostSchema.statics.findByOwner = (ownerId, callback) => {
  const search = {
    owner: convertId(ownerId),
  };
  return PostModel.find(search).select('title nicks age species race job post').exec(callback);
};

// Delete Posts
PostSchema.statics.deletePosts = (postID, callback) => {
  const search = {
    _id: convertId(postID),
  };

  PostModel.deleteOne(search, (err) => {
    if (err) throw err;
  }).exec(callback);

  console.log('successfully deleted');
};

PostModel = mongoose.model('Post', PostSchema);

module.exports.PostModel = PostModel;
module.exports.PostSchema = PostSchema;
