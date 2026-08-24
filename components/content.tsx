// Content components: Resume, Talks, Apps, Thoughts, About

import type * as React from "react";
import { DocumentIcon, LinkDocIcon } from "./icons";

export type DocFile = {
  kind: "doc";
  id: string;
  title: string;
  date?: string;
  read?: string;
  body: string[];
};

export type LinkFile = {
  kind: "link";
  id: string;
  title: string;
  url: string;
  icon?: React.ComponentType;
};

export type FolderFile = DocFile | LinkFile;

function LinkArrowBadge() {
  // Small up-right arrow badge in the bottom-right corner of an icon,
  // rendered with a white halo so it reads cleanly over any silhouette.
  return (
    <svg
      viewBox="0 0 16 16"
      style={{
        position: "absolute",
        right: -2,
        bottom: -2,
        width: 14,
        height: 14,
      }}
    >
      <rect x="1" y="1" width="14" height="14" fill="white" stroke="black" strokeWidth="1" />
      <line x1="4" y1="11" x2="11" y2="4" stroke="black" strokeWidth="2" />
      <polygon points="11,4 6,4 11,9" fill="black" />
    </svg>
  );
}

export function ResumeContent() {
  return (
    <div className="resume">
      <h1>KEITH KURAK</h1>
      <div className="contact">
        Cleveland, OH
      </div>

      <h2>Summary</h2>
      <p>
        Mobile and web developer (but mostly mobile) who does a lot non-development things. Stop me and I'll talk your ear off about Expo.
      </p>

      <h2>Experience</h2>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Developer Success Engineer(ing manager) / Head of Field Engineering-related Things</span>
          <span className="job-dates">2022 — Present</span>
        </div>
        <div className="job-company">Expo</div>
        <ul>
          <li>Building out a team responsible for enterprise field engineering, technical account management, growth engineering, support, and compliance. Phew!</li>
          <li>You might have seen me answering random React Native questions on Office Hours</li>
          <li>Lots of odds-and-ends to help developers do cool stuff with Expo- talks, workshops, blogs, Expo Doctor, etc.</li>
        </ul>
      </div>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Lead Mobile Engineer</span>
          <span className="job-dates">2017 — 2022</span>
        </div>
        <div className="job-company">Nudge Coach</div>
        <ul>
          <li>Where I got React Native-pilled</li>
          <li>Transitioned a Cordova health engagement white label platform to Expo</li>
          <li>Build some crazy semi-automation pipeline to do the above without going insane with a Mac-in-cloud, Node scripts, bubble gum, and duct tape</li>
        </ul>
      </div>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Technical Product Owner / Web Developer</span>
          <span className="job-dates">2014 — 2017</span>
        </div>
        <div className="job-company">MediQuant</div>
        <ul>
          <li>Did some cool stuff, can't remember at the moment</li>
          <li>Are you really still reading?</li>
        </ul>
      </div>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Project Lead and some other stuff</span>
          <span className="job-dates">2004 — 2014</span>
        </div>
        <div className="job-company">Alcoa</div>
        <ul>
          <li>Still shaking aluminum shavings out of my shoes</li>
        </ul>
      </div>

      <h2>Speaking</h2>
      <ul>
        <li>Chain React, App.js Conf, React Miami, CodeMash, KC DC, and more</li>
      </ul>

      <h2>Skills</h2>
      <div className="skills">
        {["React Native", "Expo", "TypeScript", "C# a long time ago", "Swift",
          "Pivot tables, no really", "PICO 8"]
          .map((s) => <span className="skill" key={s}>{s}</span>)}
      </div>

      <h2>Education</h2>
      <p>M.B.A — [Baldwin Wallace University, 2014]</p>
      <p>B.S. Computer Science — [Case Western Reserve University, 2005]</p>

      <h2>Off the keyboard</h2>
      <p>Cycling around Cleveland · LEGO computer cases · Inventing unconventional omelette fillings.</p>
    </div>
  );
}

