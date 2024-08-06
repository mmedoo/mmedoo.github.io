import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { PageContext } from "../../context";


function Page({Element, i}){
	
	const index = useContext(PageContext);

	const pageRef = useRef(null);

	useEffect(() => {
		(async () => {
			pageRef.current.classList.remove("open");
			await new Promise((resolve) => setTimeout(resolve, 500));
			pageRef.current.style.left = `calc(50% - var(--mini-w)/2 + ${i-index} * (var(--mini-w) + 30px) )`;
			await new Promise((resolve) => setTimeout(resolve, 500));
			if (i === index)
				pageRef.current.classList.add("open")
			else
				pageRef.current.classList.remove("open")
		})();
	}, [index]);

	
	return (
		<div
			ref={pageRef}
			className={ `page` }
		>
			<Backg/>
			<div className="page-container">
				<Element/>
				<Element/>
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