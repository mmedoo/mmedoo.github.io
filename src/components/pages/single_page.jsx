import React from "react"
import { useCallback, useContext, useEffect, useRef, useState } from "react"
import { components, icons } from "./pages_data"
import { PageContext, SetPageContext } from "../../context";
import Backg from "./background/background"

var swipeStartY = 0;

const Page = (({ Element, i }) => {

	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);

	const pageRef = useRef(null);
	const pageContRef = useRef(null);
	const pageIconRef = useRef(null);

	const [showBg, setShowBg] = useState(window.innerWidth > 800);

	const centerPageContent = useCallback((n) => {
		let relativePos = Number((n - i).toFixed(3));

		pageContRef.current.style.translate = `calc(${relativePos * 20 / (components.length - 1)}% - 50%) -50%`;

		pageIconRef.current.style.translate = `${relativePos * 100}%`;
	}, []);

	useEffect(() => {
		centerPageContent(pageContextObj.hover);
	}, [pageContextObj.hover]);

	useEffect(() => {

		const handleResize = () => {
			setShowBg(window.innerWidth > 800);
		};

		const updateTouches = (e) => {
			swipeStartY = e.touches[0].clientY;
		};

		window.addEventListener("touchstart", updateTouches);
		window.addEventListener("resize", handleResize);

		const pageClicked = () => {
			setPageContextObj({ hover: i, open: false });
		};

		pageRef.current?.addEventListener("click", pageClicked);

		const handleOverScroll = (e) => {
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
		}
			
		pageContRef.current?.addEventListener("wheel", handleOverScroll);
		pageContRef.current?.addEventListener("touchmove", handleOverScroll);

		return () => {
			window.removeEventListener("touchstart", updateTouches)
			window.removeEventListener("resize", handleResize);
			pageRef.current?.removeEventListener("click", pageClicked);
			pageContRef.current?.removeEventListener("wheel", handleOverScroll);
			pageContRef.current?.removeEventListener("touchmove", handleOverScroll);
		}

	}, []);


	return (
		<div
			ref={pageRef}
			className={`page ${(pageContextObj.hover === i && !pageContextObj.open) ? "open-page" : ""}`}
		>

			{showBg && !pageContextObj.open && pageContextObj.hover === i && <Backg />}

			<div
				className="page-icon"
				ref={pageIconRef}
			>

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