const TALKS = [
  {
    id: "tloh",
    videoId: "TLoHua8bzPg",
    title: "Embracing Native Code and Capabilities in Expo",
    venue: "Chain React",
    year: "2024",
    desc: "How today's Expo adapts as you need to customize your native projects, speeds up local development, and provides complex build setups via a simple config file.",
  },
  {
    id: "czca",
    videoId: "CZCassWCEnE",
    title: "Universal Full Stack Apps with Expo Router",
    venue: "React Miami",
    year: "2024",
    desc: "Web routing meets mobile navigation. File-system routes that double as deep links — and as your backend API.",
  },
  {
    id: "wkni",
    videoId: "wKNi8_XX6Ms",
    title: "The Last Mobile Mile",
    venue: "App.js Conf",
    year: "2024",
    desc: "Font scaling, dark mode, accessibility, keyboard interactions, home screen widgets — making your React Native app feel actually native on iOS and Android.",
  },
  {
    id: "zh57",
    videoId: "zH57quNVNL8",
    title: "Building Universal Apps with React Native and Expo",
    venue: "CodeMash",
    year: "2024",
    desc: "An intro to building real native iOS, Android, and web apps from a single Expo + React Native codebase, with skills you already have as a web dev.",
  },
];

function ytThumb(id: string) {
  return `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
}
function ytUrl(id: string) {
  return `https://www.youtube.com/watch?v=${id}`;
}

