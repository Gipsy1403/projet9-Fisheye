import Image from "next/image"
import styles from "./TotalLikes.module.css"

export default function TotalLikes({photographer, totalLikesPhotographer}) {

	return (
		<>
			<section className={styles.container_total_likes}>
				<div className={styles.total_likes}>
					<h3>{totalLikesPhotographer}</h3>
					<Image
						className={styles.heart}
						src={`/assets/images/favorite-black.png`}
						alt={`Picto like`}
						width={24}
						height={24}
					/>
				</div>
				<h3 className={styles.price}>{photographer.price} €/jour</h3>
			</section>
		</>
	)
}