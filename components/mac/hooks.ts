import { useEffect, useState } from "react";

export const GRID = 8;
export const snap = (n: number) => Math.round(n / GRID) * GRID;

export function useViewport() {
  const [v, setV] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    function onR() { setV({ w: window.innerWidth, h: window.innerHeight }); }
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return v;
}

export const isMobile = (w: number) => w <= 720;

export function useClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 15 * 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}

export function formatTime(d: Date) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const am = h < 12 ? "AM" : "PM";
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${m} ${am}`;
}
