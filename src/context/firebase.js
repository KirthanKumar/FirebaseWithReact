import { createContext, useContext } from "react";
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase, set, ref } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBqcr4W_g1NVoTN_8RCcSJD1Ztf1CA66Z4",
  authDomain: "app-ed7d9.firebaseapp.com",
  projectId: "app-ed7d9",
  storageBucket: "app-ed7d9.appspot.com",
  messagingSenderId: "687106026567",
  appId: "1:687106026567:web:06df16e951030f38f99562",
  databaseURL: "https://app-ed7d9-default-rtdb.firebaseio.com",
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseAuth = getAuth(firebaseApp);
const database = getDatabase(firebaseApp);

const FirebaseContext = createContext(null);

// custom hook
export const useFirebase = () => useContext(FirebaseContext);

export const FirebaseProvider = (props) => {
  const signUpUserWithEmailAndPassword = (email, password) => {
    return createUserWithEmailAndPassword(firebaseAuth, email, password);
  };

  const putData = (key, data) => set(ref(database, key), data);

  const signInUser = async (email, password) => {
    return await signInWithEmailAndPassword(firebaseAuth, email, password)
      .then((value) => {
        console.log(value);
        alert("success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <FirebaseContext.Provider
      value={{ signUpUserWithEmailAndPassword, putData, signInUser }}
    >
      {props.children}
    </FirebaseContext.Provider>
  );
};
