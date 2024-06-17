import { createContext, useContext, useEffect, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { getDatabase, set, ref, get, child, onValue } from "firebase/database";

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

  // get(child(ref(database), "grandfather/father")).then((snapshot) => {
  //   console.log(snapshot.val());
  // });

  const [name, setname] = useState("");

  useEffect(() => {
    return () => {
      onValue(ref(database, "grandfather/father/child"), (snapshot) => {
        console.log(snapshot.val().name);
        setname(snapshot.val().name);
      });
    };
  }, []);

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
      <h1>name is {name}</h1>
      {props.children}
    </FirebaseContext.Provider>
  );
};
