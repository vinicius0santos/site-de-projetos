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
                headers: headers,
                credentials: 'include'
            })

            const result = await user.json();

            if (result && result.success) {
                localStorage.setItem('userId', result.data.id);
                localStorage.setItem('username', result.data.username);
            }

            return result;
        }
        catch (err) {
            return { 
                success: false,
            }
        }
    }

    static async logout() {
        const url = apiUrl + '/user/logout';

        try{
            const response = await fetch(url, {
                method: 'POST',
                headers: headers,
                credentials: 'include'
            });
            
            const result = await response.json();
            
            if(result.success){
                localStorage.removeItem('userId');
                localStorage.removeItem('username');
                localStorage.removeItem('currentProject');

                return result;
            }
            else throw new Error('Não foi possível deslogar');
        }
        catch(err){
            return {
                success: false
            }
        }
    }
}

export default User;
