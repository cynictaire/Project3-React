const models = require('../models');

const Post = models.Post;

const makerPage = (req, res) => {
  Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An unexpected error has occured.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), posts: docs });
  });
};

const makePost = (req, res) => {
  if (!req.body.charName || !req.body.charAge || !req.body.charSpecies 
      || !req.body.charJob || !req.body.charDesc) {
    return res.status(400).json({ error: 'Required information have not been filled yet.' });
  }
    
  const postData = {
    title: req.body.charName,
    nicks: req.body.charNicks,
    age: req.body.charAge,
    species: req.body.charSpecies,
    race: req.body.charRace,
    job: req.body.charJob,
    post: req.body.charDesc,
    owner: req.session.account._id,
  };
    
  const newPost = new Post.PostModel(postData);

  const postPromise = newPost.save();

  postPromise.then(() => res.json({ redirect: '/maker' }));

  postPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Post already exists.' });
    }

    return res.status(400).json({ error: 'An unexpected error has occured.' });
  });

  return postPromise;
};

// Delete Posts
const deletePosts = (request, response) => {
  const req = request;
  const res = response;

  console.log('delete');

  if (!req.body.postID) {
    return res.status(400).json({ error: 'An error occurred' });
  }

  Post.PostModel.deletePosts(req.body.postID, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(202).json({ error: 'An error occurred' });
    }

    return res.json({ posts: docs });
  });

  return false;
};

const getPosts = (request, response) => {
  const req = request;
  const res = response;

  return Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ posts: docs });
  });
};

module.exports.makerPage = makerPage;
module.exports.getPosts = getPosts;
module.exports.make = makePost;
module.exports.deletePosts = deletePosts;
