import { doodleAdminFetch, requireDoodleAdmin } from "@/lib/doodle-admin";

export async function GET() {
  const unauthorized = await requireDoodleAdmin();
  if (unauthorized) return unauthorized;

  const response = await doodleAdminFetch("/admin/strokes");
  const payload = await response.json();

  return Response.json(payload, { status: response.status });
}
