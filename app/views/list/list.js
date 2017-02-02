var dialogsModule = require("ui/dialogs");
var observableModule = require("data/observable")
var ObservableArray = require("data/observable-array").ObservableArray;
var page;
// social share
var socialShare = require("nativescript-social-share");

// swipe delete for ios
var swipeDelete = require("../../shared/utils/ios-swipe-delete");

// get the list view model
var GroceryListViewModel = require("../../shared/view-models/grocery-list-view-model");
var groceryList=new GroceryListViewModel([]);
var pageData = new observableModule.fromObject({
    groceryList:groceryList,
    grocery:''
});

exports.loaded = function(args) {
    page = args.object;
    if (page.ios) {
        var listView = page.getViewById("groceryList");
        swipeDelete.enable(listView, function(index) {
            groceryList.delete(index);
        });
    }
    page.bindingContext = pageData;
    // init groceryList;
    var listView=page.getViewById("groceryList")
    groceryList.empty();
    pageData.set("isLoading",true)
    groceryList.load().then(function () {
        pageData.set("isLoading",false);
        listView.animate({
            opacity:1,
            duration:1000
        })
    });
};

exports.add = function() {
    // Check for empty submissions
    if (pageData.get("grocery").trim() === "") {
        dialogsModule.alert({
            message: "Enter a grocery item",
            okButtonText: "OK"
        });
        return;
    }

    // Dismiss the keyboard
    page.getViewById("grocery").dismissSoftInput();
    groceryList.add(pageData.get("grocery"))
        .catch(function() {
            dialogsModule.alert({
                message: "An error occurred while adding an item to your list.",
                okButtonText: "OK"
            });
        });

    // Empty the input field
    pageData.set("grocery", "");
};

exports.share = function() {
    var list = [];
    var finalList = "";
    for (var i = 0, size = groceryList.length; i < size ; i++) {
        list.push(groceryList.getItem(i).name);
    }
    var listString = list.join(", ").trim();
    socialShare.shareText(listString);
};

exports.delete = function(args) {
    var item = args.view.bindingContext;
    var index = groceryList.indexOf(item);
    console.log("item ",item)
    console.log(" index ",index)
    groceryList.delete(index);
};