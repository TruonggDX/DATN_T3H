import Image from "next/image";
import Link from "next/link";

export default function SingleEventTwo( props ) {
	const { categoryClass, Slug, Img, Title, eventDate, eventTime, eventLocation, btnText, imgWidth, imgHeight  } = props;

	return (
		<div className={categoryClass || 'single-events-two-wrapper'}>
			<Link href={`/event/${Slug || 'details'}`} className="thumbnail">
				<Image src={Img || '/images/events/01.jpg'} alt="events" width={imgWidth || 400} height={imgHeight || 240} />
			</Link>
			<div className="inner-content-events-2">
				<div className="time-line">
					<div className="single">
						<i className="far fa-calendar-alt"></i>
						<span>{eventDate || 'December 26, 2023'}</span>
					</div>
					<div className="single">
						<i className="fa-light fa-clock"></i>
						<span>{eventTime || '10:30 am'}</span>
					</div>
				</div>
				<Link href={`/event/${Slug || 'details'}`}>
					<h5 className="title">
						{Title || 'Edu Fest 2023: Igniting Minds Off On Transforming Lives'}
					</h5>
				</Link>
				<div className="bottom">
					<div className="location">
						<i className="fa-sharp fa-regular fa-location-dot"></i>
						<span>{eventLocation || 'Yarra Park, Melbourne'}</span>
					</div>
					<Link href={`/event/${Slug || 'details'}`} className="rts-btn btn-border with-arrow">
						{btnText || "Get Ticket"}<i className="fa-regular fa-arrow-right"></i>
					</Link>
				</div>
			</div>
		</div>
	)
}
