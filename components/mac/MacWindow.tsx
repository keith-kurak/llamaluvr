import { useState, type ReactNode } from "react";
import type { WindowState } from "./types";

export function MacWindow({
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
  children: ReactNode;
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
