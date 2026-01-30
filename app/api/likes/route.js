import { updateNumberOfLikes } from "../../lib/prisma-db";

export async function PATCH(req) {
  try {
    const { mediaId, newLikes } = await req.json();

    await updateNumberOfLikes(mediaId, newLikes);

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
