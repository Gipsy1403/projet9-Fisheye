import {getAllPhotographers} from '../../app/lib/prisma-db';
import styles from "./PhotographerCard.module.css";
import Image from 'next/image';
import Link from 'next/link';

export default async function PhotographerCard(){
	const allPhotographers=await getAllPhotographers()


		return (
		<>
				<ul className={styles.photographers}>
					{allPhotographers.map((photographer)=>(
						<li className={styles.card} key={photographer.id}>
							<Link className={styles.focus} href={`/photographe/${photographer.id}`}>
								<Image
									className={styles.portrait}
									src={`/assets/${photographer.portrait}`}
									alt={photographer.name}
									width={200}
									height={200}
								/>
								<h2 className={styles.name}>{photographer.name}</h2>
							</Link>
							<p className={styles.city}>{photographer.city}, {photographer.country}</p>
							<h5 className={styles.tagline}>{photographer.tagline}</h5>
							<h6 className={styles.price}>{photographer.price} €/jour</h6>
				
				
						</li>
					))}
				</ul>
		</>
	)
}