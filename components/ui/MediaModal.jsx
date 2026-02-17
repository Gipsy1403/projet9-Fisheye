"use client";

import { useState, useEffect, useRef } from "react";
import styles from "./MediaModal.module.css";
import Image from "next/image";
import Link from "next/link";
import ErrorMessage from "./ErrorMessage";

// Déclare le composant MediaModal et récupère les propriétés photographer, imagesPhotographer, startIndex, close et open
export default function MediaModal({ photographer, imagesPhotographer, startIndex, close, open }) {

  // --------------------------
  // 1️⃣ États principaux
  // --------------------------
  const [index, setIndex] = useState(0);        // Commence toujours à 0
  const [loading, setLoading] = useState(true); // Chargement du média
  const [loadError, setLoadError] = useState(false); // Erreur de chargement

  const currentMedia = imagesPhotographer?.[index]; // Média courant
  const isVideo = currentMedia?.video;

  // --------------------------
  // 2️⃣ Références DOM
  // --------------------------
  const nextBtnRef = useRef(null); // bouton précédent
  const modalRef = useRef(null);   // conteneur modale
  const videoRef = useRef(null);   // référence vidéo si le média est vidéo

  // --------------------------
  // 3️⃣ Effets secondaires
  // --------------------------

  // Mettre à jour l'index à l'ouverture sur le média cliqué
  useEffect(() => {
    if (open && startIndex !== undefined) {
      // Utilisation d'un setTimeout pour éviter le warning "cascading renders"
      const timer = setTimeout(() => {
        setIndex(startIndex);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [open, startIndex]);

  // Focus automatique : vidéo si média vidéo, sinon bouton précédent
  useEffect(() => {
    if (!open) return;
    if (isVideo && videoRef.current) {
      videoRef.current.focus();
    } else if (nextBtnRef.current) {
      nextBtnRef.current.focus();
    }
  }, [open, isVideo]);

  // Focus trap pour la navigation au clavier dans la modale
  useEffect(() => {
    if (!open || !modalRef.current) return;

    const handleTabKey = (e) => {
      if (e.key !== "Tab") return;

      const focusable = modalRef.current.querySelectorAll(
        'button, [href], [tabindex]:not([tabindex="-1"])'
      );
      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleTabKey);
    return () => document.removeEventListener("keydown", handleTabKey);
  }, [open]);

  // --------------------------
  // 4️⃣ Fonctions de navigation
  // --------------------------
  const previousImage = () =>
    setIndex((index - 1 + imagesPhotographer.length) % imagesPhotographer.length);

  const nextImage = () =>
    setIndex((index + 1) % imagesPhotographer.length);

  // --------------------------
  // 5️⃣ Vérifications avant affichage
  // --------------------------
  if (!imagesPhotographer || imagesPhotographer.length === 0) {
    console.error("MediaModal : aucun média disponible pour ce photographe !");
    return <ErrorMessage message="Aucun média disponible pour ce photographe." />;
  }

  if (!currentMedia) {
    console.error(`MediaModal : média introuvable à l'index ${index}`);
    return <ErrorMessage message="Média introuvable." />;
  }

  if (!open) return null;
	
	return (
		<div className={styles.superposition} role="presentation">
			<div className={styles.modal} role="dialog" aria-modal="true" aria-labelledby="modal-title" ref={modalRef}>
				<div className={styles.container_view}>
					{loading && (
						<div className={styles.spinnerOverlay}>
							<div className={styles.spinner}></div>
						</div>
					)}
					{loadError && <ErrorMessage message="Impossible de charger ce média." />}
					<div className={styles.container_medias}>
						{currentMedia.image ? (
							<Image
								className={styles.photo}
								src={`/assets/${currentMedia.image}`}
								alt={currentMedia.title}
								width={1050}
								height={900}
								onLoad={()=> setLoading(false)}
								onError={() => {
									console.error(`MediaModal : erreur de chargement de l'image ${currentMedia.image}`);
									setLoadError(true);
								}}
							/>
						) : currentMedia.video ? (
							<video className={styles.video} controls 
								ref={videoRef}
								tabIndex={0}
								onLoadedData={() => setLoading(false)}
								onError={() => {
									console.error(`MediaModal : erreur de chargement de la vidéo ${currentMedia.video}`);
									setLoadError(true);
								}}
							>
								<source src={`/assets/${currentMedia.video}`} type="video/mp4" />
							</video>
						) : null}
						<p className={styles.media_title}>{currentMedia.title}</p>
					</div>
					<Link
						href="#"
						className={styles.next}
						aria-label="Next image"
						onClick={(e) => {
							e.preventDefault();
							nextImage();
						}}
						ref={nextBtnRef}
						>
						{">"}
					</Link>
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

					
					<button aria-label="close dialog" className={styles.btn} onClick={close}>✖</button>

				</div>
			</div>
		</div>
	)
}