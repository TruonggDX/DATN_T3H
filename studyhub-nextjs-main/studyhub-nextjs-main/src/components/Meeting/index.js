import Image from "next/image";
import Link from "next/link";

export default function SingleMeeting( props ) {
	const { meetingClass, Slug, Img, Title, meetingDate, meetingTime, meetingLInk, imgWidth, imgHeight  } = props;

	return (
		<div className={meetingClass || 'single-zoom-meeting-area'}>
			<Link href={`/meeting/${Slug || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/meeting/01.jpg'} alt="meetings" width={imgWidth || 400} height={imgHeight || 240} />
			</Link>
			<div className="inner-content">
				<div className="head">
					<div className="single">
						<i className="far fa-calendar"></i>
						<span>{meetingDate || 'December 26, 2023'}</span>
					</div>
					<div className="single">
						<i className="fa-light fa-clock"></i>
						<span>{meetingTime || '10:30 am'}</span>
					</div>
				</div>
				<Link href={`/meeting/${Slug || 'details'}`}>
					<h5 className="title">{Title || 'Insights from Industry Experts'}</h5>
				</Link>
				<div className="bottom">
					<div className="left">
						<Image src="/images/zoom/01.png" width="30" height="30" alt="left" />
						<span>Meeting ID:</span>
					</div>
					<a href={`zoom.com/join?${meetingLInk}`} target="_blank">{meetingLInk || '512475523222'}</a>
				</div>
			</div>
		</div>
	)
}
