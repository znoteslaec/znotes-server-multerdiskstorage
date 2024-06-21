const Notes = require('../models/notesModel');

// Controller logic for creating a new note
const createNote = async (req, res) => {
    try {
        const { title, content, departmentId, semesterId, batchId, author } = req.body;
        const newNote = new Notes({
            title,
            content,
            departmentId,
            semesterId,
            batchId,
            author
        });
        const savedNote = await newNote.save();
        res.status(201).json(savedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Controller logic for getting all notes
const getAllNotes = async (req, res) => {
    try {
        const notes = await Note.find();
        res.status(200).json(notes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Controller logic for getting a single note by ID
const getNoteById = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(note);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Controller logic for updating a note
const updateNote = async (req, res) => {
    try {
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json(updatedNote);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



// Controller logic for deleting a note
const deleteNote = async (req, res) => {
    try {
        const deletedNote = await Note.findByIdAndDelete(req.params.id);
        if (!deletedNote) {
            return res.status(404).json({ message: 'Note not found' });
        }
        res.status(200).json({ message: 'Note deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};



const home = async(req, res)=>{
    try {
        res
        .status(200)
        .send('Hello, This is the server page with controller!'); // Respond with "Hello, world!" for requests to the root URL
     
    } catch (error) {
        console.log(error);
        
    }
}



module.exports = {
    home,
    createNote,
    getAllNotes,
    getNoteById,
    updateNote,
    deleteNote
};



