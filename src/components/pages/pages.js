import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef } from "react"
import { PageContext, SetPageContext } from "../../context";

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
]

function Page({Element, i}){
	
	const pageContextObj = useContext(PageContext);

	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);

	const pageIconRef = useRef(null);

	
	function centerPage(n){
	
		let v;
	
		if (pageContextObj.open) {
			v = `calc(-50% + ${i-n} * (100% + 30px) )`;
		} else {
			v = `calc(-50% + ${i-n} * (100%) )`;
		}
		
		// pageRef.current.style.setProperty('--left-shrink', v);
		
		pageRef.current.animate({
			translate: `${v} -50%`
		},
		{
			fill: "both",
			duration: 650,
		});
	}


	const pageContRef = useRef(null);
		
	
	useEffect(() => {
	
		let pageNode = pageContRef.current;

		let iconNode = pageIconRef.current;
	
		centerPage(pageContextObj.hover);
		
		pageNode.animate({
			left: `calc( ${(pageContextObj.hover-i) * 50/3}% + 50%)`
		},{
			duration: 650,
			fill: "both"
		})
		
		iconNode.animate({
			translate: `calc( ${(pageContextObj.hover-i)} * 100%)`
		},{
			duration: 650,
			fill: "both"
		})
	
		window.addEventListener("wheel",handleOpenWheel)
		
		pageNode?.addEventListener("wheel", handleWheel);

		return () => {
			pageNode?.removeEventListener("wheel", handleWheel);
			window.removeEventListener("wheel",handleOpenWheel)
		}
		
	}, [pageContextObj]);


	function handleOpenWheel(e){
			
		if (!pageContextObj.open)
			return;

										
		if (e.deltaY < 0) {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover <= 0) ? (0) : (prev.hover - 0.025)
			}))
		}

		else {
			setPageContextObj(prev => ({
				...prev,
				hover: (prev.hover >= 3) ? (3) : (prev.hover + 0.025)
			}))
		}
	}

	async function handleWheel(e){
		e.preventDefault();
		
		if (pageContextObj.open)
			return;

		let scrolled = parseInt(this.dataset.scrolled);

		let target = scrolled + e.deltaY / 4;
				
		let maximum = this.scrollHeight - this.offsetHeight;
		
		if (target > maximum + 80 || target < 0) {

			// this.dataset.scrolled = 0;
				
			setPageContextObj(prev => ({
				...prev,
				open: true
			}));
			
			
			// this.animate(
			// 	{
			// 		transform: `translate3d(0,0,0)` 
			// 	},
			// 	{
			// 		fill: "both",
			// 		duration: 1000,
			// 		iterations: 1
			// 	}
			// )

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
				iterations: 1
			}
		)

		pageIconRef.current?.animate(
			{
				translate: `0 -${target/25}px` 
			},
			{
				fill: "both",
				duration: 500,
				iterations: 1
			}
		)


		this.dataset.scrolled = target;

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

			console.log(e.clientX, window.innerWidth / 2);
			
			if (e.clientX < window.innerWidth / 2) {
				next = pageContextObj.index - 1 <= 0 ? 0 : pageContextObj.index - 1;
			} else {
				next = pageContextObj.index + 1 >= 3 ? 3 : pageContextObj.index + 1;
			}

			centerPage(next);
			
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