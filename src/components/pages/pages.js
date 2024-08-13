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
	
	const centerPage = useCallback((n) => {
	
		let v = `calc(-50% + ${i-n} * (100% + 30px) )`;

		if (!pageContextObj.open)
			v = `calc(-50% + ${i-n} * (100%) )`;
		
		// pageRef.current.style.setProperty('--left-shrink', v);

		const animation_option = {
			duration: 400,
			fill: "both",
			easing: "ease-in-out"
		}
		
		pageRef.current.animate(
			{ translate: `${v} -50%` },
			animation_option
		);
	  
		pageContRef.current.animate(
			{ left: `calc(${(pageContextObj.hover - i) * 50 / 3}% + 50%)` },
			animation_option
		);
	  
		pageIconRef.current.animate(
			{ translate: `calc(${(pageContextObj.hover - i)} * 100%)` },
			animation_option
		);
	}, [pageContextObj.hover, pageContextObj.open]);
	
	useEffect(() => {
		centerPage(pageContextObj.hover);
		
		const handleOpenWheel = (e) => {
			if (!pageContextObj.open) return;
			let move = map(Math.abs(e.deltaY), 0, 100, 0, 0.1);
			setPageContextObj(prev => ({
				...prev,
				hover: e.deltaY < 0 ? Math.max(prev.hover - move, 0) : Math.min(prev.hover + move, 3),
			}));
		}
	
		const handleCloseWheel = (e) => {
			if (pageContextObj.open) return;
			let scrolled = parseInt(pageContRef.current.dataset.scrolled);
			let target = scrolled + e.deltaY / 4;
			let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;
			
			if (target > maximum + 80 || target < 0) {
				setPageContextObj(prev => ({ ...prev, open: true }));
				pageContRef.current.removeEventListener("wheel", handleCloseWheel);
				return;
			}
			pageContRef.current.animate(
				{ transform: `translate(0,-${target}px)` },
				{ fill: "both",duration: 500,easing: "ease-in-out" }
			)
			pageContRef.current.dataset.scrolled = target;
		}
		
		const handleOpenSwipe = (e) => {	
			if (!pageContextObj.open) return;
			let deltaX = e.touches[0].clientX - swipeStartX;		
			let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 6);
			setPageContextObj((prev) => ({
				...prev,
				hover: deltaX > 0 ? Math.max(currentHover - move, 0) : Math.min(currentHover + move, 3),
			}));
		}
		
		const handleCloseSwipe = (e) => {
			if (pageContextObj.open) return;
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
				{ fill: "both", duration: 500, easing: "ease-in-out" }
			);
			pageContRef.current.dataset.lastScroll = target;
		}
		
		window.addEventListener("wheel",handleOpenWheel,{passive: true});

		window.addEventListener("touchstart", (e) => {
			const touch = e.touches[0];
			swipeStartX = touch.clientX;
			swipeStartY = touch.clientY;
			currentHover = pageContextObj.hover;
		});
		window.addEventListener("touchmove", handleOpenSwipe, {passive: true});
		window.addEventListener("touchend", () => {
			pageContRef.current.dataset.scrolled = pageContRef.current.dataset.lastScroll;
		});
		pageContRef.current?.addEventListener("wheel", handleCloseWheel, {passive: true});
		pageContRef.current?.addEventListener("touchmove", handleCloseSwipe, {passive: true});
		
		return () => {
			pageContRef.current?.removeEventListener("wheel", handleCloseWheel);
			pageContRef.current?.removeEventListener("touchmove", handleCloseSwipe);
			window.removeEventListener("wheel",handleOpenWheel)
			window.removeEventListener("touchmove", handleOpenSwipe);
		}
	}, [pageContextObj])	

	
	const pageClicked = useCallback((e) => {
		if (pageContextObj.open) {
			centerPage(i);
			setPageContextObj({hover: i,index: i,open: false});
		} else {			
			let next = e.clientX < window.innerWidth / 2 ?
				Math.max(pageContextObj.index - 1, 0)
			: Math.min(pageContextObj.index + 1, 3);
			setPageContextObj({index: next,hover: next,open: false});
		}
	}, [pageContextObj]);

	return (
		<div
			ref={pageRef}
			className={ `
				page
				${ pageContextObj.open ? "shrink" : "" }`
			}
			onClick={pageClicked}
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

	const pageList = useMemo(() => {
		return arr.map((comp, i) =>
			<Page Element={comp} i={i} key={i} />
		);
	}, []);
	
	return (
		<>
			{pageList}
		</>
	)
});

export default Pages;