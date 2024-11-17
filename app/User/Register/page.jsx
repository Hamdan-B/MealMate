"use client";
import React, { useState } from "react";
import { registerUser } from "@/lib/auth";
import Navbar from "@/app/components/navbar";

const UserRegistration = () => {
  const [mailTxt, setMailTxt] = useState("");
  const [passTxt, setPassTxt] = useState("");
  const [fNameTxt, setFNameTxt] = useState("");
  const [lNameTxt, setLNameTxt] = useState("");

  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("HandleRegFunction");

    try {
      const user = await registerUser(mailTxt, passTxt, fNameTxt, lNameTxt);
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div>
        <Navbar />
        {/* Registration FORM */}
        <form onSubmit={handleRegistration}>
          <label>
            First Name
            <input
              type="text"
              value={fNameTxt}
              onChange={(e) => setFNameTxt(e.target.value)}
            />
          </label>
          <br />
          <label>
            Last Name
            <input
              type="text"
              value={lNameTxt}
              onChange={(e) => setLNameTxt(e.target.value)}
            />
          </label>
          <br />
          <label>
            Email
            <input
              type="email"
              value={mailTxt}
              onChange={(e) => setMailTxt(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password
            <input
              type="password"
              value={passTxt}
              onChange={(e) => setPassTxt(e.target.value)}
            />
          </label>
          <br />
          <button type="submit">Register</button>
        </form>
      </div>
    </>
  );
};

export default UserRegistration;
