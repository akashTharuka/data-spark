import React from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {

    const getAllDatasets = () => {
        let content = [];
        for (let i = 0; i < 20; i++){
            content.push(
                <div className="d-flex col-10 align-items center mx-auto my-4" key={i}>
                    <div className="card" style={{width: "100%"}}>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="/details" className="btn btn-warning shadow-lg px-3">View Details</a>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };

    return (
        <div>
            <Navbar loginStatus={true} />

            <div className='container my-5'>
                <nav>
                    <div className="nav nav-tabs" id='tablist'>
                        <button className="nav-link active" id='nav-all-tab' data-bs-toggle='tab' data-bs-target='#nav-all' type='button' role='tab' aria-controls='nav-all' aria-selected='true'>All</button>

                        <button className="nav-link" id='nav-accepted-tab' data-bs-toggle='tab' data-bs-target='#nav-accepted' type='button' role='tab' aria-controls='nav-accepted' aria-selected='false'>Accepted</button>

                        <button className="nav-link" id='nav-rejected-tab' data-bs-toggle='tab' data-bs-target='#nav-rejected' type='button' role='tab' aria-controls='nav-rejected' aria-selected='false'>Rejected</button>
                    </div>

                    <div className="tab-content" id='nav-tabContent'>
                        <div className="tab-pane fade show active p-3" id='nav-all' role="tabpanel" aria-labelledby='nav-all-tab'>
                            <h2 className="display-6 my-4">All Datasets</h2>
                            
                            {getAllDatasets()}
                        </div>

                        <div className="tab-pane fade show p-3" id='nav-accepted' role="tabpanel" aria-labelledby='nav-accepted-tab'>
                            <h2 className="display-6 my-4">Accepted Datasets</h2>
                        </div>

                        <div className="tab-pane fade show p-3" id='nav-rejected' role="tabpanel" aria-labelledby='nav-rejected-tab'>
                            <h2 className="display-6 my-4">Rejected Datasets</h2>
                        </div>
                    </div>

                </nav>
            </div>
        </div>
    );
}

export default Dashboard;
