import "./page.css"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef } from "react"
import { PageContext } from "../../context";


function Page({Element, i}){
	
	const index = useContext(PageContext);

	const pageRef = useRef(null);

	useEffect(() => {
		pageRef.current.classList.remove("open");
		pageRef.current.style.left = `calc(50% - var(--mini-w)/2 + ${i-index} * (var(--mini-w) + 30px) )`;
		(async () => {
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

			<Element/>

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