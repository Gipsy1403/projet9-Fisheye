"use client";

import { useState } from "react";
import { updateLike } from "../../app/lib/updateLike";
import Image from "next/image";
import styles from "./TotalLikes.module.css"

export default function Likes({ mediaId, initialLikes, onLike }) {
	// Initialise l'état likes avec la valeur initiale reçue en propriété
	const [likes, setLikes] = useState(initialLikes);

	// Initialise un état error pour stocker un éventuel message d'erreur
	const [error, setError] = useState(null);  

	// Déclare une fonction asynchrone déclenchée lors du clic sur le bouton like
	const onLikeClick = async (e) => {

		// Empêche la propagation de l'événement vers les éléments parents
		e.stopPropagation();

		// Calcule la nouvelle valeur des likes
		const newLikes = likes + 1;

		// Met à jour immédiatement l'affichage avec la nouvelle valeur
		setLikes(newLikes);

		// Exécute la fonction transmise en propriété pour informer le composant parent
		onLike();

		try {
			// Envoie la nouvelle valeur des likes vers la base de données
			await updateLike(mediaId, newLikes);
		} catch (err) {
			// Affiche l'erreur dans la console pour le débogage
			console.error(err);

			// Restaure la valeur précédente en cas d'échec
			setLikes((prev) => prev - 1);

			// Définit un message d'erreur pour signaler le problème
			setError("Impossible de liker pour le moment.");
		}
	};

	return (
		<div className={styles.likes_red}>
			<p className={styles.likes}>{likes}</p>
			<Image
				src={`/assets/images/favorite.png`}
				alt={`Likes`}
				width={24}
				height={24}
				onClick={onLikeClick}
			/>
		</div>
	);
	}
