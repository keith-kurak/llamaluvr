import { useEffect, useState } from "react";

/** Subscribe to URL hash changes; returns the current routeId or null. */
export function useHashRoute(): string | null {
  const [route, setRoute] = useState<string | null>(() =>
    typeof window === "undefined" ? null : parseHash()
  );
  useEffect(() => {
    function update() { setRoute(parseHash()); }
    window.addEventListener("hashchange", update);
    return () => window.removeEventListener("hashchange", update);
  }, []);
  return route;
}

/** Parse the URL hash into a routeId. "#/resume" -> "resume"; "#/thought/abc" -> "thought:abc". */
export function parseHash(): string | null {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (!h) return null;
  const parts = h.split("/").filter(Boolean);
  if (parts.length === 0) return null;
  if (parts.length === 1) return parts[0];
  return parts[0] + ":" + parts.slice(1).join("/");
}

/** Push the URL hash for a routeId, or clear it. "thought:abc" -> "#/thought/abc". */
export function setHash(routeId: string | null) {
  const target = routeId ? `#/${routeId.replace(":", "/")}` : "";
  const current = window.location.hash || "";
  if (current === target) return;
  const oldURL = window.location.href;
  const url = window.location.pathname + window.location.search + (target || "#");
  history.pushState(null, "", url);
  // pushState doesn't fire hashchange; dispatch one so subscribers stay in sync.
  window.dispatchEvent(new HashChangeEvent("hashchange", { oldURL, newURL: window.location.href }));
}

/** "thought:abc" -> "thought-abc". Stable DOM-friendly id for window state. */
export function routeIdToWindowId(routeId: string) {
  return routeId.replace(":", "-");
}
