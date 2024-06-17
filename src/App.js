// import { getDatabase, ref, set } from "firebase/database";
import { createUserWithEmailAndPassword, getAuth, signOut } from "firebase/auth";
import { app } from "./firebase";
import "./App.css";
import SignUp from "./components/SignUp";
import SignIn from "./components/SignIn";
import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";

// const db = getDatabase(app);
const auth = getAuth(app);

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
      <button onClick={() => signOut(auth)}>Logout</button>
    </div>
  );
}

export default App;
