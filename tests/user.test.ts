import request from 'supertest';
import db from '../src/models';
import app from '../src/app';

afterAll(async () => {
  await db.sequelize.close();
});

describe('Get all users', () => {
  it('Should return array of users.', async () => {
    let res = await request(app).get('/user');
    expect(res.status).toBe(200);
    expect(res.body.length).toBeGreaterThanOrEqual(0);
    expect(Array.isArray(res.body)).toBeTruthy();
  });
});



describe('Get User by id', () => {
  test('Should return the object of users of the given id.', async () => {
    let res = await request(app).get(
      '/user/id/7bf6ee45-f804-472e-a9c7-5e6612f74fce',
    );
    expect(res.status).toBe(200);
    expect(typeof res.body).toBe('object');
    expect(res.body.uuid).toBe('7bf6ee45-f804-472e-a9c7-5e6612f74fce');
    expect(Object.keys(res.body).length).toBe(7);
  });

  it("Should return error if uuid doesn't exist.", async () => {
    let res = await request(app).get(
      '/user/id/aad16615-9f86-41ce-824f-9ed9cf5eec02',
    );
    expect(res.status).toBe(404);
    expect(res.error).toEqual(expect.any(Error));
  });
});

describe('Create a user', () => {
  it('should return a success message when a user is created', async () => {
    let res = await request(app).post('/user').send({
      name: 'saad',
      email: 'saad@gmail.com',
      role: 'student',
    });
    expect(res.status).toBe(201);
  });

  it('should return an error if required field is missing', async () => {
    let res = await request(app).post('/user').send({
      // name: '',
      email: 'saad@gmail.com',
      role: 'student',
    });
    expect(res.status).toBe(422);
    expect(res.error).toEqual(expect.any(Error));
  });
  it("Should return error if any field's type is not correct.", async () => {
    let res = await request(app).post('/user').send({
      name: 123,
      email: 'saad@gmail.com',
      role: 'student',
    });
    expect(res.status).toBe(422);
    expect(res.error).toEqual(expect.any(Error));
  });
});

describe('Update user details for the given uuid', () => {
  it('should return a success message when a record is updated', async () => {
    let res = await request(app)
      .put('/user/id/7bf6ee45-f804-472e-a9c7-5e6612f74fce')
      .send({
        name: 'iqbal',
        email: 'saad@gmail.com',
        role: 'student',
      });
    expect(res.status).toBe(201);
  });

  it("Should return error if id doesn't exist in records.", async () => {
    let res = await request(app)
      .put('/user/id/95f93b16-c481-4589-ba0b-3267dd1b2d50')
      .send({
        name: 'iqbal',
        email: 'saad@gmail.com',
        role: 'student',
      });
    expect(res.status).toBe(400);
  });
});

describe('Delete the user record for given id', () => {
  it("Should return error if id doesn't exist.", async () => {
    let res = await request(app).delete(
      '/user/id/95f93b16-c481-4589-ba0b-3267dd1b2d50',
    );
    expect(res.status).toBe(404);
  });
});
