import React from "react"
import "./style.css"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useState, memo } from "react"
import Nav from "./components/nav/nav"
import { useAddEventListener } from "./hooks"

const bgnum = (() => {
	let max = 8;
	let n = Math.floor((Math.random() * max)) + 1;
	if (n > max) n = max;
	return n;
})();


const App = memo(() => {

	const [pageObjects, setPageObjects] = useState({
		hover: 0,
		open: false,
	});
		
	const [showNav, setShowNav] = useState(window.innerWidth > 800);

	useAddEventListener({current: window}, "resize", () => {
		setShowNav(window.innerWidth > 800);
	})

	return (
		<>

			<div id="bodybg">
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
