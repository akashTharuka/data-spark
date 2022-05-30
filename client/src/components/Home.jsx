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
        let Searcheddatasets = handleSearch(datasets);
        /* for (let i = 0; i < datasetLength; i++){
            content.push(
                <div className="d-flex col-10 col-sm-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i}>
                    <div className="card home" style={{width: "18rem", minHeight: "20rem"}}>
                        {// <img src={images.imageCap} className="card-img-top" alt=''/> 
                        }
                        <div className="card-body">
                            <h5 className="card-title">{datasets[i].title}</h5>
                            <p className="card-text">{datasets[i].description}</p>
                            <a href={`/details/${datasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                        </div>
                    </div>
                </div>
            );
        } */

        for (let i = 0; i < Searcheddatasets.length; i++){
            content.push(
                <div className="d-flex col-10 col-sm-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i}>
                    <div className="card home" style={{width: "18rem", minHeight: "20rem"}}>
                        <div className="card-body">
                            <h5 className="card-title">{Searcheddatasets[i].title}</h5>
                            <p className="card-text">{Searcheddatasets[i].description}</p>
                            <a href={`/details/${Searcheddatasets[i].id}`} className="btn btn-warning shadow-lg px-3">View Details</a>
                        </div>
                    </div>
                </div>
            );
        }
        return content;
    };

    // there should be functions here to sort, filter etc.
    
    const [keyword, setKeyword]                     = useState('');
    const [csvFileType, setCsvFileType]             = useState([false]);
    const [txtFileType, setTxtFileType]             = useState([false]);
    const [sort, setSort]                           = useState('');

    //const [compSciFilter, setCompSciFilter]         = useState('');
    //const [eduFilter, setEduFilter]                 = useState('');
    //const [dataVisualFilter, setDatavisualFilter]   = useState('');
    //const [preModalFilter, setPreTModalFilter]      = useState('');
    //const [allFilter, setAllFilter]                 = useState(true);

    /* useEffect(() => {
        console.log(compSciFilter, eduFilter, dataVisualFilter, preModalFilter, allFilter);
    }, [compSciFilter, eduFilter, dataVisualFilter, preModalFilter, allFilter]); */

    function handleSearch(datasets) {
        return datasets.filter(
            (dataset) => 
                dataset.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                dataset.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 );
    }

    function handleSort() {
        if (sort === "Alphabetical") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.sort((a,b) =>  a.title.localeCompare(b.title));
                setDatasets(result);
            });

        } else if (sort === "Downloads") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.sort((a,b) =>  a.num_downloads > b.num_downloads ? -1 : 1);
                setDatasets(result);
            });

        } else if (sort === "Ratings") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.sort((a,b) =>  a.avg_rating > b.avg_rating ? -1 : 1);
                setDatasets(result);
            });

        } else if (sort === "Date modified") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.sort((a,b) =>  new Date(a.upload_time) > new Date(b.upload_time) ? -1 : 1)
                setDatasets(result);
            });
        }

    }

    const handleToggle = (value) => {
        if (value === "ComputerScience") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.filter((dataset) => dataset.category.indexOf("ComputerScience") > -1)
                setDatasets(result);
            });
        }

        if (value === "Education") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.filter((dataset) => dataset.category.indexOf("Education") > -1)
                setDatasets(result);
            });
        }

        if (value === "DataVisualization") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.filter((dataset) => dataset.category.indexOf("DataVisualization") > -1)
                setDatasets(result);
            });

        }

        if (value === "PreTrainedModal") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets.filter((dataset) => dataset.category.indexOf("PreTrainedModal") > -1)
                setDatasets(result);
            });
        }

        if (value === "All") {
            axios.get(config.domain + '/getDatasets')

            .then(response => {
                const result = response.data.datasets
                setDatasets(result);
            });
        }


    }

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
                                onChange={(e) => setCsvFileType(e.target.checked)}
                                //onClick={handleType}
                            />
                            <label htmlFor="csv-checkbox" className='filetype-label'>.csv</label>
                        </div>

                        <div className="col-6">
                            <input type="checkbox" 
                                className='txt filetype me-3' 
                                id='txt-checkbox' 
                                value={txtFileType}
                                onChange={(e) => setTxtFileType(e.target.checked)}
                                //onClick={handleType}
                            />
                            <label htmlFor="txt-checkbox" className='filetype-label'>.txt</label>
                        </div>
                    </div>
                </div>

                <div className="col-6 col-md-2">
                    <select className="form-select" aria-label="Default select example" onClick={handleSort} onChange={(e) => setSort((e.target.value))} value={sort}>
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex col-12 align-items-center mx-auto my-4 d-flex">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="button" onClick={() => handleToggle("ComputerScience")} className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck1">Computer Science</label>

                        <input type="button" onClick={() => handleToggle("Education")} className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck2">Education</label>

                        <input type="button" onClick={() => handleToggle("DataVisualization")} className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck3">Data Visualization</label>

                        <input type="button" onClick={() => handleToggle("PreTrainedModal")} className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="button" onClick={() => handleToggle("All")} className="btn-check" id="btncheck5" autoComplete="off" />
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