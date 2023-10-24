const passport=require('passport');
const userModel = require('../module/userModel');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const LocalStrategy = require('passport-local').Strategy;
passport.use(new LocalStrategy(
    async(username, password, done)=> {
        try{

            const user=await userModel.findOne({name:username});
            if (!user) {           return done(null, false, { message: "Incorrect user." });
        }
if(!bcrypt.compare(password,user.password)){
    return done(null, false, { message: "Incorrect password" });
}

            return done(null, user);

        }
        catch(error){
            if (error) { return done(error); }

        }
        

   
    }
  ));


  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id, done) => {
    try {
        const user = await userModel.findById({_id:id});
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});
