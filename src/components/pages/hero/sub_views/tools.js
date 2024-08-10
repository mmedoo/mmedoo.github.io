import ANIM_TEXT from "../../load_animation/animate_text";



export default function Tools(){
	return (
		<div className="view">
				<div className="view_content">
					<div className="lang">
						<ANIM_TEXT
							text={"TOOLS"}
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
							<ANIM_TEXT text={"Git & GitHub"} i={5}/>
							<ANIM_TEXT text={"VSCODE"} i={6.5}/>
							<ANIM_TEXT text={"GitHub Actions"} i={8}/>
							<ANIM_TEXT text={"Linux"} i={9.5}/>
						</div>
					</div>
				</div>
			</div>
	);
}