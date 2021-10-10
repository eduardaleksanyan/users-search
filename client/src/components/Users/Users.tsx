import React, { useState } from 'react';
import User from './User';
import { UserApi } from '../../api/api';
import {IResponse} from "../../types";

export default function Users() {
    const [text, setText] = useState('');
    const [users, setUsers] = useState<IResponse>();
    const [loading, setLoading] = useState(false);

    const inputHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
        const enteredName = event.target.value;
        setText(enteredName);
    };

    const fetchUsers = async () => {
        if (text.length <= 1) {
            return;
        }

        setLoading(true);
        const response = await UserApi.getUsers(text);
        setUsers(response.data);
        setLoading(false);
    };
    return (
        <div>
            <h1>Users</h1>
            <div>
                <input
                    value={text}
                    onChange={inputHandler}
                    placeholder="Search Users"
                    className="input"
                />
                <button onClick={async () => {await fetchUsers() }}>Search</button>
            </div>
            {
                users?.data &&
                <User users={users.data} loading={loading} />
            }
        </div>
    );
}
