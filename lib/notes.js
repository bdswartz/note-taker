const fs = require("fs");
const path = require("path");

// export query functions to make them available to apiRoutes (to be filled in with query functions)

function createNewNote(body, notesArray) {
  const note = body;
  notesArray.push(note);
  fs.writeFileSync(
    path.join(__dirname, '../data/notes.json'),
    JSON.stringify({ notes: notesArray }, null, 2)
  );
  return note;
  };

  function deleteById(id, notesArray) {
    // filter notes array by all but the id we want to delete (check logic)
    const results = notesArray.filter(note => note.id !== id);
    console.log(results);
    // write to notes.json with new filtered array
    fs.writeFileSync(
      path.join(__dirname, '../data/notes.json'),
      JSON.stringify({ notes: results }, null, 2)
    );
    return results;
  };

  function validateNote(note) {
    if (!note.title || typeof note.title !== 'string') {
      return false;
    }
    if (!note.text || typeof note.text !== 'string') {
      return false;
    }
    if (!note.id || typeof note.id !== 'string') {
      return false;
    }
    return true;
  };

module.exports = { createNewNote, deleteById, validateNote };