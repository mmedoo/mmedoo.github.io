import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import React, { useCallback, useContext, useEffect, useMemo, useRef } from "react"
import { PageContext, SetPageContext } from "../../context";

function map(value, start1, stop1, start2, stop2){
	return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
}

const icons = [
	<svg>
		<use xlinkHref="icons/home.svg#home"/>
	</svg>
	,
	<svg>
		<use xlinkHref="icons/rocket.svg#rocket"/>
	</svg>
	,
	<svg>
		<use xlinkHref="icons/send.svg#send"/>
	</svg>
	,
	<svg>
		<use xlinkHref="icons/about.svg#about"/>
	</svg>
];


const pgs = [Hero, Proj, Contect];


var swipeStartX = 0,
	swipeStartY = 0,
	currentHover = 0;
	
	
	
const Page = React.memo (({Element, i}) => {
		
	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);
	const pageContRef = useRef(null);
	const pageIconRef = useRef(null);

	
	
	
	
	const centerPageContent = useCallback((n) => {
	
		pageContRef.current.style.left = `calc(${(n - i) * 50 / (pgs.length-1)}% + 50%)`;
		
		pageIconRef.current.style.translate = `calc(${(n - i)} * 100%)`;

	}, []);
	
	

	const pageClicked = useCallback((e, obj) => {
		if (obj.open) {
			centerPageContent(i);
			setPageContextObj({hover: i,index: i,open: false});
		} else {
			return;
			let next = e.clientX < window.innerWidth / 2 ?
				Math.max(obj.index - 1, 0)
			: Math.min(obj.index + 1, pgs.length - 1);
			setPageContextObj({index: next,hover: next,open: false});
		}
	}, []);
	
	
	
	const handleCloseWheel = useCallback((e) => {
		let scrolled = parseInt(pageContRef.current.dataset.scrolled);
		let target = scrolled + e.deltaY / 1.5;
		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;
		
		if (target > maximum + 60 || target < 0) {
			setPageContextObj(prev => ({ ...prev, open: true }));
			// pageContRef.current.removeEventListener("wheel", handleCloseWheel);
			return;
		}
		pageContRef.current.animate(
			{ transform: `translate(0,-${target}px)` },
			{ fill: "forwards",duration: 1000,easing: "ease-out" }
		)
		pageContRef.current.dataset.scrolled = target;
	}, []);
	
	

	const handleCloseSwipe = useCallback((e) => {
		let deltaY = swipeStartY - e.touches[0].clientY;
		let scrolled = parseInt(pageContRef.current?.dataset.scrolled);
		let target = scrolled + deltaY * 2;
		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;

		if (target > maximum + 80 || target < 0) {
			setPageContextObj((prev) => ({ ...prev, open: true }));
			return;
		}
		pageContRef.current.animate(
			{ transform: `translate(0,-${target}px)` },
			{ fill: "forwards", duration: 1000, easing: "ease-out" }
		);
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
		
		pageRef.current?.addEventListener("click", removablePageClicked);
		
		return () => {
			pageRef.current?.removeEventListener("click", removablePageClicked);
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
			className={ `page ${ pageContextObj.open ? "shrink" : "" }` }
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













const Pages = React.memo(() => {

	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);

	const cntnr = useRef(null);


	const centerCont = useCallback((obj) => {

		let v = `calc(-${obj.hover} * ( var(--mini-w) + var(--gap)) )`;

		if (!obj.open)
			v = `calc(-${obj.hover} * ( 100vw + var(--gap)) )`
		
		cntnr.current.style.translate = `${v} -50%`;

	}, []);
	
	

	const handleOpenWheel = useCallback((e) => {
		let move = map(Math.abs(e.deltaY), 0, 100, 0, 0.1);
		setPageContextObj(prev => ({
			...prev,
			hover: e.deltaY < 0 ? Math.max(prev.hover - move, 0) : Math.min(prev.hover + move, pgs.length-1),
		}));
	}, []);
	
	

	const handleOpenSwipe = useCallback((e) => {
		let deltaX = e.touches[0].clientX - swipeStartX;		
		let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 5);
		setPageContextObj((prev) => ({
			...prev,
			hover: deltaX > 0 ? Math.max(currentHover - move, 0) : Math.min(currentHover + move, pgs.length-1),
		}));
	}, []);
	
	
	
	
	
	useEffect(() => {
		centerCont(pageContextObj);
	}, [pageContextObj.hover, pageContextObj.open]);
	
	
	
	useEffect(() => {

		const updateTouches = (e) => {
			const touch = e.touches[0];
			swipeStartX = touch.clientX;
			swipeStartY = touch.clientY;
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
			await new Promise(r => setTimeout(r, 500));
			window.addEventListener("touchmove", handleOpenSwipe, {passive: true});
			window.addEventListener("wheel",handleOpenWheel,{passive: true});
		})();

		return () => {
			window.removeEventListener("touchmove", handleOpenSwipe);
			window.removeEventListener("wheel",handleOpenWheel);
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