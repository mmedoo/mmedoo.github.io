import "./page.css"
import Backg from "./background/background"
import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
import About from "./about/about"
import { useContext, useEffect, useMemo, useRef, useState } from "react"
import { PageContext } from "../../context";


function Page({Element, i}){
	
	const pageContextObj = useContext(PageContext);
	const index = pageContextObj.index;
	const hovered = pageContextObj.hover;
	const opened = pageContextObj.open;

	const pageRef = useRef(null);

	function getOut(){
		pageRef.current.classList.remove("open");
	}
	
	function centerPage(n){
		pageRef.current.style.left = `calc(50% - var(--mini-w)/2 + ${i-n} * (var(--mini-w) + 30px) )`;
	}
	
	function getIn(n) {
		pageRef.current.classList.toggle("open", i === n);
	}


	useEffect(() => {
		centerPage(hovered)
	}, [hovered]);

	useEffect(() => {
		centerPage(index);
		getIn(index);
	}, [index]);

	useEffect(() => {
		centerPage(index);
		if (opened)
			getOut();
		else
			getIn(index);
	}, [opened]);
	
	return (
		<div
			ref={pageRef}
			className={ `page open` }
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