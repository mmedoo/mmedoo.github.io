import React from "react"
import { memo, useContext, useMemo, useRef, useState } from "react";
import "./nav.css";
import data from "./nav_data.json"
import { SetPageContext } from "../../context";
import { useAddEventListener } from "../../hooks";

const itemsNo = data.length;
const openedRadius = 90;
const itemRadius = 35;
const range = 180;

const startFromRight = false;
const startFromDown = false;

const unitAngle = (range - (itemsNo * itemRadius * 2 * 360 / (2 * Math.PI * openedRadius))) / (itemsNo + 1);

function rToAngle(r) {
	return r * 180 / (Math.PI * openedRadius);
}

export default memo(function Nav() {

	const [navOpen, setNavOpen] = useState(false);
	const setPageObj = useContext(SetPageContext);
	const cntnrRef = useRef(null);
	const fixedControlRef = useRef(null);

	useAddEventListener(cntnrRef, "focusout", () => {
		setNavOpen(false);
	});

	useAddEventListener(fixedControlRef, "click", () => {
		setNavOpen(true);
		setPageObj(prev => ({
			...prev,
			open: true,
		}));
	});
	
	const items = useMemo(() =>
		data.map((data, i) =>
			<NavItem data={data} i={i} setNavOpen={setNavOpen} key={i} />
		)
		, []);

	return (
		<div
			tabIndex={0}
			ref={cntnrRef}
			className={`nav ${navOpen ? "openNav" : ""}`}
			style={{
				'--opened-radius': `${openedRadius}px`,
				'--item-width': `${itemRadius * 2}px`,
			}}
		>

			{items}

			<div
				ref={fixedControlRef}
				className={`item fix ${navOpen ? "ignoreFixedItem" : ""}`}
			></div>
		</div>
	);
})



const NavItem = memo(function Item({ data, i, setNavOpen }) {

	const itemRef = useRef(null);
	const setPageObj = useContext(SetPageContext);

	useAddEventListener(itemRef, "mouseenter", () => {
		setPageObj(prev => ({
			...prev,
			hover: i,
		}))
	})
	
	useAddEventListener(itemRef, "click", () => {
		setPageObj({
			hover: i,
			open: false,
		});
		setNavOpen(false);
	})
	
	return (
		<div
			ref={itemRef}
			className="item"
			style={{
				'--angle': `${(unitAngle * (i + 1)) + ((2 * i + 1) * rToAngle(itemRadius))}deg`,
				// '--angle': `${  ( range * (i) / (itemsNo)  ) }deg`,
				'--duration': `${0.15}s`,
				'--delay': `${(i + 1) * 0.1}s`,
				'--horz': `${startFromRight ? '1' : '-1'}`,
				'--vert': `${startFromDown ? '1' : '-1'}`,
			}}
		>
			<div className="item_content">
				<svg>
					<use xlinkHref={data.icon} />
				</svg>
				<b>
					{/* {data.title} */}
				</b>
			</div>
		</div>
	)
})