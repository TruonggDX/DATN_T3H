import SingleEventTwo from "@/components/Event/Two";
import SingleInstructor from "@/components/Instructor";
import Events from "@/data/events.json";
import Instructors from "@/data/instructors.json";
import Image from "next/image";

export default function EventDetailsArea({item}) {
	if (!item) {
		item = Events[0]
	}
	const { detailsImg, title, description, price, date, totalSlot, bookedSlot } = item;

	return (
		<>
			<div className="rts-events-area rts-section-gap">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="thumbnail-large-image">
								<Image src={detailsImg || "/images/events/10.jpg"} width="1440" height="600" alt="events" />
							</div>
						</div>
					</div>
					<div className="row pt--60">
						<div className="col-lg-8">
							<div className="rts-events-details-area-information">
								<h5 className="title">About The Event</h5>
								<p className="disc">
									{description || "Join us for the Future Minds Symposium, a thought-provoking educational event designed to inspire and empower individuals to navigate the challenges and opportunities of tomorrow's world. This symposium brings together leading experts, visionaries, and innovators from various fields to explore cutting-edge ideas and share insights on shaping the future."}
								</p>
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Inspirational Keynote Speakers:</h6>
										<p className="disc">
											Engage in hands-on workshops facilitated by industry experts. Dive deep into practical skills and strategies to enhance
											your adaptability and resilience in the face of technological advancements.
										</p>
									</div>
								</div>
								{/* events details single area end */}
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Interactive Workshops:</h6>
										<p className="disc">
											Connect with like-minded individuals, professionals, and mentors. Build a network that will support your personal and
											professional growth, fostering collaboration and idea exchange.
										</p>
									</div>
								</div>
								{/* events details single area end */}
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Networking Opportunities:</h6>
										<p className="disc">
											Hear from renowned thought leaders who will delve into topics such as artificial intelligence, sustainability, and the
											future of work. Gain valuable perspectives to help you thrive in an ever-evolving landscape.
										</p>
									</div>
								</div>
								{/* events details single area end */}
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Networking Opportunities:</h6>
										<p className="disc">
											Hear from renowned thought leaders who will delve into topics such as artificial intelligence, sustainability, and the
											future of work. Gain valuable perspectives to help you thrive in an ever-evolving landscape.
										</p>
									</div>
								</div>
								{/* events details single area end */}
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Inspirational Keynote Speakers:</h6>
										<p className="disc">
											Engage in hands-on workshops facilitated by industry experts. Dive deep into practical skills and strategies to enhance
											your adaptability and resilience in the face of technological advancements.
										</p>
									</div>
								</div>
								{/* events details single area end */}
								{/* events details single area start */}
								<div className="events-details-single-area">
									<div className="icon">
										<svg xmlns="http://www.w3.org/2000/svg" width="14" height="18" viewBox="0 0 14 18" fill="none">
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#525252" />
											<path d="M8.25 0L7.18942 1.06058L10.6289 4.5H1.5C1.10218 4.5 0.720645 4.65804 0.43934 4.93934C0.158036 5.22064 0 5.60218 0 6V18H1.5V6H10.6289L7.18942 9.43942L8.25 10.5L13.5 5.25L8.25 0Z" fill="#553CDF" />
										</svg>
									</div>
									<div className="information">
										<h6 className="title">Registration:</h6>
										<p className="disc">
											Engage in hands-on workshops facilitated by industry experts. Dive deep into practical skills and strategies to enhance
											your adaptability and resilience in the face of technological advancements.
										</p>
									</div>
								</div>
								{/* events details single area end */}
							</div>
						</div>
						<div className="col-lg-4 rts-sticky-column-item">
							<div className="events-information-wrapper">
								<h4 className="title">Event Information</h4>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/01.png" width="50" height="50" alt="icon" />
										<span>Cost:</span>
									</div>
									<h3 className="title">{price || "$86.00"}</h3>
								</div>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/02.png" width="50" height="50" alt="icon" />
										<span>Date:</span>
									</div>
									<span>{date || "December 26, 2023"}</span>
								</div>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/03.png" width="50" height="50" alt="icon" />
										<span>Total Slot:</span>
									</div>
									<span>{totalSlot || '54'}</span>
								</div>
								<div className="single-information">
									<div className="icon">
										<Image src="/images/events/icon/04.png" width="50" height="50" alt="icon" />
										<span>Booked Slot:</span>
									</div>
									<span>{bookedSlot || '0'}</span>
								</div>
								<button className="rts-btn btn-primary">Book Now</button>
							</div>
						</div>
					</div>
					<div className="row g-5 mt--40">
						<h4 className="title mb--0">The Event Location</h4>
						<div className="col-lg-8">
							<div className="events-map">
								<iframe src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d14602.288851207937!2d90.47855065!3d23.798243149999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sbd!4v1705815643259!5m2!1sen!2sbd" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
							</div>
						</div>
						<div className="col-lg-4">
							<div className="events-vanue">
								<h5 className="title">Event Venue</h5>
								{/* single vanur items area */}
								<div className="single-vanue">
									<span>Venue:</span>
									<p>Starry Haven Events Center</p>
								</div>
								{/* single vanur items area end */}
								{/* single vanur items area */}
								<div className="single-vanue">
									<span>Location:</span>
									<p>Pinecrest Golf Club,123 Fairwa<br />
										Lane, Anytown, USA</p>
								</div>
								{/* single vanur items area end */}
								{/* single vanur items area */}
								<div className="single-vanue">
									<span>Phone Number:</span>
									<p>(+1) 0 221 457 441</p>
								</div>
								{/* single vanur items area end */}
								{/* single vanur items area */}
								<div className="single-vanue">
									<span>Web Site:</span>
									<p>www.studyhub.com</p>
								</div>
								{/* single vanur items area end */}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="instrustor-area rts-section-gapBottom">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<div className="title-between-area">
								<div className="title-area-left-style">
									<h2 className="title">Event Speakers</h2>
								</div>
							</div>
						</div>
					</div>
					<div className="row g-5 mt--10">
						{
							Instructors.map((instructor, index) => {
								return (
									<div key={index} className="col-lg-3 col-md-6 col-sm-12 col-12">
										<SingleInstructor 
											Slug={instructor.slug}
											Img={instructor.img}
											Name={instructor.name}
											Position={instructor.position}
											imgWidth={instructor.imgWidth}
											imgHeight={instructor.imgHeight}
										/>
									</div>
								);
							}).slice(0, 4)
						}
					</div>
				</div>
			</div>

			<div className="rts-single-events-start">
				<div className="container">
					<div className="row">
						<div className="col-lg-12">
							<h3 className="title mb--40">
								Related Event
							</h3>
						</div>
					</div>
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
							}).slice(0, 3)
						}
					</div>
				</div>
			</div>
		</>
	)
}
