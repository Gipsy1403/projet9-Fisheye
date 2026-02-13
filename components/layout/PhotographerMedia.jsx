
"use client";

import styles from "./PhotographerMedia.module.css";
import Image from 'next/image';
import HeaderPhotographer from "./Header-photographer";
import { useState } from "react";
import ContactModal from "../ui/ContactModal";
import MediaModal from "../ui/MediaModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faVideo, faChevronDown} from "@fortawesome/free-solid-svg-icons";
import Likes from "./Likes";
import TotalLikes from "./TotalLikes";


export default function PhotographerMedia({photographer, imagesPhotographer,totalLikesPhotographer}){
	const [modalOpen,setModalOpen]=useState(false);
	const [sortBy,setSortBy]=useState("likes");
	const [isOpen, setIsOpen] = useState(false);


	const sortedMedias=[...imagesPhotographer].sort((a, b) => {
		if (sortBy==="title") {
			return a.title.localeCompare(b.title); 
		} else if (sortBy==="date") {
			return new Date(a.date) - new Date(b.date); 
		} else if (sortBy==="likes") {
			return b.likes-a.likes
		}
		return 0;
	});

	const [mediaIndex, setMediaIndex]=useState(0)
	const [mediaModalOpen, setMediaModalOpen]=useState(false)
	const [allLikes, setAllLikes]=useState(totalLikesPhotographer)

	const incrementAllLikes = () => {
  		setAllLikes((prev) => prev + 1);
	};
	const sortOptions = [
		{ value: "likes", label: "Popularité" },
		{ value: "title", label: "Titre" },
		{ value: "date", label: "Date" },
	];




	return (
		<>
			<HeaderPhotographer />
			<main>
				<article className={styles.photographers}>
					<section>
						<h1 className={styles.name}>{photographer.name}</h1>
						<p className={styles.city}>{photographer.city}, {photographer.country}</p>
						<p className={styles.tagline}>{photographer.tagline}</p>
					</section>
					<button className={styles.contact_me} onClick={() => setModalOpen(true)}>
						Contactez-moi
					</button>
					<ContactModal
						open={modalOpen}
						close={() => setModalOpen(false)}
						title={`Contactez ${photographer.name}` }
						photographer={photographer}>
					</ContactModal>
					<Image
						className={styles.portrait}
						src={`/assets/${photographer.portrait}`}
						alt={photographer.name}
						width={200}
						height={200}
					/>
				</article>
				<section>
					<div className={styles.order_by}>
						<p id="sortLabel" className={styles.label_sort}>Trier par</p>
						<div className={styles.customSelect}>
						{/* Bouton principal */}
							<button
								className={styles.selected}
								onClick={() => setIsOpen(!isOpen)}
								aria-haspopup="listbox"
								aria-expanded={isOpen}
								aria-labelledby="sortLabel"
							>
								{sortOptions.find(option => option.value === sortBy)?.label}
								<FontAwesomeIcon
								icon={faChevronDown}
								className={`${styles.arrow} ${isOpen ? styles.open : ""}`}
							/>
							</button>
							{/* Label pour les lecteurs d’écran */}
							<p id="sortLabel" className="sr-only">Trier par</p>
							{/* Liste déroulante */}
							{isOpen && (
							<ul className={styles.dropdown}
								role="listbox"
								aria-activedescendant={sortBy}
								tabIndex={-1}
							>
								{sortOptions
								// empêche doublon
								.filter(option => option.value !== sortBy) 
								.map(option => (
									<li
										key={option.value}
										role="option"
										id={option.value}
										aria-selected={option.value === sortBy}
										tabIndex={0}
										onClick={() => {
										setSortBy(option.value);
										setIsOpen(false);
										}}
										onKeyDown={(e) => {
										if (e.key === "Enter" || e.key === " ") {
										e.preventDefault();
										setSortBy(option.value);
										setIsOpen(false);
										}
										}}
									>
									{option.label}
									</li>
								))}
							</ul>
							)}
						</div>
					</div>
					<div className={styles.container_media}>
						{sortedMedias.map((pictures,index)=>(
						<div className={styles.card} key={pictures.id} role="button" tabIndex={0}
						onClick={()=>{
							setMediaIndex(index);
							setMediaModalOpen(true);
						}}
						onKeyDown={(e) => {
							if (e.key === "Enter" || e.key === " ") {
								e.preventDefault();
								setMediaIndex(index);
								setMediaModalOpen(true);
							}
						}}>
							{pictures.image ? (
							// Si c'est une image
							<Image
								className={styles.picture}
								src={`/assets/${pictures.image}`}
								alt={pictures.title}
								width={350}
								height={300}
								priority
							/>
							) : pictures.video ? (
							// Si c'est une vidéo
							<div className={styles.video} >
								<FontAwesomeIcon className={styles.icon} icon={faVideo} />
							</div>
							) : null}
							<div className={styles.description}>
								<p className={styles.title}>{pictures.title}</p>
								<Likes mediaId={pictures.id} initialLikes={pictures.likes} onLike={incrementAllLikes} />
							</div>
						</div>
						))}
						<MediaModal
							open={mediaModalOpen}
							photographer={photographer}
							imagesPhotographer={sortedMedias}
							startIndex={mediaIndex}
							close={() => setMediaModalOpen(false)}>
						</MediaModal>
						<TotalLikes totalLikesPhotographer={allLikes} photographer={photographer}/>
					</div>
				</section>
			</main>
		</>
	)
}