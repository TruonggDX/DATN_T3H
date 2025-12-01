import Meetings from "@/data/meetings.json";
import Image from "next/image";

export default function MeetingDetailsArea({item}) {
	if (!item) {
		item = Meetings[0]
	}
	const { detailsImg, title, description, date, host, category, duration, timezone, link } = item;

	return (
		<>

			<div className="rts-zoom-details-thumbnail-area rts-section-gapTop">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<Image src={detailsImg || "/images/zoom/07.jpg"} width="1440" height="600" alt="events" />
						</div>
					</div>
					<div className="row mt--50 g-5">
						<div className="col-lg-8">
							<div className="zoom-meeting-left-content-details">
								<h4 className="title">{title || "Insights from Industry Experts"}</h4>
								<p className="disc">
									{description || "Join us for an exclusive and insightful webinar where seasoned professionals from diverse industries share their wealth of knowledge and experience. Discover firsthand the strategies, challenges, and trends that have shaped their successful"}
									careers.
								</p>
								<h5 className="title">Agenda:</h5>
								<p className="disc">
									Engage in hands-on workshops facilitated by industry experts. Dive deep into practical skills and strategies to enhance your adaptability and resilience in the face of technological advancements.
								</p>
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252"></path>
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF"></path>
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Opening Keynote: Industry Overview</h6>
										<p className="disc">
											Gain a comprehensive understanding of the current landscape from our expert keynote speaker.
										</p>
									</div>
								</div>
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252"></path>
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF"></path>
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Panel Discussion: Navigating Challenges</h6>
										<p className="disc">
											Engage in a dynamic discussion as our panel of industry experts candidly share their experiences overcoming obstacles
											and adapting to change.
										</p>
									</div>
								</div>
								<h5 className="title">Key Takeaways:</h5>
								<div className="key-takeways-wrapper">
									<ul>
										<li>Learn strategies for success from those who have navigated the industry landscape.</li>
										<li>Gain valuable insights into emerging trends and future opportunities.</li>
										<li>Network with like-minded professionals and expand your industry connections.</li>
									</ul>
								</div>
							</div>
						</div>
						<div className="col-lg-4">
							<div className="zoom-meeting-information-details">
								<h5 className="title">Meeting Information</h5>
								<div className="single-information">
									<span>Hosted By</span>
									<span>{host || "Owen Christ"} </span>
								</div>
								<div className="single-information">
									<span>Date</span>
									<span>{date || "Octob er 29, 2023"}</span>
								</div>
								<div className="single-information">
									<span>Category</span>
									<span>{category || "Strategies"}</span>
								</div>
								<div className="single-information">
									<span>Duration</span>
									<span>{duration || "30 minutes"}</span>
								</div>
								<div className="single-information">
									<span>Timezone</span>
									<span>{timezone || "Atlantic/Azores"}</span>
								</div>
								<p><span>Note: </span>Countdown time is shown based an your
									local timezone.</p>
								<a href={`https://zoom.us/j/${link}`} target="_blank" className="rts-btn btn-primary">Jon Meeting via Zoom App</a>
								<a href={`https://zoom.us/j/${link}`} target="_blank" className="rts-btn btn-border">Jon via Web Browser</a>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="rts-section-gap"></div>
		</>
	)
}
