// Déclare une fonction asynchrone nommée updateLike exportée
export async function updateLike(mediaId, newNumberOfLikes) {
	// Envoie une requête HTTP vers l’API pour mettre à jour les likes
	const res = await fetch("/api/likes", {
		// Définit la méthode HTTP PATCH pour modifier une ressource existante
		method: "PATCH",
		// Définit les en-têtes de la requête
		headers: {
			// Indique que le corps de la requête est au format JSON
			"Content-Type": "application/json",
		},
		// Convertit les données mediaId et newNumberOfLikes en chaîne JSON pour l’envoi
		body: JSON.stringify({ mediaId, newNumberOfLikes }),
	});
	// Vérifie si la réponse du serveur indique une erreur
	if (!res.ok) {
		// Lance une erreur si la mise à jour des likes a échoué
		throw new Error("Impossible de mettre à jour les likes");
	}
	// Retourne les données JSON renvoyées par le serveur
	return res.json();
}
