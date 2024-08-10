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
					<span style={{
						textAlign: 'left'
					}}>
						<Animated_Text text="I'm" i={1} />
						<Animated_Text text="Mohmaed" i={2} />
					</span>
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
					<div style={{
						letterSpacing: '6px',
						fontWeight: 'normal',
						translate: '3px 0',
						textAlign: 'center'
					}}>
						<Animated_Text
							text={"LANGUAGES"}
							i={3}
						/>
						<Animated_Text
							text={"."}
							i={3}
						/>
						<Animated_Text
							text={"."}
							i={3}
						/>
					</div>
					<br/>
					<div className="credits">
						<div>
							<Animated_Text text={"Advanced"} i={5}/>
							<Animated_Text text={"Advanced"} i={7}/>
							<Animated_Text text={"intermediate"} i={9}/>
						</div>
						<div>
							<Animated_Text text={"C++"} i={5}/>
							<Animated_Text text={"Javascript"} i={7}/>
							<Animated_Text text={"Python"} i={9}/>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}


export default Hero;