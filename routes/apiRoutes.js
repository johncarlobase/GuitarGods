var db = require("../models");

module.exports = function(app) {
  //API ROUTE WORKS Get all guitarists
  // app.get("/api/guitarist", function(req, res) {
  //   db.Guitarist.findAll().then(function(dbGuitarist) {
  //     res.json(dbGuitarist);
  //   });
  // });

  app.get('/api/guitarist', (req, res) => {
    db.Guitarist.findAll({ order: [['position', 'ASC']] }).then(dbGuitarist =>
        res.json(dbGuitarist)
    )
})

  //API ROUTE WORKS Create a new guitarist
  app.post("/api/guitarist", function(req, res) {
    console.log(req.body);
    db.Guitarist.create(req.body).then(function (dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  //API ROUTE WORKS Delete an gutiarist by id

  app.delete("/api/guitarist/id/:id", function(req, res) {
    db.Guitarist.destroy({ where: { id: req.params.id } }).then(function(
      dbGuitarist
    ) {
      res.json(dbGuitarist);
    });
  });
  //NEW API ROUTES*********************************************************************************

  // API ROUTE WORKS Get route for retrieving a specific guitarist
  app.get("/api/guitarist/id/:id?", function(req, res) {
    db.Guitarist.findOne({
      where: {
        id: req.params.id
      }
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });

  //APIT ROUTE WORKS Get route for retrieving a guitarist of a specific rank
  app.get("/api/guitarist/position/:position", function (req, res) {
    db.Guitarist.findOne({
      where: {
        position: req.params.position
      }
    }).then(function (dbPost) {
      res.json(dbPost);
    });
  });

  //API ROUTE WORKS Get route for returning guitarist of a specific position genre
  app.get("/api/guitarist/genre/:genre", function (req, res) {
    db.Guitarist.findAll({
      where: {
        genre: req.params.genre
      }
    }).then(function (dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  //API ROUTE WORKS Get route for returning guitarist of a specific Band
  app.get("/api/guitarist/band/:band", function (req, res) {
    db.Guitarist.findAll({
      where: {
        band: req.params.band
      }
    }).then(function (dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  //API ROUTE WORKS Get route for returning guitarist by name
  app.get("/api/guitarist/name/:name", function (req, res) {
    db.Guitarist.findOne({
      where: {
        guitarist: req.params.name
      }
    }).then(function (dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  // POST route for creating a new guitar entry
  //NOT SURE ABOUT THIS ONE AT ALL
  app.post("/api/guitarist", function (req, res) {
    console.log(req.body);
    db.Guitarist.create({
      position: req.body.position,
      guitarist: req.body.guitarist,
      genre: req.body.genre,
      band: req.body.band
    }).then(function (dbGuitarist) {
      res.json(dbGuitarist);
    });
  });

  // PUT route for updating guitarists
  app.put("/api/guitarist/id/:id", function (req, res) {
    console.log(req.body);
    db.Guitarist.update(
    {
      position: req.body.position,
      guitarist: req.body.guitarist,
      genre: req.body.genre,
      band: req.body.band
    },
      {
        where: {id: req.params.id}
      }
    ).then(function (dbGuitarist) {
        res.json(dbGuitarist);
      });

  });
};
