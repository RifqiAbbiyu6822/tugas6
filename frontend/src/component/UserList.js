import React, { useState, useEffect } from 'react';
import axios from "axios";
import { BASE_URL } from '../utils';
const UserList = () => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ name: '', notes: '', mood: '', date: '' });
    const [editingNote, setEditingNote] = useState(null); // State untuk catatan yang sedang diedit

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = async () => {
        try {
            const response = await axios.get(`${BASE_URL}/notes`);
            setNotes(response.data);
        } catch (error) {
            console.error("Error fetching notes:", error);
        }
    };

    const deleteNote = async (id) => {
        try {
            await axios.delete(`${BASE_URL}/notes/${id}`);
            getNotes(); // Refresh the list after deletion
        } catch (error) {
            console.error("Error deleting note:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewNote({ ...newNote, [name]: value });
    };

    const addNote = async () => {
        try {
            await axios.post(`${BASE_URL}/notes`, {
                ...newNote,
                date: new Date().toISOString().split('T')[0], // Set tanggal sekarang
            });
            setNewNote({ name: '', notes: '', mood: '', date: '' }); // Reset form
            getNotes(); // Refresh the list
        } catch (error) {
            console.error("Error adding note:", error);
        }
    };

    const startEdit = (note) => {
        setEditingNote({ ...note }); // Set catatan yang akan diedit
    };

    const handleEditInputChange = (e) => {
        const { name, value } = e.target;
        setEditingNote({ ...editingNote, [name]: value });
    };

    const updateNote = async () => {
        try {
            await axios.patch(`${BASE_URL}/notes/${editingNote.id}`, editingNote);
            setEditingNote(null); 
            getNotes(); 
        } catch (error) {
            console.error("Error updating note:", error);
        }
    };

    return (
        <div className="columns mt-5 is-centered">
            <div className="column is-half">
                {/* Form untuk menambahkan catatan baru */}
                <div className="box">
                    <h2 className="title is-4">Add New Note</h2>
                    <div className="field">
                        <label className="label">Name</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="name"
                                value={newNote.name}
                                onChange={handleInputChange}
                                placeholder="Name"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Note</label>
                        <div className="control">
                            <textarea
                                className="textarea"
                                name="notes"
                                value={newNote.notes}
                                onChange={handleInputChange}
                                placeholder="Note"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Mood</label>
                        <div className="control">
                            <input
                                className="input"
                                type="text"
                                name="mood"
                                value={newNote.mood}
                                onChange={handleInputChange}
                                placeholder="Mood"
                            />
                        </div>
                    </div>
                    <div className="field">
                        <div className="control">
                            <button className="button is-primary" onClick={addNote}>Add Note</button>
                        </div>
                    </div>
                </div>

                {/* Form untuk mengedit catatan */}
                {editingNote && (
                    <div className="box">
                        <h2 className="title is-4">Edit Note</h2>
                        <div className="field">
                            <label className="label">Name</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="name"
                                    value={editingNote.name}
                                    onChange={handleEditInputChange}
                                    placeholder="Name"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Note</label>
                            <div className="control">
                                <textarea
                                    className="textarea"
                                    name="notes"
                                    value={editingNote.notes}
                                    onChange={handleEditInputChange}
                                    placeholder="Note"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Mood</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="mood"
                                    value={editingNote.mood}
                                    onChange={handleEditInputChange}
                                    placeholder="Mood"
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Date</label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="date"
                                    name="date"
                                    value={editingNote.date}
                                    onChange={handleEditInputChange}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <button className="button is-primary" onClick={updateNote}>Update Note</button>
                                <button className="button is-danger" onClick={() => setEditingNote(null)}>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tabel untuk menampilkan catatan */}
                <table className="table is-striped is-fullwidth">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Nama</th>
                            <th>Note</th>
                            <th>Mood</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {notes.map((note, index) => (
                            <tr key={note.id}>
                                <td>{index + 1}</td>
                                <td>{note.name}</td>
                                <td>{note.notes}</td>
                                <td>{note.mood}</td>
                                <td>{new Date(note.date).toLocaleDateString()}</td>
                                <td>
                                    <button className="button is-small is-primary" onClick={() => startEdit(note)}>Edit</button>
                                    <button className="button is-danger" onClick={() => deleteNote(note.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default UserList;