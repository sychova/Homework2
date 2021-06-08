var registerModule = (function() {
    var variable = 10;
    var bindEvents = function() {
        $(".test-button").on("click", testButtonClickHandler);
    };
    var testButtonClickHandler = function() {
        variable++;
        console.log(`clicked ${variable} times`);
    }
    var init = function(value) {
        variable = value;
        bindEvents();
        console.log("events initialized");
    };

    return {
        init: init,
        moduleName: "registerModule",
    };
})();