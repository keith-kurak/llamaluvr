// 1-bit pixel-style icons. crispEdges via global SVG rule.

export function MovieIcon() {
  return (
    <svg viewBox="0 0 36 36">
      <rect x="2" y="6" width="32" height="26" fill="white" stroke="black" strokeWidth="1" />
      <rect x="4" y="9" width="3" height="3" fill="black" />
      <rect x="4" y="15" width="3" height="3" fill="black" />
      <rect x="4" y="21" width="3" height="3" fill="black" />
      <rect x="4" y="27" width="3" height="2" fill="black" />
      <rect x="29" y="9" width="3" height="3" fill="black" />
      <rect x="29" y="15" width="3" height="3" fill="black" />
      <rect x="29" y="21" width="3" height="3" fill="black" />
      <rect x="29" y="27" width="3" height="2" fill="black" />
      <path d="M14 13 L24 19 L14 25 Z" fill="black" />
    </svg>
  );
}

export function LlamaLogo({ size = 16, color = "currentColor" }: { size?: number; color?: string }) {
  // 1-bit llama silhouette, 12 wide x 12 tall. Side profile, head up-left, body to the right.
  const grid = [
    "XX.X........",
    "XXXX........",
    ".XXX........",
    "..XX........",
    "..XX........",
    ".XXX........",
    ".XXXX.......",
    "XXXXXXXX....",
    "XXXXXXXXX...",
    "XXXXXXXX.X..",
    "XX...XX.....",
    "XX...XX.....",
  ];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 12 12"
      style={{ display: "inline-block", verticalAlign: "middle" }}
    >
      {grid.map((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null
        )
      )}
    </svg>
  );
}

export function AppleLogo({ size = 14, color = "currentColor" }: { size?: number; color?: string }) {
  const grid = [
    "..XX...",
    ".XX....",
    "XXXXXX.",
    "XXXXXXX",
    "XXXXXXX",
    "XXXXXXX",
    ".XXXXX.",
  ];
  return (
    <svg width={size} height={size} viewBox="0 0 7 7" style={{ display: "inline-block", verticalAlign: "middle" }}>
      {grid.map((row, y) =>
        row.split("").map((c, x) =>
          c === "X" ? <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill={color} /> : null
        )
      )}
    </svg>
  );
}

export function DocumentIcon() {
  return (
    <svg viewBox="0 0 32 40">
      <path d="M3 1 H22 L29 8 V39 H3 Z" fill="white" stroke="black" strokeWidth="1" />
      <path d="M22 1 V8 H29" fill="white" stroke="black" strokeWidth="1" />
      <rect x="7" y="14" width="17" height="1" fill="black" />
      <rect x="7" y="18" width="17" height="1" fill="black" />
      <rect x="7" y="22" width="17" height="1" fill="black" />
      <rect x="7" y="26" width="17" height="1" fill="black" />
      <rect x="7" y="30" width="11" height="1" fill="black" />
    </svg>
  );
}

export function FolderIcon() {
  return (
    <svg viewBox="0 0 38 30">
      <path d="M2 8 H13 L16 4 H35 V27 H2 Z" fill="white" stroke="black" strokeWidth="1" />
    </svg>
  );
}

export function TalksFolderIcon() {
  return (
    <svg viewBox="0 0 38 30">
      <path d="M2 8 H13 L16 4 H35 V27 H2 Z" fill="white" stroke="black" strokeWidth="1" />
      <rect x="11" y="13" width="16" height="11" fill="white" stroke="black" strokeWidth="1" />
      <rect x="12" y="14" width="1" height="1" fill="black" />
      <rect x="12" y="17" width="1" height="1" fill="black" />
      <rect x="12" y="20" width="1" height="1" fill="black" />
      <rect x="25" y="14" width="1" height="1" fill="black" />
      <rect x="25" y="17" width="1" height="1" fill="black" />
      <rect x="25" y="20" width="1" height="1" fill="black" />
      <path d="M16 15 L21 18.5 L16 22 Z" fill="black" />
    </svg>
  );
}

export function AppsFolderIcon() {
  return (
    <svg viewBox="0 0 38 30">
      <path d="M2 8 H13 L16 4 H35 V27 H2 Z" fill="white" stroke="black" strokeWidth="1" />
      <rect x="13" y="13" width="5" height="5" fill="black" />
      <rect x="20" y="13" width="5" height="5" fill="white" stroke="black" strokeWidth="1" />
      <rect x="13" y="20" width="5" height="5" fill="white" stroke="black" strokeWidth="1" />
      <rect x="20" y="20" width="5" height="5" fill="black" />
    </svg>
  );
}

export function ThoughtsFolderIcon() {
  return (
    <svg viewBox="0 0 38 30">
      <path d="M2 8 H13 L16 4 H35 V27 H2 Z" fill="white" stroke="black" strokeWidth="1" />
      <path d="M14 12 H22 L25 15 V25 H14 Z" fill="white" stroke="black" strokeWidth="1" />
      <path d="M22 12 V15 H25" fill="white" stroke="black" strokeWidth="1" />
      <rect x="16" y="17" width="7" height="1" fill="black" />
      <rect x="16" y="20" width="7" height="1" fill="black" />
      <rect x="16" y="23" width="5" height="1" fill="black" />
    </svg>
  );
}

