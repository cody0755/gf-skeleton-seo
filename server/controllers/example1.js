var _ = require('lodash');

module.exports = function(map) {
    _.extend(map, {
        example1: function(req, res) {
            res.render('example1', {
                title: 'example1',
                data: ['apple', 'juice', 'milk']
            });
        }
    });
};

// another written way:
/*
module.exports = {
    'get /test/1': function() {

    },
    'post /test/2': function(req, res, next) {

    }
}
*/

