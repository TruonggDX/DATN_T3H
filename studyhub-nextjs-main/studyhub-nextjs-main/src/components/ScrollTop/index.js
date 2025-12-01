import { useEffect, useState } from "react";

const ScrollTop = (props) => {
	const { scrollClassName } = props;
	
  	const [isVisible, setIsVisible] = useState(false);

  	// Top: 0 takes us all the way back to the top of the page
  	// Behavior: smooth keeps it smooth!
  	const scrollToTop = () => {
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
  	};

  	useEffect(() => {
    	// Button is displayed after scrolling for 500 pixels
		const toggleVisibility = () => {
			if (window.pageYOffset > 200) {
				setIsVisible(true);
			} else {
				setIsVisible(false);
			}
		};

		window.addEventListener("scroll", toggleVisibility);

		return () => window.removeEventListener("scroll", toggleVisibility);
	}, []);

  	return (
		<>
			{isVisible && (
				<div className={`${scrollClassName ? scrollClassName : 'progress-wrap'} ${isVisible ? 'active-progress' : ''}`} onClick={scrollToTop}>
					<svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
						<path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98"></path>
					</svg>
				</div>
			)}
		</>
  	);
}

export default ScrollTop

