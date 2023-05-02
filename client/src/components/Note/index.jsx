import React, { useState } from 'react';
import Navbar from '../Navbar';
import { ADD_NOTE } from '../../utils/mutations';
import { QUERY_ME, QUERY_NOTES } from '../../utils/queries';
import { useQuery, useMutation } from "@apollo/client";
import UpdateNote from '../UpdateNote';

const Note = () => {
    const [noteTitle, setNoteTitle] = useState('');
    const { data: meData } = useQuery(QUERY_ME);
    const me = meData?.me || [];
    const profileId = me._id;

    const [addNote, { error }] = useMutation(ADD_NOTE, {
        update(cache, { data: { addNote } }) {
            try {
                const { notes } = cache.readQuery({ query: QUERY_NOTES });

                cache.writeQuery({
                    query: QUERY_NOTES,
                    data: { notes: [...notes, addNote] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, note: { ...me.note, addNote } } },
            });
        },
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'title') {
            console.log('title', value);
            setNoteTitle(value);
        }
    };
    const createNote = async (e) => {
        e.preventDefault();
        try {
            const { data } = await addNote({
                variables: { id: profileId, noteTitle: noteTitle }
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
            <div className='row'>
                <div className='col-6'>
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
                </div>
                <div className='col-6'>
                    <UpdateNote noteTilte={noteTitle} />
                </div>
            </div>
        </>
    )
};

export default Note;