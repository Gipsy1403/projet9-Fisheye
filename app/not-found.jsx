import Link from "next/link";
import HeaderPhotographer from "../components/layout/Header-photographer";


export default function NotFound() {
	return ( 
		<>
		<HeaderPhotographer/>
		<Link href="/">
			<div className="container_notfound">
				<h1 className="notfound_title">404 - Page non trouvée</h1>
				<p className="notfound_sentence">Oups, cette page n’existe pas.</p>
				<button className="notfound_return">Retour à l'accueil</button>
			</div>
		</Link>
		</>
	);
}