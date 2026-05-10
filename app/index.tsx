import { useState, useEffect, useRef } from "react";
import { Platform, Text, View } from "react-native";
import {
  AboutContent,
  AppsContent,
  ResumeContent,
  TalksContent,
  Talks2Content,
  ThoughtPostContent,
  ThoughtsContent,
  LinksContent,
  THOUGHTS,
  type Thought,
} from "@/components/content";
import {
  AppleLogo,
  AppsFolderIcon,
  ClassicMacIcon,
  DocumentIcon,
  FolderIcon,
  LinksFolderIcon,
  TalksFolderIcon,
  ThoughtsFolderIcon,
  TrashIcon,
} from "@/components/icons";

if (Platform.OS === "web") {
  require("./mac.css");
}

const GRID = 8;
const snap = (n: number) => Math.round(n / GRID) * GRID;

type RouteId = "resume" | "talks" | "talks2" | "apps" | "thoughts" | "links" | "about";
const ROUTE_IDS: RouteId[] = ["resume", "talks", "talks2", "apps", "thoughts", "links", "about"];

function parseHash(): string | null {
  const h = (window.location.hash || "").replace(/^#\/?/, "");
  if (!h) return null;
  const seg = h.split("/")[0];
  if ((ROUTE_IDS as string[]).includes(seg)) return seg;
  if (seg === "thought" && h.split("/")[1]) return "thought:" + h.split("/")[1];
  return null;
}
function setHash(route: string | null) {
  const target = route ? `#/${route}` : "";
  const current = window.location.hash || "";
  if (current === target) return;
  const url = window.location.pathname + window.location.search + (target || "#");
  history.pushState(null, "", url);
}

function isRouteWindowId(id: string) {
  return (ROUTE_IDS as string[]).includes(id) || id.startsWith("thought-");
}

function useViewport() {
  const [v, setV] = useState({ w: window.innerWidth, h: window.innerHeight });
  useEffect(() => {
    function onR() { setV({ w: window.innerWidth, h: window.innerHeight }); }
    window.addEventListener("resize", onR);
    return () => window.removeEventListener("resize", onR);
  }, []);
  return v;
}
const isMobile = (w: number) => w <= 720;

function useClock() {
  const [t, setT] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setT(new Date()), 15 * 1000);
    return () => clearInterval(id);
  }, []);
  return t;
}
function formatTime(d: Date) {
  let h = d.getHours();
  const m = String(d.getMinutes()).padStart(2, "0");
  const am = h < 12 ? "AM" : "PM";
  h = h % 12; if (h === 0) h = 12;
  return `${h}:${m} ${am}`;
}

type MenuId = "apple" | "file" | "edit" | "view" | "special";
type MenuItem = { id?: string; label?: string; shortcut?: string; disabled?: boolean; check?: boolean; divider?: boolean };

