import "./style.css"
import Navbar from "./components/nav/nav"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useEffect, useRef, useState } from "react"

function App() {

	const cursorRef = useRef(null);
	
	const [pageObjects, setPageObjects] = useState({
		index: 0,
		hover: 0,
		open: false,
	});

	useEffect(() => {
		window.addEventListener("mousemove", (e) => {
			if (!cursorRef.current) return;
			cursorRef.current.style.left = `${e.x}px`;
			cursorRef.current.animate(
				[{
						left: `${e.x}px`,
						top: `${e.y}px`
				}],
				{
					duration: 2000,
				}
			);
			cursorRef.current.style.top = `${e.y}px`;
		})
	}, [])
	
	return (
		<>
			<div
				ref={cursorRef}
				className="curs"
			>
			</div>
			<PageContext.Provider value={pageObjects}>
				<SetPageContext.Provider value={setPageObjects}>

					{/* <Navbar /> */}
					<Pages/>

				</SetPageContext.Provider>
			</PageContext.Provider>
		</>
	);
}

export default App;
