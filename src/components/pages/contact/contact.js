import CIRCLE from "./circle/circle"
import ANIMATED_TEXT from "../load_animation/animate_text";
import Form from "./form/form";
import "./contact.css";

function Contact() {
	return (
		<>
			<div className="view">

				<div className="view_content">
					<ANIMATED_TEXT text="CONTACT" i={1} />
				</div>
			</div>

			<div className="view">
				{/* <div className="view_content"> */}
					<div className="contact-cont">
						<Form />
						<CIRCLE />
					</div>
				{/* </div> */}
				<br/>
			</div>

			<div className="view">

				<div className="view_content">
					<ANIMATED_TEXT text="CONTACT" i={1} />
				</div>
			</div>
		</>
	);
}


export default Contact;