import "./animate_text.css";
import { useEffect, useRef } from "react";


function Animated_Text({text, i}) {

	const animatedDiv = useRef(null);
	const contRef = useRef(null);

	useEffect(() => {
		
		function callback(entries, observer) {
			entries.forEach(entry => {
				animatedDiv.current?.classList.toggle("text_wrap_appear", entry.isIntersecting);
            });
        }
        const observer = new IntersectionObserver(callback);

        observer.observe(contRef.current);
	}, []);
	
	return (
		<span
			className="text_anim"
			ref={contRef}
		>
			<span
				className="text_wrap"
				ref={animatedDiv}
				style={{
					'--order': i
				}}
			>
				{text}
			</span>
		</span>
	)
}


export default Animated_Text