import { onAuthStateChanged, signInWithEmailAndPassword, signOut, User } from "firebase/auth";
import { auth } from "./firabase";


export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    console.error("Erro ao fazer login:", error);
    throw error;
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const checkUserStatus = (callback: (user: User | null) => void) => {
  return onAuthStateChanged(auth, callback);
};