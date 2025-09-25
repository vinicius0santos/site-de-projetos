let apiUrl = 'http://localhost:3000';

class User {
    #headers = {
        'Content-Type': 'application/json'
    };

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
            headers: this.#headers
        });

        return await user.json();
    }

    async login() {
        const url = apiUrl + '/user/login';

        const user = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(this.data),
            headers: this.#headers
        })

        return user.json();
    }
}