const passport = require('passport');
const   LocalStrategy = require('passport-local').Strategy;
let UserProfile = require('./../models/UserProfile');
const CryptoJS = require("crypto-js");
// var FacebookStrategy = require('passport-facebook').Strategy
//   , TwitterStrategy  = require('passport-twitter').Strategy
//   , LinkedInStrategy = require('passport-linkedin-oauth2').Strategy;

module.exports.findUser = function(u, done) {
  return UserProfile.findOne({_id: u._id}, function(err, user) {
    if (err) {
      return done(null, false);
    }
    if (!user) {
      return done(null, user);
    }
    user.password = null;
    done(null, user);
  });   
};
module.exports = function (passport) {
    passport.serializeUser(function (user, done) {
      done(null, user);
    });
    passport.deserializeUser(function (user, done) {
      exports.findUser(user, done);
    });

    passport.use( new LocalStrategy({
      // set the field name here
      usernameField: 'email',
      passwordField: 'password'     
    },
    function(email, password, done) {
      /* get the username and password from the input arguments of the function */
      // query the user from the database
      // don't care the way I query from database, you can use
      // any method to query the user from database
      UserProfile.findOne({email : email}, function(err, user){
        if(!user){
          // if the user is not exist           
          return done(null, false, {message: "The user does not exist",user:{}});
        }
        else{
          let userpassword = CryptoJS.AES.decrypt(user.password, user.useruuid).toString(CryptoJS.enc.Utf8);
          if(password===userpassword) {
            return done(null, user);
          }else{
            return done(null, false, {message: "Wrong password",user:{}});
          }            
        }
      });        
    }
  ));

  // }
};

  
  //msj-dev
  //clientID: "1456074334693980",
  //clientSecret:  "8c88172f02c1719ce0e78d3a39dce408",

  //msj-local
  //clientID: "366392853555191",
  //clientSecret:  "ecb8ea5e98009ca5f27ccef7266a07dc",
//   passport.use(new FacebookStrategy({
//     clientID: "366392853555191",
//     clientSecret:  "ecb8ea5e98009ca5f27ccef7266a07dc",
//     callbackURL: '/auth/facebook/callback'  
//   },
//     function (accessToken, refreshToken, profile, done) {
//       if(profile && profile.id){
//         User.findOne({socialid: profile.id, provider : "facebook"}, function(err, user){
//           if(user){
//             return done(null, user);
//           }
//           else{
//             var user = new User({
//               username: (profile._json.first_name?profile._json.first_name:""),
//               email: (profile.emails && profile.emails[0]?profile.emails[0].value:""),
//               role: 'user',                  
//               provider: 'facebook',  
//               socialid : profile.id,
//               datecreated: new Date(),
//               status:10
//             });
//             user.save(function(err) {
//               if (err) done(err);
//               return done(null, user);
//             });
//           }
//         });        
//       }      
//     }
//   ));

  //msj-dev
  //clientID: "JUEwxmt35ePqs84V2JLDtdoRV",
  //clientSecret:  "wneGGn5TKqY5S0wUqv2wUi15cJio8bNYdfsSMdanPjFv2UA14Q",

  //msj-local
  //clientID: "Akxu6UYsnN5B7BsEF4MRxIl8G",
  //clientSecret:  "975yenbLOCAY6RU3pwlQeS9cOCsymvZufxvqcEqIsOCSG5q6zF",

//   passport.use(new TwitterStrategy({
//     consumerKey     : "Akxu6UYsnN5B7BsEF4MRxIl8G",
//     consumerSecret  : "975yenbLOCAY6RU3pwlQeS9cOCsymvZufxvqcEqIsOCSG5q6zF",
//     callbackURL     :'/auth/twitter/callback'  
//   },
//     function (accessToken, refreshToken, profile, done) {
//       if(profile && profile.id){
//         User.findOne({socialid: profile.id, provider : "twitter"}, function(err, user){
//           if(user){
//             return done(null, user);
//           }
//           else{
//             var user = new User({
//               username: (profile.username?profile.username:""),
//               email: (profile.emails && profile.emails[0]?profile.emails[0].value:''),
//               role: 'user',                  
//               provider: 'twitter',  
//               socialid : profile.id,
//               datecreated: new Date(),
//               status:10
//             });
//             user.save(function(err) {
//               if (err) done(err);
//               return done(null, user);
//             });
//           }
//         });
//       }
//     }
//   ));
  //msj-dev
  //clientID: "757kgpepzwu2j8",
  //clientSecret: "Ybf15lRZ4pPPou1Q",

  //msj-local
  //clientID: "752ixrvs6m9p3z",
  //clientSecret: "xs8iXUp5KpKqcBlT",
//   passport.use(new LinkedInStrategy({
//     clientID: "752ixrvs6m9p3z",
//     clientSecret: "xs8iXUp5KpKqcBlT",
//     callbackURL: "/auth/linkedin/callback"  
//   },
//     function (accessToken, refreshToken, profile, done) {
//       if(profile && profile.id){
//         User.findOne({socialid: profile.id, provider : "linkedin"}, function(err, user){
//           if(user){
//             return done(null, user);
//           }
//           else{
//             var user = new User({
//               username: (profile.displayName?profile.displayName.split(' ')[0]:""),
//               email: (profile.emails && profile.emails[0]?profile.emails[0].value:''),
//               role: 'user',                  
//               provider: 'linkedin',  
//               socialid : profile.id,
//               datecreated: new Date(),
//               status:10
//             });
//             user.save(function(err) {
//               if (err) done(err);
//               return done(null, user);
//             });
//           }
//         });
//       }
//     }
//   ));

