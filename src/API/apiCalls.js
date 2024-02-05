import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged
} from "firebase/auth";
import { auth, db } from "../Firebase/Firebase";
import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
  getDoc,
  setDoc,
} from "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

export const signUp = async (
  email,
  password,
  setError,
  setEmail,
  setIsAccount
) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      // setEmail('');/
      setIsAccount(true);
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
      // ..
    });
};

export const signIn = async (
  email,
  password,
  setError,
  setEmail,
  setIsAccount
) => {
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      setEmail("");
      setIsAccount(true);
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      setError(errorMessage);
    });
};

export const createTeam = async (
  teamName,
  teamLeadId,
  setHasTeam,
  setTeamId
) => {
  const teamId = uuidv4();
  try {
    const teamRef = await setDoc(doc(db, "teams", teamId), {
      name: teamName,
      teamdLead: teamLeadId,
      members: [{ member: teamLeadId, accepted: true }],
      id: teamId,
    });

    const memberRef = await setDoc(doc(db, "teamMember", teamLeadId), {
      email: teamLeadId,
      teams: [{ name: teamName, id: teamId, accepted: true }],
      name: teamName,
    });

    setHasTeam(true);
    setTeamId(teamId);
    return teamRef;
  } catch (error) {
    console.error("Error creating team:", error.message);
    throw error;
  }
};

export const addTeamMember = async (
  teamId,
  memberEmail,
  setEmail,
  teamName
) => {
  try {
    const teamDocRef = doc(db, "teams", teamId);
    const teamDoc = await getDoc(teamDocRef);
    if (!teamDoc.exists()) {
      throw new Error("Team not found");
    } else {
      const isMemberAlreadyAdded = await teamDoc.data().members.some(member => member.member === memberEmail);
      if (isMemberAlreadyAdded) {
        alert("Member is already part of the team");
        return; 
      } else {
        const teamMemberDocRef = doc(db, "teamMember", memberEmail);
      const teamMemberDoc = await getDoc(teamMemberDocRef);
      if (!teamMemberDoc.exists()) {
        const memberRef = await setDoc(doc(db, "teamMember", memberEmail), {
          email: memberEmail,
          teams: [{ name: teamName, id: teamId, accepted: false }],
          name: teamName,
        });
      } else {
        const isMemberAlreadyInvite = await teamMemberDoc
          .data()
          .teams.includes(teamId);
        if (isMemberAlreadyInvite) {
          alert("Member is already part of the team");
          return; 
        }
        await updateDoc(teamMemberDocRef, {
          teams: [
            ...teamMemberDoc.data().teams,
            { name: teamName, id: teamId, accepted: false },
          ],
        });
      }

      }
      
      await updateDoc(teamDocRef, {
        members: [
          ...teamDoc.data().members,
          { member: memberEmail, accepted: false },
        ],
      });

      setEmail("");
    }
  } catch (error) {
    console.error("Error adding team member:", error.message);
    throw error;
  }
};

// I added this function to appli the Task creation
export const createTask = async (
  teamId,
  taskName,
  dateTime,
  priority,
  assignedTo,
  createdBy
) => {
  try {
    // const teamDocRef = doc(db, "teams", teamId);
    // const teamDoc = await getDoc(teamDocRef);
    // if (!teamDoc.exists()) {
    //   throw new Error("Team not found");
    // }

    const taskId = uuidv4();
    const taskDocRef = doc(db, 'tasks', taskId);

    await setDoc(taskDocRef, {
      id: taskId,
      createdBy: createdBy,
      name: taskName,
      createdDate: new Date(),
      dueDate: new Date(dateTime),
      assignedTo: assignedTo,
      status: "BACKLOG",
      priority:priority,
      teamId:teamId
    });

    const teamDocRef = doc(db, 'teams', teamId);
    const teamDoc = await getDoc(teamDocRef);

    if (!teamDoc.exists()) {
      throw new Error('Team not found');
    }

    await updateDoc(teamDocRef, {
      tasks: [...teamDoc.data().tasks, taskId],
    });
  } catch (error) {
    console.error('Error creating task:', error.message);
    throw error;
  }
};


export const getCurrentUser = async (setUser) => {
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      const uid = user.uid;

      setUser(user.email)
      console.log(user)
      // ...
    } else {
      // User is signed out
      // ...
    }
  });
};






// Add a create standup function
export const createStandup = async (
  teamId,
  standupName,
  description,
  assignedTo,
  dateTime,
  createdBy
) => {
  try {
    const standupId = uuidv4();
    const standupDocRef = doc(db, "standups", standupId);

    await setDoc(standupDocRef, {
      id: standupId,
      createdBy: createdBy,
      name: standupName,
      description: description,
      assignedTo: assignedTo,
      dueDate: new Date(dateTime),
      status: "IN_PROGRESS",
    });

    const teamDocRef = doc(db, "teams", teamId);
    const teamDoc = await getDoc(teamDocRef);

    if (!teamDoc.exists()) {
      throw new Error("Team not found");
    }

    await updateDoc(teamDocRef, {
      standups: [...teamDoc.data().standups, standupId],
    });
  } catch (error) {
    console.error("Error creating standup:", error.message);
    throw error;
  }
};


