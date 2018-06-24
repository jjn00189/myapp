Array.prototype.removeByValue = function(val) {
  for(var i=0; i<this.length; i++) {
    if(this[i] == val) {
      this.splice(i, 1);
      break;
    }
  }
}
var somearray = ["mon", "tue", "wed", "thur"]
somearray.removeByValue("tue");
console.log(somearray)