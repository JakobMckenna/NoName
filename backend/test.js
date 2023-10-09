//import user_model from './backend/user_model';
// test suite
// npm install jest -save-dev

const user_model = require('./user_model')

test('Testing creating user data', () => {
    expect(createUserPassWordData("testUser", "testUser@gmail.com", "testPassword")).toBe(!null);
  });

