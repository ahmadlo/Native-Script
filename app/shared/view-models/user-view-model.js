var config = require("../../shared/config");
var fetchModule = require("fetch");
var Observable = require("data/observable").Observable;
// email validatior
var validator=require("email-validator");

function User(info) {
    info = info || {};

    // You can add properties to observables on creation
    var viewModel = new Observable({
        email: info.email || "",
        password: info.password || ""
    });

    viewModel.register = function() {
        return fetchModule.fetch(config.apiUrl + "user", {
            method: "POST",
            body: JSON.stringify({

                email: viewModel.get("email"),
                password: viewModel.get("password")
            }),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(handleErrors)
            .then(function(response) {
                console.log('response ',response)
                return response.json();
            })
            .then(function(data) {
                console.log('login ',data)
                //config.token = data.Result.access_token;
            });
    };
    viewModel.login = function() {
        return fetchModule.fetch(config.apiUrl + "user/login", {
            method: "POST",
            body: JSON.stringify({
                email: viewModel.get("email"),
                password: viewModel.get("password")

            }),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(handleErrors)
            .then(function(response) {
                return response.json();
            })
            .then(function(data) {
                console.log('login ',data)
                config.token = data.Result.access_token;
            });
    };
    viewModel.isValidEmail=function () {
        var email=this.get("email");
        return validator.validate(email);
    }

    return viewModel;
}

function handleErrors(response) {
    if (!response.ok) {
        console.log("erreurs ",JSON.stringify(response));
        throw Error(response);
    }
    return response;
}

module.exports = User;