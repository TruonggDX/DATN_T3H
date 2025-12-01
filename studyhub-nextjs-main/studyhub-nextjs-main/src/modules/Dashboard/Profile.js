import {useEffect, useState} from "react";
import api from '../../service/auth'
import {showLoadingThenExecute} from "@/utils/swals";

export default function DashboardProfile() {
	const [activeTab, setActiveTab] = useState('profile');

	function handleTab(tab) {
		setActiveTab(tab);
	}

	const [password, setPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [file, setFile] = useState(null);
    const [birthday, setBirthday] = useState(null);

    const [data, setData] = useState({
		id: 0,
		code: '',
		email: '',
		fullname: '',
		phone: '',
		imageUrl: '',
		roleIds:[],
	});
	useEffect(() => {
		api.getUser().then((response) => {
			setData(response.data)
		})
	}, []);
	useEffect(() => {
		if (data?.birthday) {
			const [day, month, year] = data.birthday.split("/");
			setBirthday(new Date(`${year}-${month}-${day}`));
		}
	}, [data]);
	const handleChange = async (event) => {
		event.preventDefault();
		const request = {
			oldPassword: password,
			newPassword: newPassword,
			confirmPassword: confirmPassword
		};
		console.log('request', request);
		console.log('id',data.id)
		api.changePassword(data.id, request).then(() => {
			alert("Đổi mật khẩu thành công! Vui lòng đăng nhập lại !")
			setTimeout(() => {
				localStorage.removeItem("jwtToken");
				window.location.href = "/signin";
			}, 1000);
		}).catch((e) => {
			console.error(e)
		})
	};
	const handleSave = () => {
		showLoadingThenExecute(
			async () => {
				const formData = new FormData();
				formData.append("fullname", data.fullname);
				formData.append("address", data.address);
				formData.append("birthday", data.birthday);
				formData.append("phone", data.phone);

				data.roleIds.forEach((role) => {
					formData.append("roleIds", role);
				});
				if (file) {
					formData.append("file", file);
				}

				await api.updateAccount(data.id, formData);
			},
			"Cập nhật thành công!",
			"Cập nhật thất bại, vui lòng thử lại!",
			"/dashboard/profile"
		);
	};

	return (
		<div style={{height: '85vh'}} className="settings-wrapper-dashed">
			<ul className="nav nav-pills mb-3 tab-buttons" id="pills-tab" role="tablist">
				<li className="nav-item" role="presentation">
					<button
						className={`nav-link ${activeTab === "profile" ? "active" : ""}`}
						type="button"
						aria-selected={activeTab === "profile"}
						onClick={() => {
							handleTab("profile")
						}}
					>
						Thông tin
					</button>
				</li>
				<li className="nav-item" role="presentation">
					<button
						className={`nav-link ${activeTab === "password" ? "active" : ""}`}
						type="button"
						aria-selected={activeTab === "password"}
						onClick={() => {
							handleTab("password")
						}}
					>
						Đổi mật khẩu
					</button>
				</li>
			</ul>
			<div className="tab-content" id="pills-tabContent">
				<div className={`tab-pane fade ${activeTab === "profile" ? "show active" : ""}`}>
					<div className="profile-container" style={{display: 'flex', alignItems: 'center'}}>
						<div className="profile-image" style={{flex: 1, textAlign: 'center', marginRight: '100px'}}>
							<img src={
								file
									? URL.createObjectURL(file)
									: data.imageUrl
							}
								 alt="Avatar"
								 style={{width: '200px', height: '200px', borderRadius: '50%'}}/>
							<div
								style={{
									display: 'flex',
									alignItems: 'center',
									gap: '10px',
									marginTop: '40px',
									justifyContent: 'center'
								}}>
								<label htmlFor="fileUpload"
									   style={{
										   display: 'flex',
										   alignItems: 'center',
										   gap: '8px',
										   backgroundColor: '#007bff',
										   color: 'white',
										   padding: '10px 15px',
										   borderRadius: '5px',
										   cursor: 'pointer',
										   fontSize: '16px',
										   fontWeight: '500',
										   transition: '0.3s',
										   border: 'none'
									   }}
								>
									<i className="fa-solid fa-image"></i>
									<span>Chọn ảnh</span>
								</label>

								<input onChange={(e) => {
									if (e.target.files && e.target.files.length > 0) {
										const selectedFile = e.target.files[0];
										setFile(selectedFile);
									}
								}} id="fileUpload" type="file" style={{display: 'none'}}
								/>
							</div>
						</div>
						<div className="profile-info" style={{flex: 2}}>
							<div className="social-profile-link-wrapper">
								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-id-card"></i>
											<span>Mã tài khoản</span>
										</div>
									</div>
									<div className="right">
										<input type="text" value={data?.code} disabled style={{width: '350px'}}/>
									</div>
								</div>
								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-user"></i>
											<span>Họ tên</span>
										</div>
									</div>
									<div className="right">
										<input type="text"
											   onChange={(e) => setData({...data, fullname: e.currentTarget.value})}
											   style={{width: '350px'}} value={data?.fullname}
											   placeholder="Nhập họ tên của bạn...."/>
									</div>
								</div>
								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-envelope"></i>
											<span>Email</span>
										</div>
									</div>
									<div className="right">
										<input type="text" value={data?.email} disabled style={{width: '350px'}}/>
									</div>
								</div>
								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-phone"></i>
											<span>Số điện thoại</span>
										</div>
									</div>
									<div className="right">
										<input type="text" value={data?.phone}
											   disabled style={{width: '350px'}}/>
									</div>
								</div>
								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-location-dot"></i>
											<span>Địa chỉ</span>
										</div>
									</div>
									<div className="right">
										<input
											onChange={(e) => setData({...data, address: e.currentTarget.value})}
											type="text" value={data?.address}  style={{width: '350px'}}/>
									</div>
								</div>

								<div className="single-profile-wrapper">
									<div className="left">
										<div className="icon">
											<i className="fa-solid fa-cake-candles"></i>
											<span>Ngày sinh</span>
										</div>
									</div>
									<div className="right">
										<input
											type="date"
											onChange={(e) => setData({...data, birthday: e.currentTarget.value})}
											value={
												data?.birthday
													? data.birthday.split("/").reverse().join("-")
													: ""
											}
											style={{width: "350px"}}
										/>

									</div>
								</div>


								<a href="#" className="rts-btn btn-primary" onClick={handleSave}
								   style={{float: "right"}}>Cập nhật</a>
							</div>
						</div>
					</div>
				</div>
				<div
					className={`tab-pane fade ${activeTab === "password" ? "show active" : ""}`}
				>
					<div className="setting-change-password-area">
						<form className="form-password-area">
							<div className="single-input">
								<label htmlFor="current">Mật khẩu cũ</label>
								<input id="current"
									   value={password}
									   onChange={(e) => setPassword(e.target.value)}
									   type="password" placeholder="Nhập mật khẩu cũ"/>
							</div>
							<div className="single-input">
								<label htmlFor="new">Mật khẩu mới</label>
								<input id="new"
									   value={newPassword}
									   onChange={(e) => setNewPassword(e.target.value)}
									   type="password" placeholder="Nhập mật khẩu mới"/>
							</div>
							<div className="single-input">
								<label htmlFor="Current">Nhập lại mật khẩu </label>
								<input
									value={confirmPassword}
									onChange={(e) => setConfirmPassword(e.target.value)}
									type="password" placeholder="Nhập lại mật khẩu"/>
							</div>
							<button onClick={handleChange} className="rts-btn btn-primary">Đổi mật khẩu</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	)
}
