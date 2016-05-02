
//var localbaseUrl   = "http://192.155.246.146:5501";
var localbaseUrl   = "http://localhost:5501";

var baseUrl = "http://192.155.246.146:7048";
var servicebaseUrl = "//192.155.246.146:5501";
var localhostUrl="http://localhost:5501";

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
        "uploadProductImage"  : localbaseUrl + "/event_setting/uploadProductImage"
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


//var appConstants = {

	//"authorizationKey": "dGF4aTphcHBsaWNhdGlvbg=="
        //"authorizationKey":$localStorage.token
       
//}

var headerConstants = {

	"json": "application/json"

}


        /*
	<option timeZoneId="33" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Brussels, Copenhagen, Madrid, Paris</option>
	<option timeZoneId="34" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) Sarajevo, Skopje, Warsaw, Zagreb</option>
	<option timeZoneId="35" gmtAdjustment="GMT+01:00" useDaylightTime="1" value="1">(GMT+01:00) West Central Africa</option>
	<option timeZoneId="36" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Amman</option>
	<option timeZoneId="37" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Athens, Bucharest, Istanbul</option>
	<option timeZoneId="38" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Beirut</option>
	<option timeZoneId="39" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Cairo</option>
	<option timeZoneId="40" gmtAdjustment="GMT+02:00" useDaylightTime="0" value="2">(GMT+02:00) Harare, Pretoria</option>
	<option timeZoneId="41" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Helsinki, Kyiv, Riga, Sofia, Tallinn, Vilnius</option>
	<option timeZoneId="42" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Jerusalem</option>
	<option timeZoneId="43" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Minsk</option>
	<option timeZoneId="44" gmtAdjustment="GMT+02:00" useDaylightTime="1" value="2">(GMT+02:00) Windhoek</option>
	<option timeZoneId="45" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Kuwait, Riyadh, Baghdad</option>
	<option timeZoneId="46" gmtAdjustment="GMT+03:00" useDaylightTime="1" value="3">(GMT+03:00) Moscow, St. Petersburg, Volgograd</option>
	<option timeZoneId="47" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Nairobi</option>
	<option timeZoneId="48" gmtAdjustment="GMT+03:00" useDaylightTime="0" value="3">(GMT+03:00) Tbilisi</option>
	<option timeZoneId="49" gmtAdjustment="GMT+03:30" useDaylightTime="1" value="3.5">(GMT+03:30) Tehran</option>
	<option timeZoneId="50" gmtAdjustment="GMT+04:00" useDaylightTime="0" value="4">(GMT+04:00) Abu Dhabi, Muscat</option>
	<option timeZoneId="51" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Baku</option>
	<option timeZoneId="52" gmtAdjustment="GMT+04:00" useDaylightTime="1" value="4">(GMT+04:00) Yerevan</option>
	<option timeZoneId="53" gmtAdjustment="GMT+04:30" useDaylightTime="0" value="4.5">(GMT+04:30) Kabul</option>
	<option timeZoneId="54" gmtAdjustment="GMT+05:00" useDaylightTime="1" value="5">(GMT+05:00) Yekaterinburg</option>
	<option timeZoneId="55" gmtAdjustment="GMT+05:00" useDaylightTime="0" value="5">(GMT+05:00) Islamabad, Karachi, Tashkent</option>
	<option timeZoneId="56" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Sri Jayawardenapura</option>
	<option timeZoneId="57" gmtAdjustment="GMT+05:30" useDaylightTime="0" value="5.5">(GMT+05:30) Chennai, Kolkata, Mumbai, New Delhi</option>
	<option timeZoneId="58" gmtAdjustment="GMT+05:45" useDaylightTime="0" value="5.75">(GMT+05:45) Kathmandu</option>
	<option timeZoneId="59" gmtAdjustment="GMT+06:00" useDaylightTime="1" value="6">(GMT+06:00) Almaty, Novosibirsk</option>
	<option timeZoneId="60" gmtAdjustment="GMT+06:00" useDaylightTime="0" value="6">(GMT+06:00) Astana, Dhaka</option>
	<option timeZoneId="61" gmtAdjustment="GMT+06:30" useDaylightTime="0" value="6.5">(GMT+06:30) Yangon (Rangoon)</option>
	<option timeZoneId="62" gmtAdjustment="GMT+07:00" useDaylightTime="0" value="7">(GMT+07:00) Bangkok, Hanoi, Jakarta</option>
	<option timeZoneId="63" gmtAdjustment="GMT+07:00" useDaylightTime="1" value="7">(GMT+07:00) Krasnoyarsk</option>
	<option timeZoneId="64" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Beijing, Chongqing, Hong Kong, Urumqi</option>
	<option timeZoneId="65" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Kuala Lumpur, Singapore</option>
	<option timeZoneId="66" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Irkutsk, Ulaan Bataar</option>
	<option timeZoneId="67" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Perth</option>
	<option timeZoneId="68" gmtAdjustment="GMT+08:00" useDaylightTime="0" value="8">(GMT+08:00) Taipei</option>
	<option timeZoneId="69" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Osaka, Sapporo, Tokyo</option>
	<option timeZoneId="70" gmtAdjustment="GMT+09:00" useDaylightTime="0" value="9">(GMT+09:00) Seoul</option>
	<option timeZoneId="71" gmtAdjustment="GMT+09:00" useDaylightTime="1" value="9">(GMT+09:00) Yakutsk</option>
	<option timeZoneId="72" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Adelaide</option>
	<option timeZoneId="73" gmtAdjustment="GMT+09:30" useDaylightTime="0" value="9.5">(GMT+09:30) Darwin</option>
	<option timeZoneId="74" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Brisbane</option>
	<option timeZoneId="75" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Canberra, Melbourne, Sydney</option>
	<option timeZoneId="76" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Hobart</option>
	<option timeZoneId="77" gmtAdjustment="GMT+10:00" useDaylightTime="0" value="10">(GMT+10:00) Guam, Port Moresby</option>
	<option timeZoneId="78" gmtAdjustment="GMT+10:00" useDaylightTime="1" value="10">(GMT+10:00) Vladivostok</option>
	<option timeZoneId="79" gmtAdjustment="GMT+11:00" useDaylightTime="1" value="11">(GMT+11:00) Magadan, Solomon Is., New Caledonia</option>
	<option timeZoneId="80" gmtAdjustment="GMT+12:00" useDaylightTime="1" value="12">(GMT+12:00) Auckland, Wellington</option>
	<option timeZoneId="81" gmtAdjustment="GMT+12:00" useDaylightTime="0" value="12">(GMT+12:00) Fiji, Kamchatka, Marshall Is.</option>
	<option timeZoneId="82" gmtAdjustment="GMT+13:00" useDaylightTime="0" value="13">(GMT+13:00) Nuku'alofa</option>";*/

