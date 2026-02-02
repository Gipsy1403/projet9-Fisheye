
import {getPhotographer, getAllMediasForPhotographer, getTotalLikesForPhotographer} from '../../lib/prisma-db';
import PhotographerMedia from '../../../components/layout/PhotographerMedia';
import MediaModal from '../../../components/ui/MediaModal';
import TotalLikes from '../../../components/layout/TotalLikes';

export default async function PhotographerPage({params}){
	const idParams = await params;
	const photographerId = Number(idParams.id);
	const photographer = await getPhotographer(photographerId);
	const imagesPhotographer=await getAllMediasForPhotographer(photographerId);
	const totalLikesData=await getTotalLikesForPhotographer(photographerId);
	const totalLikesPhotographer=totalLikesData._sum.likes ?? 0;
	


	return (
		<>
			<PhotographerMedia photographer={photographer} imagesPhotographer={imagesPhotographer} totalLikesPhotographer={totalLikesPhotographer} />
			<MediaModal photographer={photographer} imagesPhotographer={imagesPhotographer} />
			<TotalLikes totalLikesPhotographer={totalLikesPhotographer} photographer={photographer}/>
		</>
	)
}