### Create a separate collection with all keys in 'provisions'

mr = db.runCommand({
  "mapreduce" : "provisions",
  "map" : function() {
    for (var key in this) { emit(key, null); }
  },
  "reduce" : function(key, stuff) { return null; },
  "out": "provisions" + "_keys"
});
