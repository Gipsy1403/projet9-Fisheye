import { getPhotographer } from "../../lib/prisma-db"
import ContactModal from "../../../components/ui/ContactModal";

export default async function FormContactMe({params}) {
	const idParams = await params;
	const photographerId = Number(idParams.id);
	const photographer = await getPhotographer(photographerId);
  return (
    <>
	<ContactModal photographer={photographer} />
    </>
  )
}
