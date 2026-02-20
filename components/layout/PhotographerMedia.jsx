"use client";

import styles from "./PhotographerMedia.module.css";
import Image from 'next/image';
import HeaderPhotographer from "./Header-photographer";
import { useState, useRef, useEffect } from "react";
import ContactModal from "../ui/ContactModal";
import MediaModal from "../ui/MediaModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Likes from "./Likes";
import TotalLikes from "./TotalLikes";
import ErrorMessage from "../ui/ErrorMessage"

// Déclare le composant PhotographerMedia et récupère les propriétés photographer, imagesPhotographer et totalLikesPhotographer
export default function PhotographerMedia({ photographer, imagesPhotographer, totalLikesPhotographer }) {

// **********************************
// RÉFÉRENCES
	// Création d'une référence pour le bouton principal
	const buttonRef = useRef(null);
	// Création d'une référence pour le menu déroulant
	const listboxRef = useRef(null);
	// Création de références pour chaque option du menu déroulant
	const optionRefs = useRef([]);

// **********************************
// ÉTATS
	// État pour savoir si la modale générale est ouverte
	const [modalOpen, setModalOpen] = useState(false);
	// État pour savoir si la modale d'un média est ouverte
	const [mediaModalOpen, setMediaModalOpen] = useState(false);
	// État pour stocker l'index du média sélectionné
	const [mediaIndex, setMediaIndex] = useState(0);
	// État pour le total global des likes
	const [allLikes, setAllLikes] = useState(totalLikesPhotographer);
	// État pour le critère de tri actuel
	const [sortBy, setSortBy] = useState("likes");
	// État pour savoir si le menu déroulant est ouvert
	const [isOpen, setIsOpen] = useState(false);
	// État pour l'index de l'option active dans le menu déroulant
	const [activeIndex, setActiveIndex] = useState(0);

// **********************************
// OPTIONS DE TRI
	// Liste des options disponibles pour le tri des médias
	const sortOptions = [
	{ value: "likes", label: "Popularité" },
	{ value: "title", label: "Titre" },
	{ value: "date", label: "Date" },
	];

	// Filtre les options pour exclure celle actuellement sélectionnée
	const filteredOptions = sortOptions.filter(option => option.value !== sortBy);

// **********************************
// TRI DES MÉDIAS
	// Création d'une copie des médias et tri selon le critère choisi
	const sortedMedias = [...imagesPhotographer].sort((a, b) => {
		// Tri alphabétique par titre
		if (sortBy === "title") return a.title.localeCompare(b.title);
		// Tri chronologique par date
		if (sortBy === "date") return new Date(a.date) - new Date(b.date);
		// Tri par popularité (likes décroissants)
		if (sortBy === "likes") return b.likes - a.likes;
		return 0;
	});

// **********************************
// FONCTIONS
	// Incrémentation du total global des likes
	const incrementAllLikes = () => setAllLikes(prev => prev + 1);

// **********************************
// EFFETS
	// Focus automatique sur le menu déroulant lorsque celui-ci s'ouvre
	useEffect(() => {
	if (isOpen) {
		// Met le focus sur le conteneur du menu
		listboxRef.current?.focus();
		// Met le focus sur la première option si elle existe
		if (optionRefs.current[0]) optionRefs.current[0].focus();
	}
	}, [isOpen]);

// **********************************
// Vérification des données pour le rendu

	// Vérification de la présence des informations du photographe
	if (!photographer) {
		// Message d'erreur en console si photographe absent
		console.error("PhotographerMedia : photographe manquant !");
		// Affichage d'un message d'erreur à l'utilisateur
		return <ErrorMessage message="Informations du photographe indisponibles." />;
	}

	// Vérification de la présence des médias
	if (!imagesPhotographer || imagesPhotographer.length === 0) {
		// Message d'erreur en console si aucun média n'est disponible
		console.error("PhotographerMedia : aucun média trouvé pour ce photographe !");
		// Affichage d'un message d'erreur à l'utilisateur
		return <ErrorMessage message="Aucun média disponible pour ce photographe." />;
	}


	return (
		<>
			<HeaderPhotographer />
			<main>
				{/* Encart du photographe */}
				<article className={styles.photographers}>
					<section>
						<h1 className={styles.name}>{photographer.name}</h1>
						<p className={styles.city}>{photographer.city}, {photographer.country}</p>
						<p className={styles.tagline}>{photographer.tagline}</p>
					</section>
					<button className={styles.contact_me} onClick={() => setModalOpen(true)}>
						Contactez-moi
					</button>
					{/* Module de la modale pour contacter le photographe */}
					<ContactModal
						open={modalOpen}
						close={() => setModalOpen(false)}
						title={`Contactez ${photographer.name}` }
						photographer={photographer}>
					</ContactModal>
					{/* Avatar du photographe */}
					<Image
						className={styles.portrait}
						src={`/assets/${photographer.portrait}`}
						alt={photographer.name}
						width={200}
						height={200}
					/>
				</article>
				{/* Section principale contenant le menu de tri et les médias */}
				<section>
					{/* Conteneur pour le menu déroulant de tri des médias */}
					<div className={styles.order_by}>
						{/* Label pour indiquer le critère de tri */}
						<p className={styles.label_sort}>Trier par</p>
						{/* Conteneur personnalisé pour le bouton et la liste déroulante */}
						<div className={styles.customSelect}>
							{/* Bouton qui affiche l'option sélectionnée et ouvre/ferme le menu */}
							<button
								className={styles.selected}    // Style du bouton
								onClick={() => setIsOpen(!isOpen)}  // Bascule l'ouverture du menu
								aria-haspopup="listbox"     // Indique que le bouton ouvre un listbox
								aria-expanded={isOpen}    // Indique si le menu est ouvert
								aria-label={`Trier par ${sortOptions.find(option => option.value === sortBy)?.label}`}
								ref={buttonRef}   // Référence pour le focus
							>
								{/* Affiche le label correspondant à la valeur actuellement sélectionnée */}
								{sortOptions.find(option => option.value === sortBy)?.label}
								{/* Icône flèche indiquant l'état du menu (ouvert/fermé) */}
								<FontAwesomeIcon
									icon={faChevronDown}
									className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
								/>
							</button>
							{/* Liste déroulante affichée uniquement si isOpen = true */}
							{isOpen && (
								<ul
									className={styles.dropdown}    // Style de la liste
									role="listbox"   // Indique un listbox pour l'accessibilité
									tabIndex={0}    // Permet le focus clavier
									aria-label={`Options de tri pour ${sortOptions.find(option => option.value === sortBy)?.label}`}
									// aria-labelledby="label_id"   // Lien avec le label
									aria-activedescendant={`sort-option-${filteredOptions[activeIndex]?.value}`}
									ref={listboxRef}   // Référence pour le focus trap
									// Gestion de la navigation clavier dans le menu
									onKeyDown={(e) => {
									// Flèche bas : passe à l'option suivante
									if (e.key === "ArrowDown") {
										e.preventDefault();
										setActiveIndex((prev) =>
											(prev + 1) % sortOptions.length
										);
									}
									// Flèche haut : passe à l'option précédente
									if (e.key === "ArrowUp") {
										e.preventDefault();
										setActiveIndex((prev) =>
											(prev - 1 + sortOptions.length) % sortOptions.length
										);
									}
									// Touche Entrée : sélectionne l'option active
									if (e.key === "Enter") {
										e.preventDefault();
										setSortBy(filteredOptions[activeIndex].value); // Met à jour le tri
										setIsOpen(false);   // Ferme le menu
										buttonRef.current?.focus();   // Retourne le focus sur le bouton
									}
									// Touche Échap : ferme le menu sans changer l'option
									if (e.key === "Escape") {
										e.preventDefault();
										setIsOpen(false);    // Ferme le menu
										buttonRef.current?.focus();  // Retourne le focus sur le bouton
									}
									}}
								>
									{/* Parcourt les options filtrées et affiche chaque option */}
									{filteredOptions
									.filter(option => option.value !== sortBy) // Supprime l'option déjà sélectionnée
									.map((option, index) => (
										<li
											key={option.value}                       // Clé unique pour React
											id={`sort-option-${option.value}`}       // ID pour accessibilité
											role="option"                            // Indique un rôle d'option
											aria-selected={option.value === sortBy} // Indique si l'option est sélectionnée
											tabIndex={-1}                            // Non focusable directement
											className={activeIndex === index ? styles.activeOption : ""} // Style si active
											onClick={() => {                          // Gestion du clic
												setSortBy(option.value);             // Met à jour le tri
												setIsOpen(false);                    // Ferme le menu
												buttonRef.current?.focus();          // Retourne le focus sur le bouton
											}}
										>
											{/* Affiche le texte de l'option */}
											{option.label}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					{/* Conteneur principal pour les médias */}
					<div className={styles.container_media}>
						{/* Parcourt la liste des médias triés */}
						{sortedMedias.map((pictures, index) => (
							<div className={styles.card} key={pictures.id}>
								{/* Bouton pour ouvrir le média en modale */}
								<button
									tabIndex={0}      // Permet le focus clavier
									type="button"
									// Gestion de l'ouverture du média au clic
									onClick={() => {  
										// Met à jour l'index du média courant pour la modale
										setMediaIndex(index);  
										// Ouvre la modale média
										setMediaModalOpen(true);  
									}}
									// Gestion de l'ouverture du média via le clavier (Enter ou Espace)
									onKeyDown={(e) => {   
										// Vérifie si la touche pressée est Enter ou Espace
										if (e.key === "Enter" || e.key === " ") {
											e.preventDefault();           // Empêche le comportement par défaut (scroll ou soumission)
											// Met à jour l'index du média courant pour la modale
											setMediaIndex(index);  
											// Ouvre la modale média
											setMediaModalOpen(true);  
										}
									}}
									aria-label={`Ouvrir le média ${pictures.title}`} // Accessibilité
								>
									{/* Si le média est une image */}
									{pictures.image ? (
									<Image
										className={styles.picture}
										src={`/assets/${pictures.image}`}
										alt={pictures.title}
										width={350}
										height={300}
										priority
									/>
									// Si le média est une vidéo
									) : pictures.video ? (
									<div className={styles.video}>
										<FontAwesomeIcon className={styles.icon} icon={faVideo} />
									</div>
									) : null}
								</button>
								{/* Conteneur de la description du média */}
								<div className={styles.description}>
									{/* Titre du média */}
									<p className={styles.title}>{pictures.title}</p>
									{/* Composant Likes pour gérer les likes */}
									<Likes mediaId={pictures.id} initialLikes={pictures.likes} onLike={incrementAllLikes} />
								</div>
							</div>
						))}
						{/* Modale pour afficher les médias en grand */}
						<MediaModal
							// Propriété qui contrôle si la modale est visible ou non
							open={mediaModalOpen}  
							// Données du photographe associé aux médias
							photographer={photographer}  
							// Liste des médias triés à afficher dans la modale
							imagesPhotographer={sortedMedias}  
							// Index du média à afficher au moment de l'ouverture de la modale
							startIndex={mediaIndex}  
							// Fonction pour fermer la modale, appelée lorsque l'utilisateur ferme
							close={() => setMediaModalOpen(false)}  
						/>
						{/* Affiche le total des likes du photographe */}
						<TotalLikes totalLikesPhotographer={allLikes} photographer={photographer}/>
					</div>
				</section>

			</main>
		</>
	)
}