const express = require('express')
const { signup, login, logout, getUser } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const upload = require('../utils/multer');
const userRouter = express.Router();

userRouter.post("/signup",upload.single('profileImg'),signup)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/",isAuthenticated,getUser)


module.exports = userRouter
