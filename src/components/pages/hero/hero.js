import "./hero.css"
import Animated_Text from "../load_animation/animate_text";


const skillset = [
		"Data Structures & Algorithms",
		"Object Oriented Programming",
		"Javascript",
		"C++",
		"Python",
		"Django",
		"Node.js",
		"NPM",
		"SQL",
		"React.js",
		"ORM",
		"RESTFUL API",
		"Git",
		"Github",
		"Github Actions"
	].map((skill, i) => <Animated_Text text={skill} i={i} key={i} />);

function Hero() {
	return (
		<>
			<div className="view">
				<div className="view_content">
					<Animated_Text text="I'm" i={1} />
					<Animated_Text text="Mohmaed" i={2} />
				</div>
			</div>
			<div className="view">
				<div className="view_content">
					<div className="dev">
						<Animated_Text text={"A Develo"} i={1}/>
						<Animated_Text text={"per"} i={2}/>
					</div>
				</div>
			</div>
			<div className="view">
				<div className="view_content">
					{skillset}
				</div>
			</div>
		</>
	);
}


export default Hero;