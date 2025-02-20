import React from "react"
import ANIM_TEXT from "../load_animation/animate_text";
import views from "./views.json"
import "./hero.css"

const seperatingDots = [1,2,3].map(i => <ANIM_TEXT text={<div className="dot"></div>} key={i} i={i} />);

export default function Hero() {
	return (
		<>
			<div className="view">
				<div className="view_content">
					<span style={{
						textAlign: 'left'
					}}>
						<ANIM_TEXT text="I'm" i={1} />
						<ANIM_TEXT text="Mohamed" i={2} />
					</span>
				</div>
			</div>
			<div className="view">
				<div className="view_content">
					<div className="dev">
						<ANIM_TEXT text={"A Devel"} i={1} />
						<ANIM_TEXT text={"oper"} i={2} />
					</div>
				</div>
				<div className="view_content">
					<ANIM_TEXT text={"I code ideas."} i={1} />
				</div>
			</div>

			{
				views.map(({ header, cols, lines }) =>
				(<div key={header} className="view">
					<div className="view_content">
						<div className="lang">
							<ANIM_TEXT
								text={header}
								i={1}
							/>
							{seperatingDots}
						</div>
						<div className={`credits ${cols === 2 ? "" : "cw"}`}>
							{
								cols === 2 ?
									<>
										<div>
											{lines.map((line, i) => <ANIM_TEXT key={i} text={line[0]} i={i + 1} />)}
										</div>
										<div>
											{lines.map((line, i) => <ANIM_TEXT key={i} text={line[1]} i={i + 1} />)}
										</div>
									</>
									:
									<div>
										{lines.map((line, i) => <ANIM_TEXT key={i} text={line} i={i + 1} />)}
									</div>
							}
						</div>

					</div>
				</div>)
				)
			}

			<div className="view">
				<div className="view_content">
					<span style={{
						textAlign: 'left',
						margin: "auto",
						paddingTop: "75px"
					}}>
						<ANIM_TEXT text="Mohamed" i={1} />
						<ANIM_TEXT text="Ibrahim" i={2} />
					</span>
					<ANIM_TEXT style={{ paddingBottom: "60px" }} text="Keep Scrolling" i={2} />
				</div>
			</div>

		</>
	);
}
