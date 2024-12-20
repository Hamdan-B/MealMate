"use client";
import React from "react";
import { useState, useEffect } from "react";
import { fetchUserData } from "@/lib/fetchUserData";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { updateSchedule } from "@/lib/firestoreOperations";
import Navbar from "../components/navbar";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import styles from "./User.module.css";
import scheduleStyles from "../global css/schedulePopUp.module.css";
import Schedular from "../components/Schedular";
import Loading from "../components/Loading";

const UserPage = () => {
  const [user, userLoading, error] = useAuthState(auth);
  const [userData, setUserData] = useState([]);

  const [dataLoading, setDataLoading] = useState(false);

  const [schedulePopUp, setSchedulePopUp] = useState(false);
  const [recipePopUp, setRecipePopUp] = useState(false);

  const router = useRouter();

  //Signout User
  async function handleLogout() {
    await signOut(auth);
    router.push("/");
  }

  //Redirect to Login if user not signed in
  useEffect(() => {
    if (!userLoading && user === null) {
      router.push("/User/Login");
    }
  }, [userLoading, user, router]);

  //Fetch User Data if user is signed in
  useEffect(() => {
    if (user) {
      const getData = async () => {
        const result = await fetchUserData(user.uid);
        setUserData(result);
      };
      getData();
    }
  }, [user]);

  return (
    <>
      {dataLoading && <Loading isSchedule={false} />}
      <Navbar />
      {/* User Profile */}
      {userLoading && <p>Getting your info</p>}
      {!userLoading && user === null && <p>Kindly Login in First</p>}

      {userData.error && (
        <p
          style={{
            backgroundColor: "red",
            padding: "10px",
            borderRadius: "10px",
            color: "white",
            fontWeight: "bolder",
          }}
        >
          {userData.error}
        </p>
      )}

      {!userData.error && userData.dishes && (
        <>
          <div className={styles.mainCont}>
            {/* UserInfo */}
            <div className={styles.UserDataCont}>
              {/* UserInfoText */}
              <div className={styles.UserInfo}>
                <div className={styles.userImg}></div>
                <h1>{userData.fullName}</h1>
                <p>{userData.email}</p>
              </div>
              {/* ActionButtons */}
              <div className={styles.userActionBtns}>
                <button
                  onClick={() => {
                    console.log("RecipeBTN");
                  }}
                >
                  My Recipes
                </button>
                <button
                  onClick={() => {
                    setSchedulePopUp(true);
                  }}
                >
                  My Schedule
                </button>
              </div>
              {/* LogoutButton */}
              <div className={styles.LogoutBtn}>
                <button onClick={handleLogout} style={{ color: "red" }}>
                  Logout
                </button>
              </div>
            </div>
            {/* Scheduler */}
            <div className={styles.OtherCont}>
              <Schedular />
              {/* <ul>
                {userData.dishes.map((dish) => (
                  <li key={dish.dishName}>
                    <pre>{JSON.stringify(dish)}</pre>
                  </li>
                ))}
              </ul>
              <pre>{JSON.stringify(userData.schedule.meals)}</pre> */}
            </div>
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
      )}

      {/* Schedule POPUP */}
      {schedulePopUp && (
        <div className={scheduleStyles.popupOverlay}>
          <div className={scheduleStyles.popupContent}>
            <div className={scheduleStyles.schedule}>
              {userData.schedule.meals.map((day, index) => (
                <div className={scheduleStyles.day} key={index}>
                  <div className={scheduleStyles.dayHeader}>Day {day.day}</div>
                  {day.meal.map((meal, mealIndex) => (
                    <div className={scheduleStyles.meal} key={mealIndex}>
                      <div className={scheduleStyles.mealHeader}>
                        Meal Time: {meal.mealTime}
                      </div>
                      <div className={scheduleStyles.dishName}>
                        {meal.dishName}
                      </div>
                      <div className={scheduleStyles.dishCountry}>
                        Origin: {meal.dishCountry}
                      </div>
                      <div className={scheduleStyles.ingredients}>
                        <strong>Ingredients:</strong>
                        <ul>
                          {meal.dishIngredients.map(
                            (ingredient, ingredientIndex) => (
                              <li key={ingredientIndex}>{ingredient}</li>
                            )
                          )}
                        </ul>
                      </div>
                      <div className={scheduleStyles.recipe}>
                        <strong>Recipe:</strong>
                        <ul>
                          {meal.dishRecipe.map((step, stepIndex) => (
                            <li key={stepIndex}>{step}</li>
                          ))}
                        </ul>
                      </div>
                      <div className={scheduleStyles.description}>
                        <strong>Description:</strong> {meal.dishDescription}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
              <div className={scheduleStyles.footer}>
                {userData.schedule.scheduleDescription}
              </div>
            </div>

            {/* Close & Save Btn */}
            <div className={scheduleStyles.popUpBtn}>
              <button
                onClick={() => {
                  setSchedulePopUp(false);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UserPage;
