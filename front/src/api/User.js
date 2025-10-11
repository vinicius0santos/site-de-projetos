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

        try {
            const user = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.data),
                headers: headers
            });

            return user.json();
        }
        catch (err) {
            return { 
                success: false,
                serverError: true, 
            }
        }
    }

    async login() {
        const url = apiUrl + '/user/login';

        try {
            const user = await fetch(url, {
                method: 'POST',
                body: JSON.stringify(this.data),
                headers: headers
            })

            const result = await user.json();

            if (result && result.success && result.token) {
                localStorage.setItem('token', result.token);
                localStorage.setItem('userId', result.data.id);
                localStorage.setItem('username', result.data.username);
            }

            return result;
        }
        catch (err) {
            return { 
                success: false,
                serverError: true, 
            }
        }
    }
}

export default User;
