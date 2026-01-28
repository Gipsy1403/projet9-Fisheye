
import {getPhotographer, getAllMediasForPhotographer} from '../../lib/prisma-db';
import styles from "../../../components/layout/PhotographerPage.module.css";
import Image from 'next/image';
import HeaderPhotographer from "../../../components/layout/Header-photographer";
import Link from 'next/link';


export default async function PhotographerPage({params}){
	const idParams = await params;
	const photographerId = Number(idParams.id);
	const photographer = await getPhotographer(photographerId);
	const ImagesPhotographer=await getAllMediasForPhotographer(photographerId)
	return (
		<>
			<HeaderPhotographer></HeaderPhotographer>
			<article className={styles.photographers}>
					<section>
						<h1 className={styles.name}>{photographer.name}</h1>
						<h3 className={styles.city}>{photographer.city}, {photographer.country}</h3>
						<h4 className={styles.tagline}>{photographer.tagline}</h4>
					</section>
					<Link href={`/formulaire/${photographer.id}`}><button className={styles.contact_me}>Contactez-moi</button></Link>
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
				<div className={styles.container_media}>
					{ImagesPhotographer.map((pictures)=>(
					<div className={styles.card} key={pictures.id}>
						{pictures.image ? (
						// Si c'est une image
						<Image
							className={styles.picture}
							src={`/assets/${pictures.image}`}
							alt={`Portrait de ${pictures.title}`}
							width={350}
							height={300}
						/>
						) : pictures.video ? (
						// Si c'est une vidéo
						<video
							className={styles.video_placeholder}
							preload="none"
						>
							<source src={`/assets/${pictures.video}`} type="video/mp4" />
						</video>
						) : null}
						<div className={styles.description}>
							<h3 className={styles.title}>{pictures.title}</h3>
							<div className={styles.likes_red}>
								<h3 className={styles.likes}>{pictures.likes}</h3>
								<Image
									className={styles.heart}
									src={`/assets/images/favorite.png`}
									alt={`Picto like`}
									width={24}
									height={24}
								/>
							</div>
						</div>
					</div>
					))}
				</div>
			</section>
		</>
	)
}