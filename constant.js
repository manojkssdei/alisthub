/*************************************** SHOW CLICKS SERVICES CENTER *********************************************/
/*****************************************************************************************************************/ 
/*Showclick Server posting services declaration 
Created : 2016-06-02
Created By: Manoj Singh */
/******************************************************************************************************************/
/******************************************************************************************************************/

var showclixServer="https://admin.showclix.com";
var showclixAPIServer="http://api.showclix.com";

const showclix_webservices = {
    /* Service To generate token on showclicks */
    "generateToken" : showclixServer + "/api/registration",
     /* Services for Sign up on showclicks Seller */
    "signUp" : showclixAPIServer +"/Seller",
     /* Services for Add Venue on showclicks */
    "addVenue" : showclixAPIServer +"/Venue",
    
};
module.exports = showclix_webservices;