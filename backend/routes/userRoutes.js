const express = require('express')
const { signup, login, logout, getUser } = require('../controllers/userController');
const isAuthenticated = require('../middlewares/isAuthenticated');
const userRouter = express.Router();

userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.get("/logout",logout)
userRouter.get("/",isAuthenticated,getUser)


module.exports = userRouter
