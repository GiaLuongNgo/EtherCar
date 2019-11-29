const functions = require('firebase-functions');
const app = require('express')();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

const cors = require('cors');
app.use(cors());

const firebaseConfig = {
  apiKey: "AIzaSyCYYIlmBLSYgjpaWcCZyl-_G34INl2aEoM",
  authDomain: "carmarketdata.firebaseapp.com",
  databaseURL: "https://carmarketdata.firebaseio.com",
  projectId: "carmarketdata",
  storageBucket: "carmarketdata.appspot.com",
  messagingSenderId: "346470412189",
  appId: "1:346470412189:web:4ddae85731a9e806020974",
  measurementId: "G-SRLXCQH9CG"
};

const { db } = require('./util/admin');

const {
    getAllPosts,
    postOnePost,
    getPost,
    deletePost
  } = require('./handlers/Posts');


  app.get('/posts', getAllPosts);
  app.post('/post', postOnePost);
  app.get('/post/:postId', getPost);
  app.delete('/post/:postId', deletePost);
  
  exports.api = functions.region('us-central1').https.onRequest(app);