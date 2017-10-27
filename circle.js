const { PI } = Math;

module.exports = {

    area: function(r) {
        return PI * r ** 2;
    },

    circumference: function(r) {
        return 2 * PI * r;
    },

    grab: function(flag){
      var index = process.argv.indexOf(flag);
      return (index === -1) ? null : process.argv[index+1];
    }


};
