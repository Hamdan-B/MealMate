"use client";
import React, { useState } from "react";
import { loginUser } from "@/lib/auth";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";

const UserLogin = () => {
  const [mailTxt, setMailTxt] = useState("");
  const [passTxt, setPassTxt] = useState("");
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("HandleLogin");

    try {
      const user = await loginUser(mailTxt, passTxt);
      router.push("/");
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };

  return (
    <>
      <div>
        <Navbar />
        {/* Login FORM */}
        <form onSubmit={handleLogin}>
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
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    </>
  );
};

export default UserLogin;
