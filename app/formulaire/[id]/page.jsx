import { getPhotographer } from "../../lib/prisma-db"
import ContactModal from "../../../components/ui/ContactModal";

// Déclare une fonction asynchrone exportée par défaut nommée FormContactMe
export default async function FormContactMe({ params }) {
	// Récupère les paramètres transmis à la page
	const idParams = await params;
	// Convertit l’identifiant reçu en nombre
	const photographerId = Number(idParams.id);
	// Récupère les informations du photographe correspondant à l’identifiant
	const photographer = await getPhotographer(photographerId);

  return (
    <>
	<ContactModal photographer={photographer} />
    </>
  )
}
