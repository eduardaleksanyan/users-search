import React from 'react';
import {IUser} from '../../types';

interface UserProps {
    users: IUser[],
    loading: boolean
}

export default ({ users, loading }: UserProps) => {
    if (loading) {
        return <h2>Loading...</h2>;
    }

    return (
        <div>
            {users.map(user => (
                <p key={user.id}>
                  <span>
                    {user.first_name} {user.last_name}
                  </span>
                </p>
            ))}
        </div>
    );
};