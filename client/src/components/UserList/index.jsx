import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';
import Navbar from '../Navbar';

const UserList = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    return (
        <div>
          <Navbar />
          Welcome {JSON.stringify(users)} 
        </div>
    )
};

export default UserList;