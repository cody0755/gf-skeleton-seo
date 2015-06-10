var swig = require('swig');

swig.setFilter('number', function(n) {
    function reverse(s) {
        return s.split('').reverse().join('');
    }
    if (n > 999) {
        return reverse('' + n).match(/.{1,3}/g).reverse().join(',');
    } else {
        return n;
    }
});

swig.setFilter('lessThan', function(str, len, sub) {
    if (str.length > len) {
        return str.slice(0, len) + sub;
    }
    return str;
});