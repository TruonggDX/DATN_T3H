import Image from "next/image";
import {useSelector} from 'react-redux';
import {useEffect, useState} from "react";
import api from '../../service/auth'

export default function DashboardBreadCrumbs() {
	const [data, setData] = useState();
	useEffect(() => {
		api.getUser().then((res => {
			setData(res.data);
		}))
	},[])
	return (
		<div className="dashboard-banner-area-wrapper">
			<div className="container">
				<div className="row">
					<div className="col-lg-12">
						<div className="dashboard-banner-area-start bg_image">
							<div className="author-profile-image-and-name">
								<div
									className="profile-pic"
									style={{
										width: "200px",
										height: "200px",
										borderRadius: "50%",
										overflow: "hidden",
										display: "flex",
										justifyContent: "center",
										alignItems: "center"
									}}
								>
									<Image
										src={data?.imageUrl || "/images/dashboard/01.png"}
										width={200}
										height={200}
										alt="dashboard"
										style={{
											width: "100%",
											height: "100%",
											objectFit: "cover"
										}}
									/>
								</div>
								<div className="name-desig">
									<h1 className="title">{data?.fullname}</h1>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}
