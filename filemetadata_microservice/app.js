//this code is not used by the servise at the moment

const mongoose=require("mongoose");
mongoose.connect(process.env.MONGO_URI);
var Schema = mongoose.Schema;
var Model=mongoose.model;

var urlSchema = new Schema({
  url: String,
  shortcut: Number
});


var Shortcut = mongoose.model('Shortcut', urlSchema);

var createAndSaveShortcut = function(url, shortcut,done) {
   const short = new Shortcut({url: url, shortcut: shortcut});
   short.save((err, data) => err ? done(err) : done(null, data));
};

var findUrlByShortcut = function(shortcut, done) {
  Shortcut.find({shortcut: shortcut} , function (err, data) {
    if(err){
      return done(err);
    }
    return done(null, data);
    });
};

var findUrl = function(url, done) {
  Shortcut.find({url: url} , function (err, data) {
    if(err){
      return done(err);
    }
    return done(null, data);
    });
};


exports.ShortcutModel = Shortcut;
exports.createAndSaveShortcut = createAndSaveShortcut;
exports.findUrlByShortcut = findUrlByShortcut;
exports.findUrl = findUrl;