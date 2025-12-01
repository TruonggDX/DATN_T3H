import SingleEvent from "@/components/Event";
import EventsData from "@/data/events.json";
import Image from "next/image";

export default function Events() {

	return (
		<div className="up-coming-events rts-section-gap">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="title-area-center-style">
							<div className="pre-title">
								<Image src="/images/banner/bulb.png" alt="icon" width="44" height="44" />
								<span>Our Event</span>
							</div>
							<h2 className="title">Upcoming Events</h2>
							<p className="post-title">You'll find something to spark your curiosity and enhance</p>
						</div>
					</div>
				</div>
				<div className="row mt--50">
					<div className="col-lg-12">
						{/* single up coming events */}
						<div className="upcoming-events-main-wrapper-1">
							{/* single */}
							{
								EventsData.map((event, index) => {
									return (
										<SingleEvent
											key={index}
											Slug={event.slug}
											Img={event.img}
											Date={event.date}
											Time={event.time}
											Location={event.location}
											Title={event.title}
											imgWidth={event.imgWidth}
											imgHeight={event.imgHeight}
										/>
									);
								}).slice(0, 3)
							}
							{/* single */}
						</div>
						{/* single up coming events end */}
					</div>
				</div>
			</div>
		</div>
	)
}
