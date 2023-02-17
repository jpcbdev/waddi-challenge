import request from 'supertest';
import { app } from '../src/main';
import { config } from 'dotenv'; config();

import { uid } from 'uid';

let token = null;

/** Users tests */
describe('POST /users/signing', () => {
    it('should return a signing token', async () => {
        const res = await request(await app)
            .post('/users/signing').send({ username: 'admin', password: 'admin' });
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('token');
        if (res.body?.token) token = res.body?.token;
    });
});

describe('POST /users/create', () => {
    it('should create an user', async () => {
        const value = uid();
        const res = await request(await app)
            .post('/users/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: value,
                username: value,
                password: value,
                role: 'user',
                permissions: ['update']
            });
        expect(res.status).toBe(200);
    });
});

describe('GET /users/get', () => {
    it('should get all users', async () => {
        const value = uid();
        const res = await request(await app)
            .get('/users/get')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
    });
});

describe('PUT /users/update/one', () => {
    it('should update an user', async () => {
        const value = uid();
        const res = await request(await app)
            .put('/users/update/one')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 1,
                name: value,
                password: value,
                permissions: ['update', 'read_write']
            });
        expect(res.status).toBe(200);
    });
});

describe('DELETE /users/delete/one', () => {
    it('should delete an user', async () => {
        const res = await request(await app)
            .delete('/users/delete/one')
            .set('Authorization', `Bearer ${token}`)
            .send({ id: 2 });
        expect(res.status).toBe(200);
    });
});

/** Posts tests */
describe('POST /posts/create', () => {
    it('should create a post', async () => {
        const res = await request(await app)
            .post('/posts/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: 'The last of us is awesome',
                content: 'The last us is the best TV show in America!'
            });
        expect(res.status).toBe(200);
    });
});

describe('GET /posts/get', () => {
    it('should get all posts', async () => {
        const res = await request(await app)
            .get('/posts/get')
        expect(res.status).toBe(200);
    });
});

describe('PUT /posts/update', () => {
    it('should update a post', async () => {
        const res = await request(await app)
            .put('/posts/update/one')
            .set('Authorization', `Bearer ${token}`)
            .send({
                id: 3,
                title: 'The last of us is awesome edited',
                content: 'The last us is the best TV show in America! edited'
            });
        expect(res.status).toBe(200);
    });
});

/** Reviews tests */
describe('POST /reviews/create', () => {
    it('should create a review', async () => {
        const res = await request(await app)
            .post('/reviews/create')
            .send({
                postId: 1,
                stars: 4,
                comment: 'Amazing post!'
            });
        expect(res.status).toBe(200);
    });
});

describe('POST /reviews/get', () => {
    it('should get all reviews by post id', async () => {
        const res = await request(await app)
            .post('/reviews/get')
            .send({
                postId: 1,
            });
        expect(res.status).toBe(200);
    });
});

/** Logs tests */
describe('GET /logs/get', () => {
    it('should get all logs', async () => {
        const res = await request(await app)
            .get('/logs/get')
            .set('Authorization', `Bearer ${token}`)
        expect(res.status).toBe(200);
    });
});
