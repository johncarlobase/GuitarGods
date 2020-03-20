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
  app.get("/guitarists/:id", function(req, res) {
    db.Guitarist.findOne({ where: { id: req.params.id } })
    .then(function(dbGuitarist) {
      res.render("guitarists", {
        example: dbGuitarist
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get("*", function(req, res) {
    res.render("404");
  });
};
