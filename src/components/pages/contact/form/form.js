import "./form.css";
import ANIMATED_TEXT from "../../load_animation/animate_text";



function focusInp(e) {
	e.target.parentElement.classList.add("focus");
}
function focusOut(e) {
	e.target.parentElement.classList.remove("focus");
}


function submitMessage(e) {
	e.preventDefault();
	var formData = new FormData(e.currentTarget);
	formData.append('service_id', 'service_port');
	formData.append('template_id', 'port');
	formData.append('user_id', 'VlIZlX3XpFdgpVYZR');
	for (let input of e.currentTarget.elements) {
		if (input.type !== "submit") {
			formData.append(input.name, input.value);
		}
	}
	var xhr = new XMLHttpRequest();
	xhr.open('POST', 'https://api.emailjs.com/api/v1.0/email/send-form');
	xhr.onload = function () {
		if (xhr.status === 200) {
			alert('Your mail is sent!');
		} else {
			alert('Oops... ' + xhr.responseText);
		}
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
						onFocus={focusInp}
						onBlur={focusOut}
						required
						type="text"
						name="name"
						id="name">
					</input>
				</div>
				<div>
					<label htmlFor="email">Email:</label>
					<input
						onFocus={focusInp}
						onBlur={focusOut}
						required
						type="email"
						name="email"
						id="email">
					</input>
				</div>
				<div>
					<label htmlFor="subject">Subject:</label>
					<input
						onFocus={focusInp}
						onBlur={focusOut}
						required
						type="text"
						name="subject"
						id="subject">
					</input>
				</div>
				<div id="mess">
					<label htmlFor="message">Message</label>
					<textarea onFocus={focusInp} onBlur={focusOut} required type="text" name="message" id="message"></textarea>
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