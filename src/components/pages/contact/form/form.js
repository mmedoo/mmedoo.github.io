import "./form.css";
import ANIMATED_TEXT from "../../load_animation/animate_text";

function submitMessage(e) {
	e.preventDefault();
	const formData = new FormData(e.currentTarget);
	
	formData.append('service_id', 'service_port');
	formData.append('template_id', 'port');
	formData.append('user_id', 'VlIZlX3XpFdgpVYZR');

	const submit_button = e.currentTarget.querySelector("input[type='submit']");

	submit_button.disabled = true;

	const controler = new AbortController();
	
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form', controler.signal);
	xhr.onload = function () {
		if (xhr.status === 200) {
			alert('Your mail is sent!');
		} else {
			alert('Oops... ' + xhr.responseText);
		}
		submit_button.disabled = false;
	};
	xhr.onerror = function () {
		alert('Oops... Something went wrong.');
	};
	xhr.send(formData);
};


function Form() {

	return (
		<section className="contact-form">
			<ANIMATED_TEXT text="Contact" i={2} />
			<br />
			<form onSubmit={submitMessage}>
				<div>
					<label htmlFor="name">Name:</label>
					<input
						required
						type="text"
						name="name"
						id="name">
					</input>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						required
						type="email"
						name="email"
						id="email">
					</input>
				</div>
				<div>
					<label htmlFor="subject">Subject:</label>
					<input
						required
						type="text"
						name="subject"
						id="subject">
					</input>
				</div>
				<div id="mess">
					<label htmlFor="message">Message</label>
					<textarea required type="text" name="message" id="message"></textarea>
				</div>
				<div id="submit">
					<input
						type="submit" value="Send"></input>
				</div>
			</form>
		</section>
	)
}

export default Form;