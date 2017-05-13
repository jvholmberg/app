module.exports = function isNullOrWhitespace(str){
  return str === null || str.match(/^ *$/) !== null;
}
