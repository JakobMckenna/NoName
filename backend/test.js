// test suite
// npm install jest -save-dev
testsPassed = 0;
console.log("Running tests")
//test creating a user 
//doesnt work yet, need to access outside files
userData = createUserPassWordData("testUser", "testUser@gmail.com", "testPassword")
if(userData != null){
    testsPassed++;
    console.log("Test passed, user data is: " + userData)

} else {
    console.log("Failed to create a user")
}