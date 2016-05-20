
var baseUrl = "//192.155.246.146:7048";
servicebaseUrl="//localhost:5502";

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
    "checkUniqueDiscount" : "/event_setting/checkUniqueDiscount",
    "assignDiscount" : "/event_setting/assignDiscount",
    "discountOverview" :  "/event_setting/discountOverview",
    "changeDiscountStatus" :  "/event_setting/changeDiscountStatus",
    "deleteDiscount" :  "/event_setting/deleteDiscount",
    "makeDiscountAssignment"  :  "/event_setting/makeDiscountAssignment",
    "exportDiscountCSV"  :  "/event_setting/exportDiscountCSV",
    "getSelectedDiscount" :  "/event_setting/getSelectedDiscount",

    /* Constants for the bundle module */
    "getBundles": "/event_setting/getBundles",
    "addBundle" :  "/event_setting/addBundle",
    "updateBundle" : "/event_setting/updateBundle",
    "bundleOverview" :  "/event_setting/bundleOverview",
    "getBundleProducts":"/event_setting/getBundleProducts",
    "changeBundleStatus" : "/event_setting/changeBundleStatus",
    "removeBundle" : "/event_setting/removeBundle",
    "getBundleDetail" : "/event_setting/getBundleDetail",

    /* Constants for the manage users */
    "addUser": "/user/addUser",
    "getUser": "/user/getUser",
    "userOverview": "/user/userOverview",
    
    /* Constants for the My account page */
    "updateUser" : "/profile/updateUser",
    "updateSocial" : "/profile/updateSocial",
    "updatePassword" : baseUrl + "/webservices/updatePassword",
    "updateEmail" : baseUrl + "/webservices/updateEmail",
    "getData" : "/profile/getData",

    /* Constants for the create event step 2 price level */
    "savepricelevel" : "/event/savepricelevel",
    "getPricelevel" : "/event/getPricelevel",
    "removepricelevel" : "/event/removepricelevel",
    "changePricelevelStatus" : "/event/changePricelevelStatus",
    "getSinglePricelevel" : "/event/getSinglePricelevel",
    "postPriceChange" : "/event/postPriceChange",

    /* Constants for saving the financial settings */
    "addFinancialDetails" : "/account/addFinancialDetails",
    "getFinancialDetails" : "/account/getFinancialDetails",
    "addCustomFinancialDetails" : "/account/addCustomFinancialDetails",
    "viewCustomFinancialSetting" : "/account/viewCustomFinancialSetting",
    "getCustomFinancialSetting" : "/account/getCustomFinancialSetting",
    "checkAlreadyAddedMerchant" : "/account/checkAlreadyAddedMerchant",

}

var global_message = {
    "EmailAvailable" : "Available",
    "EmailExist" : "This email is already registered.Please try another.",
    "SavingError" : "Error in saving !",
    "SignupSuccess" : "Registration email sent to your registered email. Open your email to finish signup.If you don't see alistixs email in your inbox within 15 minutes, look for it in your junk mail folder. If you find it there, please mark the email as 'Not Junk'.",
    "ForgetPassword" : "Check your registered email to reset your password quickly.",
    "ForgetEmailError" : "Your search didn't match any accounts. Enter your registered email address again.",
    "ActivatedMessage" : "Your account has been activated, please sign in.",
    "ErrorInActivation" : "There is some problem, please try after some time.",
    "QuestionAddValidation" : "Please fill all the mandatory fields.",
    "LoginNotMatchingError" : "The email and password you entered don't match.",
    "EmailEmpty" : "Enter a valid email ",

    "LoginAuthNotMatchingError" : "Your account has not been activated till now . Please go to email to complete activation process.",
    "AccountNotActivated" : "You have not verified your email account, please see the verification email you must have received in your registered email",
    "AccountBlocked" : "Account Blocked",
    "InfoNotUpdated" : "Some error",
    "InvalidPassword" : "The password that you've entered is incorrect.",
    "InvalidEmail" : "The email address that you've entered doesn't match any account.",
    "InvalidUserPassword" : "The email and password you entered don't match",

}

var appConstants = {
	"authorizationKey" : localStorage.getItem( "ngStorage-auth_token" )
}

var headerConstants = {
	"json": "application/json"
}
