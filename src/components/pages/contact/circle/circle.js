import { useMemo, useRef } from "react";
import "./circle.css";
import data from "./circle_data"


const itemsNo = data.length;

const openedRadius = 100;

const itemRadius = 70;

const range = 360;

// const startFromRight = false;
// const startFromDown = false;


// const unitAngle = (range - ( itemsNo * itemRadius * 2 * 360 / (2 * Math.PI * openedRadius) ) ) / (itemsNo+1);

// function rToAngle (r){
// 	return r * 180 / (Math.PI * openedRadius);
// }

function Nav(){
	

	const cntnrRef = useRef(null);

	const items = useMemo(() =>
		
		data.map((option, i) => {
			return (
				<Item key={i} option={option} i={i}/>
			)
		})
		
	, []);
	
	return (
		<div
			ref={cntnrRef}
			className={`cntnr`}
			style={{
				'--opened-radius': `${openedRadius}px`,
				'--item-width': `${itemRadius * 2}px`,
			}}
		>
			{items}
		</div>
	);
}



function Item({ option, i }) {

	const itemRef = useRef(null);

	const angle =  useMemo(() => range * (i) / (itemsNo), []);
	
	return (
		<a href={option.link} target="_blank" rel="noreferrer">
		<div
			ref={itemRef}
			className="item"
			style={{
				'--angle': `${angle}deg`,
			}}
		>
			<div className="item_content">
					<svg>
						<use xlinkHref={option.icon} />
					</svg>
					<b>
						{option.title}
					</b>
			</div>
		</div>
				</a>
	)
}




export default Nav;