import "./page.css"
import { memo, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { PageContext, SetPageContext } from "../../context";
import { components as pgs } from "./pages_data"
import Page from "./single_page"

function map(value, start1, stop1, start2, stop2){
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}


var swipeStartX = 0,
	currentHover = 0;


const Pages = memo(() => {

	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);

	const cntnr = useRef(null);


	const centerCont = useCallback((obj) => {	

		let v = `calc(-${(obj.hover).toFixed(3)} * ( var(--mini-w) + var(--gap)) )`;

		cntnr.current.style.translate = `${v} 0`;
	}, []);
	
	
	const handleOpenWheel = useCallback((e) => {

		if (e.deltaY !== undefined) {
			let max = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
			let move = map(Math.abs(max), 0, 100, 0, 0.1);
			setPageContextObj(prev => ({
				...prev,
				hover: max < 0 ? Math.max(prev.hover - move, 0) : Math.min(prev.hover + move, pgs.length-1)
			}));
			return;	
		}

		let deltaX = e.touches[0].clientX - swipeStartX;		
		let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 5);
		let newPos = deltaX > 0 ? Math.max(currentHover - move, 0) : Math.min(currentHover + move, pgs.length-1);
		
		setPageContextObj(prev => ({
			...prev,
			hover: newPos,
		}));
		
	}, []);

		
	useEffect(() => {
		centerCont(pageContextObj);
		
		const updateTouches = (e) => {
			swipeStartX = e.touches[0].clientX;
			currentHover = pageContextObj.hover;
		}

		window.addEventListener("touchstart", updateTouches);
		
		return () => {
			window.removeEventListener("touchstart", updateTouches);
		}
		
	}, [pageContextObj]);
	
	

	useEffect(() => {

		if (!pageContextObj.open)
			return;

		(async () => {
			await new Promise(r => setTimeout(r, 300));
			window.addEventListener("touchmove", handleOpenWheel, {passive: true});
			window.addEventListener("wheel",handleOpenWheel,{passive: true});
		})();

		return () => {
			window.removeEventListener("touchmove", handleOpenWheel);
			window.removeEventListener("wheel",handleOpenWheel);
		}

	}, [pageContextObj.open]);
	
	
	
	const pageList = useMemo(() => {

		return pgs.map((comp, i) =>
			
			<Page Element={comp} i={i} key={i} />
		);
	}, []);
	
	
	return (
		<>
			<div ref={cntnr} className="pages-cont">
				{pageList}
				
			</div>
		</>


	)
});

export default Pages;