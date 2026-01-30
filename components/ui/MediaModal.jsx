"use client";

import { useState, useEffect } from "react";
import styles from "./MediaModal.module.css";
import Image from "next/image";

export default function MediaModal({photographer,imagesPhotographer, startIndex, close, open}) {
	const [index, setIndex]= useState(startIndex);

	useEffect(() => {
		setIndex(startIndex);
	}, [startIndex]);

	const previousImage=()=>setIndex((index -1 + imagesPhotographer.length) % imagesPhotographer.length);
	const nextImage=()=>setIndex((index+1) % imagesPhotographer.length);

	const pictures=imagesPhotographer[index];
	if (!pictures) return null;

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
					<button className={styles.previous} onClick={previousImage}>{"<"}</button>
					<button className={styles.next} onClick={nextImage}>{">"}</button>
				</div>
				<button className={styles.btn} onClick={close}>✖</button>
			</div>
		</div>
	)
}