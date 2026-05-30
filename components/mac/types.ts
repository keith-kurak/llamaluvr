import type { ReactNode } from "react";

export type MacCtx = {
  /** Open a window for the given route id. Pushes URL hash unless route is transient. */
  openRoute: (routeId: string) => void;
  /** Close a window by its DOM id. Pops history if it owned the current hash entry. */
  closeWindow: (id: string) => void;
  /** Flash a hint at the bottom of the desktop. Auto-clears after a few seconds. */
  flashHint: (msg: string) => void;
  /** Reset desktop icons to their initial layout. */
  cleanDesktop: () => void;
  /** Show the "you can now switch off your Macintosh safely" screen. */
  shutdown: () => void;
  /** Dismiss shutdown, reset everything, close all windows. */
  restart: () => void;
};

export type IconDef = {
  id: string;
  label: string;
  x?: number;
  y?: number;
  rightX?: number;
  bottomY?: number;
  anchorRight?: boolean;
  anchorBottom?: boolean;
  render: () => ReactNode;
  /** Override default open behavior. If absent, opens the route with the same id. */
  onOpen?: (ctx: MacCtx) => void;
};

export type RouteDef = {
  title: string;
  w: number;
  h: number;
  render: (ctx: MacCtx) => ReactNode;
  /** If true, opening this route doesn't push a URL hash entry (e.g. About). */
  transient?: boolean;
};

export type DynamicRouteDef = {
  /** Hash prefix this dynamic route handles, e.g. "thought" matches "#/thought/<param>". */
  prefix: string;
  resolve: (param: string) => RouteDef | null;
};

export type WindowState = {
  /** DOM-friendly id derived from routeId (":" → "-"). */
  id: string;
  /** "resume" | "thought:abc" — used to look up RouteDef and to manage hash sync. */
  routeId: string;
  title: string;
  w: number;
  h: number;
  x: number;
  y: number;
  z: number;
};

export type MenuItem = {
  id?: string;
  label?: string;
  shortcut?: string;
  disabled?: boolean;
  check?: boolean;
  divider?: boolean;
};

export type MenuConfig = {
  id: string;
  label?: string;
  icon?: ReactNode;
  hideOnMobile?: boolean;
  items: MenuItem[];
};
