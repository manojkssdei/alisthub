var baseUrl = "//192.155.246.146:7048";
servicebaseUrl="//192.155.246.146:5502";


var webservices = {	

	"getUserregister" : baseUrl + "/webservices/register",
        "checkUnique" : baseUrl + "/webservices/checkUnique",
        "getUserlogin" : baseUrl + "/webservices/login",
        "forgetPassword" : baseUrl + "/webservices/forgetPassword",
        "resetPassword" : baseUrl + "/webservices/resetPassword",
        "confirmationEmail" : baseUrl + "/webservices/confirmationEmail",
        "getVenues": "/event_setting/venueListing",
        "addVenue" :  "/event_setting/addVenue",
        "venueOverview" :  "/event_setting/venueOverview",
        "changeVenueStatus" :  "/event_setting/changeVenueStatus",
        "deleteVenue" :  "/event_setting/deleteVenue",
        "duplicateVenue" : "/event_setting/duplicateVenue",
        "getQuestions": "/event_setting/getQuestions",
        "addQuestion" :  "/event_setting/addQuestion",
        "questionOverview" : "/event_setting/questionOverview",
        "changeQuestionStatus" :  "/event_setting/changeQuestionStatus",
        "deleteQuestion" :  "/event_setting/deleteQuestion",
        "getSettingCount" : "/event_setting/getSettingCount",
        "getProducts":"/event_setting/getProducts",
        "addProduct" : "/event_setting/addProduct",
        "productOverview" :  "/event_setting/productOverview",
        "changeProductStatus" : "/event_setting/changeProductStatus",

        "uploadProductImage"  :  "/event_setting/uploadProductImage",
        "saveEvent"  : "/event/saveEvent",
        "saverecurringEvent"  :  "/event/saverecurringEvent",

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
	//"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="
        "authorizationKey" : localStorage.getItem( "ngStorage-auth_token" )
}


var headerConstants = {

	"json": "application/json"

}

