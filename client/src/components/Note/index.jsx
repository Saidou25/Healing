import React, { useState } from 'react';
import Navbar from '../Navbar';
import { ADD_NOTE } from '../../utils/mutations';
import { useMutation } from "@apollo/client";

const Note = () => {
const [noteTitle, setNoteTitle] = useState('');
const [addNote] = useMutation(ADD_NOTE);

const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'title') {
         console.log(value);
         setNoteTitle(value);
    }
};
    const createNote = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addNote({
                variables: { noteTitle: noteTitle }
            });
            setNoteTitle('');

            console.log(`success adding ${noteTitle}`);

        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <Navbar />
            <form>
                <input
                    name='title'
                    type='text'
                    value={noteTitle}
                    onChange={handleChange}
                />
            </form>
            <button className='butt-note' onClick={createNote}>
                Submit
            </button>
        </>
    )
};

export default Note;