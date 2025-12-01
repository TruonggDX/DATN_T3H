import SingleEvent from "@/components/Event";
import Events from "@/data/events.json";

export default function EventArea() {
	return (
		<div className="rts-Event-list-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					<div className="col-lg-12">
						<div className="upcoming-events-main-wrapper-1">
							{
								Events.map((event) => {
									return (
										<SingleEvent
											Slug={event.slug}
											Img={event.img}
											Title={event.title}
											Content={event.content}
											Author={event.author}
											Position={event.position}
											Date={event.date}
											Time={event.time}
										/>
									);
								}).slice(0, 4)
							}
						</div>
					</div>
				</div>
			</div>
      	</div>
	)
}
