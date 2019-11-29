const { db } = require('../util/admin');

exports.getAllPosts = (req, res) => {
    db.collection('Posts')
      .orderBy('createdAt', 'desc')
      .get()
      .then((data) => {
        let Posts = [];
        data.forEach((doc) => {
          Posts.push({
            screamId: doc.id,
            body: doc.data().body,
            createdAt: doc.data().createdAt,
            // imageUrl: doc.data().imageUrl,
            price: doc.data().price,
            name: doc.data().name,
            id: doc.data().id
          });
        });
        return res.json(Posts);
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };

  exports.postOnePost = (req, res) => {
    if (req.body.body === '') {
      return res.status(400).json({ body: 'Body must not be empty' });
    }
  
    const newPost = {
      name: req.body.name,
      price: req.body.price,
      body: req.body.body,
      createdAt: new Date().toISOString(),
      id: new Number()
      };
  
    db.collection('Posts')
      .add(newPost)
      .then(doc => {
        const resPost = newPost;
        resPost.postId = doc.id;
        res.json(resPost);
      })
      .catch((err) => {
        res.status(500).json({ error: 'something went wrong' });
        console.error(err);
      });
  };

  exports.getPost = (req, res) => {
    let PostData = {};
    db.doc(`/Posts/${req.params.postId}`)
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Scream not found' });
        }
        PostData = doc.data();
        console.log(PostData);
        
        PostData.postId = doc.id;
        db
          .collection('Posts')
          .orderBy('createdAt', 'desc')
          .where('postId', '==', req.params.postId)
          .get()
      .then(data => {
        return res.json(PostData)
      })
      })
      .catch((err) => {
        console.error(err);
        res.status(500).json({ error: err.code });
      });
  };
  
  exports.deletePost = (req, res) => {
    const document = db.doc(`/Posts/${req.params.PostId}`);
    document
      .get()
      .then((doc) => {
        if (!doc.exists) {
          return res.status(404).json({ error: 'Scream not found' });
        }
        else {
          return document.delete();
        }
      })
      .then(a => {
        res.json({ message: 'Scream deleted successfully' });
      })
      .catch((err) => {
        console.error(err);
        return res.status(500).json({ error: err.code });
      });
  };
