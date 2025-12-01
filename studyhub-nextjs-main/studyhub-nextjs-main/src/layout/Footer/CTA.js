import useShapeMove from "@/hooks/useShapeMove";
import Image from "next/image";
import Link from "next/link";
import { useRef } from 'react';

export default function FooterCTA(props) {
	const shapeMoveRef = useRef(null);
  	useShapeMove(shapeMoveRef);
	
	return (
		<div className="call-to-sction bg_image shape-move" ref={shapeMoveRef}>
			<h2 className="title">Skills Certificate From <br /> the StudyHub</h2>
			<Link href="/course" className="rts-btn btn-primary-white with-arrow">View All Course <i className="fa-regular fa-arrow-right"></i></Link>
			<div className="cta-image">
				<Image src="/images/cta/women.png" alt="" width={210} height={237} />
			</div>
			<div className="shape-image">
				<div className="shape one" data-speed="0.04"><Image src="/images/cta/03.svg" alt="" width={65} height={52} /></div>
				<div className="shape two" data-speed="0.04"><Image src="/images/cta/04.svg" alt="" width={35} height={53} /></div>
			</div>
		</div>
	)
}
