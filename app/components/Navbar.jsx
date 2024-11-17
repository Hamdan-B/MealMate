"use client";

import styles from "./navbar.module.css";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";

export default function Navbar() {
  const [user, userLoading, userError] = useAuthState(auth);
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const loadingHandler = () => {
    setLoading(true);
    console.log("Loading: ", loading);
  };

  return (
    <>
      {loading && <Loading />}
      <div className={styles.navbar}>
        <h1 className={styles.logo}>MealMate</h1>
        <ul>
          <li>{pathname === "/" ? <p>Home</p> : <Link href="/">Home</Link>}</li>
          <li>Schedular</li>

          {user ? (
            <li>
              {pathname === "/User" ? (
                <p>User</p>
              ) : (
                <Link href="/User" onClick={loadingHandler}>
                  User
                </Link>
              )}
            </li>
          ) : (
            <>
              <li>
                {pathname === "/User/Register" ? (
                  <p>Register</p>
                ) : (
                  <Link href="/User/Register">Register</Link>
                )}
              </li>
              <li>
                {pathname === "/User/Login" ? (
                  <p>Login</p>
                ) : (
                  <Link href="/User/Login">Login</Link>
                )}
              </li>
            </>
          )}
          <li>Other</li>
        </ul>
      </div>
    </>
  );
}
