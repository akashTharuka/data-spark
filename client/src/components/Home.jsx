import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json'
import Navbar from './Navbar';
import Upload from './Upload';

const Home = (props) => {

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {

        axios.get(config.domain + '/getDatasets')
            .then(response => {
                setDatasets(response.data.datasets);
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    const datasetLength = datasets.length;

    const getDataSets = () => {
        let content = [];
        for (let i = 0; i < datasetLength; i++){
            content.push(
                <div className="card dataset bg-light my-3 mx-auto col-10 col-md-5 mx-1 d-flex" key={i} style={{border: 'none'}}>
                    <div className="card-title mt-3 mb-0 ms-3 fs-3">{datasets[i].title}</div>
                    <div className="subtitle small ms-3 text-muted">
                        <time dateTime={datasets[i].upload_time}>
                            <i className="fas fa-calendar-alt me-2"></i>{datasets[i].upload_time}
                        </time>
                        <div className="category">
                            <span><i className="fa fa-folder me-2"></i><strong>{datasets[i].category}</strong></span>
                        </div>
                    </div>
                    <div className="card-body">
                        <p className="card-text text-dark">{datasets[i].description.substring(0, 200) + ". . . "}<strong>see more</strong></p>
                    </div>
                    <a href={`/details/${datasets[i].id}`} className="btn btn-outline-dark shadow-md mb-3 me-auto px-3">View Details</a>
                </div>
            );
        }
        return content;
    };


    // there should be functions here to sort, filter etc.
    
    const [keyword, setKeyword]                     = useState('');
    const [sort, setSort]                           = useState('');

    const [compSciFilter, setCompSciFilter]         = useState('');
    const [eduFilter, setEduFilter]                 = useState('');
    const [dataVisualFilter, setDatavisualFilter]   = useState('');
    const [preModalFilter, setPreTModalFilter]      = useState('');
    const [allFilter, setAllFilter]                 = useState('');

    useEffect(() => {
        console.log(compSciFilter, eduFilter, dataVisualFilter, preModalFilter, allFilter);
    }, [compSciFilter, eduFilter, dataVisualFilter, preModalFilter, allFilter]);

    return (
        <div>
            <Navbar status={props.status} datasets={datasets} />

            <div className="row d-flex justify-content-start">
                <div className="col-10 col-md-4">
                    <button type='button' className={`btn btn-dark m-3 px-4 shadow-lg ${(props.status) ? '' : 'd-none'}`} data-bs-toggle="modal" data-bs-target="#upload-modal" data-bs-dismiss="modal">+Add New Dataset</button>
                </div>
            </div>

            <Upload />
            <div className="row d-flex justify-content-evenly align-items-center my-4 mx-auto">
                <div className="search col-10 col-md-8">
                    <div className="search-box ps-3">
                        <input 
                            className="search-txt" 
                            type="text" 
                            placeholder="search here..." 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <span className="search-btn">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>
            </div>

            <div className="row d-flex flex-column mx-2 my-2">
                <div className="col-10 col-md-3 d-flex flex-column my-2 mx-auto">
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setSort(e.target.value)} value={sort}>
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex flex-column col-10 col-xl-7 mx-auto my-2">
                    <div className="btn-group flex-wrap my-2" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" onClick={(e) => setCompSciFilter((e.target.checked) ? "ComputerScience" : "")} className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck1">Computer Science</label>

                        <input type="checkbox" onClick={(e) => setEduFilter((e.target.checked) ? "Education" : "")} className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck2">Education</label>

                        <input type="checkbox" onClick={(e) => setDatavisualFilter((e.target.checked) ? "DataVisualization" : "")} className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck3">Data Visualization</label>

                        <input type="checkbox" onClick={(e) => setPreTModalFilter((e.target.checked) ? "PreTrainedModal" : "")} className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="checkbox" onClick={(e) => setAllFilter((e.target.checked) ? "All" : "")} className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck5">All</label>
                    </div>
                </div>
            </div>

            <div className="row d-flex my-2">
                <div className="d-flex col-10 align-items-center mx-auto my-4">
                    <span className='lead dataset-count'>{datasetLength} Datasets</span>
                </div>

                <div className="row d-flex justify-content-evenly my-4">
                    {getDataSets()}
                </div>
            </div>
        </div>
    );
}

export default Home;
