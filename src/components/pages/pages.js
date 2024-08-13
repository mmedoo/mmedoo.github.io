import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef } from "react"
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


var swipeStartX = 0,
	swipeStartY = 0,
	swipeEndX = 0,
	swipeEndY = 0;

var currentHover = 0;
	
function Page({Element, i}){
	
	const pageContextObj = useContext(PageContext);

	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);

	const pageIconRef = useRef(null);
	
	function centerPage(n){
	
		let v = `calc(-50% + ${i-n} * (100% + 30px) )`;

		if (!pageContextObj.open)
			v = `calc(-50% + ${i-n} * (100%) )`;
		
		// pageRef.current.style.setProperty('--left-shrink', v);

		const animation_option = {
			duration: 400,
			fill: "both",
			easing: "ease-in-out"
		}
		
		pageRef.current.animate({
			translate: `${v} -50%`
		},
			animation_option
		);

		pageContRef.current.animate({
			left: `calc( ${(pageContextObj.hover-i) * 50/3}% + 50%)`
		},
			animation_option	
		);
		
		pageIconRef.current.animate({
			translate: `calc( ${(pageContextObj.hover-i)} * 100%)`
		},
			animation_option	
		);
	}
	
	const pageContRef = useRef(null);
	
	useEffect(() => {
	
		centerPage(pageContextObj.hover);

		window.addEventListener("wheel",handleOpenWheel,{passive: true});

		window.addEventListener("touchstart", (e) => {
			const touch = e.touches[0];
			swipeStartX = touch.clientX;
			swipeStartY = touch.clientY;
			currentHover = pageContextObj.hover;
		});

		window.addEventListener("touchmove", handleOpenSwipe, {passive: true});

		pageContRef.current?.addEventListener("wheel", handleWheel, {passive: true});

		pageContRef.current?.addEventListener("touchmove", handleCloseSwipe, {passive: true});
			
		return () => {
			pageContRef.current?.removeEventListener("wheel", handleWheel);
			pageContRef.current?.removeEventListener("touchmove", handleCloseSwipe);
			window.removeEventListener("wheel",handleOpenWheel)
			window.removeEventListener("touchmove", handleOpenSwipe);
		}
	
	}, [pageContextObj]);
	


	function handleOpenWheel(e){
			
		if (!pageContextObj.open)
			return;

		let move = map(Math.abs(e.deltaY), 0, 100, 0, 0.1);
		
		if (e.deltaY < 0) {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover <= 0) ? (0) : (prev.hover - move)
			}))
		}

		else {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover >= 3) ? (3) : (prev.hover + move)
			}))
		}
	}

	function handleWheel(e){
		
		if (pageContextObj.open)
			return;

		let scrolled = parseInt(this.dataset.scrolled);

		let target = scrolled + e.deltaY / 4;
		
		let maximum = this.scrollHeight - this.offsetHeight;
		
		if (target > maximum + 80 || target < 0) {
			
			setPageContextObj(prev => ({
				...prev,
				open: true
			}));
			
			this.removeEventListener("wheel", handleWheel);
			
			return;
		}

		this.animate(
			{
				transform: `translate(0,-${target}px)` 
			},
			{
				fill: "both",
				duration: 500,
				easing: "ease-in-out"
			}
		)

		this.dataset.scrolled = target;

	}
	
	function handleOpenSwipe(e){	

		const touch = e.touches[0];
		swipeEndX = touch.clientX;
		swipeEndY = touch.clientY;
		
		if (!pageContextObj.open)
			return;

		let deltaX = swipeEndX - swipeStartX;
		
		let move = map(Math.abs(deltaX), 0, window.innerWidth, 0, 5);

		if (deltaX > 0) {
			setPageContextObj(prev => ({
				...prev,
				hover: (currentHover - move < 0) ? (0) : (currentHover - move)
			}))
		}

		else {
			setPageContextObj(prev => ({
				...prev,
				hover: (currentHover + move > 3) ? (3) : (currentHover + move)
			}))
		}
	};
	
	function handleCloseSwipe(e){
		const touch = e.touches[0];
		swipeEndX = touch.clientX;
		swipeEndY = touch.clientY;

		if (pageContextObj.open)
			return;

		let deltaY =  swipeStartY - swipeEndY;

		let scrolled = parseInt(pageContRef.current?.dataset.scrolled);

		let target = scrolled + deltaY / 5;

		let maximum = pageContRef.current.scrollHeight - pageContRef.current.offsetHeight;
		
		if (target > maximum + 80 || target < 0) {
			
			setPageContextObj(prev => ({
				...prev,
				open: true
			}));
						
			return;
		}

		pageContRef.current.animate(
			{
				transform: `translate(0,-${target}px)` 
			},
			{
				fill: "both",
				duration: 500,
				easing: "ease-in-out"
			}
		)

		pageContRef.current.dataset.scrolled = target;
	}

	function pageClicked(e){

		if (pageContextObj.open) {

			centerPage(i);
			
			setPageContextObj({
				hover: i,
				index: i,
				open: false
			});
			
		} else {
			let next;
			
			if (e.clientX < window.innerWidth / 2) {
				next = pageContextObj.index - 1 <= 0 ? 0 : pageContextObj.index - 1;
			} else {
				next = pageContextObj.index + 1 >= 3 ? 3 : pageContextObj.index + 1;
			}
			
			setPageContextObj({
				index: next,
				hover: next,
				open: false
			});
		}
	}

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
			>
				<Element/>
			</div>
		</div>
	)
}







const arr = [Hero, Proj, Contect, About];

function Pages(){

	const pageList = useMemo(() => {
		return arr.map((comp, i) =>
			<Page
				Element={comp}
				i={i}
				key={i}
			/>
		);
	}, []);
	
	return (
		<>
			{pageList}
		</>
	)
}

export default Pages;