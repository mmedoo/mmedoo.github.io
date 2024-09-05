import React, { useCallback, useContext, useEffect, useRef } from "react"
import { components as pgs , icons } from "./pages_data"
import { PageContext, SetPageContext } from "../../context";

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
	
	
	
	const handleCloseWheel = useCallback((e) => {
		let scrolled = parseInt(pageContRef.current.dataset.scrolled);
		let target = Number((scrolled + e.deltaY / 1.5).toFixed(3));
		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;
		
		if (target > maximum + 30 || target < 0) {
			setPageContextObj(prev => ({ ...prev, open: true }));
			return;
		}
		
		pageContRef.current.style.transform = `translate(0,-${target}px)`;

		pageContRef.current.dataset.scrolled = target;
	}, []);
		
	

	const handleCloseSwipe = useCallback((e) => {
		let deltaY = swipeStartY - e.touches[0].clientY;
		let scrolled = parseInt(pageContRef.current?.dataset.scrolled);
		let target = Number((scrolled + deltaY * 2).toFixed(3));
		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;

		if (target > maximum + 30 || target < 0) {
			setPageContextObj((prev) => ({ ...prev, open: true }));
			return;
		}

		pageContRef.current.animate({
			transform: `translate(0,-${target}px)`
		}, {
			duration: 1100,
			easing: "cubic-bezier(0.19, 1, 0.22, 1)",
			fill: "forwards",
		})

		// pageContRef.current.style.transform = `translate(0,-${target}px)`;
		
		pageContRef.current.dataset.lastScroll = target;
	}, []);

	

	const updateScrolled = useCallback(() => {
		pageContRef.current.dataset.scrolled = pageContRef.current.dataset.lastScroll;
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
		
		const pageNode = pageRef.current;
		
		pageNode?.addEventListener("click", removablePageClicked);
		
		return () => {
			window.removeEventListener("touchstart", updateTouches);
			pageNode?.removeEventListener("click", removablePageClicked);
		}
	}, [pageContextObj]);
	
	
	useEffect(() => {

		if (pageContextObj.open)
			return;

		const pageContNode = pageContRef.current;
		
		pageContNode?.addEventListener("touchend", updateScrolled);
		pageContNode?.addEventListener("wheel", handleCloseWheel, {passive: true});
		pageContNode?.addEventListener("touchmove", handleCloseSwipe, {passive: true});

		return () => {
			pageContNode?.removeEventListener("touchend", updateScrolled);
			pageContNode?.removeEventListener("wheel", handleCloseWheel);
			pageContNode?.removeEventListener("touchmove", handleCloseSwipe);
		}
	}, [pageContextObj.open]);
	
	
	
	
	

	return (
		<div
			ref={pageRef}
			className={ `page ${ (pageContextObj.hover === i && !pageContextObj.open) ? "open-page" : "" }` }
		>
		
			{/* <Backg/> */}
			
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