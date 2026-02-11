"use client";

import { useState } from "react";
import { updateLike } from "../../app/lib/updateLike";
import Image from "next/image";
import styles from "./TotalLikes.module.css"

export default function Likes({ mediaId, initialLikes, onLike }) {
	const [likes, setLikes] = useState(initialLikes);
	const [error, setError] = useState(null);  

	const onLikeClick = async (e) => {
		e.stopPropagation();

		const newLikes = likes + 1;
		setLikes(newLikes);
		onLike();

		try {
			await updateLike(mediaId, newLikes);
		} catch (err) {
			console.error(err);
			setLikes((prev)=>prev-1);
			setError("Impossible de liker pour le moment.");
		}
	};

	return (
		<div className={styles.likes_red}>
			<h3 className={styles.likes}>{likes}</h3>
			<Image
				src={`/assets/images/favorite.png`}
				alt={`Likes`}
				width={24}
				height={24}
				onClick={onLikeClick}
			/>
		</div>
	);
	}
