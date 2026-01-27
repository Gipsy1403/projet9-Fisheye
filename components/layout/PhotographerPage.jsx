import {getPhotographer, getAllMediasForPhotographer} from '../../app/lib/prisma-db';
import styles from "./PhotographerCard.module.css";
import Image from 'next/image';
import ContactButton from '../ui/Button';


export default async function PhotographerPage({params}){
	const photographerId=Number(params.id)
	const photographer=await getPhotographer(photographerId)
	const ImagesPhotographer=await getAllMediasForPhotographer(photographerId)
	return (
		<>
			<article className={styles.photographers}>
					<section>
						<h2 className={styles.name}>{photographer.name}</h2>
						<p className={styles.city}>{photographer.city}, {photographer.country}</p>
						<h5 className={styles.tagline}>{photographer.tagline}</h5>
					</section>
					<ContactButton></ContactButton>
					<Image
						className={styles.portrait}
						src={`/assets/${photographer.portrait}`}
						alt={`Portrait de ${photographer.name}`}
						width={200}
						height={200}
					/>
			</article>
			<section>
				<div>
					<h4>Trier par</h4>
					tag
				</div>
				<div>
					{ImagesPhotographer.map((pictures)=>(
					<div className={styles.card} key={pictures.id}>
						<div>
							<Image
								className={styles.picture}
								src={`/assets/${pictures.image}`}
								alt={`Portrait de ${pictures.title}`}
								width={350}
								height={300}
							/>
						</div>
						<div>
							<h3 className={styles.title}>{pictures.title}</h3>
							<h3 className={styles.likes}>{pictures.likes}</h3>
							<Image
								className={styles.picture}
								src={`/assets/images/favorite.png`}
								alt={`Picto like`}
								width={24}
								height={24}
							/>
						</div>
					</div>
					))}
				</div>
			</section>
		</>
	)
}