import {createUserPasswordData, deleteUserByID, getUserProjects, getUserPassword} from "../backend/data-access/user_model"
import {createProject, getProject, updateProject, removeProject, getAllProjects, removeProjectMember, addProjectMember, getProjectMembers} from "../backend/data-access/project_model"
import {getRepo, createRepo, updateRepo} from "../backend/data-access/repo_model"
import {getAllMessages, saveMessage, deleteMessage, } from "../backend/data-access/chat_model"
import {getSprint, getSprints, createSprint, removeSprint, updateSprint} from "../backend/data-access/sprint_model"

test('Create and delete user', async () => {
    let userID: number | undefined
    const data1 = await createUserPasswordData("test user 1","test1@email.com","testpass");
    userID = data1?.id
    expect(data1?.email).toBe("test1@email.com");

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });

  test('Create and delete user, and get user information', async () => {
    let userID: number | undefined
    const data1 = await createUserPasswordData("test user 124","test124@email.com","testpass24");
    userID = data1?.id
    expect(data1?.email).toBe("test124@email.com");

    const data5 = await getUserPassword("test124@email.com");
    expect(data5?.userPassword?.password).toBe("testpass24");

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });

  test('Make project and get users project', async () => {
    let userID: number | undefined
    let projID: string | undefined

    const data1 = await createUserPasswordData("test user 1241","test1241@email.com","testpass241");
    userID = data1?.id
    expect(data1?.email).toBe("test1241@email.com");

    const data5 = await getUserPassword("test1241@email.com");
    expect(data5?.userPassword?.password).toBe("testpass241");

    let data6 = null
        if(userID !== undefined){
            data6 = await createProject("Project tester", userID);
        }
        projID = data6?.id
        expect(data6?.name).toBe("Project tester");

    let data7 = null
    if(projID !== undefined){
        data7 = await removeProject(projID);
    }
    if(projID !== undefined){
      data7 = await getProject(projID);
  }
    expect(data7?.name).toBe(undefined);

    let data2 = null
    if(userID !== undefined){
        data2 = await deleteUserByID(userID);
      }
      expect(data2).toBeNull();
  });


  let userID1: number | undefined
  let projID1: string | undefined
  let repoID1: string | undefined
  let sprintID1: string | undefined

  test('Make project and add a repo', async () => {
    

    const data1 = await createUserPasswordData("test user 11241","1test1241@email.com","1testpass241");
    userID1 = data1?.id
    expect(data1?.email).toBe("1test1241@email.com");

        let data6 = null
        if(userID1 !== undefined){
            data6 = await createProject("Project tester 2", userID1);
        }
        projID1 = data6?.id
        expect(data6?.name).toBe("Project tester 2");

          let data51 = null
          if(projID1 !== undefined){
              data51 = await createRepo(projID1, "JakobMcKenna","webScapingTutorial");
          }
          expect(data51).toBeTruthy();
      

          let data61 = null
          if(projID1 !== undefined){
              data61 = await getRepo(projID1);
          }
          repoID1 = data61?.id
          expect(data61).toBeTruthy();
   
  

          let data71 = null
          if(projID1 !== undefined && repoID1 !== undefined){
              data71 = await updateRepo(repoID1, projID1, "JakobMcKenna", "NoNameExists");
          }
          expect(data71).toBeNull();
  });

  test('Get all messages (none added)', async () => {
      let msg = null
      if(projID1 !== undefined){
         const msg = await getAllMessages(projID1);
      }
      expect(msg).toBeNull()
 

    if(projID1 !== undefined && userID1 !== undefined){
        let msg1 = await saveMessage("Hello", projID1, userID1);
        expect(msg1).toBeTruthy()  
    } 
      
    if(projID1 !== undefined && userID1 !== undefined){
        let msg1 = await saveMessage("Hello", projID1, userID1);
        expect(msg1).toBeTruthy()  
    } 
      
    if(projID1 !== undefined){
        let msg2 = await getAllMessages(projID1);
        expect(msg2).toBeTruthy()
    }
   
    if(projID1 !== undefined){
        let msg2 = await getAllMessages(projID1);
        expect(msg2).toBeTruthy()
    }
   
    if(projID1 !== undefined){
        let msg3 = await deleteMessage(projID1);
        expect(msg3).toBeNull()
    }
  });


  test('Sprint testing', async () => {
    let data6 = null
    if(projID1 !== undefined){
        data6 = await createSprint(projID1, "Sprint 1", "2023-10-20T06:20:11.963Z", "2023-10-20T06:20:11.963Z");
    }
    //sprints1 = data6
    sprintID1 = data6?.id
    expect(data6).toBeTruthy();


  
    let data4 = null
   if(sprintID1 !== undefined){
     data4 = await getSprint(sprintID1);
   }
   expect(data4).toBeTruthy();



    let data41 = null
   if(sprintID1 !== undefined && projID1 !== undefined){
     data41 = await updateSprint(sprintID1, projID1, "new name", "2023-10-20T06:20:11.963Z", "2023-10-20T06:20:11.963Z");
   }
   expect(data41?.name).toBe("new name");
   expect(data41?.projectID).toBe(projID1);
  });



  test('Delete all info', async () => {
    let data7 = null
    if(projID1 !== undefined){
        data7 = await removeProject(projID1);
    }
    if(projID1 !== undefined){
      data7 = await getProject(projID1);
  }
    expect(data7?.name).toBe(undefined);

    let data2 = null
    if(userID1 !== undefined){
        data2 = await deleteUserByID(userID1);
      }
      expect(data2).toBeNull();
  });


 