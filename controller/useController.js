const userModel = require("../module/userModel");
const bcrypt = require('bcrypt');
const saltRounds = 10;
const passport=require('passport');
const getdata=(req,res,next)=>{
    try{

        res.render('index')
    }
    catch(error){
        next(error)
    }
}
const getUser=(req,res,next)=>{
    res.render('resister');
};
const findUser=(req,res,next)=>{
    res.render('login');
}
const createuser=async(req,res,next)=>{
    try{
        // res.render('resister');
        const user=await userModel.findOne({email:req.body.email});
        if(user){
            return res.send("user Already exists")
        }
        bcrypt.hash(req.body.password, saltRounds,async function(err, hash) {
            const NewUser=new userModel({
                name:req.body.name,
                email:req.body.email,
                password:hash
            })
            await NewUser.save()
            res.redirect('/user/route/findUser')

        });

      
    }
    catch(error){
        next(error)
    }
}
const loginmiddle = passport.authenticate('local', {
    failureRedirect: '/user/route/findUser',
    successRedirect: '/user/route',
});

const loginuser = async(req, res, next) => {
    try {
        // const user =await userModel.findOne({ email: req.body.email });
        // console.log('login user', user);
        // res.render('login');
res.redirect('/');

    }
    catch (error) {
        next(error);
    }
}

const logout=(req,res,next)=>{
    try{
        res.render('index');
    }
    catch(error){
        next(error)
    }
}
module.exports={getdata,createuser,loginuser,logout,getUser,findUser,loginmiddle}