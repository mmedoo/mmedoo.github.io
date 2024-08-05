import { useContext, useMemo } from "react";
import "./nav.css";
import data from "./nav_data"
import { SetPageContext } from "../../context";

// customizations
// customizations
// customizations

const itemsNo = data.length;

const openedRadius = 110;

const itemRadius = 35;

const range = 180;

const startFromRight = false;
const startFromDown = false;

// Don't touch
// Don't touch
// Don't touch
// Don't touch

const unitAngle = (range - ( itemsNo * itemRadius * 2 * 360 / (2 * Math.PI * openedRadius) ) ) / (itemsNo+1);

function rToAngle (r){
	return r * 180 / (Math.PI * openedRadius);
}

function Nav(){

	const setIndex = useContext(SetPageContext);

	const items = useMemo(() =>
		
		data.map((option, i) => {
			
			return (
				<div
					key={i}
					onClick={() => {
						setIndex(i);
					}}
					className="item"
					style={{
						'--angle': `${  ( unitAngle * (i+1) ) + ( (2*i+1) * rToAngle(itemRadius) ) }deg`,
						// '--angle': `${  ( range * (i) / (itemsNo)  ) }deg`,
						'--duration': `${ 0.15 }s`,
						'--delay': `${ (i+1) * 0.1 }s`,	
						'--horz': `${ startFromRight ? '1' : '-1' }`,
						'--vert': `${ startFromDown ? '1' : '-1' }`,
					}}
				>
					<div className="item_content">
						<svg>
							<use xlinkHref={option.icon} />
						</svg>
						<text>{option.title}</text>
					</div>
				</div>
			)

		})
		
	, []);
	
	return (
		<div
			className="cntnr"
			style={{
				'--opened-radius': `${openedRadius}px`,
				'--item-width': `${itemRadius * 2}px`,
			}}
		>			
			{items}
		</div>
	);
}

export default Nav;