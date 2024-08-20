import AnimatedText from "../../load_animation/animate_text";


function Stack (){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<AnimatedText
							text={"STACK"}
							i={1}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={1}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={2}
						/>
						<AnimatedText
							text={<div className="dot"></div>} i={3}
						/>
					</div>

					<div className="credits cw">
						<div>
							<AnimatedText text={"MySQL"} i={3}/>
							<AnimatedText text={"Django"} i={4}/>
							<AnimatedText text={"React"} i={5}/>
							<AnimatedText text={"Node"} i={6}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Stack;