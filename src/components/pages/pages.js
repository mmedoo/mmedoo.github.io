import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef } from "react"
import { PageContext } from "../../context";


function Page({Element, i}){
	
	const pageContextObj = useContext(PageContext);
	
	const pageRef = useRef(null);
	
	function centerPage(n){
		let v = `calc(50% - var(--mini-w)/2 + ${i-n} * (var(--mini-w) + 30px) )`;
		pageRef.current.style.setProperty('--left-shrink', v);
	}
	
	useEffect(() => {
		if (pageContextObj.open) {
			centerPage(pageContextObj.hover);
		}
	}, [pageContextObj]);
	
	return (
		<div
			ref={pageRef}
			className={ `
				page
				${ pageContextObj.index === i ? "active" : "" }
				${ pageContextObj.open ? "shrink" : "" }`
			}
		>
			<Backg/>
			<div className="page-container">
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