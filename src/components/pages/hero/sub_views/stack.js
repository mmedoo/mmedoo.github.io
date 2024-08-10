import AnimatedText from "../../load_animation/animate_text";


function Stack (){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<AnimatedText
							text={"STACK"}
							i={3}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={3}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={4}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={5}
						/>
					</div>

					<div className="credits cw">
						<div>
							<AnimatedText text={"MySQL"} i={5}/>
							<AnimatedText text={"Node.js"} i={6.5}/>
							<AnimatedText text={"Django"} i={8}/>
							<AnimatedText text={"React.js"} i={9.5}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Stack;