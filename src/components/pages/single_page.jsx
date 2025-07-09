import React from "react"
import { useContext, useEffect, useRef, useState } from "react"
import { useAddEventListener } from "../../hooks"
import { components, icons } from "./pages_data"
import { PageContext, SetPageContext } from "../../context";
import { lazy } from "react";
import { Suspense } from "react";
const Backg = lazy(() => import("./background/background"))

var swipeStartY = 0;

const Page = (({ Element, i }) => {

	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);

	const pageRef = useRef(null);
	const pageContRef = useRef(null);
	const pageIconRef = useRef(null);

	const [showBg, setShowBg] = useState(window.innerWidth > 800);

	useEffect(() => {
		let relativePos = Number((pageContextObj.hover - i).toFixed(3));

		pageContRef.current.style.translate = `calc(${relativePos * 20 / (components.length - 1)}% - 50%) -50%`;

		pageIconRef.current.style.translate = `${relativePos * 100}%`;
	}, [pageContextObj.hover]);

	useAddEventListener({ current: window }, "resize", () => {
		setShowBg(window.innerWidth > 800);
	});

	useAddEventListener({ current: window }, "touchstart", (e) => {
		swipeStartY = e.touches[0].clientY;
	});

	useAddEventListener(pageRef, "click", () => {
		setPageContextObj({ hover: i, open: false });
	});

	useAddEventListener(pageContRef, ["wheel", "touchmove"], (e) => {
		let target = (e.deltaY !== undefined) ?
			e.deltaY
			: (swipeStartY - e.touches[0].clientY);

		let scrolled = pageContRef.current?.scrollTop / (pageContRef.current?.scrollHeight - pageContRef.current?.offsetHeight);

		let isBottomEdge = (scrolled >= 0.99 && target > 0);
		let isTopEdge = (scrolled === 0 && target < 0);

		if (!isBottomEdge && !isTopEdge) {
			return;
		}

		pageContRef.current.scrollTo({
			top: isBottomEdge ? pageContRef.current.scrollHeight : 0,
			behavior: 'smooth'
		});
		setPageContextObj(prev => ({ ...prev, open: true }))
	});

	return (
		<div
			ref={pageRef}
			className={`page ${(pageContextObj.hover === i && !pageContextObj.open) ? "open-page" : ""}`}
		>

			<Suspense fallback={<></>}>
				<Backg style={{ display: (showBg && !pageContextObj.open && pageContextObj.hover === i) ? "block" : "none" }} />
			</Suspense>

			<div className="page-icon" ref={pageIconRef}>
				{icons[i]}
			</div>

			<div
				className="page-container"
				ref={pageContRef}
				data-scrolled="0"
				data-last-scroll="0"
			>

				<Element />

			</div>
		</div>
	)
});


export default Page;