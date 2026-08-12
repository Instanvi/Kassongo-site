import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except:
  // - /api, /trpc routes
  // - /_next, /_vercel internal paths
  // - Static files with extensions (e.g. favicon.ico, image.png)
  matcher: "/((?!api|trpc|_next|_vercel|.*\\..*).*)",
};
