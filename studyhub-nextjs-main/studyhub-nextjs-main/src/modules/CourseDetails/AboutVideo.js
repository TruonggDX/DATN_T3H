import Image from "next/image";
import { useState } from "react";
import ModalVideo from 'react-modal-video';

export default function AboutVideo() {
	const [isOpen, setOpen] = useState(false);
	const openModal = () => { setOpen(!isOpen); }

	return (
		<div className="thumbnail mb--30 relative">
			<ModalVideo channel='youtube' isOpen={isOpen} videoId='FdrNFEbcsRs' onClose={() => { openModal(); }} />	
			<Image src="/images/course/21.jpg" width="950" height="500" alt="" />
			<div className="vedio-icone">
				<a className="video-play-button play-video popup-video" href="#" onClick={() => { openModal(); }}>
					<span></span>
				</a>
			</div>
		</div>		
	)
}
