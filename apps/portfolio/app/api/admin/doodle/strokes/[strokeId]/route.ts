import { doodleAdminFetch, requireDoodleAdmin } from "@/lib/doodle-admin";

type RouteContext = {
  params: Promise<{
    strokeId: string;
  }>;
};

export async function DELETE(_request: Request, context: RouteContext) {
  const unauthorized = await requireDoodleAdmin();
  if (unauthorized) return unauthorized;

  const { strokeId } = await context.params;
  const response = await doodleAdminFetch(`/admin/strokes/${encodeURIComponent(strokeId)}`, {
    method: "DELETE",
  });
  const payload = await response.json();

  return Response.json(payload, { status: response.status });
}
