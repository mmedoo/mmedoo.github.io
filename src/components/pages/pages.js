import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef } from "react"
import { PageContext, SetPageContext } from "../../context";


function Page({Element, i}){
	
	const pageContextObj = useContext(PageContext);

	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);
	
	function centerPage(n){
		let v = `calc(-50% + ${i-n} * (100% + 30px) )`;
		pageRef.current.style.setProperty('--left-shrink', v);
	}

	const pageContRef = useRef(null);
		
	useEffect(() => {

		if (pageContextObj.open) {
			centerPage(pageContextObj.hover);
		}
		
		pageContRef.current.style.left = `calc( ${(pageContextObj.hover-i) * 50/3}% + 50%)`;
		
		window.addEventListener("wheel",handleOpenWheel)
		
		pageContRef.current?.addEventListener("wheel", handleWheel);

		return () => {
			pageContRef.current?.removeEventListener("wheel", handleWheel);
			window.removeEventListener("wheel",handleOpenWheel)
		}
		
	}, [pageContextObj]);


	function handleOpenWheel(e){
			
		if (!pageContextObj.open)
			return;

										
		if (e.deltaY < 0) {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover <= 0) ? (0) : (prev.hover - 0.15)
			}))
		}

		else {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover >= 3) ? (3) : (prev.hover + 0.15)
			}))
		}
	}

	function handleWheel(e){
		e.preventDefault();
		
		if (pageContextObj.open)
			return;

		let scrolled = parseInt(this.dataset.scrolled);

		let target = scrolled + e.deltaY / 4;
		
		if (target < 0) {
			return;
		}
		
		let maximum = this.scrollHeight - this.offsetHeight;
		
		if (target > maximum + 150) {

			this.dataset.scrolled = 0;
			
			setPageContextObj(prev => ({
				...prev,
				open: true
			}));
			
			
			this.animate(
				{
					transform: `translate3d(0,0,0)` 
				},
				{
					fill: "both",
					duration: 1000,
					iterations: 1
				}
			)

			this.removeEventListener("wheel", handleWheel);
			
			return;
		}

		this.animate(
			{
				transform: `translate3d(0,-${target}px,0)` 
			},
			{
				fill: "both",
				duration: 1000,
				iterations: 1
			}
		)

		this.dataset.scrolled = target;

	}

	
	return (
		<div
			ref={pageRef}
			className={ `
				page
				${ pageContextObj.index === i ? "active" : "" }
				${ pageContextObj.open ? "shrink" : "" }`
			}
			onClick={() => {
				if (pageContextObj.open) {
					setPageContextObj(prev => ({
						hover: i,
						index: i,
						open: false
					}));
				}
			}}
		>
			<Backg/>
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