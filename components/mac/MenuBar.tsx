import { useEffect, useRef, useState, type ReactNode } from "react";
import { formatTime, useClock } from "./hooks";
import type { MenuConfig, MenuItem } from "./types";

export function MenuBar({
  menus,
  onAction,
}: {
  menus: MenuConfig[];
  onAction: (id: string) => void;
  mobile: boolean;
}) {
  const t = useClock();
  const [open, setOpen] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(null);
    }
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  function pick(item: MenuItem) {
    setOpen(null);
    if (item.disabled || !item.id) return;
    onAction(item.id);
  }

  function MenuButton({
    id,
    label,
    icon,
    hideOnMobile,
    items,
  }: {
    id: string;
    label?: string;
    icon?: ReactNode;
    hideOnMobile?: boolean;
    items: MenuItem[];
  }) {
    return (
      <div
        className={"menu-item" + (open === id ? " open" : "") + (hideOnMobile ? " hide-mobile" : "")}
        onMouseDown={(e) => { e.stopPropagation(); setOpen(open === id ? null : id); }}
        onMouseEnter={() => { if (open && open !== id) setOpen(id); }}
      >
        {icon ?? label}
        {open === id && (
          <div className="dropdown" onMouseDown={(e) => e.stopPropagation()}>
            {items.map((it, i) =>
              it.divider ? (
                <div className="dropdown-divider" key={i} />
              ) : (
                <div
                  key={it.id ?? i}
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
      {menus.map((m) => (
        <MenuButton
          key={m.id}
          id={m.id}
          label={m.label}
          icon={m.icon}
          hideOnMobile={m.hideOnMobile}
          items={m.items}
        />
      ))}
      <div className="menu-spacer" />
      <div className="menu-clock">{formatTime(t)}</div>
    </div>
  );
}
