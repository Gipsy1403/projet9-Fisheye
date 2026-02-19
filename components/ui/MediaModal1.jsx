// "use client";

// import { useState, useEffect, useRef } from "react";
// import styles from "./MediaModal.module.css";
// import Image from "next/image";
// import Link from "next/link";
// import ErrorMessage from "./ErrorMessage";

// // Déclare le composant MediaModal et récupère les propriétés photographer, imagesPhotographer, startIndex, close et open
// export default function MediaModal({ photographer, imagesPhotographer, startIndex, close, open }) {

// 	// Initialise l'état index du media actuellement affiché avec startIndex si défini, sinon 0 par défaut
// 	const [index, setIndex] = useState(() => startIndex ?? 0);
// 	// Récupère le média correspondant à l'index actuel dans le tableau imagesPhotographer
// 	const pictures = imagesPhotographer?.[index];

// // ********************************************************
// 	// Initialise un état pour indiquer si une erreur de chargement s'est produite, valeur initiale false
// 	const [loadError, setLoadError] = useState(false);

// // ********************************************************
// 	// Initialise un état pour afficher un loading le tant que le media se charge
// 	const [loading, setLoading] = useState(true);

// // ********************************************************
// 	// Crée une référence vers le bouton précédent pour manipulation directe du DOM
// 	const prevBtnRef = useRef(null);
// 	// Exécute un effet secondaire à chaque changement de l'état open
// 	useEffect(() => {
// 		// Vérifie si la modale est ouverte et si la référence est définie
// 		if (open && prevBtnRef.current) {
// 			// Applique le focus automatique sur le bouton précédent lorsque la modale s’ouvre
// 			prevBtnRef.current.focus(); 
// 		}
// 	// Déclenche l'effet uniquement lorsque open change
// 	}, [open]); 

// // ********************************************************
// 	// Création d'une référence pour accéder au conteneur principal de la modale
// 	// Cette référence sera utilisée pour gérer le focus trap et sélectionner les éléments focusables
// 	const modalRef = useRef(null);
// 	// Effet qui s'exécute pour activer le focus trap dans la modale
// 	useEffect(() => {
// 		// Arrêt de l'exécution si la modale n'est pas ouverte ou si la référence au conteneur n'est pas définie
// 		if (!open || !modalRef.current) return;
// 		// Fonction qui gère la navigation au clavier avec la touche Tab
// 		function handleTabKey(e) {
// 			// Ne rien faire si la touche pressée n'est pas Tab
// 			if (e.key !== "Tab") return;
// 			// Récupération de tous les éléments focusables présents dans le conteneur de la modale
// 			const focusableElements = modalRef.current.querySelectorAll(
// 				'button, [href], [tabindex]:not([tabindex="-1"])'
// 			);
// 			// Premier élément focusable dans la modale
// 			const first = focusableElements[0];
// 			// Dernier élément focusable dans la modale
// 			const last = focusableElements[focusableElements.length - 1];
// 			// Cas de Shift + Tab : navigation en sens inverse
// 			if (e.shiftKey) {
// 				// Si le focus est sur le premier élément, le déplacer sur le dernier
// 				if (document.activeElement === first) {
// 				e.preventDefault();
// 				last.focus();
// 				}
// 			} else { // Cas de Tab classique : navigation en avant
// 				// Si le focus est sur le dernier élément, le déplacer sur le premier
// 				if (document.activeElement === last) {
// 				e.preventDefault();
// 				first.focus();
// 				}
// 			}
// 		}
// 		// Ajout de l'écouteur pour intercepter les presses de touche
// 		document.addEventListener("keydown", handleTabKey);
// 		// Nettoyage de l'écouteur à la destruction de l'effet
// 		return () => document.removeEventListener("keydown", handleTabKey);
// 	// Déclenchement de l'effet à chaque ouverture ou fermeture de la modale
// 	}, [open]); 

// // ********************************************************
// 	// Définit une fonction permettant d’afficher le média précédent avec un effet circulaire
// 	const previousImage = () =>
// 		setIndex((index - 1 + imagesPhotographer.length) % imagesPhotographer.length);

