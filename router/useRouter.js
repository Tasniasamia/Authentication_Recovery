const express = require('express');
const { getdata, createuser, loginuser, logout,getUser,findUser, loginmiddle} = require('../controller/useController');
const router = express.Router(); // Change 'route' to 'router'
const passport=require('passport');
router.get('/', getdata);
router.use(passport.initialize());
router.use(passport.session());
router.get('/logout', logout);
router.get('/getUser',getUser);
router.get('/findUser',findUser)
router.post('/resister', createuser);
router.post("/login",loginmiddle,loginuser);
module.exports =router; // Export 'router' as 'route'
