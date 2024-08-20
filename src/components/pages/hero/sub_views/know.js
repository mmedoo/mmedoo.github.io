import ANIM_TEXT from "../../load_animation/animate_text";



function Know(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"KNOWLEDGE"}
							i={1}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={1}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={2}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={3}
						/>
					</div>

					<div className="credits cw">
						<div>
							<ANIM_TEXT text={"Object-Relational Mapping"} i={3}/>
							<ANIM_TEXT text={"Design Patterns"} i={4}/>
							<ANIM_TEXT text={"RESTFul API Design"} i={5}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Know;