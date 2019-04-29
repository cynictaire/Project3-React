const models = require('../models');

const Post = models.Post;

const makerPage = (req, res) => {
  Post.PostModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An unexpected error has occured.' });
    }

    return res.render('app', { csrfToken: req.csrfToken(), charAges: docs });
  });
};

const makePost = (req, res) => {
  if (!req.body.charName || !req.body.charAge || !req.body.charJob || !req.body.charDesc) {
    return res.status(400).json({ error: 'Required informations have not been filled yet.' });
  }

  const postData = {
    charName: req.body.charName,
    charNicks: req.body.charNicks,
    charAge: req.body.charAge,
    charJob: req.body.charJob,
    charDesc: req.body.charDesc,
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

const updatePosts = (request, response) => {
  const req = request;
  const res = response;

  console.log('update');

  return Post.PostModel.findByOwnderAndID(
        req.session.account._id,
        req.body.id,
        (err, doc) => {
          if (err) {
            console.log(err);
            return res.status(400).json({ error: 'An error has occurred.' });
          }

          const updatedPost = doc[0];

          updatedPost.charName = req.body.charName;
          updatedPost.charNicks = req.body.charNicks;
          updatedPost.charAge = req.body.charAge;
          updatedPost.charJob = req.body.charJob;
          updatedPost.charDesc = req.body.charDesc;

          const updatePostPromise = updatedPost.save();

          updatePostPromise.then(() => res.json({ redirect: '/tasks' }));

          updatePostPromise.catch((err2) => {
            console.log(err2);
            return res.status(400).json({ error: 'An error has occurred.' });
          });

          return updatePostPromise;
        });
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
module.exports.updatePosts = updatePosts;
