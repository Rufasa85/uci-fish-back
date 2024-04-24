//TODO: create login route
//TODO: incorportate JWT
//TODO: add neccesary joins
const express = require("express");
const router = express.Router();
const { User, Tank, Fish } = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//read all
router.get("/", (req, res) => {
  User.findAll()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//create
router.post("/", (req, res) => {
  User.create(req.body)
    .then((data) => {
        const token = jwt.sign(
            {
              id: data.id,
              email: data.email,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: "2h",
            }
          );
      res.json({
        token,
        user:data
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(401).json({ msg: "invalid login credentials" });
      } else if (!bcrypt.compareSync(req.body.password, data.password)) {
        return res.status(401).json({ msg: "invalid login credentials" });
      } else {
        const token = jwt.sign(
          {
            id: data.id,
            email: data.email,
          },
          process.env.JWT_SECRET,
          {
            expiresIn: "2h",
          }
        );
        res.json({
            token,
            user:data
        })
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//read one
router.get("/:id", (req, res) => {
  User.findByPk(req.params.id,{
    include:[{
      model:Tank,
      include:[Fish]
    }]
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such User" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//edit one
router.put("/:id", (req, res) => {
  User.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json({ msg: "no such User" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//delete one
router.delete("/:id", (req, res) => {
  User.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such User" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

module.exports = router;
