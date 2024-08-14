import ANIM_TEXT from "../../load_animation/animate_text";


function Course(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"COURSEWORK"}
							i={3}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={3}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={4}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={5}
						/>
					</div>

					<div className="credits cw">
						<div>
							<ANIM_TEXT text={"Object-Oriented Programming"} i={5}/>
							<ANIM_TEXT text={"Data Structure & Algorithms"} i={6.5}/>
							<ANIM_TEXT text={"Relational DBMS"} i={8}/>
							<ANIM_TEXT text={"Python"} i={9}/>
							<ANIM_TEXT text={"React.js"} i={10}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Course;