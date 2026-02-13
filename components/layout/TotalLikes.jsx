import Image from "next/image"
import styles from "./TotalLikes.module.css"

export default function TotalLikes({photographer, totalLikesPhotographer}) {

	return (

		<section className={styles.container_total_likes}>
			<div className={styles.total_likes}>
				<p>{totalLikesPhotographer}</p>
				<Image
					src={`/assets/images/favorite-black.png`}
					alt={`Picto like`}
					width={21}
					height={24}
				/>
			</div>
			<p className={styles.price}>{photographer?.price} €/jour</p>
		</section>

	)
}