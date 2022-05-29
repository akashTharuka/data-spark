import React, { useState, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import config from '../config.json'
import Navbar from './Navbar';
import Upload from './Upload';

import { images } from '../javascript/imageImports';

const Home = (props) => {

    const [datasets, setDatasets] = useState([]);

    useEffect(() => {

        axios.get(config.domain + '/getDatasets')

            .then(response => {
                setDatasets(response.data.datasets);
            });
    }, []);

    const datasetLength = datasets.length;

    const getDataSets = () => {
        let content = [];
        for (let i = 0; i < datasetLength; i++){
            content.push(
                <div className="d-flex col-10 col-sm-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i}>
                    <div className="card home" style={{width: "18rem", minHeight: "20rem"}}>
                        {/* <img src={images.imageCap} className="card-img-top" alt=''/> */}
                        <div className="card-body">
                            <h5 className="card-title">{datasets[i].title}</h5>
                            <p className="card-text">{datasets[i].description}</p>
                            <a href={`/details/${datasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };


    // there should be functions here to sort, filter etc.
    
    const [keyword, setKeyword]                     = useState('');
    const [csvFileType, setCsvFileType]             = useState('');
    const [txtFileType, setTxtFileType]             = useState('');
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
            <div className="row d-flex justify-content-evenly align-items-center my-4 mx-2">
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

                <div className="d-flex-column col-6 col-md-2 align-items-center">
                    <div className="row">
                        <label className='col-12 text-start'>file type</label>
                    </div>
                        
                    <div className="row" >
                        <div className="col-6">
                            <input 
                                type="checkbox" 
                                className='csv filetype me-3' 
                                id='csv-checkbox' 
                                value={csvFileType}
                                onChange={(e) => setCsvFileType(e.target.value)}
                            />
                            <label htmlFor="csv-checkbox" className='filetype-label'>.csv</label>
                        </div>

                        <div className="col-6">
                            <input type="checkbox" 
                                className='txt filetype me-3' 
                                id='txt-checkbox' 
                                value={txtFileType}
                                onChange={(e) => setTxtFileType(e.target.value)}
                            />
                            <label htmlFor="txt-checkbox" className='filetype-label'>.txt</label>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-md-2">
                    <select className="form-select" aria-label="Default select example" onChange={(e) => setSort(e.target.value)} value={sort}>
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex col-12 align-items-center mx-auto my-4 d-flex">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="checkbox" onClick={(e) => setCompSciFilter((e.target.checked) ? "ComputerScience" : "")} className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck1">Computer Science</label>

                        <input type="checkbox" onClick={(e) => setEduFilter((e.target.checked) ? "Education" : "")} className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck2">Education</label>

                        <input type="checkbox" onClick={(e) => setDatavisualFilter((e.target.checked) ? "DataVisualization" : "")} className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck3">Data Visualization</label>

                        <input type="checkbox" onClick={(e) => setPreTModalFilter((e.target.checked) ? "PreTrainedModal" : "")} className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="checkbox" onClick={(e) => setAllFilter((e.target.checked) ? "All" : "")} className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck5">All</label>
                    </div>
                </div>

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
