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
      <div className={styles.navbar}>
        <h1 className={styles.logo}>MEALMATE</h1>
        <ul>
          <li>
            {pathname === "/" ? (
              <Link href="/" aria-disabled>
                Home
              </Link>
            ) : (
              <Link href="/">Home</Link>
            )}
          </li>
          <li>Recipe</li>
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
                {pathname === "/User/Login" ? (
                  <p>Login</p>
                ) : (
                  <Link href="/User/Login">Login</Link>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
      {loading && <Loading />}
    </>
  );
}
