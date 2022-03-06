const router = require('express').Router();
const { createNewNote, deleteById, validateNote } = require('../../lib/notes');
const { notes } = require('../../data/notes');
const uniqid = require("uniqid");


router.get('/notes', (req, res) => {
    let results = notes;
    res.json(results);
  });

// delete note using id parameter
router.get('/notes/:id', (req, res) => {
  const result = deleteById(req.params.id, notes);
  if (result) {
    res.json(result);
  } else {
    res.send(404);
  }
});

router.post('/notes', (req, res) => {
    // add a unique id to the incoming note in the body of the post request
    const noteId = uniqid.time()
    req.body.id = noteId;
    // if any data in req.body is incorrect, send 400 error back
    if (!validateNote(req.body)) {
      res.status(400).send('The note is not properly formatted.');
    } else {
      const note = createNewNote(req.body, notes);
      res.json(note);
    }
});

module.exports = router;