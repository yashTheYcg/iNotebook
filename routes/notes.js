const express = require('express');
const router = express.Router();
const fetchUser = require('../middleware/fetchUser');
const Note = require('../models/Note');

// ROUTE 1: get all the notes using GET "api/notes/fetchallnotes" Login required

router.get('/fetchallnotes', fetchUser, async (req, res) => {

    userID = req.user.id;
    const notes = await Note.find({ user: userID });
    res.json(notes);
})


// ROUTE 2: adding a note using GET "api/notes/addnote" Login required

router.post('/addnote', fetchUser, async (req, res) => {

    try {
        const { title, description, tag } = req.body;

        // if any empty property remains
        if (!title || !description || !tag) {
            return res.status(404).json({ error: "please fill the property" });
        }

        const note = new Note({ title, description, tag, user: req.user.id });
        const savedNote = await note.save();
        res.json(savedNote);
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }

})

// ROUTE 3: Update an existing Note using: PUT "/api/auth/updatenote" Login required
router.put('/updatenote/:CurrentID', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // creating the newNote object
        const newNote = {};
        if (title) { newNote.title = title; };
        if (description) { newNote.description = description };
        if (tag) { newNote.tag = tag };

        // find the note to be updated and update it
        let note = await Note.findById(req.params.CurrentID);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow updation when user own it
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // updating the users note
        note = await Note.findByIdAndUpdate(req.params.CurrentID, { $set: newNote }, { new: true });
        res.json({ note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})


// ROUTE 4: Delete an existing Note using: POST "/api/auth/deletenote" Login required
router.delete('/deletenote/:CurrentID', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // find the note to be deleted and delete it
        let note = await Note.findById(req.params.CurrentID);
        if (!note) { return res.status(404).send("Not Found") };

        // Allow deletion only if user owns this Note
        if (note.user.toString() !== req.user.id) {
            return res.status(401).send("Not allowed");
        }

        // deleting the user's note
        note = await Note.findByIdAndDelete(req.params.CurrentID);
        res.json({ "Success": "Note has been deleted", note: note });
    } catch (error) {
        console.log(error.message);
        res.status(500).send("Internal server Error");
    }
})

module.exports = router;