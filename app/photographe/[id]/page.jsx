
import {getPhotographer, getAllMediasForPhotographer} from '../../lib/prisma-db';
import PhotographerMedia from '../../../components/layout/PhotographerMedia';
import MediaModal from '../../../components/ui/MediaModal';

export default async function PhotographerPage({params}){
	const idParams = await params;
	const photographerId = Number(idParams.id);
	const photographer = await getPhotographer(photographerId);
	const imagesPhotographer=await getAllMediasForPhotographer(photographerId)

	return (
		<>
			<PhotographerMedia photographer={photographer} imagesPhotographer={imagesPhotographer} />
			<MediaModal photographer={photographer} imagesPhotographer={imagesPhotographer} />
		</>
	)
}