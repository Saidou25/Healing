import React from 'react';
import { useQuery } from '@apollo/client';
import { QUERY_USERS } from '../../utils/queries';

const UserList = () => {
    const { loading, data } = useQuery(QUERY_USERS);
    const users = data?.users || [];

    return (
        <div>
          Welcome {JSON.stringify(users)} 
        </div>
    )
};

export default UserList;