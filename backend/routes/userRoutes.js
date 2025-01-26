const express = require('express')
const { signup, login, logout, getUser, changeProfileImage, changeName, changePassword, getLikedPlaces, forgotPassword, resetPassword, deleteProfileImage, changeRole, getAllUsers, deleteUser } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const isAdmin = require('../middlewares/isAdmin');
const upload = require('../utils/multer');
const { uploadImage } = require('../utils/uploadImage');
const userRouter = express.Router();

userRouter.get("/all",isAuthenticated,isAdmin,getAllUsers)
userRouter.delete("/:id",isAuthenticated,isAdmin,deleteUser)
userRouter.post("/signup",upload.single('profileImg'),signup)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/",isAuthenticated,getUser)
userRouter.put("/change-profile-image",upload.single('profileImg'),isAuthenticated,changeProfileImage)
userRouter.delete("/delete-profile-image",isAuthenticated,deleteProfileImage)
userRouter.put("/change-name",isAuthenticated,changeName)
userRouter.put("/change-password",isAuthenticated,changePassword)
userRouter.get("/liked-places",isAuthenticated,getLikedPlaces)
userRouter.post("/forgot-password",forgotPassword)
userRouter.post("/reset-password/:token",resetPassword)
userRouter.post("/role",isAuthenticated,isAdmin,changeRole)

module.exports = userRouter
