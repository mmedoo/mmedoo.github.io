import "./style.css"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"

const bgno = () => {
	let n = Math.floor((Math.random() * 11)) + 1;
	if (n > 11)
		n = bgno();
	return n;
}

const bgnum = bgno();

function App() {

	const cursorRef = useRef(null);
	
	const [pageObjects, setPageObjects] = useState({
		index: 0,
		hover: 0,
		open: false,
	});

	const handleMouseMove = useCallback((e) => {			
		cursorRef.current?.animate(
			{ left: `${e.x}px`, top: `${e.y}px` },
			{ duration: 1000, fill: "both", easing: "ease-in-out" }
		);
	}, []);

	useEffect(() => {
		if (window.innerWidth > 800) {
			window.addEventListener("mousemove", handleMouseMove)
			return () => {
				window.removeEventListener("mousemove", handleMouseMove)
			}
		}
	}, [window.innerWidth])
	
	const pageContextValue = useMemo(() => pageObjects, [pageObjects]);
	const setPageContextValue = useMemo(() => setPageObjects, []);
	
	return (
		<>
			{/* <div ref={cursorRef} className="curs"></div> */}

			<div
				id="bodybg"
				style={{
					backgroundImage: `url("./imgs/bgs/${bgnum}.jpg")`,
				}}
			></div>

			<div className="bg-credits">
				<div>
					Backgrounds
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
			
			<PageContext.Provider value={pageContextValue}>
				<SetPageContext.Provider value={setPageContextValue}>

					<Pages/>

				</SetPageContext.Provider>
			</PageContext.Provider>
		</>
	);
}

export default App;
