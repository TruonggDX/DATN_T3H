import SingleEventTwo from "@/components/Event/Two";
import Events from "@/data/events.json";

export default function EventArea() {
	return (
		<div className="rts-events-area rts-section-gap">
			<div className="container">
				<div className="row g-5">
					{
						Events.map((event, index) => {
							return (
								<div key={index} className="col-lg-4 col-md-6 col-sm-6 col-12">
									<SingleEventTwo
										Slug={event.slug}
										Img={event.img}
										Title={event.title}
										Content={event.content}
										Author={event.author}
										Position={event.position}
										Date={event.date}
										Time={event.time}
									/>
								</div>
							);
						}).slice(0, 6)
					}
				</div>
			</div>
      	</div>
	)
}
