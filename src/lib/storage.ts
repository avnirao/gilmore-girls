import { useEffect, useState } from "react";

const KEY = "stars-hollow-tonight:v1";

export interface UserData {
  favorites: string[];
  watchlist: string[];
  watched: string[];
}

const defaults: UserData = { favorites: [], watchlist: [], watched: [] };

function read(): UserData {
  if (typeof window === "undefined") return defaults;
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return defaults;
    return { ...defaults, ...JSON.parse(raw) };
  } catch {
    return defaults;
  }
}

function write(data: UserData) {
  window.localStorage.setItem(KEY, JSON.stringify(data));
  window.dispatchEvent(new Event("shl:userdata"));
}

export function useUserData() {
  const [data, setData] = useState<UserData>(defaults);

  useEffect(() => {
    setData(read());
    const handler = () => setData(read());
    window.addEventListener("shl:userdata", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("shl:userdata", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const toggle = (list: keyof UserData, id: string) => {
    const current = read();
    const set = new Set(current[list]);
    if (set.has(id)) set.delete(id);
    else set.add(id);
    write({ ...current, [list]: Array.from(set) });
  };

  const add = (list: keyof UserData, id: string) => {
    const current = read();
    if (current[list].includes(id)) return;
    write({ ...current, [list]: [...current[list], id] });
  };

  return { data, toggle, add };
}
