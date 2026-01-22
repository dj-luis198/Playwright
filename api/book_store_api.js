export class BookStoreAPI {
    constructor(request) {
        this.request = request;
    }

    async getBooks() {
        return await this.request.get('/BookStore/v1/Books');
    }
    async getBook(isbn) {
        return await this.request.get(`/BookStore/v1/Book?ISBN=${isbn}`);
    }

    async addBooksToUser(userId, token, collectionOfIsbns) {
        return await this.request.post('/BookStore/v1/Books', {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                userId: userId,
                collectionOfIsbns: collectionOfIsbns
            }
        });
    }
    async deleteBookFromUser(userId, isbn, token) {
        return await this.request.delete('/BookStore/v1/Book', {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                isbn: isbn,
                userId: userId
            }
        });
    }

    async clearUserBooks(userId, token) {
        return await this.request.delete(`/BookStore/v1/Books?UserId=${userId}`, {
            headers: { Authorization: `Bearer ${token}` }
        });
    }


    async updateUserBooks(userId, token, isbn, replaceIsbn) {
        return await this.request.put(`/BookStore/v1/Books/${isbn}`, {
            headers: { Authorization: `Bearer ${token}` },
            data: {
                userId: userId,
                isbn: replaceIsbn
            }
        });
    }

}