// test suite
//import user_model from './user_model';

//const user_model = require('./data-access/user_model')
import { createUserPasswordData, } from "./data-access/user_model";
test('Testing creating user data', async () => {
    expect(await createUserPasswordData("testUser", "testUser@gmail.com", "testPassword")).toBe(!null);
  });
  

