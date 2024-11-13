"use client";

import styles from "./navbar.module.css";
import { auth } from "@/lib/firebase";
import Link from "next/link";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Navbar() {
  const [user, loading, error] = useAuthState(auth);
  return (
    <>
      <div className={styles.navbar}>
        <h1 className={styles.logo}>MealMate</h1>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>Schedular</li>

          {user ? (
            <li>
              <Link href="/User">User</Link>
            </li>
          ) : (
            <>
              <li>
                <Link href="/User/Register">Register</Link>
              </li>
              <li>
                <Link href="/User/Login">Login</Link>
              </li>
            </>
          )}
          <li>Other</li>
        </ul>
      </div>
    </>
  );
}
