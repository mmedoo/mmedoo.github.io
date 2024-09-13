import { memo, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react"
import { components as pgs , icons } from "./pages_data"
import { PageContext, SetPageContext } from "../../context";
import Backg from "./background/background"

var swipeStartY = 0;

const Page = memo (({Element, i}) => {
		
	const pageContextObj = useContext(PageContext);
	const setPageContextObj = useContext(SetPageContext);
	
	const pageRef = useRef(null);
	const pageContRef = useRef(null);
	const pageIconRef = useRef(null);

	const [showBg, setShowBg] = useState(window.innerWidth > 800);
	
	const centerPageContent = useCallback((n) => {
		let relativePos = Number((n - i).toFixed(3));

		pageContRef.current.style.translate = `calc(${relativePos * 20 / (pgs.length-1)}% - 50%) -50%`;
		
		pageIconRef.current.style.translate = `${ relativePos * 100 }%`;
	}, []);
		
	const pageClicked = useCallback(() => {
		centerPageContent(i);
		setPageContextObj({hover: i,open: false});
	}, []);
	
	const handleOverScroll = useCallback((e) => {
		let target = (e.deltaY !== undefined) ?
			e.deltaY
		: (swipeStartY - e.touches[0].clientY);
		let scrolled = pageContRef.current.scrollTop / (pageContRef.current.scrollHeight - pageContRef.current.offsetHeight);
		
		if (
			(scrolled == 0 && target < 0)
			||
			(scrolled >= 0.99 && target > 0)
		){
			setPageContextObj(prev => ({ ...prev, open: true }));
		}
	}, []);

	
	useEffect(() => {

		const handleResize = () => {
			setShowBg(window.innerWidth > 800);
		};
	
		const updateTouches = (e) => {
			swipeStartY = e.touches[0].clientY;
		};
		
		window.addEventListener("touchstart", updateTouches);
		window.addEventListener("resize", handleResize);
		
		return () => {
			window.removeEventListener("touchstart", updateTouches)
			window.removeEventListener("resize", handleResize);
		}
	}, []);


	useEffect(() => {

		centerPageContent(pageContextObj.hover);

	}, [pageContextObj.hover]);

	
	useEffect(() => {

		if (pageContextObj.open) {
			pageRef.current?.addEventListener("click", pageClicked);
			return;
		}

		const pageContNode = pageContRef.current;
		
		pageContNode?.addEventListener("wheel", handleOverScroll);
		pageContNode?.addEventListener("touchmove", handleOverScroll);
		
		return () => {
			
			pageRef.current?.removeEventListener("click", pageClicked);
			pageContNode?.removeEventListener("wheel", handleOverScroll);
			pageContNode?.removeEventListener("touchmove", handleOverScroll);
		}

	}, [pageContextObj.open]);
	
	
	const BackgMe = useMemo(() => <Backg/>, []);
	

	return (
		<div
			ref={pageRef}
			className={ `page ${ (pageContextObj.hover === i && !pageContextObj.open) ? "open-page" : "" }` }
		>
		
			{showBg && !pageContextObj.open && pageContextObj.hover === i && BackgMe}
			
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
				
				<Element/>
				
			</div>
		</div>
	)
});


export default Page;