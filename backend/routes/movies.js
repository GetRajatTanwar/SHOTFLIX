const router = require('express').Router()
const Movie = require('../models/Movie')
const verify = require('../verifyToken')

//1. Add new movie : POST method on localhost:5000/api/movie/create : Can only be access by Admin
router.post("/create", verify, async (req, res) => {
    if (req.user.isAdmin) {
        const newMovie = new Movie(req.body)
        try {
            const savedMovie = await newMovie.save()
            res.status(200).json(savedMovie);
        } catch (error) {
            res.status(500).json(error)
        }
    } else {
        res.status(403).json("You are not allowed to add movies");
    }
})

//2. Update Movie : PUT method on localhost:5000/api/movie/update/:id : Can only be access by Admin
router.put("/update/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const updatedMovie = await Movie.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(200).json(updatedMovie);
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

//3. Delete Movie : DELETE method on localhost:5000/api/movie/delete/:id : Can only be access by Admin
router.delete("/delete/:id", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        await Movie.findByIdAndDelete(req.params.id);
        res.status(200).json("The movie has been deleted...");
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

//4. Show all Movies : GET method on localhost:5000/api/movie/allmovie : Can only be access by Admin
router.get("/allmovie", verify, async (req, res) => {
    if (req.user.isAdmin) {
      try {
        const movies = await Movie.find();
        res.status(200).json(movies.reverse());
      } catch (err) {
        res.status(500).json(err);
      }
    } else {
      res.status(403).json("You are not allowed!");
    }
  });

//5. Show Movie by id : GET method on localhost:5000/api/movie/find/:id : Login Required
router.get("/find/:id", verify, async (req, res) => {
    try {
      const movie = await Movie.findById(req.params.id);
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

//6. Show Random Movie : GET method on localhost:5000/api/movie/random : Login Required
router.get("/random", verify, async (req, res) => {
    const type = req.query.type;
    let movie;
    try {
      if (type === "series") {
        movie = await Movie.aggregate([
          { $match: { isSeries: true } },
          { $sample: { size: 1 } },
        ]);
      } else {
        movie = await Movie.aggregate([
          { $match: { isSeries: false } },
          { $sample: { size: 1 } },
        ]);
      }
      res.status(200).json(movie);
    } catch (err) {
      res.status(500).json(err);
    }
  });

module.exports = router