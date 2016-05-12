
var baseUrl = "//192.155.246.146:7048";
servicebaseUrl="//192.155.246.146:5503";

var webservices = {	

	"getUserregister" : baseUrl + "/webservices/register",
    "checkUnique" : baseUrl + "/webservices/checkUnique",
    "getUserlogin" : baseUrl + "/webservices/login",
    "forgetPassword" : baseUrl + "/webservices/forgetPassword",
    "resetPassword" : baseUrl + "/webservices/resetPassword",
    "confirmationEmail" : baseUrl + "/webservices/confirmationEmail",
    "checkTokenExpiry" : baseUrl + "/webservices/check_token_expiry",
    "refreshTokenExpiry" : baseUrl + "/webservices/refresh_token_expiry",

    /* Constants for managing venue */
    "getVenues": "/event_setting/venueListing",
    "addVenue" :  "/event_setting/addVenue",
    "venueOverview" :  "/event_setting/venueOverview",
    "changeVenueStatus" :  "/event_setting/changeVenueStatus",
    "deleteVenue" :  "/event_setting/deleteVenue",
    "duplicateVenue" :  "/event_setting/duplicateVenue",

    /* Constants for the questions */
    "getQuestions": "/event_setting/getQuestions",
    "addQuestion" :  "/event_setting/addQuestion",
    "questionOverview" :  "/event_setting/questionOverview",
    "changeQuestionStatus" :  "/event_setting/changeQuestionStatus",
    "deleteQuestion" :  "/event_setting/deleteQuestion",
    
    /* Constants for the product */
    "getSettingCount" :  "/event_setting/getSettingCount",
    "getProducts": "/event_setting/getProducts",
    "addProduct" :  "/event_setting/addProduct",
    "productOverview" :  "/event_setting/productOverview",
    "changeProductStatus" :  "/event_setting/changeProductStatus",
    "uploadProductImage"  :  "/event_setting/uploadProductImage",
    
    /* Constants for the event and event setting */
    "saveEvent"  :  "/event/saveEvent",
    "viewEvents"  :  "/event_setting/viewEvents", //makeAssignment
    
    "makeAssignment"  :  "/event_setting/makeAssignment",
    "delAssignment"  :  "/event_setting/delAssignment",
    "deleteProduct": "/event_setting/deleteProduct",
    "saveProductSetting"  :  "/event_setting/saveProductSetting",
    "getProductSetting"  :  "/event_setting/getProductSetting",
    "saverecurringEvent"  :  "/event/saverecurringEvent",

    /* Constants for the discount module */
    "getDiscounts":"/event_setting/getDiscounts",
    "addDiscount" : "/event_setting/addDiscount",
    "assignDiscount" : "/event_setting/assignDiscount",
    "discountOverview" :  "/event_setting/discountOverview",
    "changeDiscountStatus" :  "/event_setting/changeDiscountStatus",
    "deleteDiscount" :  "/event_setting/deleteDiscount",
    "makeDiscountAssignment"  :  "/event_setting/makeDiscountAssignment",

    /* Constants for the bundle module */
    "getBundles": "/event_setting/getBundles",
    "addBundle" :  "/event_setting/addBundle",
    "bundleOverview" :  "/event_setting/bundleOverview",
    "getBundleProducts":"/event_setting/getBundleProducts",

    /* Constants for the manage users */
    "addUser": "/user/addUser",
    "getUser": "/user/getUser",
    "userOverview": "/user/userOverview",
    
    /* Constants for the My account page */
    "updateUser" : "/profile/updateUser",
    "updateSocial" : "/profile/updateSocial",
    "updatePassword" : baseUrl + "/webservices/updatePassword",
    "updateEmail" : baseUrl + "/webservices/updateEmail",
    "getData" : "/profile/getData"
}

var global_message = {
    "EmailAvailable" : "Available",
    "EmailExist" : "Already Exist!",
    "SavingError" : "Error in saving !",
    "SignupSuccess" : "Email send to you , Please go to email to activate your account.",
    "ForgetPassword" : "Email has been sent to you for reset new password.",
    "ForgetEmailError" : "Please enter correct Email.",
    "ActivatedMessage" : "Your account has been activated now , you can sign in your account .",
    "ErrorInActivation" : "There is some problem in server , Please try some time.",
    "QuestionAddValidation" : "Please fill all mandatory fields."
}

var appConstants = {
	"authorizationKey" : localStorage.getItem( "ngStorage-auth_token" )
}

var headerConstants = {
	"json": "application/json"
}