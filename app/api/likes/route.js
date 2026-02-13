import { updateNumberOfLikes } from "../../lib/prisma-db";

// Déclare une fonction asynchrone nommée PATCH pour gérer les requêtes HTTP de type PATCH
export async function PATCH(req) {
	try {
		// Extrait les données mediaId et newLikes du corps de la requête au format JSON
		const { mediaId, newLikes } = await req.json();
		// Met à jour le nombre de likes dans la base de données
		await updateNumberOfLikes(mediaId, newLikes);
		// Retourne une réponse HTTP avec un statut 200 en cas de succès
		return new Response(
			JSON.stringify({ success: true }),
			{ status: 200 }
		);
	} catch (error) {
		// Retourne une réponse HTTP avec un statut 500 en cas d’erreur
		return new Response(
			JSON.stringify({ error: error.message }),
			{ status: 500 }
		);
	}
}

