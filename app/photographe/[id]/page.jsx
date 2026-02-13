
import {getPhotographer, getAllMediasForPhotographer, getTotalLikesForPhotographer} from '../../lib/prisma-db';
import PhotographerMedia from '../../../components/layout/PhotographerMedia';
import MediaModal from '../../../components/ui/MediaModal';

// Déclare une fonction asynchrone exportée par défaut nommée PhotographerPage
export default async function PhotographerPage({ params }) {
	// Récupère les paramètres transmis à la page
	const idParams = await params;
	// Convertit l’identifiant reçu en nombre
	const photographerId = Number(idParams.id);
	// Récupère les informations du photographe correspondant à l’identifiant
	const photographer = await getPhotographer(photographerId);
	// Récupère tous les médias associés au photographe
	const imagesPhotographer = await getAllMediasForPhotographer(photographerId);
	// Récupère la somme totale des likes pour ce photographe
	const totalLikesData = await getTotalLikesForPhotographer(photographerId);
	// Extrait la valeur totale des likes ou retourne 0 si la valeur est null ou undefined
	const totalLikesPhotographer = totalLikesData._sum.likes ?? 0;

	return (
		<>
			<PhotographerMedia photographer={photographer} imagesPhotographer={imagesPhotographer} totalLikesPhotographer={totalLikesPhotographer} />
			<MediaModal photographer={photographer} imagesPhotographer={imagesPhotographer} />
		</>
	)
}