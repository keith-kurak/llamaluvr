// Shared pieces for the standalone /apps/[appSlug] pages.

import type * as React from "react";
import type { ReactNode } from "react";
import type { AppPage } from "@/content/app-pages";

/** Metro returns the resolved URL string at runtime on web even though the
 * TypeScript type for an imported image is `number`. */
export function assetSrc(a: AppPage["icon"]): string | undefined {
  if (a == null) return undefined;
  if (typeof a === "string") return a;
  if (typeof a === "object" && "uri" in a) return a.uri;
  return a as unknown as string;
}

export function AppSiteShell({
  app,
  children,
}: {
  app: AppPage;
  children: ReactNode;
}) {
  return (
    <div
      className="appsite"
      style={
        {
          "--app-accent": app.accent,
          "--app-bg": app.background,
        } as React.CSSProperties
      }
    >
      <div className="appsite-inner">{children}</div>
    </div>
  );
}

export function AppSiteFooter({ app }: { app: AppPage }) {
  return (
    <footer className="appsite-footer">
      <span>
        {app.name} © {new Date().getFullYear()} Keith Kurak
      </span>
      <a href={`/apps/${app.slug}/privacy`}>Privacy</a>
    </footer>
  );
}

export function AppSiteNotFound() {
  return (
    <div className="appsite">
      <div className="appsite-inner appsite-missing">
        <h1>App not found</h1>
        <p>
          <a className="appsite-link" href="/">
            Back to llamaluvr.com
          </a>
        </p>
      </div>
    </div>
  );
}
