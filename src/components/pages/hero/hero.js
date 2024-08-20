import "./hero.css"
import ANIM_TEXT from "../load_animation/animate_text";

import Lang from "./sub_views/lang"
import Course from "./sub_views/course"
import Know from "./sub_views/know"
import Stack from "./sub_views/stack"
import Tools from "./sub_views/tools"


function Hero() {
	return (
		<>
			<div className="view">
				<div className="view_content">
					<span style={{
						textAlign: 'left'
					}}>
						<ANIM_TEXT text="I'm" i={1} />
						<ANIM_TEXT text="Mohmaed" i={2} />
					</span>
				</div>
			</div>
			<div className="view">
				<div className="view_content">
					<div className="dev">
						<ANIM_TEXT text={"A Devel"} i={1}/>
						<ANIM_TEXT text={"oper"} i={2}/>
					</div>
				</div>
				<div className="view_content">
					<ANIM_TEXT text={"I code ideas."} i={1}/>
				</div>
			</div>
			
			<Lang/>
			<Course/>
			<Know/>
			<Stack/>
			<Tools/>

			<div className="view">
				<div className="view_content">
					<span style={{
						textAlign: 'left'
					}}>
						<ANIM_TEXT text="Mohamed" i={1} />
						<ANIM_TEXT text="Ibrahim" i={2} />
					</span>
				</div>
			</div>
			
		</>
	);
}


export default Hero;