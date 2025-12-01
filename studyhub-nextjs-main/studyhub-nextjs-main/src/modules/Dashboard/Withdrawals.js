import Image from "next/image";

export default function DashboardWithdrawals() {

	return (
		<div className="announcements-wrapper-dashed">
			<div className="top-announcement-wrapper">
				<div className="left-wrapper">
					<div className="icon">
						<Image src="/images/dashboard/announcement/02.png" width={60} height={60} alt="announcement" />
					</div>
					<div className="information">
						<span>Current Balance is $0.00</span>
						<p>You have $0.00 and this is insufficient balance to withdraw</p>
					</div>
				</div>
			</div>

			<div className="withdrow-inner-wrapper">
				<div className="top">
					<i className="fa-regular fa-circle-exclamation"></i>
					<p>The preferred payment method is selected as PayPal. You can change your <a href="#">Withdraw Preference</a> </p>
				</div>
				<div className="mid">
					<Image src="/images/dashboard/announcement/03.png" width={374} height={303} alt="announcement" />
				</div>
				<p className="pb--50">No Data Available in this Section</p>
			</div>
		</div>
	)
}
