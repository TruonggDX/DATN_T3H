import Image from "next/image";
import { useEffect, useState } from "react";
import Countdown from 'react-countdown';
import RegistrationForm from "./components/RegistrationForm";

const Completionist = () => <span>Time's up!</span>;

const renderer = ({ days, hours, minutes, seconds, completed }) => {
	if (completed) {
		return <Completionist />;
	} else {
		return (
			<div className="counter-remaining-area" id="timer">
				{/* single counter */}
				<div className="single-counter">
					<div className="inner">
						<div className="title">
							<span id="days">{days}</span>
						</div>
					</div>
				</div>
				{/* single counter end */}
				{/* single counter */}
				<div className="single-counter">
					<div className="inner">
						<div className="title">
							<span id="hours">{hours}</span>
						</div>
					</div>
				</div>
				{/* single counter end */}
				{/* single counter */}
				<div className="single-counter">
					<div className="inner">
						<div className="title">
							<span id="minutes">{minutes}</span>
						</div>
					</div>
				</div>
				{/* single counter end */}
				{/* single counter */}
				<div className="single-counter">
					<div className="inner">
						<div className="title">
							<span id="seconds">{seconds}</span>
						</div>
					</div>
				</div>
				{/* single counter end */}
			</div>
		);
	}
};


export default function CountDown() {
	const [isClient, setIsClient] = useState(false);

	useEffect(() => {
	  setIsClient(true);
	}, []);

	return (
		<div className="rts-fun-facts-area-3 bg_image rts-section-gap bg-dark-image">
			<div className="container">
				<div className="row">
					<div className="col-lg-6">
						<div className="title-area-left-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb-2.png" alt="icon" width="22" height="22" />
								<span>Registration</span>
							</div>
							<h2 className="title mb--30">Register Your Account Get free <br />
								access to 60000 online course
								<Image src="/images/fun-facts/01.png" alt="fun-facts" width="174" height="14" />
							</h2>
							{
								isClient &&
								(
									<Countdown
										date={new Date('2025-12-31T00:00:00')}
										renderer={renderer}
									/>
								)
							}
							
						</div>
					</div>
					<div className="col-lg-6 d-flex justify-content-end justify-content-sm-center mt_sm--50">
						<div className="registration-area-right">
							<h4 className="title">Fill Your Registration</h4>
							<RegistrationForm />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
