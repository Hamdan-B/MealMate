"use client";

import styles from "./navbar.module.css";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "./Loading";
import { fetchUserData } from "@/lib/fetchUserData";

export default function Navbar() {
  const [user, userLoading, userError] = useAuthState(auth);
  const [userName, setUserName] = useState("User");
  const [loading, setLoading] = useState(false);
  const pathname = usePathname();

  const loadingHandler = () => {
    setLoading(true);
    console.log("Loading: ", loading);
  };

  useEffect(() => {
    if (user) {
      const getData = async () => {
        const result = await fetchUserData(user.uid);
        setUserName(result.fullName.split(" ")[0]);
      };
      getData();
    }
  }, [user]);

  return (
    <>
      <div className={styles.navbar}>
        <h1 className={styles.logo}>MEALMATE</h1>
        <ul>
          <li>
            {pathname === "/" ? (
              <Link href="/" className={styles.active} aria-disabled>
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
                <Link href="/User" className={styles.active} aria-disabled>
                  {userName}
                </Link>
              ) : (
                <Link href="/User" onClick={loadingHandler}>
                  {userName}
                </Link>
              )}
            </li>
          ) : (
            <>
              <li>
                {pathname === "/User/Login" ? (
                  <Link
                    href="/User/Login"
                    aria-disabled
                    className={styles.active}
                  >
                    Login
                  </Link>
                ) : (
                  <Link href="/User/Login" onClick={loadingHandler}>
                    Login
                  </Link>
                )}
              </li>
            </>
          )}
        </ul>
      </div>
      {loading && <Loading isSchedule={false} />}
    </>
  );
}