function MenuBar({ onAction }: { onAction: (id: string) => void; mobile: boolean }) {
  const t = useClock();
  const [open, setOpen] = useState<MenuId | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  const menus: Record<MenuId, MenuItem[]> = {
    apple: [
      { id: "about", label: "About this Mac…" },
      { divider: true },
      { id: "alarm", label: "Alarm Clock", disabled: true },
      { id: "calc", label: "Calculator", disabled: true },
      { id: "scrap", label: "Scrapbook", disabled: true },
    ],
    file: [
      { id: "open-resume", label: "Open Resume", shortcut: "⌘O" },
      { id: "open-talks", label: "Open Talks", shortcut: "⌘T" },
      { divider: true },
      { id: "close", label: "Close", shortcut: "⌘W", disabled: true },
      { id: "print", label: "Print…", shortcut: "⌘P", disabled: true },
      { divider: true },
      { id: "shut", label: "Shut Down", disabled: true },
    ],
    edit: [
      { id: "undo", label: "Undo", shortcut: "⌘Z", disabled: true },
      { divider: true },
      { id: "cut", label: "Cut", shortcut: "⌘X", disabled: true },
      { id: "copy", label: "Copy", shortcut: "⌘C", disabled: true },
      { id: "paste", label: "Paste", shortcut: "⌘V", disabled: true },
      { id: "clear", label: "Clear", disabled: true },
      { divider: true },
      { id: "selall", label: "Select All", shortcut: "⌘A", disabled: true },
    ],
    view: [
      { id: "v-icon", label: "by Icon", check: true },
      { id: "v-name", label: "by Name", disabled: true },
      { id: "v-date", label: "by Date", disabled: true },
      { id: "v-kind", label: "by Kind", disabled: true },
    ],
    special: [
      { id: "clean", label: "Clean Up Desktop" },
      { id: "empty", label: "Empty Trash", disabled: true },
      { divider: true },
      { id: "restart", label: "Restart" },
      { id: "shutdown", label: "Shut Down" },
    ],
  };

  function pick(item: MenuItem) {
    setOpen(null);
    if (item.disabled || !item.id) return;
    onAction(item.id);
  }

  function MenuButton({ id, label, hideOnMobile, children }: {
    id: MenuId; label?: string; hideOnMobile?: boolean; children?: React.ReactNode;
  }) {
    return (
      <div
        className={"menu-item" + (open === id ? " open" : "") + (hideOnMobile ? " hide-mobile" : "")}
        onMouseDown={(e) => { e.stopPropagation(); setOpen(open === id ? null : id); }}
        onMouseEnter={() => { if (open && open !== id) setOpen(id); }}
      >
        {children || label}
        {open === id && (
          <div className="dropdown" onMouseDown={(e) => e.stopPropagation()}>
            {menus[id].map((it, i) =>
              it.divider ? (
                <div className="dropdown-divider" key={i} />
              ) : (
                <div
                  key={it.id}
                  className={"dropdown-item" + (it.disabled ? " disabled" : "")}
                  onMouseUp={() => pick(it)}
                >
                  <span>{it.check ? "✓ " : ""}{it.label}</span>
                  {it.shortcut && <span className="shortcut">{it.shortcut}</span>}
                </div>
              )
            )}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="menubar" ref={ref}>
      <MenuButton id="apple"><AppleLogo size={14} /></MenuButton>
      <MenuButton id="file" label="File" />
      <MenuButton id="edit" label="Edit" hideOnMobile />
      <MenuButton id="view" label="View" hideOnMobile />
      <MenuButton id="special" label="Special" />
      <div className="menu-spacer" />
      <div className="menu-clock">{formatTime(t)}</div>
    </div>
  );
}

type IconDef = {
  id: string;
  label: string;
  x?: number;
  y?: number;
  rightX?: number;
  bottomY?: number;
  anchorRight?: boolean;
  anchorBottom?: boolean;
  render: () => React.ReactNode;
};

function DesktopIcon({
  icon,
  selected,
  onSelect,
  onOpen,
  onMove,
  onDragOver,
  onDragEnd,
  trashHover,
}: {
  icon: IconDef & { x: number; y: number };
  selected: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  onDragOver?: (id: string, x: number, y: number) => void;
  onDragEnd?: (id: string, x: number, y: number) => boolean | void;
  trashHover?: boolean;
}) {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  function onPointerDown(e: React.PointerEvent<HTMLDivElement>) {
    if (e.button !== undefined && e.button !== 0) return;
    e.stopPropagation();
    onSelect(icon.id);
    const startX = e.clientX, startY = e.clientY;
    const baseX = icon.x, baseY = icon.y;
    let moved = false;
    const target = e.currentTarget;
    target.setPointerCapture && target.setPointerCapture(e.pointerId);
    function move(ev: PointerEvent) {
      const dx = ev.clientX - startX;
      const dy = ev.clientY - startY;
      if (!moved && Math.abs(dx) + Math.abs(dy) < 4) return;
      moved = true;
      setDrag({ x: baseX + dx, y: baseY + dy });
      if (onDragOver) onDragOver(icon.id, ev.clientX, ev.clientY);
    }
    function up(ev: PointerEvent) {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
      setDrag(null);
      if (moved) {
        const dx = ev.clientX - startX;
        const dy = ev.clientY - startY;
        const handled = onDragEnd && onDragEnd(icon.id, ev.clientX, ev.clientY);
        if (!handled) onMove(icon.id, snap(baseX + dx), snap(baseY + dy));
      }
    }
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  }

  const x = drag ? drag.x : icon.x;
  const y = drag ? drag.y : icon.y;

  const lastTapRef = useRef(0);
  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    e.stopPropagation();
    const now = Date.now();
    if (now - lastTapRef.current < 350) {
      onOpen(icon.id);
      lastTapRef.current = 0;
      return;
    }
    lastTapRef.current = now;
    onSelect(icon.id);
  }

  return (
    <div
      className={"icon" + (selected ? " selected" : "") + (drag ? " dragging" : "") + (trashHover ? " trash-hover" : "")}
      data-icon-id={icon.id}
      style={{ left: x, top: y }}
      onPointerDown={onPointerDown}
      onClick={handleClick}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(icon.id); }}
    >
      <div className="icon-img">{icon.render()}</div>
      <div className="icon-label">{icon.label}</div>
    </div>
  );
}

