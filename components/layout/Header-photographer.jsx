import Image from "next/image"
import Link from "next/link"
import "@/app/globals.css"
import styles from "./Header.module.css"

export default function HeaderPhotographer(){
	return(
		<header className={styles.header}>
			<Link href="/">
				<Image
					className="logo"
					src={"/assets/images/Logo.svg"}
					alt="Fisheye Home page"
					width={200}
					height={50}
				/>
			</Link>
		</header>
	)
}