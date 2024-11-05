import AnimatedText from "../../load_animation/animate_text";


function Stack (){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<AnimatedText
							text={"SKILLS"}
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
							<AnimatedText text={"MySQL, PostgreSQL"} i={1}/>
							<AnimatedText text={"Node.js"} i={2}/>
							<AnimatedText text={"React.js"} i={3}/>
							<AnimatedText text={"RESTful API Design"} i={4}/>
							<AnimatedText text={"Object-Relational Mapping (ORM)"} i={5}/>
							<AnimatedText text={"Good Knowledge of System Design"} i={6}/>
							<AnimatedText text={"Git & GitHub"} i={7}/>
							<AnimatedText text={"GitHub Actions"} i={8}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Stack;