var db = require("../models");
module.exports = function(app) {
  // Get all guitarists
  app.get("/api/guitarist", function(req, res) {
    db.Guitarist.findAll().then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
  });
  // Create a new guitarist
  app.post("/api/guitarist", function(req, res) {
    console.log(req.body);
    db.Guitarist.create(req.body).then(function(dbGuitarist) { 
      res.json(dbGuitarist);
    });
  });
  // Delete an gutiarist by id
  app.delete("/api/guitarist/:id", function(req, res) {
    db.Guitarist.destroy({ where: { id: req.params.id } })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
  });
//NEW API ROUTES*********************************************************************************
// Get route for retrieving a specific guitarist 
app.get("/api/guitarist/:id?", function(req, res) {
  db.Guitarist.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
});
// Get route for retrieving a guitarist of a specific rank
app.get("/api/guitarist/position/:position", function(req, res) {
  db.Guitarist.findOne({
    where: {
      position: req.params.position
    }
  })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
});
// Get route for returning guitarist of a specific position genre
  app.get("/api/guitarist/genre/:genre", function(req, res) {
    db.Guitarist.findAll({
      where: {
        genre: req.params.genre
      }
    })
      .then(function(dbGuitarist) {
        res.json(dbGuitarist);
      });
  });
// Get route for returning guitarist of a specific band
  app.get("/api/guitarist/band/:band", function(req, res) {
    db.Guitarist.findAll({
      where: {
        band: req.params.band
      }
    })
      .then(function(dbGuitarist) {
        res.json(dbGuitarist);
      });
  });
// Get route for returning guitarist by name
app.get("/api/guitarist/name/:name", function(req, res) {
  db.Guitarist.findOne({
    where: {
      guitarist: req.params.name
    }
  })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
});
// POST route for creating a new guitar entry  
//NOT SURE ABOUT THIS ONE AT ALL
app.post("/api/guitarist", function(req, res) {
  console.log(req.body);
  db.Guitarist.create({
    position: req.body.position,
    guitarist: req.body.guitarist,
    genre: req.body.genre,
    band: req.body.band
  })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
});
// PUT route for updating guitarists
app.put("/api/guitarist", function(req, res) {
  db.Guitarist.update(req.body,
    {
      where: {
        position: req.body.position
      }
    })
    .then(function(dbGuitarist) {
      res.json(dbGuitarist);
    });
});
};
