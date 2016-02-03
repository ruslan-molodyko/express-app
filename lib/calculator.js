module.exports = {
    "add": function() {
        var result = 0;
        Array.prototype.slice.call(arguments).forEach(function(val) {
            result += parseInt(val, 10) || 0;
        });
        return result;
    }
};
