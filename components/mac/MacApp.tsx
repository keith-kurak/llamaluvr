import { useEffect, useRef, useState, type ReactNode } from "react";
import { DesktopIcon } from "./DesktopIcon";
import { parseHash, routeIdToWindowId, setHash } from "./hash";
import { isMobile, useViewport } from "./hooks";
import { MacWindow } from "./MacWindow";
import { MenuBar } from "./MenuBar";
import { ShutdownScreen } from "./ShutdownScreen";
import { StopIcon } from "../icons";
import type {
  DynamicRouteDef,
  IconDef,
  MacCtx,
  MenuConfig,
  RouteDef,
  WindowState,
} from "./types";

type MacAppProps = {
  menus: MenuConfig[];
  icons: IconDef[];
  routes: Record<string, RouteDef>;
  dynamicRoutes?: DynamicRouteDef[];
  onMenuAction?: (id: string, ctx: MacCtx) => void;
  hint?: string;
};

const DEFAULT_HINT = "Double-click an icon to open. Drag to move.";

function resolvePos(it: IconDef, w: number, h: number) {
  const x = it.anchorRight ? Math.max(0, w - (it.rightX ?? 0)) : (it.x ?? 0);
  const y = it.anchorBottom ? Math.max(40, h - (it.bottomY ?? 0)) : (it.y ?? 0);
  return { x, y };
}

