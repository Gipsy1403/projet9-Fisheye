"use client";

import { useState, useEffect } from "react";
import styles from "./MediaModal.module.css";
import Image from "next/image";
import Link from "next/link";

// Déclare le composant MediaModal et récupère les propriétés photographer, imagesPhotographer, startIndex, close et open
export default function MediaModal({ photographer, imagesPhotographer, startIndex, close, open }) {
	// Initialise un état pour stocker l’index du média actuellement affiché
	const [index, setIndex] = useState(startIndex);

	// Initialise un état pour afficher un loading le tant que le media se charge
	const [loading, setLoading] = useState(true);

	// Exécute un effet secondaire à chaque changement de startIndex
	useEffect(() => {
		// Crée un timer pour exécuter le code après le rendu initial
		const timer = setTimeout(() => {
			// Met à jour l'index du média avec la nouvelle valeur startIndex
			setIndex(startIndex);
			// Active le chargement pour la nouvelle image
			setLoading(true); 
		}, 0);
		// Nettoie le timer lorsque le composant est démonté ou avant le prochain effet
		return () => clearTimeout(timer);
	// Déclenche l'effet uniquement lorsque startIndex change
	}, [startIndex]); 


	// Définit une fonction permettant d’afficher le média précédent avec un effet circulaire
	const previousImage = () =>
		setIndex((index - 1 + imagesPhotographer.length) % imagesPhotographer.length);

	// Définit une fonction permettant d’afficher le média suivant avec un effet circulaire
	const nextImage = () =>
		setIndex((index + 1) % imagesPhotographer.length);

	// Récupère le média correspondant à l’index actuel
	const pictures = imagesPhotographer[index];

	// Retourne null si aucun média n’est trouvé à l’index courant
	if (!pictures) return null;
	// Retourne null si la modale n’est pas ouverte afin de ne rien afficher
	if (!open) return null;


	return (
		<div className={styles.superposition} role="presentation">
			<div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title">
				<div className={styles.container_view}>
					{loading && (
						<div className={styles.spinnerOverlay}>
							<div className={styles.spinner}></div>
						</div>
					)}
					{pictures.image ? (
						<Image
							className={styles.photo}
							src={`/assets/${pictures.image}`}
							alt={pictures.title}
							width={1050}
							height={900}
							onLoadingComplete={()=> setLoading(false)}
						/>
					) : pictures.video ? (
						<video className={styles.video} controls onLoadedData={() => setLoading(false)}>
							<source src={`/assets/${pictures.video}`} type="video/mp4" />
						</video>
					) : null}	
					<Link
						href="#"
						className={styles.previous}
						aria-label="Previous image"
						onClick={(e) => {
						e.preventDefault();
						previousImage();
						}}
						>
						{"<"}
					</Link>

					<Link
						href="#"
						className={styles.next}
						aria-label="Next image"
						onClick={(e) => {
						e.preventDefault();
						nextImage();
						}}
						>
						{">"}
					</Link>
					<button aria-label="close dialog" className={styles.btn} onClick={close}>✖</button>

				</div>
			</div>
		</div>
	)
}