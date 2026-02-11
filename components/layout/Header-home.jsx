import Image from "next/image"
import Link from "next/link"
import "@/app/globals.css"
import styles from "./Header.module.css"

export default function HeaderHome(){
	return(
		<header className={styles.header} aria-label="Logo Fisheye, page Accueil">
			<Link href="/">
				<Image
					src={"/assets/images/Logo.svg"}
					alt="Fisheye Home page"
					width={200}
					height={50}
					/>
			</Link>
			<nav className={styles.bar_navigation}							>
				<ul>
					<li>Nos photographes</li>
				</ul>
			</nav>
		</header>
	)
}