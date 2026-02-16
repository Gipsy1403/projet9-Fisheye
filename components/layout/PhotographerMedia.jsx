"use client";

import styles from "./PhotographerMedia.module.css";
import Image from 'next/image';
import HeaderPhotographer from "./Header-photographer";
import { useState, useId,useRef, useEffect } from "react";
import ContactModal from "../ui/ContactModal";
import MediaModal from "../ui/MediaModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Likes from "./Likes";
import TotalLikes from "./TotalLikes";
import ErrorMessage from "../ui/ErrorMessage"

// Déclare le composant PhotographerMedia et récupère les propriétés photographer, imagesPhotographer et totalLikesPhotographer
export default function PhotographerMedia({photographer, imagesPhotographer, totalLikesPhotographer}){

	// Initialise un état pour gérer l'ouverture ou la fermeture d'une modale
	const [modalOpen, setModalOpen] = useState(false);

// **********************************************************
	// Initialise un état pour gérer le critère de tri sélectionné
	const [sortBy, setSortBy] = useState("likes");
	
// **********************************************************
	// Initialise un état pour gérer l'ouverture d'un menu déroulant
	const [isOpen, setIsOpen] = useState(false);
	
// **********************************************************
	// Génère un identifiant unique pour l'accessibilité (aria-labelledby par exemple)
	const sortLabelId = useId();
	
// **********************************************************
	// Crée un tableau pour stocker les références des options
	const optionRefs = useRef([]);
	// Vérifie quand le menu s'ouvre
	useEffect(() => {
		// Si le menu est ouvert et que la première option existe
		if (isOpen && optionRefs.current[0]) {
		// Met le focus directement sur la première option du menu
		optionRefs.current[0].focus();
		}
	// Déclenche ce code seulement quand isOpen change
	}, [isOpen]);
	
// **********************************************************
	// Crée une copie du tableau imagesPhotographer puis applique un tri selon le critère sélectionné
	const sortedMedias = [...imagesPhotographer].sort((a, b) => {
		// Si le tri sélectionné est "title", effectue un tri alphabétique
		if (sortBy === "title") {
			return a.title.localeCompare(b.title); 
		}
		// Si le tri sélectionné est "date", effectue un tri chronologique
		else if (sortBy === "date") {
			return new Date(a.date) - new Date(b.date); 
		}
		// Si le tri sélectionné est "likes", effectue un tri décroissant selon le nombre de likes
		else if (sortBy === "likes") {
			return b.likes - a.likes
		}
		// Retourne 0 si aucun critère ne correspond
		return 0;
	});
	
// **********************************************************
	// Initialise un état pour stocker l'index du média actuellement sélectionné
	const [mediaIndex, setMediaIndex] = useState(0)
	
// **********************************************************
	// Initialise un état pour gérer l'ouverture ou la fermeture de la modale média
	const [mediaModalOpen, setMediaModalOpen] = useState(false)
	
// **********************************************************
	// Initialise un état pour stocker le total global des likes du photographe
	const [allLikes, setAllLikes] = useState(totalLikesPhotographer)
	
// **********************************************************
	// Déclare une fonction qui incrémente le total global des likes
	const incrementAllLikes = () => {
  		// Met à jour l'état en ajoutant 1 à la valeur précédente
  		setAllLikes((prev) => prev + 1);
	};
	
// **********************************************************
	// 	Définit les différentes options de tri disponibles
	const sortOptions = [
		{ value: "likes", label: "Popularité" },
		{ value: "title", label: "Titre" },
		{ value: "date", label: "Date" },
	];

// ********************************************************
	//Vérifie que les données existent
	if (!photographer) {
		console.error("PhotographerMedia : photographe manquant !");
		return <ErrorMessage message="Informations du photographe indisponibles." />;
	}

	if (!imagesPhotographer || imagesPhotographer.length === 0) {
		console.error("PhotographerMedia : aucun média trouvé pour ce photographe !");
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
				<section>
					{/* Menu déroulant pour le tri des medias */}
					<div className={styles.order_by}>
						<p id={sortLabelId} className={styles.label_sort}>Trier par</p>
						<div className={styles.customSelect}>
							<button
								className={styles.selected}
								onClick={() => setIsOpen(!isOpen)}
								aria-haspopup="listbox"
								aria-expanded={isOpen}
								aria-labelledby={sortLabelId}
							>
								{/* Affiche le label correspondant à la valeur sélectionnée */}
								{sortOptions.find(option => option.value === sortBy)?.label}
								<FontAwesomeIcon
								icon={faChevronDown}
								className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
							/>
							</button>
							{/* Label pour les lecteurs d’écran */}
							<p id="sortLabel" className="sr-only">Trier par</p>
							{/* Affiche la Liste déroulante si isOpen = true */}
							{isOpen && (
								// Affiche le menu seulement si isOpen est vrai
								<ul
								// Applique le style CSS du menu déroulant
								className={styles.dropdown}
								// Définit le rôle pour l'accessibilité comme liste de sélection
								role="listbox"
								// Lie la liste au label "Trier par" pour les lecteurs d'écran
								aria-labelledby={sortLabelId}
								>
								{sortOptions
									// Supprime l'option déjà sélectionnée pour ne pas la montrer
									.filter(option => option.value !== sortBy)
									// Parcourt les options restantes
									.map((option, idx) => (
										<li
										// Clé unique pour React
										key={option.value}
										// Rôle d'option pour l'accessibilité
										role="option"
										// Identifiant de l'élément
										id={option.value}
										// Indique si cette option est sélectionnée
										aria-selected={option.value === sortBy}
										// Focus manuel avec flèches, Tab ne passe pas dessus
										tabIndex={-1}
										// Stocke chaque élément dans optionRefs pour gérer le focus avec les flèches
										ref={el => { if (el) optionRefs.current[idx] = el; }}
										// Action au clic : met à jour le critère de tri et ferme le menu
										onClick={() => {
											setSortBy(option.value);
											setIsOpen(false);
										}}
										// Gestion du clavier pour sélection et navigation
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												// Sélectionne l'option et ferme le menu
												e.preventDefault();
												setSortBy(option.value);
												setIsOpen(false);
											} else if (e.key === "Escape") {
											// Ferme le menu
												e.preventDefault();
												setIsOpen(false);
											} else if (e.key === "ArrowDown") {
											// Passe à l'option suivante
												e.preventDefault();
												const nextIdx = (idx + 1) % optionRefs.current.length;
												optionRefs.current[nextIdx].focus();
											} else if (e.key === "ArrowUp") {
												// Passe à l'option précédente
												e.preventDefault();
												const prevIdx = (idx - 1 + optionRefs.current.length) % optionRefs.current.length;
												optionRefs.current[prevIdx].focus();
											}
										}}
										>
											{/* Affiche le label de l'option */}
											{option.label}
										</li>
									))}
								</ul>
							)}
						</div>
					</div>
					{/* container des médias */}
					<div className={styles.container_media}>
						{/* parcourt la liste triée des médias */}
						{sortedMedias.map((pictures,index)=>(
						<div className={styles.card} key={pictures.id} 
>							<button
								tabIndex={0}
								type="button"
								onClick={()=>{
								// ouvre la modal média au clic
								setMediaIndex(index);
								setMediaModalOpen(true);
								}}
								onKeyDown={(e) => {
									// ouvre la modal média au clavier (entrée ou espace)
									if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setMediaIndex(index);
										setMediaModalOpen(true);
									}
								}}
								aria-label={`Ouvrir le média ${pictures.title}`}
							>
								{/* Si c'est une image */}
								{pictures.image ? (
								<Image
									className={styles.picture}
									src={`/assets/${pictures.image}`}
									alt={pictures.title}
									width={350}
									height={300}
									priority
								/>
								// Si c'est une vidéo
								) : pictures.video ? (
								<div className={styles.video} >
									<FontAwesomeIcon className={styles.icon} icon={faVideo} />
								</div>
								) : null}
							</button>
							{/* conteneur de la description du média */}
							<div className={styles.description}>
								<p className={styles.title}>{pictures.title}</p>
								<Likes mediaId={pictures.id} initialLikes={pictures.likes} onLike={incrementAllLikes} />
							</div>
						</div>
						))}
						{/* Modale pour afficher les médias en grand */}
						<MediaModal
							open={mediaModalOpen}
							photographer={photographer}
							imagesPhotographer={sortedMedias}
							startIndex={mediaIndex}
							close={() => setMediaModalOpen(false)}>
						</MediaModal>
						{/* Affiche le total des likes du photographe */}
						<TotalLikes totalLikesPhotographer={allLikes} photographer={photographer}/>
					</div>
				</section>
			</main>
		</>
	)
}