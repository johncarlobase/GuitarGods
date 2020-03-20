var db = require("../models");

module.exports = function(app) {
  // Get all guitarists
  app.get("/api/guitarists", function(req, res) {
    db.Guitarist.findAll({})
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  // Get route for retrieving a single guitarist
  app.get("/api/guitarists/:id", function(req, res) {
    db.Guitarist.findOne({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbGuitarist) {
        res.json(dbGuitarist);
      });
  });

  // Create a new Guitarist
  app.post("/api/guitarists", function(req, res) {
    db.Guitarist.create({
      position: req.body.position,
      guitarist: req.body.guitarist,
      genre: req.body.genre
    })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  // Delete an Guitarist by id
  app.delete("/api/guitarists/:id", function(req, res) {
    db.Guitarist.destroy({
      where: { 
        id: req.params.id 
      } 
    })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  // PUT route for updating guitarists
  app.put("/api/guitarists", function(req, res) {
    db.Guitarist.update(req.body,
      {
        where: {
          id: req.body.id
        }
      })
      .then(function(dbGuitarist) {
        res.json(dbGuitarist);
      });
  });
};
