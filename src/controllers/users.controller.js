const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const Joi = require("joi");

exports.create = (req, res) => {
  let hashedPassword = bcrypt.hashSync(req.body.password, 10);

  const user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    street: req.body.street,
    city: req.body.city,
    country: req.body.country,
    zip: req.body.zip,
    email: req.body.email,
    password: hashedPassword,
  });

  user
    .save()
    .then((data) => {
      let userToken = jwt.sign(
        {
          id: data._id,
        },
        "supersecret",
        {
          expiresIn: 86400,
        }
      );
      res.send({
        token: userToken,
        auth: true,
      });
    })
    .catch((err) => {
      res.status(500).send({
        error: 500,
        message: err.message || "Some error occured while creating the USER!",
      });
    });
};

exports.findOne = (req, res) => {
  User.findById(req.params.id)
    .populate("orders")
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `User with id ${req.params.id} not found`,
        });
      }
      res.send({
        message: `User with id ${req.params.id} exist!`,
        user: data
      });
    })
    .catch((err) => res.send(err));
};


exports.update = async (req, res) => {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  const updates = Object.keys(req.body)
  try{
      const user = await User.findById(req.params.id)
      updates.forEach((update)=>{
        user[update] = req.body[update]
      })
      await user.save()

      if(!user){
          res.satatus(404).send({
              message: `User with id ${req.params.id} not found!`})
      }
      res.send({
          message: `User with id ${req.params.id} has been updated successfully !`,
          user 
      })
  } catch(err){
      res.send(err)
  }
}

exports.delete = async (req, res) => {
  try{
      const user = await User.findByIdAndDelete(req.params.id)
      if(!user){
          res.satatus(404).send({
              message: `User with id ${req.params.id} not found!`
          })
      }
      res.send({
          message: `User with id ${req.params.id} was deleted successfully!`,
          user 
      })
  } catch(err){
      res.send(err)
  }
}

exports.login = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .then((data) => {
      if (!data) {
        return res.status(404).send({
          auth: false,
          token: null,
          message: `No user find with email ${req.body.email}`,
        });
      }

      let passwordIsValid = bcrypt.compareSync(
        req.body.password,
        data.password
      );

      if (!passwordIsValid) {
        return res.status(401).send({
          auth: false,
          token: null,
          message: "password is not valid",
        });
      }

      let userToken = jwt.sign(
        {
          id: data._id,
        },
        "supersecret",
        { expiresIn: 86400 }
      );

      res.send({
        auth: true,
        token: userToken,
      });
    })
    .catch((err) => {
      res.send(err);
    });
};
