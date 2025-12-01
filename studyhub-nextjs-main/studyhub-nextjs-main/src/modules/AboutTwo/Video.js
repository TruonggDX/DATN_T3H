import Image from "next/image";
import { useState } from "react";
import ModalVideo from 'react-modal-video';

export default function Video() {
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => setIsOpen(!isOpen);

	return (
		<div className="rts-video-area">
			<ModalVideo channel='youtube' isOpen={isOpen} videoId='FdrNFEbcsRs' onClose={() => { openModal(); }} />	
			<div className="container">
				<div className="thumbnail relative mb--30">
					<Image className="w-100" src="/images/fun-facts/03.jpg" width="2880" height="1200" alt="" />
					<div className="vedio-icone">
						<a className="video-play-button play-video popup-video" href="#" onClick={() => { openModal(); }}>
							<span></span>
						</a>
					</div>
				</div>
			</div>
		</div>
	)
}
