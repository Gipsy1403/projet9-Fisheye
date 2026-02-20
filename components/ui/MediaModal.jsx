"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import styles from "./MediaModal.module.css";
import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

// Déclare le composant MediaModal et récupère les propriétés photographer, imagesPhotographer, startIndex, close et open
export default function MediaModal({ photographer, imagesPhotographer, startIndex, close, open }) {

// **************************
// ÉTATS PRINCIPAUX
	// Index du média actuellement affiché dans la modale
	const [index, setIndex] = useState(0);
	// Indicateur si le média est en cours de chargement
	const [loading, setLoading] = useState(true);
	// Indicateur si une erreur de chargement du média est survenue
	const [loadError, setLoadError] = useState(false);
	// Récupération du média courant à partir de la liste des médias
	const currentMedia = imagesPhotographer?.[index];
	// Vérification si le média courant est une vidéo
	const isVideo = currentMedia?.video;

// **************************
// RÉFÉRENCES DOM
	// Référence pour le bouton "suivant" ou "précédent" de navigation
	const nextBtnRef = useRef(null);
	// Référence vers le conteneur de la modale pour gestion du focus
	const modalRef = useRef(null);
	// Référence vers l'élément vidéo si le média courant est une vidéo
	const videoRef = useRef(null);

// **************************
// EFFETS SECONDAIRES
	// Effet : Mettre à jour l'index de départ à l'ouverture de la modale
	useEffect(() => {
	// Vérification si la modale est ouverte et si un index de départ est défini
	if (open && startIndex !== undefined) {
		// Utilisation d'un setTimeout pour éviter le warning React de "cascading renders"
		const timer = setTimeout(() => {
			// Mise à jour de l'index pour afficher le média cliqué
			setIndex(startIndex);
		}, 0);
		// Nettoyage du timer lors de la fermeture ou changement d'état
		return () => clearTimeout(timer);
	}
	// Déclenchement du useEffect si la modale s'ouvre/ferme ou si startIndex change
	}, [open, startIndex]); 

	// Effet : Focus automatique selon le type de média
	useEffect(() => {
	// Si la modale n'est pas ouverte, ne rien faire
		if (!open) return;
		// Si le média courant est une vidéo et que la référence existe, focus sur la vidéo
		if (isVideo && videoRef.current) {
			videoRef.current.focus();
		} 
		// Sinon, focus sur le bouton suivant/précédent
		else if (nextBtnRef.current) {
			nextBtnRef.current.focus();
		}
	// Déclenchement si la modale s'ouvre/ferme ou si le média courant change de type
	}, [open, isVideo]); 



	// Effet : Focus trap pour navigation clavier (Tab / Shift+Tab)
	useEffect(() => {
	// Vérification que la modale est ouverte et que la référence existe
		if (!open || !modalRef.current) return;
		// Fonction qui gère la navigation du focus avec Tab
		const handleTabKey = (e) => {
			// Ne traiter que les touches Tab
			if (e.key !== "Tab") return;
			// Sélection de tous les éléments focusables dans la modale
			const focusable = modalRef.current.querySelectorAll(
				'button, [href], [tabindex]:not([tabindex="-1"])'
			);
			// Premier élément focusable
			const first = focusable[0];
			// Dernier élément focusable
			const last = focusable[focusable.length - 1];
			// Si Shift+Tab et focus sur le premier élément, boucler sur le dernier
			if (e.shiftKey && document.activeElement === first) {
				e.preventDefault(); // Empêche le comportement par défaut
				last.focus(); // Focus sur le dernier élément
			} 
			// Si Tab normal et focus sur le dernier élément, boucler sur le premier
			else if (!e.shiftKey && document.activeElement === last) {
				e.preventDefault(); 
				first.focus(); // Focus sur le premier élément
			}
		};
		// Ajout de l'écouteur d'événement pour gérer le focus trap
		document.addEventListener("keydown", handleTabKey);
		// Nettoyage de l'écouteur lors de la fermeture de la modale
		return () => document.removeEventListener("keydown", handleTabKey);
	// Déclenchement si la modale s'ouvre/ferme
	}, [open]); 

// **************************
// FONCTIONS DE NAVIGATION
	// Fonction mémorisée permettant de passer au média précédent
	const previousImage = useCallback(() => {
		// Mise à jour de l'index en utilisant la version fonctionnelle
		setIndex((prevIndex) =>
			// Décrémentation de l'index
			// Ajout de la longueur du tableau pour éviter un résultat négatif
			// Utilisation du modulo pour boucler à la fin du tableau
			(prevIndex - 1 + imagesPhotographer.length) % imagesPhotographer.length
		);
		// La fonction se recrée uniquement si la longueur du tableau change
	}, [imagesPhotographer.length]);

	// Fonction mémorisée permettant de passer au média suivant
	const nextImage = useCallback(() => {
		// Mise à jour de l'index en utilisant la version fonctionnelle
		setIndex((prevIndex) =>
			// Incrémentation de l'index
			// Utilisation du modulo pour revenir à zéro après la fin du tableau
			(prevIndex + 1) % imagesPhotographer.length
		);
		// La fonction se recrée uniquement si la longueur du tableau change
	}, [imagesPhotographer.length]);

	// Effet pour gérer les touches du clavier
	useEffect(() => {
		// Ne rien faire si la modale n'est pas ouverte
		if (!open) return;
		// Fonction exécutée à chaque pression de touche
		const handleKeyDown = (e) => {
			// Flèche droite déclenche le média suivant
			if (e.key === "ArrowRight") nextImage();
			// Flèche gauche déclenche le média précédent
			if (e.key === "ArrowLeft") previousImage();
			// Touche Échap déclenche la fermeture de la modale
			if (e.key === "Escape") close();
		};
		// Ajout de l'écouteur d'événement sur la fenêtre
		window.addEventListener("keydown", handleKeyDown);
		// Nettoyage : suppression de l'écouteur quand le composant change
		return () => window.removeEventListener("keydown", handleKeyDown);
	// L'effet se relance si l'une des dépendances change
	}, [close, nextImage, previousImage, open]);


// **************************
// VÉRIFICATIONS AVANT AFFICHAGE
	// Vérification que la liste des médias existe et n'est pas vide
	if (!imagesPhotographer || imagesPhotographer.length === 0) {
		console.error("MediaModal : aucun média disponible pour ce photographe !");
		return <ErrorMessage message="Aucun média disponible pour ce photographe." />;
	}
	// Vérification que le média courant existe pour l'index actuel
	if (!currentMedia) {
		console.error(`MediaModal : média introuvable à l'index ${index}`);
		return <ErrorMessage message="Média introuvable." />;
	}
	// Vérification si la modale est ouverte, sinon ne rien rendre
	if (!open) return null;
	
	return (
		// Superposition sombre ou arrière-plan de la modale
		<div className={styles.superposition} role="presentation">
			{/* Conteneur principal de la modale */}
			<div 
				className={styles.modal} 
				role="dialog"          // Déclare un dialogue pour l'accessibilité
				aria-modal="true"      // Indique que la modale bloque l'interaction avec le reste de la page
				aria-labelledby="modal-title" // Lien avec le titre pour l'accessibilité
				ref={modalRef}         // Référence pour la gestion du focus trap
			>
				{/* Conteneur interne pour afficher le contenu */}
				<div className={styles.container_view}>
					{/* Affichage du spinner pendant le chargement du média */}
					{loading && (
						<div className={styles.spinnerOverlay}>
							<div className={styles.spinner}></div>
						</div>
					)}
					{/* Affichage d'un message d'erreur si le média n'a pas pu être chargé */}
					{loadError && <ErrorMessage message="Impossible de charger ce média." />}
					{/* Conteneur pour l'image ou la vidéo */}
					<div className={styles.container_medias}>
						{/* Si le média est une image */}
						{currentMedia.image ? (
							<Image
							className={styles.photo}         // Style pour l'image
							src={`/assets/${currentMedia.image}`}   // Chemin de l'image
							alt={currentMedia.title}   // Texte alternatif pour accessibilité
							width={1050}   // Largeur de l'image
							height={900}   // Hauteur de l'image
							aria-label={currentMedia.title}
							onLoad={() => setLoading(false)}   // Arrêt du spinner quand l'image est chargée
							onError={() => { // Gestion des erreurs de chargement
								console.error(`MediaModal : erreur de chargement de l'image ${currentMedia.image}`);
								setLoadError(true);
							}}
							/>
						) : currentMedia.video ? ( // Sinon, si le média est une vidéo
							<video 
							className={styles.video} // Style pour la vidéo
							controls  // Affiche les contrôles natifs de la vidéo
							ref={videoRef} // Référence pour focus et manipulation
							tabIndex={0} // Permet le focus clavier
							aria-label={currentMedia.title}
							onLoadedData={() => setLoading(false)}// Arrêt du spinner quand la vidéo est prête
							onError={() => { // Gestion des erreurs de chargement vidéo
								console.error(`MediaModal : erreur de chargement de la vidéo ${currentMedia.video}`);
								setLoadError(true);
							}}
							>
							{/* Source de la vidéo */}
							<source src={`/assets/${currentMedia.video}`} type="video/mp4" />
							</video>
						// Aucun média disponible si ni image ni vidéo
						) : null} 

						{/* Titre du média affiché sous l'image ou la vidéo */}
						<p className={styles.media_title} id="modal-title" aria-live="polite">{currentMedia.title}</p>
					</div>
					{/* Lien pour passer à l'image suivante */}
					<Link
						href="#"
						className={styles.next}
						aria-label="Media suivant"  // Accessibilité
						onClick={(e) => { // Empêche le comportement par défaut et change l'image
							e.preventDefault();
							nextImage();
						}}
						ref={nextBtnRef}// Référence pour focus automatique
					>
						{">"}
					</Link>

					{/* Lien pour passer à l'image précédente */}
					<Link
						href="#"
						className={styles.previous}
						aria-label="Média précédent"  // Accessibilité
						onClick={(e) => { // Empêche le comportement par défaut et change l'image
							e.preventDefault();
							previousImage();
						}}
					>
						{"<"}
					</Link>
					{/* Bouton pour fermer la modale */}
					<button 
						aria-label="Ferme la visionneuse de media" // Accessibilité
						className={styles.btn} // Style du bouton
						onClick={close} // Appelle la fonction de fermeture
					>
						✖
					</button>
				</div> 
			</div> 
		</div> 
	)
}