export function TrashIcon() {
  return (
    <svg viewBox="0 0 30 34">
      <rect x="11" y="1" width="8" height="2" fill="white" stroke="black" strokeWidth="1" />
      <rect x="3" y="4" width="24" height="3" fill="white" stroke="black" strokeWidth="1" />
      <path d="M5 8 L7 32 H23 L25 8 Z" fill="white" stroke="black" strokeWidth="1" />
      <line x1="10" y1="11" x2="10" y2="29" stroke="black" strokeWidth="1" />
      <line x1="15" y1="11" x2="15" y2="29" stroke="black" strokeWidth="1" />
      <line x1="20" y1="11" x2="20" y2="29" stroke="black" strokeWidth="1" />
    </svg>
  );
}

export function LinksFolderIcon() {
  // Folder with two small overlapping window rectangles inside
  return (
    <svg viewBox="0 0 38 30">
      <path d="M2 8 H13 L16 4 H35 V27 H2 Z" fill="white" stroke="black" strokeWidth="1" />
      {/* back rectangle */}
      <rect x="18" y="11" width="10" height="8" fill="white" stroke="black" strokeWidth="1" />
      {/* front rectangle (overlapping) */}
      <rect x="14" y="15" width="10" height="8" fill="white" stroke="black" strokeWidth="1" />
    </svg>
  );
}

export function LinkDocIcon() {
  // Document with an up-right arrow drawn over it
  return (
    <svg viewBox="0 0 32 40">
      <path d="M3 1 H22 L29 8 V39 H3 Z" fill="white" stroke="black" strokeWidth="1" />
      <path d="M22 1 V8 H29" fill="white" stroke="black" strokeWidth="1" />
      {/* arrow shaft */}
      <line x1="10" y1="28" x2="22" y2="16" stroke="black" strokeWidth="2" />
      {/* arrow head */}
      <polygon points="22,16 16,16 22,22" fill="black" />
    </svg>
  );
}

export function BlueskyIcon() {
  // Stylized butterfly silhouette — two wings meeting at a body.
  return (
    <svg viewBox="0 0 32 32">
      <path
        d="M16 22 C12 14 7 7 4 7 C2 7 2 12 4 16 C6 19 9 20 11 20 C8 20 5 22 5 25 C5 28 9 28 12 26 C14 25 15 23 16 22 C17 23 18 25 20 26 C23 28 27 28 27 25 C27 22 24 20 21 20 C23 20 26 19 28 16 C30 12 30 7 28 7 C25 7 20 14 16 22 Z"
        fill="black"
      />
    </svg>
  );
}

export function XIcon() {
  // Bold X mark.
  return (
    <svg viewBox="0 0 32 32">
      <path d="M5 5 H11 L27 27 H21 Z" fill="black" />
      <path d="M21 5 H27 L11 27 H5 Z" fill="black" />
    </svg>
  );
}

export function GitHubIcon() {
  // Octocat-style cat silhouette with pointed ears and a tail.
  return (
    <svg viewBox="0 0 32 32">
      {/* ears */}
      <polygon points="7,8 12,3 12,11" fill="black" />
      <polygon points="25,8 20,3 20,11" fill="black" />
      {/* head/body */}
      <ellipse cx="16" cy="17" rx="11" ry="10" fill="black" />
      {/* eyes */}
      <rect x="11" y="15" width="2" height="3" fill="white" />
      <rect x="19" y="15" width="2" height="3" fill="white" />
      {/* mouth */}
      <rect x="14" y="21" width="4" height="1" fill="white" />
      {/* tail */}
      <path d="M16 26 Q16 30 12 30 L12 28 Q14 28 14 25 Z" fill="black" />
    </svg>
  );
}

export function LinkedInIcon() {
  // Solid square with white "in".
  return (
    <svg viewBox="0 0 32 32">
      <rect x="3" y="3" width="26" height="26" fill="black" />
      {/* i dot */}
      <rect x="8"  y="9"  width="3"  height="3"  fill="white" />
      {/* i stem */}
      <rect x="8"  y="14" width="3"  height="11" fill="white" />
      {/* n */}
      <rect x="14" y="14" width="3"  height="11" fill="white" />
      <rect x="14" y="14" width="10" height="3"  fill="white" />
      <rect x="21" y="14" width="3"  height="11" fill="white" />
    </svg>
  );
}

export function StopIcon() {
  // Octagon with a white hand silhouette inside — classic Mac stop alert.
  return (
    <svg viewBox="0 0 32 32">
      <polygon
        points="10,1 22,1 31,10 31,22 22,31 10,31 1,22 1,10"
        fill="black"
        stroke="black"
        strokeWidth="1"
      />
      {/* fingers */}
      <rect x="11" y="9"  width="2" height="10" fill="white" />
      <rect x="14" y="7"  width="2" height="12" fill="white" />
      <rect x="17" y="8"  width="2" height="11" fill="white" />
      <rect x="20" y="10" width="2" height="9"  fill="white" />
      {/* palm */}
      <rect x="10" y="18" width="13" height="6" fill="white" />
    </svg>
  );
}

export function ClassicMacIcon() {
  return (
    <svg viewBox="0 0 32 36">
      <rect x="2" y="2" width="28" height="32" fill="white" stroke="black" strokeWidth="1" />
      <rect x="5" y="5" width="22" height="16" fill="white" stroke="black" strokeWidth="1" />
      <rect x="6" y="24" width="14" height="2" fill="black" />
      <rect x="6" y="28" width="14" height="2" fill="black" />
      <rect x="22" y="24" width="6" height="1" fill="black" />
    </svg>
  );
}
