import { Platform, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { APP_PAGES, getAppPage } from "@/content/app-pages";
import {
  AppSiteFooter,
  AppSiteNotFound,
  AppSiteShell,
  assetSrc,
} from "@/components/app-site";

/** Prerender one static page per app in the web export. */
export async function generateStaticParams() {
  return APP_PAGES.map((a) => ({ appSlug: a.slug }));
}

export default function AppHomePage() {
  const { appSlug } = useLocalSearchParams<{ appSlug: string }>();
  const app = getAppPage(appSlug);

  if (Platform.OS !== "web") {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>This site is web-only.</Text>
      </View>
    );
  }

  if (!app) return <AppSiteNotFound />;

  return (
    <AppSiteShell app={app}>
      <Head>
        <title>{`${app.name} — ${app.tagline}`}</title>
        <meta name="description" content={app.intro} />
      </Head>

      <header className="appsite-hero">
        <div className="appsite-icon">
          <img src={assetSrc(app.icon)} alt={`${app.name} icon`} />
        </div>
        <div>
          <h1 className="appsite-name">{app.name}</h1>
          <p className="appsite-tagline">{app.tagline}</p>
        </div>
      </header>

      <p className="appsite-intro">{app.intro}</p>

      <div className="appsite-stores">
        {app.play && (
          <a
            className="appsite-store-btn"
            href={app.play}
            target="_blank"
            rel="noopener noreferrer"
          >
            ▶ Get it on Google Play
          </a>
        )}
        {app.apple && (
          <a
            className="appsite-store-btn"
            href={app.apple}
            target="_blank"
            rel="noopener noreferrer"
          >
            ◍ Download on the App Store
          </a>
        )}
      </div>

      <h2 className="appsite-section-title">What it does</h2>
      <ul className="appsite-features">
        {app.features.map((f) => (
          <li className="appsite-feature" key={f.title}>
            <h3>{f.title}</h3>
            <p>{f.body}</p>
          </li>
        ))}
      </ul>

      <h2 className="appsite-section-title">Your data</h2>
      <p>
        {app.name} keeps everything on your own devices. No account, no
        tracking. Read the{" "}
        <a className="appsite-link" href={`/apps/${app.slug}/privacy`}>
          privacy policy
        </a>
        .
      </p>

      <AppSiteFooter app={app} />
    </AppSiteShell>
  );
}
