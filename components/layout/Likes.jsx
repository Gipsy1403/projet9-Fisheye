"use client";

import { useState } from "react";
import UpdateLike from"../../app/likes/[id]/page"
import Image from "next/image";
import styles from "./TotalLikes.module.css"

export default function Likes({ mediaId, initialLikes }) {
	const [likes, setLikes] = useState(initialLikes);

	const onLikeClick = async (e) => {
		e.stopPropagation();

	const newLikes = likes + 1;
	setLikes(newLikes);

	// await UpdateLike(mediaId, newLikes);
	  try {
    await UpdateLike(mediaId, newLikes);
  } catch (err) {
    console.error(err);
    // On peut éventuellement revenir en arrière si la mise à jour échoue
    setLikes(likes);
  }
	};

	return (
		<div className={styles.likes_red}>
			<h3 className={styles.likes}>{likes}</h3>
			<Image
				className={styles.heart}
				src={`/assets/images/favorite.png`}
				alt={`Picto like`}
				width={24}
				height={24}
				onClick={onLikeClick}
			/>
		</div>
	);
	}
