const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.get("/", userController.getAlluser);
router.get("/:id", userController.getByID);
router.post("/", userController.addUser);
router.put("/:id", userController.updateUser);
router.delete("/:id", userController.deletUser);

module.exports = router;
