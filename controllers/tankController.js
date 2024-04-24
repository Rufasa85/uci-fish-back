//TODO: protect all non read routes
//TODO: use jwts to find logged in user data
//TODO: add neccesary joins
const express = require("express");
const router = express.Router();
const { Tank, Fish, User } = require("../models");
const jwt = require("jsonwebtoken");
const tokenAuth = require("../middleware/tokenAuth");

//read all
router.get("/", (req, res) => {
  Tank.findAll({
    include: [Fish, User],
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//create
router.post("/",tokenAuth, (req, res) => {
  Tank.create({
    name: req.body.name,
    UserId: req.user.id,
  })
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

//read one
router.get("/:id", (req, res) => {
  Tank.findByPk(req.params.id, {
    include: [Fish, User],
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such Tank" });
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
  Tank.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data[0]) {
        return res.status(404).json({ msg: "no such Tank" });
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
  Tank.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (!data) {
        return res.status(404).json({ msg: "no such Tank" });
      }
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ msg: "oh no!", err });
    });
});

module.exports = router;
