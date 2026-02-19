import {getAllPhotographers} from '../../app/lib/prisma-db';
import styles from "./PhotographerCard.module.css";
import Image from 'next/image';
import Link from 'next/link';
import ErrorMessage from "../ui/ErrorMessage"


// Déclare une fonction asynchrone exportée par défaut nommée PhotographerCard
export default async function PhotographerCard(){

	// Déclaration d'un tableau vide pour stocker les photographes
	let allPhotographers = []
	try {
	// Appel de la fonction getAllPhotographers et attente de la récupération des données
	allPhotographers = await getAllPhotographers()

	// Vérification si la liste des photographes est vide ou nulle
	if (!allPhotographers || allPhotographers.length === 0) {
		// Lancement d'une erreur personnalisée si aucun photographe n'est trouvé
		throw new Error("Aucun photographe trouvé")
	}
	} catch (error) {
		// Affichage de l'erreur dans la console pour le débogage
		console.error("Erreur lors de la récupération des photographes :", error)
		// Affichage d'un message d'erreur à l'utilisateur
		return <ErrorMessage message="Impossible de charger les photographes pour le moment. Veuillez réessayer plus tard." />
	}

	return (
		<>
			<ul className={styles.photographers}>
				{allPhotographers.map((photographer)=>(
					<li className={styles.card} key={photographer.id}>
						<Link className={styles.focus} href={`/photographe/${photographer.id}`}>
							<Image
								className={styles.portrait}
								src={`/assets/${photographer.portrait}`}
								alt={`Photographe ${photographer.name}`}
								width={200}
								height={200}
							/>
							<h1 className={styles.name}>{photographer.name}</h1>
						</Link>
						<p className={styles.city}>{photographer.city}, {photographer.country}</p>
						<p className={styles.tagline}>{photographer.tagline}</p>
						<p className={styles.price}>{photographer.price} €/jour</p>
					</li>
				))}
			</ul>
		</>
	)
}