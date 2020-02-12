const express = require("express");

const db = require("./db"); // < fix the path

const router = express.Router(); // mind the uppercase R

// middleware



// route handlers - handles what comes after /api/db

router.get("/", (req, res) => {
const pagination = req.query;

    db.find(pagination).then(
        db => {
            res.status(200).json(db)
        }
    ).catch(
        err =>{
            console.log(err)
            res.status(500).json({
                messages: "Error retriving the db"
            })
        }
    )
})

router.get("/:id", (req, res) => {
    db.findById(req.params.id)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "db not found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error retrieving the db",
        });
      });
  });


  router.get("/:id/comments", (req, res) => {
    const { id } = req.params;
  
    db.findPostComments(id)
      .then(messages => {
        res.status(200).json(messages);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ errorMessage: "sorry, we failed you" });
      });
  });

  router.post("/", (req, res) => {
    db.insert(req.body)
      .then(db => {
        res.status(201).json(db);
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error adding the db",
        });
      });
  });

  router.post("/:id/comments", (req, res) => {
    const { id } = req.params;
  
    const comment = { ...req.body, post_id: id };
  
    db.insertComment(comment)
      .then(inserted => {
        res.status(201).json(inserted);
      })
      .catch(error => {
        console.log(error);
  
        res.status(500).json({ errorMessage: "sorry, we failed you" });
      });
  });

  router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
      .then(count => {
        if (count > 0) {
          res.status(200).json({ message: "The db has been nuked" });
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error removing the db",
        });
      });
  });

  router.put("/:id", (req, res) => {
    const changes = req.body;
    db.update(req.params.id, changes)
      .then(db => {
        if (db) {
          res.status(200).json(db);
        } else {
          res.status(404).json({ message: "The db could not be found" });
        }
      })
      .catch(error => {
        // log error to database
        console.log(error);
        res.status(500).json({
          message: "Error updating the db",
        });
      });
  });




// mind the S in exportS
module.exports = router; // same as below

// export default router; // ES2015 Modules
