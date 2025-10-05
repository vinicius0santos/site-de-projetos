import { apiUrl, headers } from "../global";

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
        console.log(result.data)

        if (result && result.success && result.token) {
            localStorage.setItem('token', result.token);
            localStorage.setItem('userId', result.data.id);
        }

        return result;
    }
}

export default User;
