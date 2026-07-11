import { auth, signIn, signOut } from "@/auth";
import { AdminDoodleManager } from "@/components/admin/AdminDoodleManager";
import { doodleAdminFetch } from "@/lib/doodle-admin";
import type { DoodleStroke } from "@/lib/doodle-wall";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "vaydominika@gmail.com";

const loadStrokes = async () => {
  try {
    const response = await doodleAdminFetch("/admin/strokes");
    if (!response.ok) return [];

    const payload = (await response.json()) as { strokes?: DoodleStroke[] };
    return payload.strokes ?? [];
  } catch {
    return [];
  }
};

export default async function AdminPage() {
  const session = await auth();

  if (!session?.user?.email) {
    return (
      <main className="min-h-screen bg-offwhite px-5 py-10 text-charcoal">
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
            doodle admin
          </div>
          <h1 className="font-serif text-4xl font-bold">Sign in</h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
            Use the admin Google account to manage the doodle wall.
          </p>
          <form
            action={async () => {
              "use server";
              await signIn("google", { redirectTo: "/admin" });
            }}
            className="mt-6"
          >
            <button
              type="submit"
              className="border border-charcoal/20 bg-white px-4 py-2 text-sm font-semibold shadow-scrapbook-sm transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-sage/20"
            >
              Sign in with Google
            </button>
          </form>
        </div>
      </main>
    );
  }

  if (session.user.email !== ADMIN_EMAIL) {
    return (
      <main className="min-h-screen bg-offwhite px-5 py-10 text-charcoal">
        <div className="mx-auto flex min-h-[70vh] max-w-md flex-col items-center justify-center text-center">
          <div className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
            doodle admin
          </div>
          <h1 className="font-serif text-4xl font-bold">No access</h1>
          <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
            This Google account is not allowed to manage the doodle wall.
          </p>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
            className="mt-6"
          >
            <button
              type="submit"
              className="border border-charcoal/20 bg-white px-4 py-2 text-sm font-semibold shadow-scrapbook-sm transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-pink/20"
            >
              Sign out
            </button>
          </form>
        </div>
      </main>
    );
  }

  const strokes = await loadStrokes();

  return (
    <main className="min-h-screen bg-offwhite px-5 py-8 text-charcoal md:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 border-b border-charcoal/10 pb-6 md:flex-row md:items-end md:justify-between">
          <div>
            <div className="mb-2 font-mono text-xs uppercase tracking-[0.22em] text-charcoal/45">
              doodle admin
            </div>
            <h1 className="font-serif text-4xl font-bold md:text-5xl">Guestbook control</h1>
            <p className="mt-2 text-sm text-charcoal/55">
              Signed in as {session.user.email}
            </p>
          </div>
          <form
            action={async () => {
              "use server";
              await signOut({ redirectTo: "/admin" });
            }}
          >
            <button
              type="submit"
              className="border border-charcoal/20 bg-white px-4 py-2 text-sm font-semibold shadow-scrapbook-sm transition-[transform,background-color] hover:-translate-y-0.5 hover:bg-pink/20"
            >
              Sign out
            </button>
          </form>
        </div>

        {!process.env.DOODLE_ADMIN_TOKEN && (
          <div className="mb-5 border border-pink/50 bg-pink/20 px-4 py-3 text-sm text-charcoal/70 shadow-scrapbook-sm">
            Doodle admin token is not configured yet. Set DOODLE_ADMIN_TOKEN before using moderation actions.
          </div>
        )}

        <AdminDoodleManager initialStrokes={strokes} />
      </div>
    </main>
  );
}
