require('dotenv').config();
const mongoose = require('mongoose');

const UserInfo = require('../models/userInfo.js');

// route GET /userInfo
// Display all userInfo
exports.userInfo_get_all = (req, res, next) => {
  UserInfo.find()
    .then(user => {
      console.log(user);
      res.status(200).json(user);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    })
};

exports.userInfo_create = (req, res, next) => {
  // console.log(req.body);

  const userInfo = new UserInfo({
    _id: new mongoose.Types.ObjectId(),
    songTitle: req.body.title,
    artist: req.body.artist,
    image: req.body.imageUrl
  });
  // console.log(req.body.token);

  if (req.body.token === "undefined" || req.body.token === "null") return res.status(500).json("You are not registerd user !!!");

  userInfo.save()
    .then(result => {
      console.log(result);
      res.status(201).json({
        result: result,
        message: "User Info Created Successfully",
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
};

// route POST /userInfo/:id
// Update userInfo
exports.update_userInfo_create = (req, res, next) => {
  UserInfo.update({ _id: req.body.id }, {
    $set: {
      songTitle: req.body.title,
      artist: req.body.artist,
      image: req.body.imageUrl
    }
  })
    .exec()
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User Info updated"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}

// route delete /userInfoDelete/:id
// Delete userInfo
exports.delete_userInfo_create = (req, res, next) => {
  console.log(req.body);
  console.log(req.body._id);
  let { id } = req.params
  UserInfo.findOneAndDelete({ _id: id })
    .then(result => {
      console.log(result);
      res.status(200).json({
        message: "User Info deleted"
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });
}
