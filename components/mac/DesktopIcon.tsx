import { useRef, useState } from "react";
import { snap } from "./hooks";
import type { IconDef } from "./types";

export function DesktopIcon({
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
