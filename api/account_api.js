export class AccountAPI {
    constructor(request) {
        this.request = request;
    }

    async createUser(userName, password) {
        return await this.request.post('/Account/v1/User', {
            data: {
                userName: userName,
                password: password
            }
        });
    }

    async authorize(userName, password) {
        return await this.request.post('/Account/v1/Authorized', {
            data: {
                userName: userName,
                password: password
            }
        });
    }

    async generateToken(userName, password) {
        return await this.request.post('/Account/v1/GenerateToken', {
            data: {
                userName: userName,
                password: password
            }
        });
    }

    async deleteUser(userId, token) {
        return await this.request.delete(`/Account/v1/User/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }

    async getUser(userId, token) {
        return await this.request.get(`/Account/v1/User/${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }
}