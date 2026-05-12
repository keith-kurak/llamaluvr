import type { DocFile } from "@/components/content";

export const THOUGHTS: DocFile[] = [
  {
    kind: "doc",
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
    kind: "doc",
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
    kind: "doc",
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
