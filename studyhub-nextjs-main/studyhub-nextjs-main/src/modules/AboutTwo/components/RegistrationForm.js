
export default function RegistrationForm() {

	return (
		<form action="#" className="registration">
			<div className="half-wrapper">
				<input type="text" placeholder="First Name" required />
				<input type="text" placeholder="Last Name" />
			</div>
			<div className="half-wrapper">
				<input type="email" placeholder="Email Address" />
				<input type="text" placeholder="Phone" />
			</div>
			<input type="text" placeholder="Address" />
			<textarea placeholder="Comment"></textarea>
			<button className="rts-btn btn-primary">Registration Now </button>
		</form>
	)
}
