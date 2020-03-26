var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Guitarist.findAll({})
    .then(function(dbGuitarist) {
      res.render("index", {
        msg: "Welcome!",
        examples: dbGuitarist
      });
    });
  });

  // Load example page and pass in an example by id
  app.get("/guitarist/:id", function(req, res) {
    db.Guitarist.findOne({ where: { id: req.params.id } })
    .then(function(dbGuitarist) {
      res.render("Guitarist", {
        example: dbGuitarist
      });
    });
  });

  app.get("/all", function(req, res) {
    
    // console.log(dbGuitarist);
     res.render("all")

 });

 app.get("/lastfm", function(req, res) {
    
  // console.log(dbGuitarist);
   res.render("lastFm")

});

 app.get("/add", function(req, res) {
    
  // console.log(dbGuitarist);
   res.render("add")

});







};









  