export function Talks2Content() {
  return (
    <div className="talks">
      <div className="talks-header">
        <h2>Talks &amp; Conference Videos</h2>
        <div className="talks-sub">
          A few of the conference talks I've given on React Native, Expo, and shipping universal apps. Click any card to watch on YouTube.
        </div>
      </div>
      <div className="talks-grid">
        {TALKS.map((t) => (
          <a
            key={t.id}
            className="talk-card"
            href={ytUrl(t.videoId)}
            target="_blank"
            rel="noopener noreferrer"
          >
            <div
              className="talk-thumb"
              style={{ backgroundImage: `url(${ytThumb(t.videoId)})` }}
            >
              <div className="play-btn" />
            </div>
            <div className="talk-body">
              <div className="talk-meta">{t.venue} · {t.year}</div>
              <div className="talk-title">{t.title}</div>
              <div className="talk-desc">{t.desc}</div>
              <div className="talk-link">Watch on YouTube</div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export function TalksContent() {
  return (
    <div className="talks-retro">
      <div className="talks-retro-toolbar">
        <span>{TALKS.length} items</span>
        <span className="talks-retro-toolbar-mid">Talks</span>
        <span>{TALKS.length * 17}K in folder</span>
      </div>
      <ul className="talks-retro-list">
        {TALKS.map((t) => (
          <li key={t.id} className="talks-retro-row">
            <a
              className="talks-retro-link"
              href={ytUrl(t.videoId)}
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="talks-retro-icon">
                <img src={ytThumb(t.videoId)} alt="" />
              </div>
              <div className="talks-retro-body">
                <div className="talks-retro-title">{t.title}</div>
                <div className="talks-retro-meta">{t.venue} · {t.year}</div>
                <div className="talks-retro-desc">{t.desc}</div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AboutContent() {
  return (
    <div className="about-box">
      <div className="big">Keith Kurak</div>
      <div className="small">
        Personal computer.<br />
        Personal blog.<br />
        Made with HTML, ca. 1986... err, 2025.
      </div>
      <div className="ascii-mac">{
`   ___________________
  |  _______________  |
  | |               | |
  | |               | |
  | |    hello.     | |
  | |               | |
  | |_______________| |
  |___________________|
       \\_____/  \\_/
        \\_____/`
      }</div>
      <div className="small">v 6.0.3</div>
    </div>
  );
}

type App = {
  id: string;
  name: string;
  /** External site, or an internal /apps/[appSlug] page. Opens in a new tab. */
  site: string | null;
  desc: string;
  initials: string;
  play: string | null;
  apple: string | null;
  icon?: string | number | { uri: string };
};

const justKanaIcon = require("../content/assets/justkana.png");
const introvertChatIcon = require("../content/assets/introvertchat.png");
const pancakeTheoryIcon = require("../content/assets/pancaketheory.png");
const freeEnterpriserIcon = require("../content/assets/ff4-free-enterpriser.png");
const podcastDuckIcon = require("../content/assets/podcastduck.png");

const APPS: App[] = [
  {
    id: "podcastduck",
    name: "Podcast Duck",
    site: "/apps/podcast-duck",
    desc: "I got a Pixel Watch, and the podcast situation is weirdly a little worse than my humble Garmin. This is my attempt at less-is-more. Subscribe to some podcasts, sync only the episodes you want to the watch.",
    initials: "PD",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.tinypodcatcher",
    apple: null,
    icon: podcastDuckIcon,
  },
  {
    id: "justkana",
    name: "Just Some Kana",
    site: "https://keith-kurak.github.io/just-kana/",
    desc: "A simple, focused way to drill Japanese hiragana and katakana. Just kana — no clutter, no daily streak guilt-trip, no forced lessons.",
    initials: "か",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.justkana&hl=en_US",
    apple: "https://apps.apple.com/us/app/just-some-kana/id1671606312",
    icon: justKanaIcon,
  },
  {
    id: "introvertchat",
    name: "Introvert Chat",
    site: null,
    desc: "Group messaging for people who'd rather not. Quiet defaults, opt-in notifications, and a strict no-typing-indicators policy.",
    initials: "IC",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.introvertchat",
    apple: "https://apps.apple.com/us/app/introvert-chat/id6742565690",
    icon: introvertChatIcon,
  },
  {
    id: "pancaketheory",
    name: "Pancake Theory",
    site: "https://pancaketheory.expo.app/home",
    desc: "A breakfast-physics-based puzzler. Stack the perfect pancake without losing structural integrity. NOT! It's just recipes, AI has weird ideas.",
    initials: "PT",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.pancaketheory&hl=en_US",
    apple: "https://apps.apple.com/us/app/pancake-theory/id6754523206",
    icon: pancakeTheoryIcon,
  },
  {
    id: "freeenterpriser",
    name: "FF4 Free Enterpriser",
    site: null,
    desc: "A little utility I made in an afternoon on Replit to help me track my progress in Final Fantasy IV Free Enterprise runs. Some of the info is wrong, don't trust it 100%!",
    initials: "FE",
    play: "https://play.google.com/store/apps/details?id=com.fetracker.app&hl=en_US",
    apple: null,
    icon: freeEnterpriserIcon,
  },
];

export function FolderContent({
  name,
  description,
  files,
  selectedId,
  onSelect,
  onOpenDoc,
}: {
  name: string;
  description?: string;
  files: FolderFile[];
  selectedId?: string | null;
  onSelect?: (id: string | null) => void;
  onOpenDoc?: (doc: DocFile) => void;
}) {
  return (
    <div className="thoughts-folder">
      <div className="thoughts-toolbar">
        <span>{files.length} items</span>
        <span className="thoughts-toolbar-mid"></span>
        <span>{files.length * 23}K in folder</span>
      </div>
      {description && <div className="thoughts-folder-desc">{description}</div>}
      <div
        className="thoughts-grid"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).classList.contains("thoughts-grid")) onSelect?.(null);
        }}
      >
        {files.map((f) => {
          const sel = selectedId === f.id;
          const cls = "thoughts-doc-icon" + (sel ? " selected" : "");
          if (f.kind === "link") {
            const Icon = f.icon ?? LinkDocIcon;
            return (
              <div
                key={f.id}
                className={cls}
                onMouseDown={(e) => { e.stopPropagation(); onSelect?.(f.id); }}
                onDoubleClick={(e) => {
                  e.stopPropagation();
                  window.open(f.url, "_blank", "noopener,noreferrer");
                }}
              >
                <div className="thoughts-doc-img">
                  <Icon />
                  {f.icon && <LinkArrowBadge />}
                </div>
                <div className="thoughts-doc-label">{f.title}</div>
              </div>
            );
          }
          return (
            <div
              key={f.id}
              className={cls}
              onMouseDown={(e) => { e.stopPropagation(); onSelect?.(f.id); }}
              onDoubleClick={(e) => { e.stopPropagation(); onOpenDoc?.(f); }}
            >
              <div className="thoughts-doc-img"><DocumentIcon /></div>
              <div className="thoughts-doc-label">{f.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DocContent({ doc }: { doc: DocFile }) {
  const hasMeta = doc.date || doc.read;
  return (
    <div className="post">
      <h1>{doc.title}</h1>
      {hasMeta && (
        <div className="post-meta">
          {doc.date}
          {doc.date && doc.read ? <> &nbsp;·&nbsp; </> : null}
          {doc.read}
        </div>
      )}
      {doc.body.map((p, i) => <p key={i}>{p}</p>)}
      <div className="post-sig">— Keith</div>
    </div>
  );
}

export type ListItemLink = {
  title: string;
  url: string;
};

export type ListItem = {
  id: string;
  title: string;
  description: string;
  /**
   * URL string, or an imported image module (Metro returns the URL as a string
   * on web but the type is `number`). When omitted, falls back to `initials`.
   */
  thumbnail?: string | number | { uri: string };
  initials?: string;
  links?: ListItemLink[];
};

function thumbnailSrc(t: ListItem["thumbnail"]): string | undefined {
  if (t == null) return undefined;
  if (typeof t === "string") return t;
  if (typeof t === "object" && "uri" in t) return t.uri;
  // Metro returns the resolved URL string at runtime on web even though
  // the TypeScript type is `number`.
  return t as unknown as string;
}

export function ListFolderContent({
  name,
  items,
  description,
}: {
  name: string;
  items: ListItem[];
  description?: string;
}) {
  return (
    <div className="list-folder">
      <div className="list-folder-toolbar">
        <span>{items.length} items</span>
        <span className="list-folder-toolbar-mid"></span>
        <span>{items.length * 412}K in folder</span>
      </div>
      {description && <div className="thoughts-folder-desc">{description}</div>}
      <ul className="list-folder-list">
        {items.map((item) => (
          <li key={item.id} className="list-folder-row">
            <div className="list-folder-icon" aria-hidden="true">
              {item.thumbnail ? (
                <img src={thumbnailSrc(item.thumbnail)} alt="" />
              ) : (
                <span className="list-folder-glyph">{item.initials ?? item.title.slice(0, 2).toUpperCase()}</span>
              )}
            </div>
            <div className="list-folder-body">
              <div className="list-folder-title">{item.title}</div>
              <div className="list-folder-desc">{item.description}</div>
              {item.links && item.links.length > 0 && (
                <div className="list-folder-links">
                  {item.links.map((l) => (
                    <a
                      key={l.url}
                      className="list-folder-link"
                      href={l.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >{l.title}</a>
                  ))}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function AppsContent() {
  return (
    <div className="apps-retro">
      <div className="apps-retro-toolbar">
        <span>{APPS.length} items</span>
        <span className="apps-retro-toolbar-mid">Apps</span>
        <span>{APPS.length * 412}K in folder</span>
      </div>
      <ul className="apps-retro-list">
        {APPS.map((a) => (
          <li key={a.id} className="apps-retro-row">
            <div className="apps-retro-icon" aria-hidden="true">
              {a.icon ? (
                <img src={thumbnailSrc(a.icon)} alt="" />
              ) : (
                <span className="apps-retro-glyph">{a.initials}</span>
              )}
            </div>
            <div className="apps-retro-body">
              {a.site ? (
                <a
                  className="apps-retro-title"
                  href={a.site}
                  target="_blank"
                  rel="noopener noreferrer"
                >{a.name}</a>
              ) : (
                <span className="apps-retro-title apps-retro-title--plain">{a.name}</span>
              )}
              <div className="apps-retro-desc">{a.desc}</div>
              {(a.play || a.apple) && (
                <div className="apps-retro-links">
                  {a.play && (
                    <a className="apps-retro-link" href={a.play} target="_blank" rel="noopener noreferrer">▶ Google Play</a>
                  )}
                  {a.apple && (
                    <a className="apps-retro-link" href={a.apple} target="_blank" rel="noopener noreferrer">◍ App Store</a>
                  )}
                </div>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
