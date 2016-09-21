/**
 * Debug script used to replace console log with alert boxes
 * @link http://stackoverflow.com/a/16259739/2104168
 * @link http://stackoverflow.com/a/13145228/2104168
 */
(function() {
    if(DEBUG && window.console && console.log) {
        var old = console.log;
        console.log = function() {
            alert(arguments[0]);
        };
    }
})();