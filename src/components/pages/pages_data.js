import Hero from "./hero/hero"
import Proj from "./projects/proj"
import Contect from "./contact/contact"
// import About from "./about/about"


const components = [
	Hero,
	Proj,
	Contect,
	// About,
];

const icons = [
	<svg>
		<use xlinkHref="icons/about.svg#about"/>
	</svg>
	,
	<svg>
		<use xlinkHref="icons/rocket.svg#rocket"/>
	</svg>
	,
	<svg>
		<use xlinkHref="icons/send.svg#send"/>
	</svg>
];


export {components, icons};
