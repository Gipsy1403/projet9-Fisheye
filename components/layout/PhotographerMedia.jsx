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

export default function PhotographerMedia({ photographer, imagesPhotographer, totalLikesPhotographer }) {
	// ======================================
	// RÉFÉRENCES
	// ======================================
	const buttonRef = useRef(null);
	const listboxRef = useRef(null);
	const optionRefs = useRef([]); // Références pour les options du menu déroulant

	// ======================================
	// ÉTATS
	// ======================================
	const [modalOpen, setModalOpen] = useState(false); // modale générale
	const [mediaModalOpen, setMediaModalOpen] = useState(false); // modale média
	const [mediaIndex, setMediaIndex] = useState(0); // média sélectionné
	const [allLikes, setAllLikes] = useState(totalLikesPhotographer); // total global des likes
	const [sortBy, setSortBy] = useState("likes"); // critère de tri
	const [isOpen, setIsOpen] = useState(false); // menu déroulant
	const [activeIndex, setActiveIndex] = useState(0); // option active du menu déroulant

	// ======================================
	// IDENTIFIANT POUR ACCESSIBILITÉ
	// ======================================
	const sortLabelId = useId(); 

	// ======================================
	// OPTIONS DE TRI
	// ======================================
	const sortOptions = [
		{ value: "likes", label: "Popularité" },
		{ value: "title", label: "Titre" },
		{ value: "date", label: "Date" },
	];

	const filteredOptions = sortOptions.filter(option => option.value !== sortBy);
	const activeOptionId = `sort-option-${filteredOptions[activeIndex]?.value || ""}`;

	// ======================================
	// TRI DES MÉDIAS
	// ======================================
	const sortedMedias = [...imagesPhotographer].sort((a, b) => {
		if (sortBy === "title") return a.title.localeCompare(b.title);
		if (sortBy === "date") return new Date(a.date) - new Date(b.date);
		if (sortBy === "likes") return b.likes - a.likes;
		return 0;
	});

	// ======================================
	// FONCTIONS
	// ======================================
	const incrementAllLikes = () => setAllLikes(prev => prev + 1);

	// ======================================
	// EFFETS
	// ======================================
	// Focus sur le menu déroulant quand il s'ouvre
	useEffect(() => {
		if (isOpen) {
			listboxRef.current?.focus();
			if (optionRefs.current[0]) optionRefs.current[0].focus();
		}
	}, [isOpen]);

	// ======================================
	// ⚠ Vérification des données pour le rendu
	// ======================================
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
								aria-haspopup="true"
								aria-expanded={isOpen}
								aria-labelledby={sortLabelId}
								aria-controls="sort-listbox"
ref={buttonRef}
							>
								{/* Affiche le label correspondant à la valeur sélectionnée */}
								{sortOptions.find(option => option.value === sortBy)?.label}
								<FontAwesomeIcon
								icon={faChevronDown}
								className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
							/>
							</button>
							{/* Affiche la Liste déroulante si isOpen = true */}
							{isOpen && (
								// Affiche le menu seulement si isOpen est vrai
<ul
  className={styles.dropdown}
  role="listbox"
  tabIndex={0}
  aria-labelledby={sortLabelId}
  aria-activedescendant={activeOptionId}
  ref={listboxRef}
	id="sort-listbox"

  onKeyDown={(e) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((prev) =>
        (prev + 1) % sortOptions.length
      );
    }

    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((prev) =>
        (prev - 1 + sortOptions.length) % sortOptions.length
      );
    }

    if (e.key === "Enter") {
      e.preventDefault();
      setSortBy(filteredOptions[activeIndex].value);
      setIsOpen(false);
	 setIsOpen(false);
buttonRef.current?.focus();

    }

    if (e.key === "Escape") {
      e.preventDefault();
      setIsOpen(false);
	 setIsOpen(false);
buttonRef.current?.focus();

    }
  }}
>

{filteredOptions
  .filter(option => option.value !== sortBy) // <-- supprime l'option déjà choisie
  .map((option, index) => (
    <li
      key={option.value}
      id={`sort-option-${option.value}`}
      role="option"
      aria-selected={option.value === sortBy}
      tabIndex={-1} 
      className={activeIndex === index ? styles.activeOption : ""}
      onClick={() => {
        setSortBy(option.value);
        setIsOpen(false);
        buttonRef.current?.focus();
      }}
    >
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