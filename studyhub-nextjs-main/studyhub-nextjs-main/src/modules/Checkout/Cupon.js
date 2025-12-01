import { useState } from "react"

export default function Coupon() {
	const [showCoupon, setShowCoupon] = useState(false)

	const handleCoupon = () => {
		setShowCoupon(!showCoupon)
	}

	return (
		<div className="coupon-toggle">
			<div className="accordion">
				<div className="card">
					<div className="card-header">
						<div className="card-title">
							<span><i className="fa fa-window-maximize"></i> Have a coupon?</span>
							<button onClick={handleCoupon}>Click here to enter your code</button>
						</div>
					</div>
					<div className={`card-body${showCoupon ? ' show' : ''}`}>
						<p>If you have a coupon code, please apply it below.</p>
						<div className="coupon-code-input">
							<input type="text" name="coupon_code" placeholder="Coupon code" required="" />
						</div>
						<button className="add-btn rts-btn btn-primary" type="submit">Apply Coupon</button>
					</div>
				</div>
			</div>
		</div>
	)
}
