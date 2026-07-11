import { auth } from "@/auth";

const ADMIN_API_URL = process.env.DOODLE_ADMIN_API_URL || "http://127.0.0.1:1999";

export const getAdminSession = async () => {
  const session = await auth();
  const adminEmail = process.env.ADMIN_EMAIL;

  if (!session?.user?.email || !adminEmail || session.user.email !== adminEmail) {
    return null;
  }

  return session;
};

export const requireDoodleAdmin = async () => {
  const session = await getAdminSession();
  if (!session) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  if (!process.env.DOODLE_ADMIN_TOKEN) {
    return Response.json({ error: "Doodle admin token is not configured." }, { status: 500 });
  }

  return null;
};

export const doodleAdminFetch = async (pathname: string, init: RequestInit = {}) => {
  if (!process.env.DOODLE_ADMIN_TOKEN) {
    throw new Error("DOODLE_ADMIN_TOKEN is not configured.");
  }

  return fetch(`${ADMIN_API_URL}${pathname}`, {
    ...init,
    headers: {
      ...init.headers,
      Authorization: `Bearer ${process.env.DOODLE_ADMIN_TOKEN}`,
    },
    cache: "no-store",
  });
};