type WindowState = {
  id: string;
  kind: string;
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
  z: number;
  post?: Thought;
};

function MacWindow({
  win,
  focused,
  onFocus,
  onClose,
  onMove,
  fullScreen,
  children,
}: {
  win: WindowState;
  focused: boolean;
  onFocus: (id: string) => void;
  onClose: (id: string) => void;
  onMove: (id: string, x: number, y: number) => void;
  fullScreen: boolean;
  children: React.ReactNode;
}) {
  const [drag, setDrag] = useState<{ x: number; y: number } | null>(null);

  function startDrag(e: React.PointerEvent<HTMLDivElement>) {
    if (fullScreen) return;
    if (e.button !== undefined && e.button !== 0) return;
    e.preventDefault();
    onFocus(win.id);
    const startX = e.clientX, startY = e.clientY;
    const baseX = win.x, baseY = win.y;
    const target = e.currentTarget;
    target.setPointerCapture && target.setPointerCapture(e.pointerId);
    function move(ev: PointerEvent) {
      setDrag({ x: baseX + (ev.clientX - startX), y: baseY + (ev.clientY - startY) });
    }
    function up(ev: PointerEvent) {
      target.removeEventListener("pointermove", move);
      target.removeEventListener("pointerup", up);
      target.removeEventListener("pointercancel", up);
      setDrag(null);
      onMove(win.id, baseX + (ev.clientX - startX), baseY + (ev.clientY - startY));
    }
    target.addEventListener("pointermove", move);
    target.addEventListener("pointerup", up);
    target.addEventListener("pointercancel", up);
  }

  const x = drag ? drag.x : win.x;
  const y = drag ? drag.y : win.y;
  const style: React.CSSProperties = fullScreen
    ? { left: 0, top: 0, width: "100%", height: "100%", zIndex: win.z }
    : { left: x, top: y, width: win.w, height: win.h, zIndex: win.z };

  return (
    <div
      className="window"
      style={style}
      onMouseDown={() => onFocus(win.id)}
    >
      <div
        className={"titlebar" + (focused ? " focused" : "")}
        onPointerDown={startDrag}
      >
        <div
          className="close-box"
          onMouseDown={(e) => { e.stopPropagation(); }}
          onPointerDown={(e) => { e.stopPropagation(); }}
          onClick={(e) => { e.stopPropagation(); onClose(win.id); }}
          title="Close"
        />
        <div className="titlebar-spacer" />
        <div className="titlebar-title">{win.title}</div>
        <div className="titlebar-spacer" />
        <div className="zoom-box" />
      </div>
      <div className="window-content">{children}</div>
    </div>
  );
}

const INITIAL_ICONS: IconDef[] = [
  { id: "resume", label: "Resume", rightX: 96, y: 16, anchorRight: true, render: () => <DocumentIcon /> },
  { id: "talks", label: "Talks", rightX: 96, y: 112, anchorRight: true, render: () => <TalksFolderIcon /> },
  { id: "talks2", label: "Talks 2", rightX: 96, y: 208, anchorRight: true, render: () => <FolderIcon /> },
  { id: "apps", label: "Apps", rightX: 96, y: 304, anchorRight: true, render: () => <AppsFolderIcon /> },
  { id: "thoughts", label: "Thoughts", rightX: 96, y: 400, anchorRight: true, render: () => <ThoughtsFolderIcon /> },
  { id: "links", label: "Links", rightX: 96, y: 496, anchorRight: true, render: () => <LinksFolderIcon /> },
  { id: "trash", label: "Trash", rightX: 96, y: 0, anchorRight: true, anchorBottom: true, bottomY: 110, render: () => <TrashIcon /> },
];

function resolvePos(it: IconDef, w: number, h: number) {
  const x = it.anchorRight ? Math.max(0, w - (it.rightX ?? 0)) : (it.x ?? 0);
  const y = it.anchorBottom ? Math.max(40, h - (it.bottomY ?? 0)) : (it.y ?? 0);
  return { x, y };
}

const ROUTES: Record<RouteId, { title: string; w: number; h: number }> = {
  resume: { title: "Resume", w: 540, h: 580 },
  talks: { title: "Talks", w: 560, h: 540 },
  talks2: { title: "Talks 2", w: 880, h: 620 },
  apps: { title: "Apps", w: 560, h: 540 },
  thoughts: { title: "Thoughts", w: 480, h: 420 },
  links: { title: "Links", w: 480, h: 360 },
  about: { title: "About this Mac", w: 340, h: 280 },
};

