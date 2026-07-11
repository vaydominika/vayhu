import { doodleAdminFetch, requireDoodleAdmin } from "@/lib/doodle-admin";

export async function POST() {
  const unauthorized = await requireDoodleAdmin();
  if (unauthorized) return unauthorized;

  const response = await doodleAdminFetch("/admin/clear", { method: "POST" });
  const payload = await response.json();

  return Response.json(payload, { status: response.status });
}
