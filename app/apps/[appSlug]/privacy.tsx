import { Platform, Text, View } from "react-native";
import { useLocalSearchParams } from "expo-router";
import Head from "expo-router/head";
import { APP_PAGES, getAppPage } from "@/content/app-pages";
import {
  AppSiteFooter,
  AppSiteNotFound,
  AppSiteShell,
} from "@/components/app-site";

/** Prerender one static page per app in the web export. */
export async function generateStaticParams() {
  return APP_PAGES.map((a) => ({ appSlug: a.slug }));
}

export default function AppPrivacyPage() {
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
        <title>{`${app.name} — Privacy Policy`}</title>
        <meta
          name="description"
          content={`Privacy policy for ${app.name}. Local data only: no account, no tracking.`}
        />
      </Head>

      <a className="appsite-eyebrow" href={`/apps/${app.slug}`}>
        ← {app.name}
      </a>

      <article className="appsite-doc">
        <h1>Privacy Policy</h1>
        <p className="appsite-doc-meta">
          {app.name} · Last updated {app.privacy.updated}
        </p>

        {app.privacy.intro.map((p, i) => (
          <p key={i}>{p}</p>
        ))}

        {app.privacy.sections.map((s) => (
          <section key={s.title}>
            <h2>{s.title}</h2>
            {s.body.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </section>
        ))}

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a className="appsite-link" href={`mailto:${app.email}`}>
            {app.email}
          </a>
          .
        </p>
      </article>

      <AppSiteFooter app={app} />
    </AppSiteShell>
  );
}
