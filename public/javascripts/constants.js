
var localbaseUrl   = "http://192.155.246.146:5501";

var baseUrl = "//192.155.246.146:7048";
var servicebaseUrl = "//192.155.246.146:5501";
var localhostUrl="//192.155.246.146:5501";

var webservices = {	

	"getUserregister" : baseUrl + "/webservices/register",
        "checkUnique" : baseUrl + "/webservices/checkUnique",
        "getUserlogin" : baseUrl + "/webservices/login",
        "forgetPassword" : baseUrl + "/webservices/forgetPassword",
        "resetPassword" : baseUrl + "/webservices/resetPassword",
        "confirmationEmail" : baseUrl + "/webservices/confirmationEmail",
        "getVenues":localhostUrl + "/event_setting/venueListing",
        "addVenue" : localbaseUrl + "/event_setting/addVenue",
        "venueOverview" : localbaseUrl + "/event_setting/venueOverview"
}

var global_message = {
    "EmailAvailable" : "Available",
    "EmailExist" : "Already Exist!",
    "SavingError" : "Error in saving !",
    "SignupSuccess" : "Email send to you , Please go to email to activate your account.",
    "ForgetPassword" : "Email has been sent to you for reset new password.",
    "ForgetEmailError" : "Please enter correct Email.",
    "ActivatedMessage" : "Your account has been activated now , you can sign in your account .",
    "ErrorInActivation" : "There is some problem in server , Please try some time."
}

var appConstants = {

	"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="
}

var headerConstants = {

	"json": "application/json"

}


