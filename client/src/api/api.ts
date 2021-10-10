import axios from "axios";

let instance = axios.create({
    baseURL : 'http://localhost:5000/'
});

export let UserApi = {
    getUsers(text: string) {
        return instance.get(`search?text=${text}`)
    },

    getUsersCount() {
        return instance.get('domains/count');
    }
}