export function MacApp({
  menus,
  icons: initialIcons,
  routes,
  dynamicRoutes = [],
  onMenuAction,
  hint: defaultHint = DEFAULT_HINT,
}: MacAppProps) {
  const v = useViewport();
  const mobile = isMobile(v.w);

  const [icons, setIcons] = useState<IconDef[]>(initialIcons);
  const [selected, setSelected] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState(10);
  const [hint, setHint] = useState(defaultHint);
  const [shutdown, setShutdown] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const initialIconIdsRef = useRef(new Set(initialIcons.map((i) => i.id)));
  const [trashHover, setTrashHover] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placedIcons = icons.map((i) => ({ ...i, ...resolvePos(i, v.w, v.h) }));

  function resolveRoute(routeId: string): RouteDef | null {
    if (routes[routeId]) return routes[routeId];
    const colon = routeId.indexOf(":");
    if (colon < 0) return null;
    const prefix = routeId.slice(0, colon);
    const param = routeId.slice(colon + 1);
    const dr = dynamicRoutes.find((d) => d.prefix === prefix);
    return dr ? dr.resolve(param) : null;
  }

  function flashHint(msg: string) {
    setHint(msg);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() => setHint(defaultHint), 2500);
  }

  function spawnPos(w: number, h: number, count: number) {
    const offset = (count % 6) * 18;
    const x = Math.max(20, Math.round((v.w - w) / 2) - 60 + offset);
    const y = Math.max(34, Math.round((v.h - h) / 2) - 60 + offset);
    return { x, y };
  }

  function openRoute(routeId: string) {
    const def = resolveRoute(routeId);
    if (!def) return;
    // Guard: route was originally backed by a desktop icon that has since been trashed.
    if (initialIconIdsRef.current.has(routeId) && !icons.find((i) => i.id === routeId)) {
      const orig = initialIcons.find((i) => i.id === routeId);
      const name = orig?.label ?? routeId;
      setErrorMsg(`The file "${name}" could not be opened/printed (the application is busy or missing).`);
      return;
    }
    const winId = routeIdToWindowId(routeId);
    setTopZ((z) => z + 1);
    setWindows((arr) => {
      const existing = arr.find((wi) => wi.id === winId);
      if (existing) {
        return arr.map((wi) => (wi.id === winId ? { ...wi, z: topZ + 1 } : wi));
      }
      const pos = spawnPos(def.w, def.h, arr.length);
      return [
        ...arr,
        { id: winId, routeId, title: def.title, w: def.w, h: def.h, z: topZ + 1, ...pos },
      ];
    });
    if (!def.transient) setHash(routeId);
  }

  function closeWindow(id: string) {
    const win = windows.find((w) => w.id === id);
    if (!win) return;
    const def = resolveRoute(win.routeId);
    if (def?.transient) {
      setWindows((arr) => arr.filter((w) => w.id !== id));
      return;
    }
    if (parseHash() === win.routeId) {
      history.back();
    } else {
      setWindows((arr) => arr.filter((w) => w.id !== id));
    }
  }

  function focusWindow(id: string) {
    setTopZ((z) => z + 1);
    setWindows((arr) => arr.map((w) => (w.id === id ? { ...w, z: topZ + 1 } : w)));
  }
  function moveWindow(id: string, x: number, y: number) {
    setWindows((arr) => arr.map((w) => (w.id === id ? { ...w, x, y } : w)));
  }

  function cleanDesktop() {
    setIcons(initialIcons);
  }
  function doShutdown() {
    setShutdown(true);
  }
  function doRestart() {
    setShutdown(false);
    setIcons(initialIcons);
    setWindows([]);
    setHash(null);
  }

  const ctx: MacCtx = {
    openRoute,
    closeWindow,
    flashHint,
    cleanDesktop,
    shutdown: doShutdown,
    restart: doRestart,
  };

  function openIcon(id: string) {
    const ic = icons.find((i) => i.id === id);
    if (!ic) return;
    if (ic.onOpen) {
      ic.onOpen(ctx);
      return;
    }
    if (resolveRoute(id)) openRoute(id);
  }

  function handleDragOver(id: string, cx: number, cy: number) {
    if (id === "trash") return;
    const el = document.querySelector('.icon[data-icon-id="trash"]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const over = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    setTrashHover(over);
  }
  function handleDragEnd(id: string, cx: number, cy: number) {
    setTrashHover(false);
    if (id === "trash") return false;
    const el = document.querySelector('.icon[data-icon-id="trash"]');
    if (!el) return false;
    const r = el.getBoundingClientRect();
    const over = cx >= r.left && cx <= r.right && cy >= r.top && cy <= r.bottom;
    if (over) {
      setIcons((arr) => arr.filter((i) => i.id !== id));
      if (selected === id) setSelected(null);
      return true;
    }
    return false;
  }

  function moveIcon(id: string, x: number, y: number) {
    setIcons((arr) =>
      arr.map((i) =>
        i.id === id
          ? { ...i, x: Math.max(0, x), y: Math.max(0, y), anchorRight: false, anchorBottom: false }
          : i
      )
    );
  }

  function onMenu(id: string) {
    onMenuAction?.(id, ctx);
  }

  // Keep latest resolveRoute in a ref so the [] effect below sees current routes/dynamicRoutes.
  const resolveRouteRef = useRef(resolveRoute);
  resolveRouteRef.current = resolveRoute;

  useEffect(() => {
    const mq = window.matchMedia("(orientation: portrait)");
    const reset = () => setIcons(initialIcons);
    mq.addEventListener("change", reset);
    return () => mq.removeEventListener("change", reset);
  }, [initialIcons]);

  useEffect(() => {
    function syncFromHash() {
      const route = parseHash();
      const resolve = resolveRouteRef.current;

      if (!route) {
        setWindows((arr) => arr.filter((w) => resolve(w.routeId)?.transient));
        return;
      }

      const def = resolve(route);
      if (!def) return;
      const winId = routeIdToWindowId(route);
      setTopZ((z) => z + 1);
      setWindows((arr) => {
        const filtered = arr.filter((w) => w.id === winId || resolve(w.routeId)?.transient);
        if (filtered.find((w) => w.id === winId)) return filtered;
        const offset = (filtered.length % 6) * 18;
        const x = Math.max(20, Math.round((window.innerWidth - def.w) / 2) - 60 + offset);
        const y = Math.max(34, Math.round((window.innerHeight - def.h) / 2) - 60 + offset);
        return [
          ...filtered,
          { id: winId, routeId: route, title: def.title, w: def.w, h: def.h, z: topZ + 1, x, y },
        ];
      });
    }
    syncFromHash();
    window.addEventListener("hashchange", syncFromHash);
    return () => window.removeEventListener("hashchange", syncFromHash);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const maxZ = windows.reduce((m, w) => Math.max(m, w.z), 0);

  return (
    <div className="desktop" onMouseDown={() => setSelected(null)}>
      <MenuBar menus={menus} onAction={onMenu} mobile={mobile} />

      <div className="desktop-area">
        {placedIcons.map((i) => (
          <DesktopIcon
            key={i.id}
            icon={i}
            selected={selected === i.id}
            onSelect={(id) => setSelected(id)}
            onOpen={openIcon}
            onMove={moveIcon}
            onDragOver={handleDragOver}
            onDragEnd={handleDragEnd}
            trashHover={i.id === "trash" && trashHover}
          />
        ))}

        {windows.map((w) => {
          const def = resolveRoute(w.routeId);
          if (!def) return null;
          const focused = w.z === maxZ;
          const fs = mobile && !def.transient;
          let body: ReactNode = null;
          try {
            body = def.render(ctx);
          } catch {
            body = null;
          }
          return (
            <MacWindow
              key={w.id}
              win={w}
              focused={focused}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMove={moveWindow}
              fullScreen={fs}
            >
              {body}
            </MacWindow>
          );
        })}
      </div>

      {shutdown && <ShutdownScreen onRestart={doRestart} />}
      {errorMsg !== null && (
        <div className="alert" onMouseDown={(e) => e.stopPropagation()}>
          <div className="alert-dialog">
            <div className="alert-row">
              <div className="alert-stop"><StopIcon /></div>
              <div className="alert-msg">{errorMsg}</div>
            </div>
            <button className="alert-ok" onClick={() => setErrorMsg(null)}>OK</button>
          </div>
        </div>
      )}
    </div>
  );
}
