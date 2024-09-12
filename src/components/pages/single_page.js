import React, { useCallback, useContext, useEffect, useRef } from "react"
import { components as pgs , icons } from "./pages_data"
import { PageContext, SetPageContext } from "../../context";
import Backg from "./background/background"

var swipeStartY = 0;


const Page = React.memo (({Element, i}) => {
		
	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);
	const pageContRef = useRef(null);
	const pageIconRef = useRef(null);

	
	const centerPageContent = useCallback((n) => {
		let relativePos = Number((n - i).toFixed(3));

		pageContRef.current.style.translate = `calc(${relativePos * 20 / (pgs.length-1)}% - 50%) -50%`;
		
		pageIconRef.current.style.translate = `${ relativePos * 100 }%`;
	}, []);
	
	

	const pageClicked = useCallback((e, obj) => {
		if (obj.open) {
			centerPageContent(i);
			setPageContextObj({hover: i,open: false});
		} else {
			return;
			let next = e.clientX < window.innerWidth / 2 ?
				Math.max(obj.hover - 1, 0)
			: Math.min(obj.hover + 1, pgs.length - 1);
			setPageContextObj({hover: next,open: false});
		}
	}, []);
	

	
	const handleOverScroll = useCallback((e) => {
		let target = (e.deltaY !== undefined) ?
			e.deltaY
		: (swipeStartY - e.touches[0].clientY);
		let scrolled = pageContRef.current.scrollTop / (pageContRef.current.scrollHeight - pageContRef.current.offsetHeight);
		
		if (
			(scrolled == 0 && target < 0)
			||
			(scrolled >= 0.99 && target > 0)
		){
			setPageContextObj(prev => ({ ...prev, open: true }));
		}
	}, []);



	useEffect(() => {

		centerPageContent(pageContextObj.hover);
		
		const removablePageClicked = (e) => {
			pageClicked(e, pageContextObj);
		}

		const updateTouches = (e) => {
			swipeStartY = e.touches[0].clientY;
		}

		window.addEventListener("touchstart", updateTouches);
		
		pageRef.current?.addEventListener("click", removablePageClicked);
		
		return () => {
			window.removeEventListener("touchstart", updateTouches);
			pageRef.current?.removeEventListener("click", removablePageClicked);
		}
	}, [pageContextObj]);
	
	
	
	useEffect(() => {

		if (pageContextObj.open)
			return;

		const pageContNode = pageContRef.current;
		
		pageContNode?.addEventListener("wheel", handleOverScroll);
		pageContNode?.addEventListener("touchmove", handleOverScroll);
		
		return () => {
			
			pageContNode?.removeEventListener("wheel", handleOverScroll);
			pageContNode?.removeEventListener("touchmove", handleOverScroll);
		}

	}, [pageContextObj.open]);
	
	

	return (
		<div
			ref={pageRef}
			className={ `page ${ (pageContextObj.hover === i && !pageContextObj.open) ? "open-page" : "" }` }
		>
		
			<Backg/>
			
			<div
				className="page-icon"
				ref={pageIconRef}
			>
				
				{icons[i]}

			</div>
			
			<div
				className="page-container"
				ref={pageContRef}
				data-scrolled="0"
				data-last-scroll="0"
			>
				
				<Element/>
				
			</div>
		</div>
	)
});


export default Page;