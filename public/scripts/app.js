$(document).ready(function() {
    var uri = window.location.pathname;
    // window.appModule.init();
    if (uri === "/") {
        registerModule.init();
    } else if (uri === "/usersCenter") {
        // load module
        userModule.init();
    }
});