import ANIM_TEXT from "../../load_animation/animate_text";

function Course(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"COURSEWORK"}
							i={1}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={2}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={3}
						/>
						<ANIM_TEXT
							text={<div className="dot"></div>} i={4}
						/>
					</div>

					<div className="credits cw">
						<div>
							<ANIM_TEXT text={"C++"} i={1}/>
							<ANIM_TEXT text={"OOP"} i={2}/>
							<ANIM_TEXT text={"Data Structure & Algorithms"} i={3}/>
							<ANIM_TEXT text={"Relational DBMS (MySQL)"} i={4}/>
							<ANIM_TEXT text={"Cryptography"} i={5}/>
							<ANIM_TEXT text={"Complexity Analysis"} i={6}/>
							<ANIM_TEXT text={"Operating Systems"} i={7}/>
							<ANIM_TEXT text={"Linear Programming"} i={8}/>
							<ANIM_TEXT text={"Web Development"} i={9}/>
							<ANIM_TEXT text={"Operations Research"} i={10}/>
							<ANIM_TEXT text={"Pure Statisics"} i={11}/>
							<ANIM_TEXT text={"Computer Networks"} i={12}/>
						</div>
					</div>
				</div>
			</div>
	)
}

export default Course;