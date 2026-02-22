"use client";

import { useState } from "react";
import { updateLike } from "../../app/lib/updateLike";
import Image from "next/image";
import styles from "./TotalLikes.module.css";

// composant pour afficher un cœur et le nombre de likes
export default function Likes({ mediaId, initialLikes, onLike }) {

	// stocke le nombre de likes visible
	const [likes, setLikes] = useState(initialLikes);

// ********************************************************
	// garde une trace d'une erreur si le like ne passe pas
	const [error, setError] = useState(null);
	
// ********************************************************
	// fonction qui ajoute un like quand on clique dessus
	const handleLike = async (e) => {
		// empêche le clic de remonter au parent et d'ouvrir la modal
		if (e?.stopPropagation) e.stopPropagation();
		// calcule le nouveau nombre de likes
		const newLikes = likes + 1;
		// met à jour l'affichage tout de suite
		setLikes(newLikes);
		// prévient le parent que le total des likes a changé
		onLike();
		try {
			// essaie de mettre à jour la base de données
			await updateLike(mediaId, newLikes);
		} catch (err) {
			// affiche l'erreur dans la console pour debug
			console.error(err);
			// remet le compteur à la valeur précédente si ça a échoué
			setLikes((prev) => prev - 1);
			// montre un message d'erreur à l'utilisateur
			setError("Impossible de liker pour le moment.");
		}
	};
	

	return (
	<div className={styles.likes_red}>
		<p className={styles.likes}>{likes}</p>
		<button
			aria-label={`Ajouter un like, total ${likes}`}
			onClick={handleLike}
			className={styles.btn_like}
		>
			<div style={{ width: 24, height: 24, position: 'relative' }}>
				<Image
					src={`/assets/images/favorite.png`}
					alt=""
					fill
					style={{ objectFit: 'contain' }}
					sizes="24px"
				/>
			</div>
		</button>
		{error && <p style={{ color: "red" }}>{error}</p>}
	</div>
	);
}
