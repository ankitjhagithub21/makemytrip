const express = require('express')
const { signup, login, logout, getUser, changeProfileImage, changeName, changePassword, getLikedPlaces } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../utils/multer');
const { uploadImage } = require('../utils/uploadImage');
const userRouter = express.Router();

userRouter.post("/signup",upload.single('profileImg'),signup)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/",isAuthenticated,getUser)
userRouter.put("/change-profile-image",upload.single('profileImg'),isAuthenticated,changeProfileImage)
userRouter.put("/change-name",isAuthenticated,changeName)
userRouter.put("/change-password",isAuthenticated,changePassword)
userRouter.get("/liked-places",isAuthenticated,getLikedPlaces)


module.exports = userRouter
