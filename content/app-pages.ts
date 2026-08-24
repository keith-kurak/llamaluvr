// Standalone marketing/store pages for my apps.
// These render under /apps/[appSlug] and are intentionally separate from the
// rest of the site: no Mac desktop chrome, their own styling. These are the
// pages linked from the app store listings.

export type AppPage = {
  slug: string;
  name: string;
  tagline: string;
  /** Short blurb under the app name on the home page. */
  intro: string;
  /** Icon asset (Metro returns the resolved URL string on web). */
  icon: string | number | { uri: string };
  play: string | null;
  apple: string | null;
  /** Accent color pulled from the app icon. */
  accent: string;
  background: string;
  features: { title: string; body: string }[];
  /** Support contact shown in the footer and the privacy policy. */
  email: string;
  privacy: {
    updated: string;
    /** Paragraphs shown under the privacy policy heading. */
    intro: string[];
    sections: { title: string; body: string[] }[];
  };
};

const podcastDuckIcon = require("./assets/podcastduck.png");

export const APP_PAGES: AppPage[] = [
  {
    slug: "podcast-duck",
    name: "Podcast Duck",
    tagline: "Quack! Simple podcasts on your phone and watch (but mostly your watch)",
    intro:
      "Subscribe on your phone, then leave it at home. Podcast Duck syncs your shows to your Wear OS watch and downloads episodes straight to it, so you can listen on a run, a ride, or a walk with nothing but headphones.",
    icon: podcastDuckIcon,
    play: "https://play.google.com/store/apps/details?id=com.keithkurak.tinypodcatcher",
    apple: null,
    accent: "#E8794B",
    background: "#FBF0DD",
    // TODO: replace with the real support address before linking this from Play.
    email: "REPLACE_ME@example.com",
    features: [
      {
        title: "Subscribe on the phone",
        body: "Find shows, follow them, and manage your list on the big screen. Your subscriptions are the source of truth.",
      },
      {
        title: "Syncs to your watch",
        body: "Your subscription list moves to the watch over the Wear OS Data Layer. No account, no login, no cloud in the middle.",
      },
      {
        title: "Downloads on the watch",
        body: "The watch fetches new episodes itself over Wi-Fi while charging. Files live on the watch, not streamed from the phone.",
      },
      {
        title: "Listen phone-free",
        body: "Pair your headphones to the watch and play. The phone can stay on the kitchen counter.",
      },
    ],
    privacy: {
      updated: "August 2026",
      intro: [
        "Podcast Duck stores your data on your own devices. There is no Podcast Duck account, no Podcast Duck server, and no analytics.",
      ],
      sections: [
        {
          title: "What the app stores",
          body: [
            "Your podcast subscriptions, episode lists, playback position, and downloaded audio files. All of this is saved locally on your phone and on your watch.",
          ],
        },
        {
          title: "What the app sends",
          body: [
            "The app downloads podcast feeds and audio files directly from the servers of the podcasts you subscribe to. Those servers can see the normal information any download includes, such as your IP address. Podcast Duck does not add identifiers to those requests.",
            "Your subscription list moves between your phone and your watch over the Wear OS Data Layer. That transfer stays between your two paired devices.",
          ],
        },
        {
          title: "What the app does not do",
          body: [
            "Podcast Duck does not collect personal information. It has no accounts, no advertising, no third-party analytics or tracking SDKs, and it does not sell or share data with anyone.",
          ],
        },
        {
          title: "Permissions",
          body: [
            "The app uses network access to fetch feeds and episodes, and storage on the device to keep downloaded audio. Notification permission, if you grant it, is used only to show download and playback status.",
          ],
        },
        {
          title: "Deleting your data",
          body: [
            "Uninstalling the app from a device removes everything it saved on that device. You can also clear downloads and subscriptions from inside the app.",
          ],
        },
        {
          title: "Children",
          body: [
            "Podcast Duck is not directed at children under 13 and does not knowingly collect information from them.",
          ],
        },
        {
          title: "Changes",
          body: [
            "If this policy changes, the updated date at the top of this page changes with it.",
          ],
        },
      ],
    },
  },
];

export function getAppPage(slug: string | undefined): AppPage | undefined {
  if (!slug) return undefined;
  return APP_PAGES.find((a) => a.slug === slug);
}
