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

const arr = [Hero, Proj, Contect, About];

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
	
		const animation_option = {
			duration: 1000,
			fill: "both",
			easing: "ease-out"
		}
			  
		pageContRef.current.animate(
			{ left: `calc(${(n - i) * 50 / 3}% + 50%)` },
			animation_option
		);
	  
		pageIconRef.current.animate(
			{ translate: `calc(${(n - i)} * 100%)` },
			animation_option
		);
	}, []);

	const pageClicked = useCallback((e, obj) => {
		if (obj.open) {
			centerPageContent(i);
			setPageContextObj({hover: i,index: i,open: false});
		} else {			
			let next = e.clientX < window.innerWidth / 2 ?
				Math.max(obj.index - 1, 0)
			: Math.min(obj.index + 1, 3);
			setPageContextObj({index: next,hover: next,open: false});
		}
	}, []);
	
	const handleCloseWheel = useCallback((e, obj) => {
		if (obj.open) return;
		let scrolled = parseInt(pageContRef.current.dataset.scrolled);
		let target = scrolled + e.deltaY / 1.5;
		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;
		
		if (target > maximum + 80 || target < 0) {
			setPageContextObj(prev => ({ ...prev, open: true }));
			// pageContRef.current.removeEventListener("wheel", handleCloseWheel);
			return;
		}
		pageContRef.current.animate(
			{ transform: `translate(0,-${target}px)` },
			{ fill: "both",duration: 1000,easing: "ease-out" }
		)
		pageContRef.current.dataset.scrolled = target;
	}, []);

	const handleCloseSwipe = useCallback((e, obj) => {
		if (obj.open) return;
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
			{ fill: "both", duration: 1000, easing: "ease-out" }
		);
		pageContRef.current.dataset.lastScroll = target;
	}, []);
	

	useEffect(() => {
		centerPageContent(pageContextObj.hover);
	
		const removableHandleCloseWheel = (e) => {
			handleCloseWheel(e,pageContextObj)
		}
		
		const removableHandleCloseSwipe = (e) => {
			handleCloseSwipe(e,pageContextObj)
		}
		
		const updateScrolled = () => {
			pageContRef.current.dataset.scrolled = pageContRef.current.dataset.lastScroll;
		}

		const removablePageClicked = (e) => {
			pageClicked(e, pageContextObj);
		}
		
		pageContRef.current?.addEventListener("touchend", updateScrolled);
		pageContRef.current?.addEventListener("wheel", removableHandleCloseWheel, {passive: true});
		pageContRef.current?.addEventListener("touchmove", removableHandleCloseSwipe, {passive: true});
		pageRef.current?.addEventListener("click", removablePageClicked);
		
		return () => {
			pageContRef.current?.removeEventListener("touchend", updateScrolled);
			pageRef.current?.removeEventListener("click", removablePageClicked);
			pageContRef.current?.removeEventListener("wheel", removableHandleCloseWheel);
			pageContRef.current?.removeEventListener("touchmove", removableHandleCloseSwipe);
		}
		
	}, [pageContextObj])	

	

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
				
		let animation_option = {
			duration: 800,
			fill: "both",
			easing: "ease-out"
		}
		cntnr.current.animate(
			{ translate: `${v} -50%` },
			animation_option
		);
	}, []);

	const handleOpenWheel = useCallback((e, obj) => {
		if (!obj.open) return;
		let move = map(Math.abs(e.deltaY), 0, 100, 0, 0.25);
		setPageContextObj(prev => ({
			...prev,
			hover: e.deltaY < 0 ? Math.max(prev.hover - move, 0) : Math.min(prev.hover + move, 3),
		}));
	}, []);

	const handleOpenSwipe = useCallback((e, obj) => {	
		if (!obj.open) return;
		let deltaX = e.touches[0].clientX - swipeStartX;		
		let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 6);
		setPageContextObj((prev) => ({
			...prev,
			hover: deltaX > 0 ? Math.max(currentHover - move, 0) : Math.min(currentHover + move, 3),
		}));
	});
	
	useEffect(() => {

		centerCont(pageContextObj);

		const removableHandleOpenWheel = (e) => {
			handleOpenWheel(e, pageContextObj);
		}

		const removableHandleOpenSwipe = (e) => {
			handleOpenSwipe(e, pageContextObj)
		}

		const updateTouches = (e) => {
			const touch = e.touches[0];
			swipeStartX = touch.clientX;
			swipeStartY = touch.clientY;
			currentHover = pageContextObj.hover;
		}

		window.addEventListener("touchmove", removableHandleOpenSwipe, {passive: true});
		window.addEventListener("wheel",removableHandleOpenWheel,{passive: true});
		window.addEventListener("touchstart", updateTouches);
		
		return () => {
			window.removeEventListener("touchstart", updateTouches);
			window.removeEventListener("touchmove", removableHandleOpenSwipe);
			window.removeEventListener("wheel",removableHandleOpenWheel);
		}
		
	}, [pageContextObj]);
	
	
	const pageList = useMemo(() => {
		return arr.map((comp, i) =>
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