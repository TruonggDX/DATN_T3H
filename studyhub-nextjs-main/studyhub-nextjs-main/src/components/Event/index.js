import Image from "next/image";
import Link from "next/link";

export default function SingleEvent( props ) {
	const { categoryClass, Slug, Img, Title, eventDate, eventTime, eventLocation, btnText, imgWidth, imgHeight  } = props;

	return (
		<div className={categoryClass || 'single-upcoming-events'}>
			<div className="img-information">
				<Link href={`/event/${Slug || 'details'}`} className="thumbnail">
					<Image src={Img || '/images/events/01.jpg'} alt="events" width={imgWidth || 262} height={imgHeight || 160} />
				</Link>
				<div className="information">
					<div className="date-details">
						<div className="date">
							<i className="far fa-calendar"></i>
							<p> {eventDate || 'December 26, 2023'}</p>
						</div>
						<div className="time">
							<i className="fa-regular fa-clock"></i>
							<p>{eventTime || '10:30 am'}</p>
						</div>
						<div className="location">
							<i className="far fa-location-dot"></i>
							<p>{eventLocation || 'Yarra Park, Melbourne'}</p>
						</div>
					</div>
					<Link href={`/event/${Slug || 'details'}`}>
						<h5 className="title">{Title || 'EduFest 2023: Igniting Minds, Transforming Lives'}</h5>
					</Link>
				</div>
			</div>
			<Link href={`/event/${Slug || 'details'}`} className="rts-btn btn-primary with-arrow">{btnText || 'Get Text'} <i className="fa-light fa-arrow-right"></i></Link>
		</div>
	)
}
