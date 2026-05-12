import type { LinkFile } from "@/components/content";
import {
  BlueskyIcon,
  GitHubIcon,
  LinkedInIcon,
  XIcon,
} from "@/components/icons";

export const LINKS: LinkFile[] = [
  { kind: "link", id: "bluesky",  title: "Bluesky",  url: "https://bsky.app/profile/keith.bsky.social", icon: BlueskyIcon },
  { kind: "link", id: "x",        title: "X",        url: "https://x.com/llamaluvr", icon: XIcon },
  { kind: "link", id: "github",   title: "GitHub",   url: "https://github.com/keith-kurak", icon: GitHubIcon },
  { kind: "link", id: "linkedin", title: "LinkedIn", url: "https://www.linkedin.com/in/keith-kurak/", icon: LinkedInIcon },
];
