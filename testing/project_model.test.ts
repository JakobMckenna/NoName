import {createProject} from "../backend/data-access/project_model"
import {createUserPasswordData} from "../backend/data-access/user_model"

let userID: number | undefined
const newUser = createUserPasswordData("ProjectUser", "PU@gmail.com", "Pass")
//userID = newUser?.id

test('project created', async () => {
    let data1 = null
    if(userID !== undefined){
        data1 = await createProject("Project test", 48);
    }
    expect(data1?.name).toBe("Project test");
  });

  test('project 2 created', async () => {
    let data2 = null
    if(userID !== undefined){
        data2 = await createProject("Project test 2", 48);
    }
    expect(data2?.name).toBe("Project test 2");
  });