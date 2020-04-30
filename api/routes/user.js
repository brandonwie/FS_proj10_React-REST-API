const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const {
  authenticator,
} = require("../scripts/auth");
const asyncHandler = require("../scripts/asynchandler");

//* GET: User who is authenticated
router.get(
  "/",
  authenticator,
  asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
  })
);

//* POST: Create a new user
router.post(
  "/",
  asyncHandler(async (req, res) => {
    const user = req.body;
    for (const key in user) {
      //* hashSync interrupts Sequelize Validation Error because empty => put length condition on value
      if (
        key === "password" &&
        user[key].length !== 0
      ) {
        user[key] = bcrypt.hashSync(user[key]);
      }
    }
    await User.create(user);
    res.status(201).set("Location", "/").end();
  })
);

//? BUILT IT FOR TEST (WILL DELETE)
router.delete(
  "/:id",
  authenticator,
  asyncHandler(async (req, res) => {
    const user = await User.findByPk(
      req.params.id
    );
    await user.destroy();
    res.status(204).end();
  })
);

module.exports = router;
