import "./animate_text.css";
import { useEffect, useRef, memo } from "react";


const Animated_Text = memo(({style, text, i}) => {

	const animatedDiv = useRef(null);
	const contRef = useRef(null);

	useEffect(() => {
		
		function callback(entries, observer) {
			entries.forEach(entry => {
				animatedDiv.current?.classList.toggle("text_wrap_appear", entry.isIntersecting);
            });
        }
		
        const observer = new IntersectionObserver(callback,{
			threshold: 0.1
		});

        observer.observe(contRef.current);

		return () => {
			observer.disconnect();
		}
	}, []);
	
	return (
		<span
			className="text_anim"
			ref={contRef}
			style={style}
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
})


export default Animated_Text