import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/Firebase";

export const signUp = async (email, password, setError, setEmail, setIsAccount) => {
createUserWithEmailAndPassword(auth, email, password)
  .then((userCredential) => {
    const user = userCredential.user;
    setEmail('');
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
}
