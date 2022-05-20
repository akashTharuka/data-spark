import React from 'react';

import Navbar from './Navbar';
import Upload from './Upload';

import { images } from '../javascript/imageImports';

const Home = (props) => {

    // need to request basic dataset details to display in the homepage
    const getDataSets = () => {
        let content = [];
        for (let i = 0; i < 20; i++){
            content.push(
                <div className="d-flex col-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i}>
                    <div className="card home" style={{width: "18rem"}}>
                        <img src={images.imageCap} className="card-img-top" alt=''/>
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

    // there should be functions here to sort, filter etc.
    

    
    return (
        <div>
            <Navbar status={props.status} />

            <div className="row d-flex justify-content-start">
                <div className="col-10 col-md-4">
                    <button type='button' className={`btn btn-dark m-3 px-4 shadow-lg ${(props.status) ? '' : 'd-none'}`} data-bs-toggle="modal" data-bs-target="#upload-modal" data-bs-dismiss="modal">+Add New Dataset</button>
                </div>
            </div>

            <Upload />

            <div className="row d-flex justify-content-evenly align-items-center my-4 mx-2">
                <div className="search col-10 col-md-8">
                    <div className="search-box ps-3">
                        <input className="search-txt" type="text" placeholder="search here..." />
                        <span className="search-btn">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>

                <div className="d-flex-column col-6 col-md-2 align-items-center">
                    <div className="row">
                        <label className='col-12 text-start'>file type</label>
                    </div>
                        
                    <div className="row">
                        <div className="col-6">
                            <input type="checkbox" className='csv filetype me-3' id='csv-checkbox' />
                            <label htmlFor="csv-checkbox" className='filetype-label'>.csv</label>
                        </div>

                        <div className="col-6">
                            <input type="checkbox" className='txt filetype me-3' id='txt-checkbox' />
                            <label htmlFor="txt-checkbox" className='filetype-label'>.txt</label>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-md-2">
                    <select className="form-select" aria-label="Default select example">
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex col-12 align-items-center mx-auto my-4 d-flex">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck1">Computer Science</label>

                        <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck2">Education</label>

                        <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck3">Data Visualization</label>

                        <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="checkbox" className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck5">All</label>
                    </div>
                </div>

                <div className="d-flex col-10 align-items-center mx-auto my-4">
                    <span className='lead dataset-count'>#xx Datasets</span>
                </div>

                <div className="row d-flex justify-content-evenly my-4">
                    {getDataSets()}
                </div>
                
            </div>
        </div>
    );
}

export default Home;
