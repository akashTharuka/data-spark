import React from 'react';
import { Link } from 'react-router-dom';

import Navbar from './Navbar';
import Upload from './Upload';

import { images } from '../javascript/imageImports';

const Home = () => {

    const getDataSets = () => {
        let content = [];
        for (let i = 0; i < 20; i++){
            content.push(
                <div className="d-flex col-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i}>
                    <div className="card" style={{width: "18rem"}}>
                        <img src={images.imageCap} className="card-img-top" alt=''/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <Link to="/details" className="btn btn-warning">View Details</Link>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };
    
    return (
        <div>
            <Navbar />

            <div className="row d-flex justify-content-start">
                <div className="col-10 col-md-4">
                    <button className="btn btn-dark m-3 px-4" data-bs-toggle="modal" data-bs-target="#upload-modal" data-bs-dismiss="modal">+Add New Dataset</button>
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

                <div className="d-flex-column col-10 col-md-4 align-items-center">
                    <div className="row">
                        <label className='col-4 text-center'>file type</label>
                    </div>
                        
                    <div className="row">
                        <div className="col-4">
                            <input type="checkbox" className='csv filetype mx-3' id='csv-checkbox' />
                            <label htmlFor="csv-checkbox" className='filetype-label'>.csv</label>
                        </div>

                        <div className="col-4">
                            <input type="checkbox" className='txt filetype mx-3' id='txt-checkbox' />
                            <label htmlFor="txt-checkbox" className='filetype-label'>.txt</label>
                        </div>
                    </div>
                </div>

                <div className="d-flex col-10 align-items-center mx-auto my-4">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="btncheck1">Computer Science</label>

                        <input type="checkbox" className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="btncheck2">Education</label>

                        <input type="checkbox" className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="btncheck3">Data Visualization</label>

                        <input type="checkbox" className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="checkbox" className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="btn btn-outline-dark" htmlFor="btncheck5">All</label>
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
