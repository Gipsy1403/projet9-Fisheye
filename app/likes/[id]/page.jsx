// import { updateNumberOfLikes } from "../../lib/prisma-db";

// export default async function UpdateLike(mediaId, newNumberOfLikes) {
// 	await updateNumberOfLikes(mediaId, newNumberOfLikes)
// }

export default async function UpdateLike(mediaId, newLikes) {
  const res = await fetch('/api/likes', {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ mediaId, newLikes }),
  });

  if (!res.ok) {
    throw new Error('Impossible de mettre à jour les likes');
  }
}
