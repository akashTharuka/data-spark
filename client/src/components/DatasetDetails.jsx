import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import config from '../config.json'
import Navbar from './Navbar';
import DashboardNav from '../dashboard_components/DashboardNav';
import Review from './Review';
import AcceptModel from './AcceptModel';

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

	useEffect(() => {

		const token = sessionStorage.getItem("token");

		axios.get(config.domain + `/getDatasetDetails?id=${params.id}`, {
			headers: {
				Authorization: `Bearer ${token}`,
				'Content-Type': 'application/json', 
			},
		})
		.then((res) => {
			// console.log(res.data);
			if (res.data.result){
				setAllReviews(res.data.reviews);
				setDatasetDetails(res.data.datasetDetails);
				setColumns(res.data.result.columns);
				setRows(res.data.result.rowlists);
				
				// set metadata
				setMissingValues(res.data.result.missing_values);
				setUniqueValues(res.data.result.unique_values);
				setNumColumns(res.data.result.num_columns);
				setMeanList(res.data.result.mean);
				setStdList(res.data.result.stddev);
				setMinList(res.data.result.minlis);
				setMaxList(res.data.result.maxlis);
				setQuanList1(res.data.result.quantile1);
				setQuanList2(res.data.result.quantile2);
				setQuanList3(res.data.result.quantile3);

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
			}
		})
		.catch(err => {
			console.log(err);
		});

		if (token){
			let payload = {
				datasetID: params.id
			}
			axios.post(`http://localhost:5000/getUser`, payload, {
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

	const reviewsLength = allReviews.length;

	const getReviews = () => {
		let content = [];
		for (let i = 0; i < reviewsLength; i++){
			content.push(
				<div className="col" key={i}>
					<div className="card review m-3" style={{width: '25rem', minHeight: "15rem"}}>
					{/* <img src="..." className="card-img-top" alt="..." /> */}
						<div className="card-body">
							<h5 className="card-title">{allReviews[i].reviewer}</h5>
							<div className="ratings"> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 1) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 2) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 3) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 4) ? "rating-color" : ""}`}></i> 
								<i className={`fa fa-star ${(allReviews[i].rating >= 5) ? "rating-color" : ""}`}></i> 
								<span className='mx-3'>{allReviews[i].rating}</span>
							</div>
							<p className="card-text">{allReviews[i].comment}</p>
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
				<thead>
					<tr>
						<th scope="col">#</th>
						{columns.map((col, index) => {
							return (
								<th scope='col' key={index}>{col}</th>
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

			<div className={`col-10 display-5 title mx-auto my-5 text-center ${(errorMsg === "") ? "d-none" : ""}`}>
				{errorMsg}
			</div>

			<div className={`${(errorMsg !== "") ? "d-none" : ""}`}>
				<div className="row my-4">
					<div className="col-10 mx-auto d-flex">
						<h4 className="title display-6 float-start">{(datasetDetails) ? datasetDetails.title : "Loading"}</h4>
						<small>{(datasetDetails) ? "." + datasetDetails.fileType : "Loading"}</small>
					</div>
					<div className="col-10 mx-auto mt-3">
						<h6 className="uploader">{(datasetDetails) ? " - " + datasetDetails.uploaderName + " - " : "Loading"}</h6>
					</div>
					<div className="col-10 mx-auto mt-3">
						<a className="btn btn-dark px-4 float-start shadow-lg" href={config.domain + "/files/" + params.id}><i className="bi bi-download me-3"></i>Download{(datasetDetails) ? " [ " + datasetDetails.fileSize + "B ]" : ""}</a>
					</div>
				</div>

				<div className="row mb-3 ratings">
					<div className="col-10 mx-auto">
						<div className="ratings"> 
							<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 1) ? "rating-color" : ""}`}></i> 
							<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 2) ? "rating-color" : ""}`}></i> 
							<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 3) ? "rating-color" : ""}`}></i> 
							<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 4) ? "rating-color" : ""}`}></i> 
							<i className={`fa fa-star ${(datasetDetails && datasetDetails.avgRating >= 5) ? "rating-color" : ""}`}></i> 
							<span className='mx-3'>{datasetDetails && datasetDetails.avgRating}</span>
						</div>
					</div>
					<div className="col-10 mx-auto mt-3">
						<h6 className="downloads">{(datasetDetails) ? datasetDetails.downloads + " downloads" : "Loading"}</h6>
					</div>
				</div>

				<div className="row my-4 mx-auto">
					<div className="card description text-white bg-dark my-3 mx-auto" style={{maxWidth: '95vw'}}>
						<div className="card-header">Description</div>
						<div className="card-body">
							<p className="card-text text-warning">{(datasetDetails) ? datasetDetails.description : "Loading"}</p>
						</div>
					</div>
				</div>

				<div className="dataset-details row my-4 mx-auto">
					<div className="table-contents col-10 mx-auto">
						<h6 className="title lead my-4 text-muted">CONTENT</h6>
						{getDatasetDetails()}
					</div>
					<div className="metadata col-10 mx-auto">
						<h6 className="title lead my-4 text-muted">METADATA</h6>
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
