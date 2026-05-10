import { useState } from "react";
import { Platform, Text, View } from "react-native";
import {
  AboutContent,
  AppsContent,
  LinksContent,
  ResumeContent,
  TalksContent,
  ThoughtPostContent,
  ThoughtsContent,
  THOUGHTS,
} from "@/components/content";
import {
  AppsFolderIcon,
  DocumentIcon,
  LinksFolderIcon,
  LlamaLogo,
  TalksFolderIcon,
  ThoughtsFolderIcon,
  TrashIcon,
} from "@/components/icons";
import { MacApp } from "@/components/mac/MacApp";
import { useHashRoute } from "@/components/mac/hash";
import type {
  DynamicRouteDef,
  IconDef,
  MacCtx,
  MenuConfig,
  RouteDef,
} from "@/components/mac/types";

if (Platform.OS === "web") {
  require("./mac.css");
}

/* ---------- desktop icons ---------- */

const ICONS: IconDef[] = [
  { id: "resume",   label: "Resume",   anchorRight: true, rightX: 96, y: 16,  render: () => <DocumentIcon /> },
  { id: "talks",    label: "Talks",    anchorRight: true, rightX: 96, y: 112, render: () => <TalksFolderIcon /> },
  { id: "apps",     label: "Apps",     anchorRight: true, rightX: 96, y: 208, render: () => <AppsFolderIcon /> },
  { id: "thoughts", label: "Thoughts", anchorRight: true, rightX: 96, y: 304, render: () => <ThoughtsFolderIcon /> },
  { id: "links",    label: "Links",    anchorRight: true, rightX: 96, y: 400, render: () => <LinksFolderIcon /> },
  {
    id: "trash", label: "Trash",
    anchorRight: true, rightX: 96, anchorBottom: true, bottomY: 110,
    render: () => <TrashIcon />,
    onOpen: (ctx) => ctx.flashHint("The Trash is empty."),
  },
];

/* ---------- routes (icon id -> window definition) ---------- */

function ThoughtsRoute({ ctx }: { ctx: MacCtx }) {
  const [sel, setSel] = useState<string | null>(null);
  return (
    <ThoughtsContent
      onOpenPost={(post) => ctx.openRoute("thought:" + post.id)}
      selectedId={sel}
      onSelect={setSel}
    />
  );
}

const ROUTES: Record<string, RouteDef> = {
  resume:   { title: "Resume",          w: 600, h: 580, render: () => <ResumeContent /> },
  talks:    { title: "Talks",           w: 560, h: 540, render: () => <TalksContent /> },
  apps:     { title: "Apps",            w: 560, h: 540, render: () => <AppsContent /> },
  thoughts: { title: "Thoughts",        w: 480, h: 420, render: (ctx) => <ThoughtsRoute ctx={ctx} /> },
  links:    { title: "Links",           w: 480, h: 360, render: () => <LinksContent /> },
  about:    { title: "About this Site",  w: 340, h: 280, render: () => <AboutContent />, transient: true },
};

const DYNAMIC_ROUTES: DynamicRouteDef[] = [
  {
    prefix: "thought",
    resolve: (postId) => {
      const post = THOUGHTS.find((p) => p.id === postId);
      if (!post) return null;
      return {
        title: post.title,
        w: 540,
        h: 520,
        render: () => <ThoughtPostContent post={post} />,
      };
    },
  },
];

/* ---------- menus ---------- */

function buildMenus(activeRoute: string | null): MenuConfig[] {
  const closeEnabled = activeRoute !== null;
  return [
  {
    id: "apple",
    icon: <LlamaLogo size={14} />,
    items: [
      { id: "about", label: "About this Site…" },
      { divider: true },
      { id: "alarm", label: "Alarm Clock", disabled: true },
      { id: "calc",  label: "Calculator", disabled: true },
      { id: "scrap", label: "Scrapbook", disabled: true },
    ],
  },
  {
    id: "file",
    label: "File",
    items: [
      { id: "open-resume", label: "Open Resume", shortcut: "⌘O" },
      { id: "open-talks",  label: "Open Talks",  shortcut: "⌘T" },
      { id: "open-apps",   label: "Open Apps",   shortcut: "⌘A" },
      { id: "open-thoughts", label: "Open Thoughts", shortcut: "⌘H" },
      { id: "open-links",  label: "Open Links",  shortcut: "⌘L" },
      { divider: true },
      { id: "close", label: "Close", shortcut: "⌘W", disabled: !closeEnabled },
      { id: "print", label: "Print…", shortcut: "⌘P", disabled: true },
    ],
  },
  {
    id: "edit",
    label: "Edit",
    hideOnMobile: true,
    items: [
      { id: "undo", label: "Undo", shortcut: "⌘Z", disabled: true },
      { divider: true },
      { id: "cut",   label: "Cut",   shortcut: "⌘X", disabled: true },
      { id: "copy",  label: "Copy",  shortcut: "⌘C", disabled: true },
      { id: "paste", label: "Paste", shortcut: "⌘V", disabled: true },
      { id: "clear", label: "Clear", disabled: true },
      { divider: true },
      { id: "selall", label: "Select All", shortcut: "⌘A", disabled: true },
    ],
  },
  {
    id: "view",
    label: "View",
    hideOnMobile: true,
    items: [
      { id: "v-icon", label: "by Icon", check: true },
      { id: "v-name", label: "by Name", disabled: true },
      { id: "v-date", label: "by Date", disabled: true },
      { id: "v-kind", label: "by Kind", disabled: true },
    ],
  },
  {
    id: "special",
    label: "Special",
    items: [
      { id: "clean", label: "Clean Up Desktop" },
      { id: "empty", label: "Empty Trash", disabled: true },
      { divider: true },
      { id: "restart",  label: "Restart" },
      { id: "shutdown", label: "Shut Down" },
    ],
  },
  ];
}

function onMenuAction(id: string, ctx: MacCtx) {
  switch (id) {
    case "about":       ctx.openRoute("about"); break;
    case "open-resume": ctx.openRoute("resume"); break;
    case "open-talks":  ctx.openRoute("talks"); break;
    case "open-apps":   ctx.openRoute("apps"); break;
    case "open-thoughts": ctx.openRoute("thoughts"); break;
    case "open-links":  ctx.openRoute("links"); break;
    case "close":       history.back(); break;
    case "clean":       ctx.cleanDesktop(); break;
    case "shutdown":    ctx.shutdown(); break;
    case "restart":     ctx.restart(); break;
  }
}

/* ---------- entry ---------- */

export default function Index() {
  const activeRoute = useHashRoute();
  if (Platform.OS !== "web") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center", padding: 24 }}>
        <Text>This site is web-only.</Text>
      </View>
    );
  }
  const menus = buildMenus(activeRoute);
  return (
    <MacApp
      menus={menus}
      icons={ICONS}
      routes={ROUTES}
      dynamicRoutes={DYNAMIC_ROUTES}
      onMenuAction={onMenuAction}
    />
  );
}
