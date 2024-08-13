import "./style.css"
import Pages from "./components/pages/pages"
import { PageContext, SetPageContext } from "./context"
import { useEffect, useRef, useState, useCallback, useMemo } from "react"

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
		window.addEventListener("mousemove", handleMouseMove)
		return () => {
			window.removeEventListener("mousemove", handleMouseMove)
		}
	}, [])
	
	const pageContextValue = useMemo(() => pageObjects, [pageObjects]);
	const setPageContextValue = useMemo(() => setPageObjects, []);
	
	return (
		<>
			<div
				ref={cursorRef}
				className="curs"
			>
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
