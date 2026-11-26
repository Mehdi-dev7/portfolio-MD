import Hero from "@/sections/Hero";
import About from "@/sections/About";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Testimonials from "@/sections/Testimonials";
import Contact from "@/sections/Contact";
import Footer from "@/layout/Footer";
import Navbar from "@/layout/Navbar";
import ReviewPage from "@/pages/ReviewPage";

// Lien privé envoyé aux clients : /?avis (pas de router, un simple paramètre d'URL suffit)
const isReviewPage = new URLSearchParams(window.location.search).has("avis");

function App() {
	if (isReviewPage) return <ReviewPage />;

	return (
		<>
			<div className="min-h-screen">
				<Navbar />
				<main>
					<Hero />
					<About /> <Projects /> <Experience /> <Testimonials /> <Contact />
				</main>
				<Footer />
			</div>
		</>
	);
}

export default App;
