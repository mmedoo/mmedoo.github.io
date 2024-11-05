import ANIM_TEXT from "../../load_animation/animate_text";

function Edu(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"EDUCATION"}
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

					<div  className="credits cw">
						<div>
							<ANIM_TEXT text={"Faculty of Sciences"} i={1}/>
							<ANIM_TEXT text={"Computer Science and Statistics"} i={2}/>
							<ANIM_TEXT text={"University of Ain Shams"} i={3}/>
							<ANIM_TEXT text={"Cairo, Egypt"} i={4}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Edu;