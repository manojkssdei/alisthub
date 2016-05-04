

var localbaseUrl   = "//localhost:5502";


var baseUrl = "http://localhost:7048";
var servicebaseUrl = "//localhost:5502";
var localhostUrl="//localhost:5502";


var webservices = {	

	"getUserregister" : baseUrl + "/webservices/register",
        "checkUnique" : baseUrl + "/webservices/checkUnique",
        "getUserlogin" : baseUrl + "/webservices/login",
        "forgetPassword" : baseUrl + "/webservices/forgetPassword",
        "resetPassword" : baseUrl + "/webservices/resetPassword",
        "confirmationEmail" : baseUrl + "/webservices/confirmationEmail",
        "getVenues":localhostUrl + "/event_setting/venueListing",
        "addVenue" : localbaseUrl + "/event_setting/addVenue",
        "venueOverview" : localbaseUrl + "/event_setting/venueOverview",
        "changeVenueStatus" : localbaseUrl + "/event_setting/changeVenueStatus",
        "deleteVenue" : localbaseUrl + "/event_setting/deleteVenue",
        "duplicateVenue" : localbaseUrl + "/event_setting/duplicateVenue",
        "getQuestions":localhostUrl + "/event_setting/getQuestions",
        "addQuestion" : localbaseUrl + "/event_setting/addQuestion",
        "questionOverview" : localbaseUrl + "/event_setting/questionOverview",
        "changeQuestionStatus" : localbaseUrl + "/event_setting/changeQuestionStatus",
        "deleteQuestion" : localbaseUrl + "/event_setting/deleteQuestion",
        "getSettingCount" : localbaseUrl + "/event_setting/getSettingCount",
        "getProducts":localhostUrl + "/event_setting/getProducts",
        "addProduct" : localbaseUrl + "/event_setting/addProduct",
        "productOverview" : localbaseUrl + "/event_setting/productOverview",
        "changeProductStatus" : localbaseUrl + "/event_setting/changeProductStatus",

        "uploadProductImage"  : localbaseUrl + "/event_setting/uploadProductImage",
        "saveEvent"  : localbaseUrl + "/event/saveEvent",
        "saverecurringEvent"  : localbaseUrl + "/event/saverecurringEvent",

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

