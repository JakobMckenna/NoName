//import user_model from './backend/user_model';
// test suite
// npm install jest -save-dev

const user_model = require('./user_model')

test('Testing creating user data', () => {
    expect(createUserPassWordData("testUser", "testUser@gmail.com", "testPassword")).toBe(!null);
  });







//test creating a user 
//doesnt work yet, need to access outside files
/*userData = createUserPassWordData("testUser", "testUser@gmail.com", "testPassword")
if(userData != null){
    testsPassed++;
    console.log("Test passed, user data is: " + userData)

} else {
    console.log("Failed to create a user")
}/*/