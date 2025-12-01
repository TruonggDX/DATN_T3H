import { Accordion, AccordionItem } from '@szhsin/react-accordion';
import { useState } from "react";
import ModalVideo from 'react-modal-video';

export default function CourseContent({}) {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);

	const items = [
		{
		  header: 
		  	<>
				<span>Introduction</span>
				<span>3 Lectures . 9 min</span>
			</>,
		  content: 
		  	<>
				{/* play single area start */}
				<a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					<div className="left">
						<i className="fa-light fa-circle-play"></i>
						<span>Introduction to the course</span>
					</div>
					<div className="right">
						<span className="play">Preview</span>
						<span>9 min</span>
					</div>
				</a>
				{/* play single area end */}
				{/* play single area start */}
				<a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					<div className="left">
						<i className="fa-light fa-circle-play"></i>
						<span>Basic Structure</span>
					</div>
					<div className="right">
						<span className="play">Preview</span>
						<span>9 min</span>
					</div>
				</a>
				{/* play single area end */}
				{/* play single area start */}
				<a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					<div className="left">
						<i className="fa-light fa-circle-play"></i>
						<span>Get Started</span>
					</div>
					<div className="right">
						<i className="fa-regular fa-lock"></i>
					</div>
				</a>
				{/* play single area end */}
		  	</>
		},
		{
			header: 
				<>
				  <span>Learn to Storyboard</span>
				  <span>7 Lectures . 120 min</span>
			  </>,
			content: 
				<>
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Become a storyboard artist</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Storyboard Artist</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Introduction PHP</span>
					  </div>
					  <div className="right">
						  <i className="fa-regular fa-lock"></i>
					  </div>
				  </a>
				  {/* play single area end */}
				</>
		},
		{
			header: 
				<>
				  <span>How to draw characters, layouts, and scenes</span>
				  <span>7 Lectures . 83 min</span>
			  </>,
			content: 
				<>
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Learning Fundamentsl Elementor</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Enter to the course</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Main Part of the course</span>
					  </div>
					  <div className="right">
						  <i className="fa-regular fa-lock"></i>
					  </div>
				  </a>
				  {/* play single area end */}
				</>
		},
		{
			header: 
				<>
				  <span>1-point and 2-point perspective</span>
				  <span>7 Lectures . 72 min</span>
			  </>,
			content: 
				<>
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Function About PHP</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Main Part of the course</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Learning Fundamentsl Elementor</span>
					  </div>
					  <div className="right">
						  <i className="fa-regular fa-lock"></i>
					  </div>
				  </a>
				  {/* play single area end */}
				</>
		},
		{
			header: 
				<>
				  <span>Digital drawing application</span>
				  <span>7 Lectures . 90 min</span>
			  </>,
			content: 
				<>
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Become a storyboard artist</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Function About PHP</span>
					  </div>
					  <div className="right">
						  <span className="play">Preview</span>
						  <span>9 min</span>
					  </div>
				  </a>
				  {/* play single area end */}
				  {/* play single area start */}
				  <a href="#" className="play-vedio-wrapper" onClick={() => { openModal(); }}>
					  <div className="left">
						  <i className="fa-light fa-circle-play"></i>
						  <span>Storyboard Artist</span>
					  </div>
					  <div className="right">
						  <i className="fa-regular fa-lock"></i>
					  </div>
				  </a>
				  {/* play single area end */}
				</>
		}
	];
	

	return (
		<div className="course-content-wrapper-main mt--40">
			<ModalVideo channel='youtube' isOpen={isOpen} videoId='FdrNFEbcsRs' onClose={() => { openModal(); }} />	
			<h5 className="title">Course Content</h5>

			{/* course content accordion area */}

			<Accordion className="accordion">
				{items.map(({ header, content }, i) => (
					<AccordionItem header={header} key={i} initialEntered className="accordion-item">
						{content}
					</AccordionItem>
				)).slice(0, 1)}
				{items.map(({ header, content }, i) => (
					<AccordionItem header={header} key={i} className="accordion-item">
						{content}
					</AccordionItem>
				)).slice(1, 5)}
			</Accordion>
			{/* course content accordion area end */}
		</div>
							
	)
}
