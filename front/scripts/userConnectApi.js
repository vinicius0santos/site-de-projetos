import { apiUrl, headers } from "../global.js";

class User {
    constructor(username, password) {
        this.data = {
            username: username,
            password: password
        }
    }

    async create() {
        const url = apiUrl + '/user/create';

        const user = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: headers
        });

        return user.json();
    }

    async login() {
        const url = apiUrl + '/user/login';

        const user = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: headers
        })
        
        const result = await user.json();

        if (result && result.success && result.token) {
            localStorage.setItem('token', result.token);
        }

        return result;
    }

    static async fetchWithToken(endpoint, options = {}) {
        const token = localStorage.getItem('token');

        const headers = {
            'Content-Type': 'application/json',
            ...options.headers
        };

        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(apiUrl + endpoint, {...options, headers});

        return response.json();
    }
}

export default User;