function ShutdownScreen({ onRestart }: { onRestart: () => void }) {
  return (
    <div className="shutdown">
      <div className="shutdown-dialog">
        <div className="shutdown-row">
          <div className="shutdown-mac"><ClassicMacIcon /></div>
          <div className="shutdown-msg">You may now switch off your Macintosh safely.</div>
        </div>
        <button className="shutdown-restart" onClick={onRestart}>Restart</button>
      </div>
    </div>
  );
}

function MacApp() {
  const v = useViewport();
  const mobile = isMobile(v.w);

  const [icons, setIcons] = useState<IconDef[]>(INITIAL_ICONS);
  const [selected, setSelected] = useState<string | null>(null);
  const [windows, setWindows] = useState<WindowState[]>([]);
  const [topZ, setTopZ] = useState(10);
  const [hint, setHint] = useState("Double-click an icon to open. Drag to move.");
  const [folderSel, setFolderSel] = useState<{ thoughts?: string | null }>({});
  const [shutdown, setShutdown] = useState(false);
  const [trashHover, setTrashHover] = useState(false);
  const hintTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const placedIcons = icons.map((i) => ({ ...i, ...resolvePos(i, v.w, v.h) }));

  function flashHint(msg: string) {
    setHint(msg);
    if (hintTimer.current) clearTimeout(hintTimer.current);
    hintTimer.current = setTimeout(() =>
      setHint("Double-click an icon to open. Drag to move."), 2500);
  }

  function spawnPos(w: number, h: number) {
    const offset = (windows.length % 6) * 18;
    const x = Math.max(20, Math.round((v.w - w) / 2) - 60 + offset);
    const y = Math.max(34, Math.round((v.h - h) / 2) - 60 + offset);
    return { x, y };
  }

  function pushWindow(id: string, kind: RouteId, override: Partial<{ w: number; h: number; title: string }> = {}) {
    const cfg = ROUTES[kind];
    const w = override.w || cfg?.w || 480;
    const h = override.h || cfg?.h || 360;
    const title = override.title || cfg?.title || kind;
    setTopZ((z) => z + 1);
    setWindows((arr) => {
      const existing = arr.find((wi) => wi.id === id);
      if (existing) {
        return arr.map((wi) => wi.id === id ? { ...wi, z: topZ + 1 } : wi);
      }
      const pos = spawnPos(w, h);
      return [...arr, { id, kind, title, w, h, z: topZ + 1, ...pos }];
    });
  }

  function openRoute(route: RouteId) {
    if (!ROUTES[route]) return;
    pushWindow(route, route);
    if (route !== "about") setHash(route);
  }

  function openThought(post: Thought) {
    const id = "thought-" + post.id;
    setTopZ((z) => z + 1);
    setWindows((arr) => {
      const existing = arr.find((wi) => wi.id === id);
      if (existing) return arr.map((wi) => wi.id === id ? { ...wi, z: topZ + 1 } : wi);
      const w = 540, h = 520;
      const offset = (arr.length % 6) * 18;
      const x = Math.max(20, Math.round((v.w - w) / 2) - 60 + offset);
      const y = Math.max(34, Math.round((v.h - h) / 2) - 60 + offset);
      return [...arr, { id, kind: "thought", title: post.title, post, w, h, z: topZ + 1, x, y }];
    });
    setHash("thought/" + post.id);
  }

  function closeWindow(id: string) {
    if (!isRouteWindowId(id)) {
      setWindows((arr) => arr.filter((w) => w.id !== id));
      return;
    }
    // If this window matches the current hash, pop history so back/forward stay coherent.
    // hashchange will then call syncFromHash which removes the window.
    const currentHashRoute = parseHash();
    const matches =
      (currentHashRoute && currentHashRoute === id) ||
      (currentHashRoute && currentHashRoute.startsWith("thought:") &&
        "thought-" + currentHashRoute.slice("thought:".length) === id);
    if (matches) {
      history.back();
    } else {
      setWindows((arr) => arr.filter((w) => w.id !== id));
    }
  }

  function focusWindow(id: string) {
    setTopZ((z) => z + 1);
    setWindows((arr) => arr.map((w) => w.id === id ? { ...w, z: topZ + 1 } : w));
  }
  function moveWindow(id: string, x: number, y: number) {
    setWindows((arr) => arr.map((w) => w.id === id ? { ...w, x, y } : w));
  }

  function openIcon(id: string) {
    if ((ROUTE_IDS as string[]).includes(id) && id !== "about") {
      openRoute(id as RouteId);
    } else if (id === "trash") {
      flashHint("The Trash is empty.");
    }
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
    setIcons((arr) => arr.map((i) =>
      i.id === id ? { ...i, x: Math.max(0, x), y: Math.max(0, y), anchorRight: false, anchorBottom: false } : i
    ));
  }

  function onMenu(id: string) {
    switch (id) {
      case "about": openRoute("about"); break;
      case "open-resume": openRoute("resume"); break;
      case "open-talks": openRoute("talks"); break;
      case "clean": setIcons(INITIAL_ICONS); break;
      case "shutdown": setShutdown(true); break;
      case "restart": setShutdown(false); setIcons(INITIAL_ICONS); setWindows([]); break;
      default: break;
    }
  }

  useEffect(() => {
    function syncFromHash() {
      const route = parseHash();

      // Hash empty: close every window that is bound to a hash route.
      if (!route) {
        setWindows((arr) => arr.filter((w) => !isRouteWindowId(w.id)));
        return;
      }

      // Thought post route, e.g. "thought:rn-last-mile"
      if (route.startsWith("thought:")) {
        const postId = route.slice("thought:".length);
        const winId = "thought-" + postId;
        const post = THOUGHTS.find((p) => p.id === postId);
        setTopZ((z) => z + 1);
        setWindows((arr) => {
          // close other hash-bound windows that aren't this one
          const filtered = arr.filter((w) => !isRouteWindowId(w.id) || w.id === winId);
          if (filtered.find((w) => w.id === winId) || !post) return filtered;
          const w = 540, h = 520;
          const offset = (filtered.length % 6) * 18;
          const x = Math.max(20, Math.round((window.innerWidth - w) / 2) - 60 + offset);
          const y = Math.max(34, Math.round((window.innerHeight - h) / 2) - 60 + offset);
          return [...filtered, { id: winId, kind: "thought", title: post.title, post, w, h, z: topZ + 1, x, y }];
        });
        return;
      }

      // Plain route id
      const cfg = ROUTES[route as RouteId];
      if (!cfg) return;
      setTopZ((z) => z + 1);
      setWindows((arr) => {
        const filtered = arr.filter((w) => !isRouteWindowId(w.id) || w.id === route);
        if (filtered.find((w) => w.id === route)) return filtered;
        const offset = (filtered.length % 6) * 18;
        const x = Math.max(20, Math.round((window.innerWidth - cfg.w) / 2) - 60 + offset);
        const y = Math.max(34, Math.round((window.innerHeight - cfg.h) / 2) - 60 + offset);
        return [...filtered, { id: route, kind: route, title: cfg.title, w: cfg.w, h: cfg.h, z: topZ + 1, x, y }];
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
      <MenuBar onAction={onMenu} mobile={mobile} />

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
          const focused = w.z === maxZ;
          let body: React.ReactNode = null;
          if (w.kind === "resume") body = <ResumeContent />;
          else if (w.kind === "talks") body = <TalksContent />;
          else if (w.kind === "talks2") body = <Talks2Content />;
          else if (w.kind === "apps") body = <AppsContent />;
          else if (w.kind === "thoughts") body = (
            <ThoughtsContent
              onOpenPost={openThought}
              selectedId={folderSel.thoughts}
              onSelect={(id) => setFolderSel((s) => ({ ...s, thoughts: id }))}
            />
          );
          else if (w.kind === "links") body = <LinksContent />;
          else if (w.kind === "thought" && w.post) body = <ThoughtPostContent post={w.post} />;
          else if (w.kind === "about") body = <AboutContent />;
          const fs = mobile && (
            w.kind === "resume" || w.kind === "talks" || w.kind === "talks2" ||
            w.kind === "apps" || w.kind === "thoughts" || w.kind === "links" || w.kind === "thought"
          );
          return (
            <MacWindow
              key={w.id}
              win={w}
              focused={focused}
              onFocus={focusWindow}
              onClose={closeWindow}
              onMove={moveWindow}
              fullScreen={fs}
            >{body}</MacWindow>
          );
        })}
      </div>

      {shutdown && (
        <ShutdownScreen onRestart={() => { setShutdown(false); setIcons(INITIAL_ICONS); setWindows([]); }} />
      )}
      <div className="hint">{hint}</div>
    </div>
  );
}

export default function Index() {
  if (Platform.OS !== "web") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text>This site is web-only.</Text>
      </View>
    );
  }
  return <MacApp />;
}
