import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { UPDATE_NOTE } from '../../utils/mutations';
import { QUERY_NOTES, QUERY_ME } from '../../utils/queries';

const UpdateNote = () => {

    const [noteTitle, setNoteTitle] = useState('');
    const { data } = useQuery(QUERY_ME);
    const me = data?.me || [];
    const noteId = me.note?._id;

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "noteTitle") {
            setNoteTitle(value);
        }
    };

    const [updateNote, { error }] = useMutation(UPDATE_NOTE, {
        update(cache, { data: { updateNote } }) {
            try {
                const { notes } = cache.readQuery({ query: QUERY_NOTES });

                cache.writeQuery({
                    query: QUERY_NOTES,
                    data: { notes: [...notes, updateNote] },
                });
            } catch (e) {
                console.error(e);
            }

            const { me } = cache.readQuery({ query: QUERY_ME });
            cache.writeQuery({
                query: QUERY_ME,
                data: { me: { ...me, note: { ...me.note, updateNote } } },
            });
        },
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const { data } = await updateNote({
                variables: {
                    id: noteId,
                    noteTitle: noteTitle,
                },
            });

            setNoteTitle('');
        } catch (err) {
            console.error(err);
        }
    };

    return (
        <>
            <form>
                <input
                    name='noteTitle'
                    type='text'
                    value={noteTitle}
                    onChange={handleChange}
                    placeholder={noteTitle}
                />
            </form>
            <button className='butt-note' onClick={handleSubmit} >
                Update
            </button>
        </>
    )
};

export default UpdateNote;