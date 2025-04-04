import React from "react"
import "./page.css"
import { memo, useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { PageContext, SetPageContext } from "../../context";
import { components as pgs } from "./pages_data"
import Page from "./single_page"

function map(value, min1, max1, min2, max2) {
	return min2 + (max2 - min2) * ((value - min1) / (max1 - min1));
}


var swipeStartX = 0,
	currentHover = 0;


const Pages = memo(() => {

	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);
	const cntnr = useRef(null);

	useEffect(() => {

		const updateTouches = (e) => {
			swipeStartX = e.touches[0].clientX;
			setPageContextObj((prev) => {
				currentHover = prev.hover;
				return prev;
			})
		};

		window.addEventListener("touchstart", updateTouches);

		return () => {
			window.removeEventListener("touchstart", updateTouches);
		}
	}, []);

	
	useEffect(() => {
		let v = `calc(-${(pageContextObj.hover).toFixed(3)} * ( var(--mini-w) + var(--gap)) )`;
		cntnr.current.style.translate = `${v} 0`;
	}, [pageContextObj.hover]);


	const handleOpenWheel = useCallback((e) => {

		if (e.deltaY !== undefined) {

			let max = Math.abs(e.deltaY) > Math.abs(e.deltaX) ? e.deltaY : e.deltaX;
			let move = map(Math.abs(max), 0, 100, 0, 0.1);

			setPageContextObj(prev => ({
				...prev,
				hover: max < 0 ? Math.max(prev.hover - move, 0) : Math.min(prev.hover + move, pgs.length - 1)
			}));

			return;
		}

		let deltaX = e.touches[0].clientX - swipeStartX;
		let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 5);
		let newPos = deltaX > 0 ? Math.max(currentHover - move, 0) : Math.min(currentHover + move, pgs.length - 1);

		setPageContextObj(prev => ({
			...prev,
			hover: newPos,
		}));

	}, []);


	useEffect(() => {

		if (pageContextObj.open) {

			(async () => {
				await new Promise(r => setTimeout(r, 300));
				window.addEventListener("touchmove", handleOpenWheel, { passive: true });
				window.addEventListener("wheel", handleOpenWheel, { passive: true });
			})();
		}

		return () => {
			window.removeEventListener("touchmove", handleOpenWheel);
			window.removeEventListener("wheel", handleOpenWheel);
		}
	}, [pageContextObj.open]);


	const pageList = useMemo(() => {
		return pgs.map((comp, i) =>
			<Page Element={comp} i={i} key={i} />
		);
	}, []);


	return (
		<div ref={cntnr} className="pages-cont">
			{pageList}
		</div>
	)
});

export default Pages;