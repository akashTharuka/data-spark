import React, { useState, useEffect } from 'react';
import DashboardNav from './DashboardNav';
import { withRouter } from 'react-router-dom';
import axios from 'axios';

const Dashboard = () => {

    const [type, setType] = useState("all");
    const [allDatasets, setAllDatasets] = useState([]);

    useEffect(() => {
        const access_token = sessionStorage.getItem("admin_token");
        axios.get('http://localhost:5000/getAllDatasets', {
            headers: {
                'Authorization': `Bearer ${access_token}`,
                'Content-type': 'application/json'
            }
        })
            .then(response => {
                if (response.data.valid){
                    console.log(response.data.msg);
                    setAllDatasets(response.data.datasets);
                }
                else{
                    console.log(response.data.msg);
                    document.location = "/adminlogin";
                }
                
            })
            .catch(error => {
                console.log(error);
                sessionStorage.removeItem("admin_token");
                document.location = "/adminlogin";
            });
    }, []);

    const getAllDatasets = () => {
        let content = [];
        for (let i = 0; i < allDatasets.length; i++){
            if (type === "all"){
                content.push(
                    <div className="d-flex col-10 align-items center mx-auto my-4" key={i}>
                        <div className="card dashboard position-relative" style={{width: "100%", minHeight: "10rem"}}>
                            {/* <img src={images.imageCap} className="card-img-top" alt=''/> */}
                            <div className="card-body">
                                <h5 className="card-title">{allDatasets[i].title}</h5>
                                <p className="card-text">{allDatasets[i].description}</p>
                                <a href={`/dashboard/details/${allDatasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                            </div>
                            <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${(allDatasets[i].status_id === 1) ? "bg-success" : "bg-danger"}`}>
                                {(allDatasets[i].status_id === 1) ? "Accepted" : "Pending"}
                                <span className="visually-hidden">unread messages</span>
                            </span>
                        </div>
                    </div>
                );
            }
            else if (type === "accepted"){
                if (allDatasets[i].status_id === 1){
                    content.push(
                        <div className="d-flex col-10 align-items center mx-auto my-4" key={i}>
                            <div className="card dashboard position-relative" style={{width: "100%", minHeight: "10rem"}}>
                                {/* <img src={images.imageCap} className="card-img-top" alt=''/> */}
                                <div className="card-body">
                                    <h5 className="card-title">{allDatasets[i].title}</h5>
                                    <p className="card-text">{allDatasets[i].description}</p>
                                    <a href={`/dashboard/details/${allDatasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                                </div>
                                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${(allDatasets[i].status_id === 1) ? "bg-success" : "bg-danger"}`}>
                                    {(allDatasets[i].status_id === 1) ? "Accepted" : "Pending"}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </div>
                        </div>
                    );
                }
            }
            else{
                if (allDatasets[i].status_id === 2){
                    content.push(
                        <div className="d-flex col-10 align-items center mx-auto my-4" key={i}>
                            <div className="card dashboard position-relative" style={{width: "100%", minHeight: "10rem"}}>
                                {/* <img src={images.imageCap} className="card-img-top" alt=''/> */}
                                <div className="card-body">
                                    <h5 className="card-title">{allDatasets[i].title}</h5>
                                    <p className="card-text">{allDatasets[i].description}</p>
                                    <a href={`/dashboard/details/${allDatasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                                </div>
                                <span className={`position-absolute top-0 start-100 translate-middle badge rounded-pill ${(allDatasets[i].status_id === 1) ? "bg-success" : "bg-danger"}`}>
                                    {(allDatasets[i].status_id === 1) ? "Accepted" : "Pending"}
                                    <span className="visually-hidden">unread messages</span>
                                </span>
                            </div>
                        </div>
                    );
                }
            }
        }
        return content;
    };

    return (
        <div>
            <DashboardNav />

            <div className='container my-5'>
                <nav>
                    <div className="nav nav-tabs" id='tablist'>
                        <button className="nav-link active" id='nav-all-tab' data-bs-toggle='tab' data-bs-target='#nav-all' type='button' value="all" onClick={(e) => {setType(e.target.value)}} role='tab' aria-controls='nav-all' aria-selected='true'>All</button>

                        <button className="nav-link" id='nav-accepted-tab' data-bs-toggle='tab' data-bs-target='#nav-accepted' type='button' value="accepted" onClick={(e) => {setType(e.target.value)}} role='tab' aria-controls='nav-accepted' aria-selected='false'>Accepted</button>

                        <button className="nav-link" id='nav-pending-tab' data-bs-toggle='tab' data-bs-target='#nav-pending' type='button' value="pending" onClick={(e) => {setType(e.target.value)}} role='tab' aria-controls='nav-pending' aria-selected='false'>Pending</button>
                    </div>

                    <div className="tab-content" id='nav-tabContent'>
                        <div className="tab-pane fade show active p-3" id='nav-all' role="tabpanel" aria-labelledby='nav-all-tab'>
                            <h2 className="display-6 my-4">All Datasets</h2>
                            <div className="row mx-auto">
                                {getAllDatasets()}
                            </div>
                        </div>

                        <div className="tab-pane fade show p-3" id='nav-accepted' role="tabpanel" aria-labelledby='nav-accepted-tab'>
                            <h2 className="display-6 my-4">Accepted Datasets</h2>
                            <div className="row mx-auto">
                                {getAllDatasets()}
                            </div>
                        </div>

                        <div className="tab-pane fade show p-3" id='nav-pending' role="tabpanel" aria-labelledby='nav-pending-tab'>
                            <h2 className="display-6 my-4">Pending Datasets</h2>
                            <div className="row mx-auto">
                                {getAllDatasets()}
                            </div>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    );
}

export default withRouter(Dashboard);
