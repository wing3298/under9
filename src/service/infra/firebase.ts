import {
  collection,
  getDocs,
  getDoc,
  doc,
  getFirestore,
  query
} from "firebase/firestore/lite";
import { getAuth, signInAnonymously } from "firebase/auth";
import { firebaseApp } from "./initFirebase";
import { getFunctions, httpsCallable } from 'firebase/functions';

const authAnonymouse = () => {
  const auth = getAuth();
  signInAnonymously(auth)
    .then(() => {
      // Signed in..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // ...
    });
};
authAnonymouse();

//-------------------------------------------------------------------------
//Firebase Firestore
//-------------------------------------------------------------------------

const readDocList = async (targetCollection) => {
  try {
    const db = getFirestore(firebaseApp);
    const querySnapshot = await getDocs(collection(db, targetCollection));
    const result = querySnapshot.docs.map(doc => doc.data())
    //console.log(result);
    return result;
  }
  catch (error) {
    console.log(error);
  }
};

const readDoc = async (targetCollection) => {
  try {
    const db = getFirestore(firebaseApp);
    const result = await getDoc(doc(db, targetCollection));
    //console.log(result);
    return result;
  }
  catch (error) {
    console.log(error);
  }
};


//-------------------------------------------------------------------------
//Firebase Functions
//-------------------------------------------------------------------------
const functions = getFunctions(firebaseApp);
const callFunctions = (methodName: string, params: Object): any => {
  try {
    const result = httpsCallable(functions, methodName);
    return result(params);
  }
  catch (error) {

  }
};

export { readDocList, readDoc, callFunctions };