// // ********************************************************
// 	// Définit une fonction permettant d’afficher le média suivant avec un effet circulaire
// 	const nextImage = () =>
// 		setIndex((index + 1) % imagesPhotographer.length);

// // ********************************************************
// 	// Création d'une référence pour accéder à l'élément vidéo dans le DOM
// 	const videoRef = useRef(null);
// 	const isVideo=pictures?.video;
// 	// Effet qui s'exécute à chaque ouverture de la modale ou changement de média
// 	useEffect(() => {
// 		// Arrêt de l'exécution si la modale n'est pas ouverte
// 		if (!open) return;
// 		// Vérification si le média courant est une vidéo et si la référence vidéo est définie
// 		if (isVideo && videoRef.current) {
// 			// Mise du focus sur la vidéo
// 			videoRef.current.focus();
// 		} else if (prevBtnRef.current) {
// 			// Sinon, mise du focus sur le bouton précédent
// 			prevBtnRef.current.focus();
// 		}
// 	// Nettoyage automatique à la destruction de l'effet (aucune action nécessaire ici). Déclenchement de l'effet lorsque l'état open ou pictures change
// 	}, [open,isVideo]);


// // ********************************************************
// 	// Vérifie si imagesPhotographer existe et contient au moins un média
// 	if (!imagesPhotographer || imagesPhotographer.length === 0) {
// 		console.error("MediaModal : aucun média disponible pour ce photographe !");
// 		return <ErrorMessage message="Aucun média disponible pour ce photographe." />;
// 	}
	
// // ********************************************************
// 	// Vérifie que le média courant existe
// 	if (!pictures) {
// 		console.error(`MediaModal : média introuvable à l'index ${index}`);
// 		return <ErrorMessage message="Média introuvable." />;
// 	}

// // ********************************************************
// 	// Retourne null si la modale n’est pas ouverte afin de ne rien afficher
// 	if (!open) return null;
	
// 	return (
// 		<div className={styles.superposition} role="presentation">
// 			<div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
// 				<div className={styles.container_view}>
// 					{loading && (
// 						<div className={styles.spinnerOverlay}>
// 							<div className={styles.spinner}></div>
// 						</div>
// 					)}
// 					{loadError && <ErrorMessage message="Impossible de charger ce média." />}
// 					<div className={styles.container_medias}>
// 						{pictures.image ? (
// 							<Image
// 								className={styles.photo}
// 								src={`/assets/${pictures.image}`}
// 								alt={pictures.title}
// 								width={1050}
// 								height={900}
// 								onLoadingComplete={()=> setLoading(false)}
// 								onError={() => {
// 									console.error(`MediaModal : erreur de chargement de l'image ${pictures.image}`);
// 									setLoadError(true);
// 								}}
// 							/>
// 						) : pictures.video ? (
// 							<video className={styles.video} controls 
// 								ref={videoRef}
// 								tabIndex={0}
// 								onLoadedData={() => setLoading(false)}
// 								onError={() => {
// 									console.error(`MediaModal : erreur de chargement de la vidéo ${pictures.video}`);
// 									setLoadError(true);
// 								}}
// 							>
// 								<source src={`/assets/${pictures.video}`} type="video/mp4" />
// 							</video>
// 						) : null}
// 						<p className={styles.media_title}>{pictures.title}</p>
// 					</div>
// 					<Link
// 						href="#"
// 						className={styles.previous}
// 						aria-label="Previous image"
// 						onClick={(e) => {
// 						e.preventDefault();
// 						previousImage();
// 						}}
// 						ref={prevBtnRef}
// 						>
// 						{"<"}
// 					</Link>

// 					<Link
// 						href="#"
// 						className={styles.next}
// 						aria-label="Next image"
// 						onClick={(e) => {
// 						e.preventDefault();
// 						nextImage();
// 						}}
// 						>
// 						{">"}
// 					</Link>
// 					<button aria-label="close dialog" className={styles.btn} onClick={close}>✖</button>

// 				</div>
// 			</div>
// 		</div>
// 	)
// }