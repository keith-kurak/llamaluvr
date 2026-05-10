// Content components: Resume, Talks, Apps, Thoughts, About

import { DocumentIcon } from "./icons";

export type Thought = {
  id: string;
  title: string;
  date: string;
  read: string;
  body: string[];
};

export function ResumeContent() {
  return (
    <div className="resume">
      <h1>KEITH KURAK</h1>
      <div className="contact">
        Cleveland, OH &nbsp;·&nbsp; keith@example.com &nbsp;·&nbsp; @kkurak
      </div>

      <h2>Summary</h2>
      <p>
        Developer-focused engineer building tools, docs, and demos that help
        mobile teams ship faster. Specializing in React Native, Expo, and the
        last-mile details that make cross-platform apps feel truly native.
      </p>

      <h2>Experience</h2>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Developer Success Engineer</span>
          <span className="job-dates">2022 — Present</span>
        </div>
        <div className="job-company">Expo</div>
        <ul>
          <li>Built reference apps and learning paths used by tens of thousands of devs.</li>
          <li>Speaker at React Miami, Chain React, App.js, and CodeMash.</li>
          <li>Authored deep dives on Continuous Native Generation, Router, and EAS.</li>
        </ul>
      </div>
      <div className="job">
        <div className="job-header">
          <span className="job-title">Senior Mobile Engineer</span>
          <span className="job-dates">2018 — 2022</span>
        </div>
        <div className="job-company">[Company — edit me]</div>
        <ul>
          <li>Led a team building React Native apps used by 1M+ users.</li>
          <li>Migrated brownfield iOS app to a unified RN codebase.</li>
          <li>Standardized CI/CD pipeline; cut release time from 2 weeks to 2 days.</li>
        </ul>
      </div>
      <div className="job">
        <div className="job-header">
          <span className="job-title">iOS Engineer</span>
          <span className="job-dates">2014 — 2018</span>
        </div>
        <div className="job-company">[Company — edit me]</div>
        <ul>
          <li>Shipped consumer iOS apps in Swift &amp; Objective-C.</li>
          <li>Mentored junior engineers; ran an internal "Swift study hall".</li>
        </ul>
      </div>

      <h2>Speaking</h2>
      <ul>
        <li>Chain React, App.js Conf, React Miami, CodeMash, Code Youngstown.</li>
      </ul>

      <h2>Skills</h2>
      <div className="skills">
        {["React Native", "Expo", "TypeScript", "Swift", "Kotlin", "SwiftUI",
          "EAS", "Expo Router", "Tamagui", "Reanimated", "CI/CD", "Public Speaking"]
          .map((s) => <span className="skill" key={s}>{s}</span>)}
      </div>

      <h2>Education</h2>
      <p>B.S. Computer Science — [University, year]</p>

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

const APPS = [
  {
    id: "justkana",
    name: "Just Kana",
    site: "https://justkana.app",
    desc: "A simple, focused way to drill Japanese hiragana and katakana. Just kana — no clutter, no daily streak guilt-trip, no forced lessons.",
    initials: "か",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.justkana&hl=en_US",
    apple: "#",
  },
  {
    id: "introvertchat",
    name: "Introvert Chat",
    site: "https://introvertchat.app",
    desc: "Group messaging for people who'd rather not. Quiet defaults, opt-in notifications, and a strict no-typing-indicators policy.",
    initials: "IC",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.introvertchat",
    apple: "#",
  },
  {
    id: "pancaketheory",
    name: "Pancake Theory",
    site: "https://pancaketheory.app",
    desc: "A breakfast-physics-based puzzler. Stack the perfect pancake without losing structural integrity. Syrup gravity included.",
    initials: "PT",
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.pancaketheory&hl=en_US",
    apple: "#",
  },
];

export const THOUGHTS: Thought[] = [
  {
    id: "rn-last-mile",
    title: "The Last Mile of React Native",
    date: "Mar 14, 2025",
    read: "6 min",
    body: [
      "Most React Native projects don't fail because of the framework. They fail in the last mile — the bit between \"it works on my simulator\" and \"users have it in their hands.\"",
      "I've spent the last few years pulling apart that last mile, and almost all of it boils down to three things: native build configuration, release pipelines, and platform-specific weirdness that nobody warns you about.",
      "Build configuration is where most teams quietly accept defeat. The fix isn't more native expertise — it's making your app's native config a generated artifact, regenerable from a manifest. Continuous Native Generation (Expo's term, but the idea predates it) lets you treat ios/ and android/ like build/, not src/.",
      "Release pipelines are where you accidentally invent a deployment company. EAS, Fastlane, Bitrise — pick something, but pick something. Hand-rolled scripts will outlive you, and not in a good way.",
      "And the platform-specific weirdness? Buy a cheap Android tablet and a 5-year-old iPhone, and test on them every Friday. You will be humbled, and your app will be better.",
    ],
  },
  {
    id: "small-apps",
    title: "In Praise of Small Apps",
    date: "Feb 02, 2025",
    read: "4 min",
    body: [
      "I make small apps. Not minimum-viable-product small. Just small.",
      "Just Kana is a kana flashcard drill. That's it. There's no streak counter, no XP bar, no daily reminder, no \"keep your dragon alive\". You open it, you tap kana, you close it.",
      "It turns out a lot of people want software like this — software that knows what it is, does that, and gets out of the way. The hard part is having the discipline to not bolt on the next feature.",
      "Every feature you don't build is a feature that doesn't break. Every screen you don't add is a screen you don't have to translate, redesign, or explain to a confused user. Constraint is a feature.",
      "If you're working on something, ask: what would the smallest possible version of this look like? Then ship that, and resist the urge to grow it for at least a month.",
    ],
  },
  {
    id: "talks-i-give",
    title: "On Giving the Same Talk Five Times",
    date: "Dec 11, 2024",
    read: "3 min",
    body: [
      "I gave more or less the same talk at five different conferences last year. I'd like to defend that.",
      "The first time you give a talk, you're figuring out what it's even about. By the second, you know which slides aren't pulling their weight. By the third, you can read the room. By the fourth, you can hold for laughs. By the fifth, the talk is good.",
      "Conferences are not Netflix. The audiences barely overlap. The number of people who attend two conferences in a year is small; the number who attend five is essentially zero.",
      "If you have a talk that's worth giving, give it until it's done. Then write it down, and start the next one.",
    ],
  },
];

export function ThoughtsContent({
  onOpenPost,
  selectedId,
  onSelect,
}: {
  onOpenPost: (post: Thought) => void;
  selectedId: string | null | undefined;
  onSelect: (id: string | null) => void;
}) {
  return (
    <div className="thoughts-folder">
      <div className="thoughts-toolbar">
        <span>{THOUGHTS.length} items</span>
        <span className="thoughts-toolbar-mid">Thoughts</span>
        <span>{THOUGHTS.length * 23}K in folder</span>
      </div>
      <div
        className="thoughts-grid"
        onMouseDown={(e) => {
          if ((e.target as HTMLElement).classList.contains("thoughts-grid")) onSelect(null);
        }}
      >
        {THOUGHTS.map((t) => {
          const sel = selectedId === t.id;
          return (
            <div
              key={t.id}
              className={"thoughts-doc-icon" + (sel ? " selected" : "")}
              onMouseDown={(e) => { e.stopPropagation(); onSelect(t.id); }}
              onDoubleClick={(e) => { e.stopPropagation(); onOpenPost(t); }}
            >
              <div className="thoughts-doc-img"><DocumentIcon /></div>
              <div className="thoughts-doc-label">{t.title}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ThoughtPostContent({ post }: { post: Thought }) {
  return (
    <div className="post">
      <h1>{post.title}</h1>
      <div className="post-meta">{post.date} &nbsp;·&nbsp; {post.read}</div>
      {post.body.map((p, i) => <p key={i}>{p}</p>)}
      <div className="post-sig">— Keith</div>
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
              <span className="apps-retro-glyph">{a.initials}</span>
            </div>
            <div className="apps-retro-body">
              <a
                className="apps-retro-title"
                href={a.site}
                target="_blank"
                rel="noopener noreferrer"
              >{a.name}</a>
              <div className="apps-retro-desc">{a.desc}</div>
              <div className="apps-retro-links">
                <a className="apps-retro-link" href={a.play} target="_blank" rel="noopener noreferrer">▶ Google Play</a>
                <a className="apps-retro-link" href={a.apple} target="_blank" rel="noopener noreferrer">◍ App Store</a>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
