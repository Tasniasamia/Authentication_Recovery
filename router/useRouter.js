const express = require('express');
const { getdata, createuser, loginuser, logout,getUser,findUser, loginmiddle, profile, loguser} = require('../controller/useController');
const router = express.Router(); // Change 'route' to 'router'
const passport=require('passport');
router.use(passport.initialize());
router.use(passport.session());
router.get('/', getdata);
router.get('/logout', logout);
router.get('/getUser',getUser);
router.get('/login', loguser, loginuser);
router.post('/resister', createuser);
router.get('/profile',profile)
router.post(
    "/login",
    passport.authenticate("local", {
      failureRedirect: "/user/route/login",successRedirect:'/user/route/profile'    })
  );module.exports =router; // Export 'router' as 'route'
