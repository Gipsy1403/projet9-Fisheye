"use client";

import { useState, useEffect } from "react";
import styles from "./MediaModal.module.css";
import Image from "next/image";
import Link from "next/link";

// Déclare le composant MediaModal et récupère les propriétés photographer, imagesPhotographer, startIndex, close et open
export default function MediaModal({ photographer, imagesPhotographer, startIndex, close, open }) {
	// Initialise un état pour stocker l’index du média actuellement affiché
	const [index, setIndex] = useState(startIndex);
	// Met à jour l’index lorsque la propriété startIndex change
	useEffect(() => {
		// Synchronise l’index interne avec la nouvelle valeur reçue en propriété
		setIndex(startIndex);
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
					{pictures.image ? (
						<Image
							className={styles.photo}
							src={`/assets/${pictures.image}`}
							alt={pictures.title}
							width={1050}
							height={900}
						/>
					) : pictures.video ? (
						<video className={styles.video} controls>
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