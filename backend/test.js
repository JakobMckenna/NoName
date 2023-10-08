// test suite
testsPassed = 0;
console.log("Running tests")
//test creating a user 
userData = createUserPassWordData("testUser", "testUser@gmail.com", "testPassword")
if(userData != null){
    testsPassed++;
    console.log("Test passed, user data is: " + userData)

} else {
    console.log("Failed to create a user")
}