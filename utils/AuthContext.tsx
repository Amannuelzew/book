"use client";
import { createContext, useState, useEffect } from "react";
import { defineAbilityFor } from "@/utils/ability";

const AuthContext = createContext({});

export function AuthProvider({ children }) {
  const [user, setUser] = useState();
  const [ability, setAbility] = useState();

  useEffect(() => {
    // Replace with your actual user fetching logic
    const fetchedUser = { id: 1, role: "admin" }; // Example user
    setUser(fetchedUser);
    setAbility(defineAbilityFor(fetchedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, ability }}>
      {children}
    </AuthContext.Provider>
  );
}
