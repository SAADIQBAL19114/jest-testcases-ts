import request from 'supertest';
import db from '../src/models';
import app from '../src/app';

afterAll(async () => {
  await db.sequelize.close();
});

describe('Get all posts', () => {
  it('Should return array of post.', async () => {
    let res = await request(app).get('/post');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});

describe('Get post with user', () => {
  test('Should return the object of ost of the given id.', async () => {
    let res = await request(app).get('/post/post-with-user');
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
  });
});

describe('Create a post', () => {
  it('should return a success message when a post is created', async () => {
    let res = await request(app).post('/post').send({
      body: 'this is body',
      userUuid: '7bf6ee45-f804-472e-a9c7-5e6612f74fce',
    });
    expect(res.status).toBe(201);
  });
});

describe('Update post details for the given uuid', () => {
  it('should return a success message when a post is updated', async () => {
    let res = await request(app)
      .put('/post/id/64abb336-4a72-4b9d-ad79-0a873bf15933')
      .send({
        body: 'this is body',
        userId: 1,
      });
    expect(res.status).toBe(200);
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app)
      .put('/post/id/12a3dbb0-ad7a-472c-9db7-2fa89a8f2415')
      .send({
        body: 'this is body',
        userId: 1,
      });
    expect(res.status).toBe(400);
  });
});

describe('Delete the post record for given id', () => {
  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app).delete(
      '/post/id/95f93b16-c481-4589-ba0b-3267dd1b2d50',
    );
    expect(res.status).toBe(404);
  });
});
