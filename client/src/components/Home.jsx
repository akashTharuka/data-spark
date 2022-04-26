import React, { Component } from 'react';
import Navbar from './Navbar';

import { images } from '../javascript/imageImports';

export default class Home extends Component {

    getDataSets(){
        let content = [];
        for (let i = 0; i < 20; i++){
            content.push(
                <div className="d-flex col-6 col-md-4 col-lg-3 align-items center mx-auto my-4">
                    <div className="card" style={{width: "18rem"}}>
                        <img src={images.imageCap} className="card-img-top" alt='image here'/>
                        <div className="card-body">
                            <h5 className="card-title">Card title</h5>
                            <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                            <a href="#" class="btn btn-primary">View Details</a>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };
    
    render() {
        return (
            <div>
                <Navbar />
                <div className="row d-flex justify-content-start">
                    <div className="col-10 col-md-4">
                        <button className="btn btn-dark m-3 px-4">+Add New Dataset</button>
                    </div>
                </div>
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
                            <input type="checkbox" className="btn-check" id="btncheck1" autocomplete="off" />
                            <label className="btn btn-outline-dark" for="btncheck1">Computer Science</label>

                            <input type="checkbox" className="btn-check" id="btncheck2" autocomplete="off" />
                            <label className="btn btn-outline-dark" for="btncheck2">Education</label>

                            <input type="checkbox" className="btn-check" id="btncheck3" autocomplete="off" />
                            <label className="btn btn-outline-dark" for="btncheck3">Data Visualization</label>

                            <input type="checkbox" className="btn-check" id="btncheck4" autocomplete="off" />
                            <label className="btn btn-outline-dark" for="btncheck4">Pre-trained Modal</label>

                            <input type="checkbox" className="btn-check" id="btncheck5" autocomplete="off" />
                            <label className="btn btn-outline-dark" for="btncheck5">All</label>
                        </div>
                    </div>

                    <div className="d-flex col-10 align-items-center mx-auto my-4">
                        <span className='lead dataset-count'>#xx Datasets</span>
                    </div>

                    <div className="row d-flex justify-content-evenly my-4">
                        {this.getDataSets()}
                    </div>
                    
                </div>
            </div>
        );
    }
}
