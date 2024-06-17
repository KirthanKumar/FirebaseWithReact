import React, { useState } from "react";
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import { app } from "../firebase";
const auth = getAuth(app);

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupUser = () => {
    createUserWithEmailAndPassword(auth, email, password).then((value) => {
      console.log(value);
      alert("success");
    });
  };

  return (
    <div className="signup-page">
      <label htmlFor="">Email</label>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        type="email"
        name=""
        id=""
        required
        placeholder="Enter emial"
      />

      <label htmlFor="">Password</label>
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        type="passwprd"
        name=""
        id=""
        required
        placeholder="Enter password"
      />
      <button onClick={signupUser}>SignUp</button>
    </div>
  );
}

export default SignUp;
