import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config.json'
import Navbar from './Navbar';
import DashboardNav from '../dashboard_components/DashboardNav';
import Review from './Review';
import AcceptModel from './AcceptModel';

import Login from './Login';
import Register from './Register';
import Profile from './Profile';
import Logout from './Logout';

import { toast } from 'react-toastify';

const DatasetDetails = (props) => {

	const params = useParams();

	const [reviewed, setReviewed] 				= useState(null);
	const [reviewType, setReviewType]			= useState("add");

	// basic data for the page
	const [datasetDetails, setDatasetDetails] 	= useState(null);
	const [allReviews, setAllReviews] 			= useState([]);
	// first five rows of data
	const [columns ,setColumns] 				= useState([]);
	const [rows, setRows] 						= useState([]);
	// metadata
	const [missingValues, setMissingValues]		= useState([]);
	const [uniqueValues, setUniqueValues]		= useState([]);
	const [numColumns ,setNumColumns] 			= useState([]);
	const [meanList, setMeanList] 				= useState([]);
	const [stdList, setStdList] 				= useState([]);
	const [minList, setMinList] 				= useState([]);
	const [maxList, setMaxList] 				= useState([]);
	const [quantList1, setQuanList1] 			= useState([]);
	const [quantList2, setQuanList2] 			= useState([]);
	const [quantList3, setQuanList3] 			= useState([]);
	const [imgURL, setImgURL]					= useState(null);

	const [errorMsg, setErrorMsg]				= useState("");
	const [downloadUrl, setDownloadUrl] 		= useState("");

	useEffect(() => {

		const token = sessionStorage.getItem("token");

		axios.get(config.domain + `/getDatasetDetails?id=${params.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json', 
			},
		})
		.then((res) => {
			// console.log(res.data)
			setDownloadUrl(res.data.download_url);
			let string = res.data;
			string = JSON.stringify(string);
			string = string.replace(/\\n/g, "\\n")  
				.replace(/\\'/g, "\\'")
				.replace(/\\"/g, '\\"')
				.replace(/\\&/g, "\\&")
				.replace(/\\r/g, "\\r")
				.replace(/\\t/g, "\\t")
				.replace(/\\b/g, "\\b")
				.replace(/\\f/g, "\\f")
				.replace(/^\s+|\s+$/g, "");
			let s = JSON.parse(string);
			// console.log(s);
			if (s.result){
				setAllReviews(s.reviews);
				setDatasetDetails(s.datasetDetails);
				setColumns(s.result.columns);
				setRows(s.values);
				
				// set metadata
				setMissingValues(s.result.missing_values);
				setUniqueValues(s.result.unique_values);
				setNumColumns(s.result.num_columns);
				setMeanList(s.result.mean);
				setStdList(s.result.stddev);
				setMinList(s.result.minlis);
				setMaxList(s.result.maxlis);
				setQuanList1(s.result.quantile1);
				setQuanList2(s.result.quantile2);
				setQuanList3(s.result.quantile3);

				setDownloadUrl(s.result.download_url);
				// const plot = res.data.result.plot;
				// const imageBlob = plot.blob();

				// const reader = new FileReader();
				// reader.readAsDataURL(imageBlob);

				// reader.onloadend = () => {
				// 	const base64data = reader.result;
				// 	setImgURL(base64data);
				// }
			}
			else{
				setErrorMsg("These types of files cannot be displayed");
				toast.error(errorMsg);
			}
		})
		.catch(err => {
			console.log(err);
		});

		if (token){
			let payload = {
				datasetID: params.id
			}
			axios.post(config.domain + `/getUser`, payload, {
				headers: {
					Authorization: `Bearer ${token}`,
					'Content-Type': 'application/json', 
				},
			})
			.then(res => {
				console.log(res.data.reviewed);
				setReviewed(res.data.reviewed);
			})
			.catch(err => {
				console.log("error in catch: " + err);
				sessionStorage.removeItem("token");
				document.location.reload();
			})
		}
	}, []);

	const handleDownload = (e) => {
		e.preventDefault();

        window.open(downloadUrl, "_blank");
		const dataset_id = {"dataset_id": params.id};

		axios.post(config.domain + '/download', dataset_id)
			.then((res) => {
				
			})
			.catch((err) => {
				
			})
	}

	const reviewsLength = allReviews.length;

	const getReviews = () => {
		let content = [];
		for (let i = 0; i < reviewsLength; i++){
			content.push(
				<div className="col" key={i}>
					<div className="card review bg-light mx-auto" style={{width: '24rem', minHeight: "15rem"}}>
						<div className="card-body d-flex flex-column">
							<h5 className="card-title text-center text-light fs-3">{allReviews[i].reviewer}</h5>
							<div className="ratings text-center"> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 1) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 2) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 3) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 4) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 5) ? "rating-color" : ""}`}></i> 
							</div>
							{/* <span className='mx-auto'>{allReviews[i].rating}</span> */}
							<p className="card-text text-center text-light small mt-3">{allReviews[i].comment}</p>
						</div>
					</div>
				</div>
			);
		}
		return content;
	}

	const getDatasetDetails = () => {
		return (
			<table className='table table-striped table-hover'>
				<thead className='position-sticky top-0 bg-light'>
					<tr>
						<th scope="col">#</th>
						{columns.map((col, index) => {
							return (
								<th scope='col' key={index}>{col}</th>
							);
						})}
					</tr>
					<tr className='table-danger'>
						<td>Missing Values</td>
						{missingValues.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr className='table-info'>
						<td>Unique Values</td>
						{uniqueValues.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
				</thead>
				<tbody>
					{rows.map((row, index) => {
						return (
							<tr key={index}>
								<td>{index+1}</td>
								{row.map((col, index) => {
									return (
										<td key={index}>{col}</td>
									);
								})}
							</tr>
						);
					})}
				</tbody>
			</table>
		);
	}

	const getMetadata = () => {
		return (
			<table className='table table-striped table-hover'>
				<thead>
					<tr>
						<th scope="col">#</th>
						{numColumns.map((col, index) => {
							return (
								<th scope='col' key={index}>{col}</th>
							);
						})}
					</tr>
				</thead>
				<tbody>
					<tr>
						<td>Mean Values</td>
						{meanList.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>Standard Deviations</td>
						{stdList.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>Minimum Values</td>
						{minList.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>Maximum Values</td>
						{maxList.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>1st Quantiles</td>
						{quantList1.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>2nd Quantiles</td>
						{quantList2.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
					<tr>
						<td>3rd Quantiles</td>
						{quantList3.map((col, index) => {
							return (
								<td key={index}>{col}</td>
							);
						})}
					</tr>
				</tbody>
			</table>
		);
	}

	
	const handleReject = () => {
		const access_token = sessionStorage.getItem("admin_token");
        const dataset_id = { "dataset_id": params.id}
        axios.post(config.domain + '/changeStatus', dataset_id, {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            }
        })
        .then(response => {
            console.log(response.data);
			document.location = "/dashboard";
        })
        .catch(error => {
            console.log(error)
            // sessionStorage.removeItem("admin_token");
            // document.location = "/adminlogin";
        })
	}

	return (
		<div>
			{(props.type !== "dashboard") ? <Navbar status={props.status} /> : <DashboardNav />}

			<Login />
            <Register type="register" />
            <Logout />
            <Profile datasets={props.datasets} />

			<div className={`col-10 display-5 title mx-auto my-5 text-center ${(errorMsg === "") ? "d-none" : ""}`}>
				{errorMsg}
			</div>

			<div className={`${(errorMsg !== "") ? "d-none" : ""}`}>
				<div className="row my-4">
					<div className="col-10 mx-auto d-flex">
						<h4 className="title display-6 float-start">{(datasetDetails) ? datasetDetails.title : "Loading"}</h4>
					</div>
					<div className="col-10 mx-auto mt-3">
						<h6 className="uploader">{(datasetDetails) ? " - " + datasetDetails.uploaderName + " - " : "Loading"}</h6>
					</div>
					<div className="col-10 mx-auto mt-3">
						<a className="btn btn-dark px-4 float-start shadow-lg" onClick={handleDownload} ><i className="bi bi-download me-3"></i>Download</a>
					</div>
					<div className="col-10 mx-auto mt-3">
						<div className="row">
							<div className="rate col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>Rating</h3>
													<div className="ratings"> 
														<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 1) ? "rating-color" : ""}`}></i> 
														<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 2) ? "rating-color" : ""}`}></i> 
														<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 3) ? "rating-color" : ""}`}></i> 
														<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 4) ? "rating-color" : ""}`}></i> 
														<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 5) ? "rating-color" : ""}`}></i>
													</div>
												</div>
												<div className="align-self-center ms-auto">
													<span className='text-warning fs-1'>{datasetDetails && datasetDetails.avgRating}</span>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="category col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>Category</h3>
													<span className='text-primary'>{(datasetDetails) ? (datasetDetails.category) ? datasetDetails.category : "Not Assigned" : "Loading"}</span>
												</div>
												<div className="align-self-center ms-auto">
													<i className="fa fa-folder text-primary fs-1"></i>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="modified-date col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>Last Modified</h3>
													<span className='text-success'>{(datasetDetails) ? datasetDetails.uploadTime : "Loading"}</span>
												</div>
												<div className="align-self-center ms-auto">
													<i className="fa fa-calendar-check text-success fs-1"></i>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="downloads col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>Downloads</h3>
													<span className='text-danger'>{(datasetDetails) ? datasetDetails.downloads + " downloads" : "Loading"}</span>
												</div>
												<div className="align-self-center ms-auto">
													<i className="fa fa-download text-danger fs-1"></i>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="file-type col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>File Type</h3>
													<span className='text-info'>{(datasetDetails) ? "." + datasetDetails.fileType : "Loading"}</span>
												</div>
												<div className="align-self-center ms-auto">
													<i className="fa fa-file text-info fs-1"></i>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
							<div className="file-size col-lg-4 my-2">
								<div className="card">
									<div className="card-content">
										<div className="card-body">
											<div className="media d-flex">
												<div className="media-body text-start">
													<h3>File Size</h3>
													<span className='text-warning'>{(datasetDetails) ?  datasetDetails.fileSize + " Bytes" : "Loading"}</span>
												</div>
												<div className="align-self-center ms-auto">
													<i className="fa fa-window-restore text-warning fs-1"></i>
												</div>
											</div>
											{/* <div className="progress mt-1 mb-0" style={{height: "7px"}}>
												<div className="progress-bar bg-primary" role="progressbar" style={{width: "80%"}} aria-valuenow="80" aria-valuemin="0" aria-valuemax="100"></div>
											</div> */}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="row my-4 mx-auto">
					<div className="card description bg-light my-3 mx-auto" style={{maxWidth: '95vw', border: 'none'}}>
						<div className="card-title mt-3 mb-0 ms-3 fs-3">Little Something to know about the dataset</div>
						<div className="subtitle small ms-3 text-muted">
							<time dateTime={(datasetDetails) ? datasetDetails.uploadTime : "Loading"}>
								<i className="fas fa-calendar-alt me-2"></i>{(datasetDetails) ? datasetDetails.uploadTime : "Loading"}
							</time>
						</div>
						<div className="card-body">
							<p className="card-text text-dark">{(datasetDetails) ? datasetDetails.description : "Loading"}</p>
						</div>
					</div>
				</div>

				<div className="dataset-details row my-4 mx-auto">
					<h6 className="title lead my-4 text-muted text-center my-5">CONTENT</h6>
					<div className="table-contents col-10 mx-auto table-responsive position-relative" style={{maxHeight: "80vh", overflowY: "scroll"}}>
						{getDatasetDetails()}
					</div>
					
					<h6 className="title lead my-4 text-muted text-center my-5">METADATA</h6>
					<div className="metadata col-10 mx-auto table-responsive my-4">
						{getMetadata()}
					</div>
					{/* <div className="histogram-image col-10 mx-auto">
						<h6 className="title lead my-4 text-muted">HISTOGRAM</h6>
						<img src={imgURL} alt="histogram-plot" />
					</div> */}
				</div>
				

				<div className={`reviews row mx-auto my-4 ${(props.type === "dashboard") ? "d-none" : ""}`}>
					<div className="col-10 mx-auto reviews-container d-flex flex-row flex-nowrap overflow-auto">
						{getReviews()}
					</div>
					<div className={`col-10 col-md-4 mx-auto my-4 d-flex justify-content-center ${(reviewed) ? "d-none" : ""}`}>
						<button onClick={(e) => setReviewType("add")} className={`btn btn-dark my-3 mx-auto px-4 shadow-lg ${(props.status) ? "" : "d-none"}`} data-bs-toggle="modal" data-bs-target="#addReview-modal" data-bs-dismiss="modal">+Add Review</button>
					</div>
					<div className={`col-10 col-md-4 mx-auto my-4 d-flex justify-content-center ${(! reviewed) ? "d-none" : ""}`}>
						<button onClick={(e) => setReviewType("update")} className={`btn btn-dark my-3 mx-auto px-4 shadow-lg ${(props.status) ? "" : "d-none"}`} data-bs-toggle="modal" data-bs-target="#addReview-modal" data-bs-dismiss="modal">Update Review</button>
					</div>

					<Review datasetID={params.id} type={reviewType} />
				</div>

				<div className={`reviews row mx-auto my-4 ${(props.type === "dashboard") ? "" : "d-none"}`}>
					<div className="col-10 col-md-4 mx-auto my-4 d-flex justify-content-center">
						<button className="btn btn-lg btn-success my-3 mx-1 mx-sm-auto px-4 shadow-lg" data-bs-toggle="modal" data-bs-target="#accept-modal" data-bs-dismiss="modal">Accept</button>
						<button className="btn btn-lg btn-danger my-3 mx-1 mx-sm-auto px-4 shadow-lg" onClick={handleReject}>Reject</button>
					</div>

					<AcceptModel id={params.id} />
				</div>
			</div>

		</div>
	);
}

export default DatasetDetails;
