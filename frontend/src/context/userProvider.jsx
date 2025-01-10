import React, { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext({
  user: null,
  userRole: null,
  userLoading: false,
  login: () => {},
  logout: () => {},
  getToken: () => {},
});

export default function UserProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);
  const [userLoading, setUserLoading] = useState(false);

  const getToken = () => {
    return (
      document.cookie
        .split(";") // Split the cookies string into an array
        .map((cookie) => cookie.trim()) // Trim each cookie for extra spaces
        .filter((cookie) => cookie.startsWith("authToken" + "=")) // Filter the cookie by name
        .map((cookie) => cookie.split("=")[1]) // Get the value part of the cookie
        .pop() || null
    ); // Return the value of the first match or null if not found
  };

  const loadUser = async () => {
    const token = getToken();
    setUserLoading(true);
    if (token) {
      try {
        const response = await fetch(import.meta.env.VITE_USER_ACCOUNT_API, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${token}`, // Ensure this header matches what your server expects
          },
        });
        const data = await response.json();
        setUser(data);
        setUserRole(data.designation);
      } catch (e) {}
    }
    setUserLoading(false);
  };
  const logout = async () => {
    const token = getToken();
    setUserLoading(true);
    if (token) {
      try {
        await fetch(import.meta.env.VITE_USER_LOGOUT_API, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setUser(null);
        setUserRole(null);
        document.cookie = `authToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT`;
        // useNavigate("/login");
      } catch (e) {}
    }
    setUserLoading(false);
  };

  const login = async (email, password) => {
    setUserLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_USER_LOGIN_API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        document.cookie = `authToken=${data.token}; path=/; SameSite=None; Secure`;
        await loadUser();
      } else {
        // Display error message
        console.log(data.error || "Login failed. Please try again.");
      }
    } catch (error) {
      console.log("Login error:", error);
      console.log("An error occurred while logging in. Please try again.");
    }
    setUserLoading(false);
  };

  useEffect(() => {
    loadUser();
  }, []);

  return (
    <UserContext.Provider
      value={{ user, login, logout, userRole, userLoading, getToken }}
    >
      {children}
    </UserContext.Provider>
  );
}
