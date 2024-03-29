// import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { atom } from "jotai";

const userAtom = atomWithStorage("user", {});
const isDarkAtom = atomWithStorage("isDark", false);
const isLoggedInAtom = atom(localStorage.getItem("user") !== null);
const resetLoginAtom = atom(null, (_get, set) => {
  const isLoggedIn = localStorage.getItem("user") !== null;
  set(isLoggedInAtom, !isLoggedIn);
});

export { userAtom, isDarkAtom, isLoggedInAtom, resetLoginAtom };
