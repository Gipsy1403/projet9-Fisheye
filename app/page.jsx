import HeaderHome from "@/components/layout/Header-home"
import PhotographerCard from "@/components/layout/PhotographerCard"
// import PhotographerPage from "@/components/layout/PhotographerPage"

export default function Home() {
  return (
	
	<main>
		<header>
			<HeaderHome/>
		</header>
		<main>
			<PhotographerCard/>
			{/* <PhotographerPage/> */}
		</main>
	</main>


  )

}
