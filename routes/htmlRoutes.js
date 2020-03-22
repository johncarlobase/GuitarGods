var db = require("../models");

module.exports = function(app) {
  // Load index page
  app.get("/", function(req, res) {
    db.Guitarist.findAll({}).then(function(dbGuitarist) {
      console.log(dbGuitarist);
      res.render("index", {
        msg: "This is a message from the html routes file!!",
        artist: dbGuitarist
      });
    });
  });

  // // Load example page and pass in an example by id
  // app.get("/example/:id", function(req, res) {
  //   db.Guitarist.findOne({ where: { id: req.params.id } }).then(function(dbGuitarist) {
  //     res.render("example", {
  //       example: dbGuitarist
  //     });
  //   });
  // });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
