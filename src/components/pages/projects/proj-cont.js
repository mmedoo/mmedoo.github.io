import { useMemo } from "react";
import ANIMATED_TEXT from "../load_animation/animate_text"
import data from "./proj-data"

function Project(props) {
	
	return (
		<div className="project">
			<div className="pjt-header">
				{props.name}
				<div className="pjt-link">
					<a href={props.link} target="_blank" rel="noreferrer">
						<div>
							Link
						</div>
					</a>
				</div>
			</div>
			<div className="pjt-desc">{props.description}</div>
		</div>
	);
}


function PROJ_CONT() {

	const projList = useMemo(() => {
		return data.map((p, i) =>
			<ANIMATED_TEXT key={i} text={(
				<Project link={p.link} name={p.title} description={p.description} />
			)} i={i + 3} />
		);
	}, []);

	return (
		<div className="proj-cont">
			{projList}
		</div>
	);
}


export default PROJ_CONT;