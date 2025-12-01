import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import { useRef, useState } from "react";
import CountUp from "react-countup";

export default function Counter() {
    const [state, setState] = useState(true);

	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);

	  const counters = [
        {
            countNum: 65972,
            countTitle: 'Students Enrolled',
            countIcon: '/images/fun-facts/01.svg',
        },
        {
            countNum: 5321,
            countTitle: 'Completed Course',
            countIcon: '/images/fun-facts/02.svg',
        },
        {
            countNum: 44239,
            countTitle: 'Students Learner',
            countIcon: '/images/fun-facts/03.svg',
        },
        {
            countNum : 75992,
            countTitle: 'Students Community',
            countIcon: '/images/fun-facts/04.svg',
        }

    ];

	return (
		<div className="fun-facts-area-1 shape-move bg_image ptb--50" ref={shapeMoveRef}>
			<div className="container">
				{counters &&
					<div className="row">
						<div className="col-lg-12">
							<div className="fun-facts-main-wrapper-1">
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
			<div className="shape-image">
				<div className="shape one" data-speed="0.04" data-revert="true">
					<Image src="/images/banner/15.png" alt="" width="59" height="48" />
				</div>
				<div className="shape three" data-speed="0.04">
					<Image src="/images/banner/16.png" alt="" width="39" height="43" />
				</div>
			</div>
		</div>
	)
}
