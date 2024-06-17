// import { getDatabase, ref, set } from "firebase/database";
import {
  createUserWithEmailAndPassword,
  getAuth,
  signOut,
} from "firebase/auth";
import { app } from "./firebase";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

import {
  getFirestore,
  collection,
  addDoc,
  doc,
  getDoc,
  query,
  where,
  getDocs,
  updateDoc
} from "firebase/firestore";

// const db = getDatabase(app);
const auth = getAuth(app);

const firestore = getFirestore(app);

function App() {
  // const putData = () => {
  //   set(ref(db, "users/kirthan"), {
  //     id: 1,
  //     name: "kirthan",
  //     age: 21,
  //   });
  // };

  // const signupUser = () => {
  //   createUserWithEmailAndPassword(
  //     auth,
  //     "kirthankumar176@gmail.com",
  //     "kirthan"
  //   ).then((value) => {
  //     console.log(value);
  //   });
  // };

  const [user, setUser] = useState(null);

  const writeData = async () => {
    const result = await addDoc(collection(firestore, "cities"), {
      name: "Delhi",
      pinCode: 1234,
      lat: 123,
      lon: 456,
    });

    console.log("Result: ", result);
  };

  const makeSubCollection = async () => {
    await addDoc(collection(firestore, "cities/isOguMluvmmgf1rz0WGv/place"), {
      name: "This is a place 2",
      desc: "Awsome",
      date: Date.now(),
    });
  };

  const getDocument = async () => {
    const ref = doc(firestore, "cities", "isOguMluvmmgf1rz0WGv");
    const snap = await getDoc(ref);

    console.log(snap.data());
  };

  const getDocumentsByQuery = async () => {
    const collectionref = collection(firestore, "users");
    const q = query(collectionref, where("isMale", "==", "true"));
    const snapshot = await getDocs(q);
    snapshot.forEach((data) => console.log(data.data()));
  };

  const update = async () => {
    const docRef = doc(firestore, "cities", "isOguMluvmmgf1rz0WGv");
    await updateDoc(docRef, {
      name: 'New Delhi',
    })
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        console.log("You are logged out");
        setUser(null);
      }
    });
  }, []);

  if (user === null) {
    return (
      <div className="App">
        {/* <h1>Firebase React App</h1> */}
        {/* <button onClick={putData}>Put Data</button> */}
        {/* <button onClick={signupUser}>Create User</button> */}
        <SignUp />
        <SignIn />
      </div>
    );
  }

  return (
    <div className="App">
      <h1>Hello {user.email}</h1>
      <button onClick={writeData}>Put Data</button>
      <button onClick={makeSubCollection}>Put Sub Data</button>
      <button onClick={getDocument}>get doc</button>
      <button onClick={getDocumentsByQuery}>getDocumentsByQuery</button>
      <button onClick={update}>update</button>

      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default App;
