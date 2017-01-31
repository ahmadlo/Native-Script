
var page;
var email;
var password;

/* frame module : pour la navigation entre les différentes pages */
var frameModule=require("ui/frame");

// dialog module
var dialogsModule=require("ui/dialogs");

// user view model from shared
var UserViewModel = require("../../shared/view-models/user-view-model");
var user=new UserViewModel({
    email: "user@nativescript.org",
    password: "password"
});
exports.loaded=function (args) {
    page=args.object
    page.bindingContext=user;
    console.log('app is loading.....',page);
}

exports.signIn=function () {

    // new sign-in
    user.login()
        .catch(function (error) {
            console.log("errosrs", error);
            dialogsModule.alert({
                message:"Bad Email or Passord",
                okButtonText:"ok"
            });
            return Promise.reject();

        })
        .then(function () {
            frameModule.topmost().navigate("views/list/list");
        });


    /*email=page.getViewById("email");
    password=page.getViewById("password");
    console.log('email',email.text);
    console.log("password ",password.text);*/
    //alert("this is the sign in function ",email.text);
}

exports.register=function () {
    //alert("registering ......");
    var topmost=frameModule.topmost();
    topmost .navigate("views/register/register");
}