import "./style.css"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useState, useEffect, memo } from "react"
import Nav from "./components/nav/nav"

const bgnum = (() => {
	let n = Math.floor((Math.random() * 11)) + 1;
	if (n > 11) n = 11;
	return n;
})();


const App = memo(() => {

	const [pageObjects, setPageObjects] = useState({
		hover: 0,
		open: false,
	});
		
	const [showNav, setShowNav] = useState(window.innerWidth > 800);

	
	useEffect(() => {
		const handleResize = () => {
			setShowNav(window.innerWidth > 800);
		};
		
		window.addEventListener("resize", handleResize);
		
		return () => 
			window.removeEventListener("resize", handleResize);
	}, []);
		
	return (
		<>

			<div
				id="bodybg"
			>
				<picture>
					<source type="image/avif" srcSet={`./imgs/bgs/${bgnum}.avif`} />
					<img src={`./imgs/bgs/${bgnum}.jpg`} alt="background" />
				</picture>
				
				
			</div>

			<div className="bg-credits">
				<div>
					backgrounds
				</div>
				<div>
					by /
					<a
						href="https://www.deviantart.com/bisbiswas"
						target="_blank"
						rel="noopener noreferrer"
					>
						bisbiswas
					</a>
				</div>
			</div>
			
			<PageContext.Provider value={pageObjects}>
				<SetPageContext.Provider value={setPageObjects}>

					<Pages/>

					{showNav && <Nav/>}

				</SetPageContext.Provider>
			</PageContext.Provider>
		</>
	);
}, []);

export default App;
