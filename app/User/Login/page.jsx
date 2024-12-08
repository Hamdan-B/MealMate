"use client";
import React, { useState } from "react";
import { loginUser, registerUser } from "@/lib/auth";
import Navbar from "@/app/components/navbar";
import { useRouter } from "next/navigation";
import styles from "./login.module.css";

const UserLogin = () => {
  //Login UseStates
  const [mailTxt, setMailTxt] = useState("");
  const [passTxt, setPassTxt] = useState("");

  //Registeration UseStates
  const [regMailTxt, setregMailTxt] = useState("");
  const [regPassTxt, setregPassTxt] = useState("");
  const [fNameTxt, setFNameTxt] = useState("");

  const [loading, setLoading] = useState(false);
  const [toggle, setToggle] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  function handleToggle() {
    setToggle((prev) => !prev);
  }

  //Login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    console.log("HandleLogin");

    try {
      setLoading(true);
      const user = await loginUser(mailTxt, passTxt);
      router.push("/");
    } catch (err) {
      setError("Invalid Email or Password");
    }
  };
  //Register
  const handleRegistration = async (e) => {
    e.preventDefault();
    console.log("HandleRegFunction");

    try {
      setLoading(true);
      const user = await registerUser(regMailTxt, regPassTxt, fNameTxt);
      router.push("/");
      console.log(user);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Navbar />
      {/* Login FORM */}
      <div className={styles.mainformCont}>
        {loading && <div className={styles.loader}></div>}
        {!loading && (
          <div className={styles.Cont}>
            <div
              className={`${styles.belowCont} ${toggle ? styles.rotClass : ""}`}
              id="thatDiv"
            >
              <div
                className={
                  styles.formCont +
                  " " +
                  styles.SignIn +
                  " " +
                  styles.inputStuff
                }
              >
                <div className={styles.heading}>
                  <h1>LOGIN</h1>
                </div>
                <div>
                  <form>
                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={mailTxt}
                      onChange={(e) => setMailTxt(e.target.value)}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={passTxt}
                      onChange={(e) => setPassTxt(e.target.value)}
                    />
                  </form>
                </div>
                <div>
                  <button type="button" onClick={handleLogin}>
                    Login!
                  </button>
                </div>
                <p className={styles.bottomStuff}>
                  Don't have an account yet?{" "}
                  <span onClick={handleToggle}>Register</span>
                </p>
              </div>
              <div
                className={
                  styles.formCont +
                  " " +
                  styles.SignUp +
                  " " +
                  styles.inputStuff
                }
              >
                <div className={styles.heading}>
                  <h1>REGISTRATION</h1>
                </div>
                <div>
                  <form>
                    <input
                      type="text"
                      name="name"
                      placeholder="Full Name"
                      value={fNameTxt}
                      onChange={(e) => setFNameTxt(e.target.value)}
                    />

                    <input
                      type="email"
                      name="email"
                      placeholder="Email"
                      value={regMailTxt}
                      onChange={(e) => setregMailTxt(e.target.value)}
                    />
                    <input
                      type="password"
                      name="password"
                      placeholder="Password"
                      value={regPassTxt}
                      onChange={(e) => setregPassTxt(e.target.value)}
                    />
                  </form>
                </div>
                <div>
                  <button type="button" onClick={handleRegistration}>
                    Register!
                  </button>
                </div>
                <p className={styles.bottomStuff}>
                  Already have an account?{" "}
                  <span onClick={handleToggle}>Login</span>
                </p>
              </div>
            </div>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
      <div className={styles.mainSVG}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
          <path
            fill="#ff952d"
            fillOpacity="1"
            d="M0,256L12.6,213.3C25.3,171,51,85,76,85.3C101.1,85,126,171,152,213.3C176.8,256,202,256,227,218.7C252.6,181,278,107,303,106.7C328.4,107,354,181,379,181.3C404.2,181,429,107,455,85.3C480,64,505,96,531,133.3C555.8,171,581,213,606,197.3C631.6,181,657,107,682,106.7C707.4,107,733,181,758,208C783.2,235,808,213,834,181.3C858.9,149,884,107,909,96C934.7,85,960,107,985,144C1010.5,181,1036,235,1061,234.7C1086.3,235,1112,181,1137,186.7C1162.1,192,1187,256,1213,240C1237.9,224,1263,128,1288,117.3C1313.7,107,1339,181,1364,213.3C1389.5,245,1415,235,1427,229.3L1440,224L1440,0L1427.4,0C1414.7,0,1389,0,1364,0C1338.9,0,1314,0,1288,0C1263.2,0,1238,0,1213,0C1187.4,0,1162,0,1137,0C1111.6,0,1086,0,1061,0C1035.8,0,1011,0,985,0C960,0,935,0,909,0C884.2,0,859,0,834,0C808.4,0,783,0,758,0C732.6,0,707,0,682,0C656.8,0,632,0,606,0C581.1,0,556,0,531,0C505.3,0,480,0,455,0C429.5,0,404,0,379,0C353.7,0,328,0,303,0C277.9,0,253,0,227,0C202.1,0,177,0,152,0C126.3,0,101,0,76,0C50.5,0,25,0,13,0L0,0Z"
          ></path>
        </svg>
      </div>
    </>
  );
};

export default UserLogin;
