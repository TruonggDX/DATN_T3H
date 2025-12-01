import Image from "next/image";
import { useState } from "react";
import CountUp from "react-countup";

export default function CounterTwo() {
    const [state, setState] = useState(true);

	  const counters = [
        {
            countNum: 65972,
            countTitle: 'Students Enrolled',
            countIcon: '/images/fun-facts/icon/01.svg',
        },
        {
            countNum: 5321,
            countTitle: 'Completed Course',
            countIcon: '/images/fun-facts/icon/02.svg',
        },
        {
            countNum: 44239,
            countTitle: 'Students Learner',
            countIcon: '/images/fun-facts/icon/03.svg',
        },
        {
            countNum : 75992,
            countTitle: 'Students Community',
            countIcon: '/images/fun-facts/icon/04.svg',
        }

    ];

	return (
		<div className="fun-facts-area-4 pt--100">
			<div className="container">
				{counters &&
					<div className="row">
						<div className="col-lg-12">
							<div className="fun-facts-main-wrapper-1 style-two">
								{counters.map( (counter, num) => (
									<div key={num} className="single-fun-facts">
										<div className="icon">
											<Image src={counter.countIcon} alt="icon" width="40" height="40" />
										</div>
										<h5 className="title">
											<span className="counter">
												<CountUp start={state ? 0 : counter.countNum} end={counter.countNum} duration={10} onEnd= {()=> setState(false)} />
											</span>
										</h5>
										<span className="enr">{counter.countTitle}</span>
									</div>
								))}
							</div>
						</div>
					</div>
				}
			</div>
		</div>
	)
}
