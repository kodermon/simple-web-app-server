const { getProfile, deleteProfile } = require("../controller/userController");
const { authUser } = require("../middleware/authentication");

const express = require("express");
const router = express.Router();

router.route("/edit").post(authUser, getProfile);
router.route("/:id").delete(authUser, deleteProfile);

module.exports = router;
