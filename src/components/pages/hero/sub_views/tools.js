import ANIM_TEXT from "../../load_animation/animate_text";



export default function Tools(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"TOOLS"}
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
							<ANIM_TEXT text={"Git & GitHub"} i={3}/>
							<ANIM_TEXT text={"VSCODE"} i={4}/>
							<ANIM_TEXT text={"GitHub Actions"} i={5}/>
							<ANIM_TEXT text={"Linux"} i={6}/>
						</div>
					</div>
				</div>
			</div>
	);
}