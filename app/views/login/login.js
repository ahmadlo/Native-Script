
var page;
var email;
var password;

/* frame module : pour la navigation entre les différentes pages */
var frameModule=require("ui/frame");

// view model
var Observable=require("data/observable").Observable;

// ajout d'un utilisateur
var user=new Observable({
    email:"ahmadou19@gmail.com",
    password:"Passer@1"
});
exports.loaded=function (args) {
    page=args.object
    page.bindingContext=user;
    console.log('app is loading.....',page);
}

exports.signIn=function () {
    email=page.getViewById("email");
    password=page.getViewById("password");
    console.log('email',email.text);
    console.log("password ",password.text);
    //alert("this is the sign in function ",email.text);
}

exports.register=function () {
    //alert("registering ......");
    var topmost=frameModule.topmost();
    topmost .navigate("views/register/register");
}