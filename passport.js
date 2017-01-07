let passport = require('passport')
,LocalStrategy  = require('passport-local').strategy;

passport.use(new LcoalStrategy(
  function(username,password,done) {
    User.findOne({username: username},function(err,user){
      if (err) { return done(err); }
      if(!user) {
        return done(null,false, { mesage:'Incorrect username.' });
      }
      if (!user.validPassword(password)){
        return done(null,false,{message: 'Incorrect password.'});
      }
    return done(null,user);
  });
}
});
