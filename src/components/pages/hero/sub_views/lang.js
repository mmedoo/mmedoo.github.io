import ANIM_TEXT from "../../load_animation/animate_text";


function Lang(){
	return (
		<div className="view">
			<div className="view_content">

				<div className="lang">
					<ANIM_TEXT
						text={"LANGUAGES"} i={3}
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

				<div className="credits">
					<div>
						<ANIM_TEXT text={"Advanced"} i={5}/>
						<ANIM_TEXT text={"Advanced"} i={6.5}/>
						<ANIM_TEXT text={"intermediate"} i={8}/>
					</div>
					<div>
						<ANIM_TEXT text={"C++"} i={5}/>
						<ANIM_TEXT text={"Javascript"} i={6.5}/>
						<ANIM_TEXT text={"Python"} i={8}/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Lang;