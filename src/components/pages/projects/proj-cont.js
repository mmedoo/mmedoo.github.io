import { useMemo, memo } from "react";
import ANIMATED_TEXT from "../load_animation/animate_text"
import data from "./proj-data"

const Project = memo((props) => {
	
	return (
		<div className="project">
			<div className="pjt-header">

				{props.title}

				<div className="pjt-link-wrapper">
					
					<div className="pjt-link">
						<a href={props.link} target="_blank" rel="noreferrer">
							<div>
								GitHub
							</div>
						</a>
					</div>
					
					{
						props.preview
						&&
						<div className="pjt-link">
							<a href={props.preview} target="_blank" rel="noreferrer">
								<div>
									Preview
								</div>
							</a>
						</div>
					}
					
				</div>
			</div>
			
			<div className="pjt-desc">{props.description}</div>
			<div className="pjt-tags">
				{
					props.tags.map((tag, i) =>
						<div key={i} className="pjt-tag">
							{tag}
						</div>
					)
				}
			</div>
		</div>
	);
})


const PROJ_CONT = memo(() => {

	const projList = useMemo(() => {
		return data.map((p, i) =>
			<ANIMATED_TEXT key={i} text={(
				<Project
					{...data[i]}
				/>
			)} i={i + 3} />
		);
	}, []);

	return (
		<div className="proj-cont">
			{projList}
		</div>
	);
})


export default PROJ_CONT;