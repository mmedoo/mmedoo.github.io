import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
// import About from "./about/about"
import React from "react"


const components = [
	Hero,
	Proj,
	Contect,
	// About,
];

const icons = [
	<svg key={"about"}>
		<use xlinkHref="icons/about.svg#about"/>
	</svg>
	,
	<svg key={"rocket"}>
		<use xlinkHref="icons/rocket.svg#rocket"/>
	</svg>
	,
	<svg key={"send"}>
		<use xlinkHref="icons/send.svg#send"/>
	</svg>
];


export {components, icons};
