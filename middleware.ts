import { withAuth } from "next-auth/middleware";

// More on how NextAuth.js middleware works: https://next-auth.js.org/configuration/nextjs#middleware

export default withAuth({
  callbacks: {
    authorized({ req, token }) {
      // `/admin` requires admin role
      if (req.url.includes("/admin")) {
        return token?.role === "admin";
      }

      if (req.url.includes("/new-blog") || req.url.includes("/edit-blog")) {
        return (
          token?.role === "admin" ||
          token?.role === "moderator" ||
          token?.role === "blogger"
        );
      }

      if (req.url.includes("/add-subject") || req.url.includes("/edit-notes")) {
        return (
          token?.role === "admin" ||
          token?.role === "moderator" ||
          token?.role === "adder"
        );
      }

      if (req.url.includes("/edit-subject")) {
        return token?.role === "admin" || token?.role === "moderator";
      }

      // These routes only require the user to be logged in
      return !!token;
    },
  },
});

export const config = {
  matcher: [
    "/user/(.*)",
    "/contribute",
    "/admin/(.*)",
    "/new-blog",
    "/edit-blog/(.*)",
    "/add-subject",
    "/edit-subject/(.*)",
    "/edit-notes/(.*)",
  ],
};
