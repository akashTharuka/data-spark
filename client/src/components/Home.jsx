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

    const outputDatasets = (datasets) => {
        let content = [];

        content.push(
            <div className="d-flex col-10 align-items-center mx-auto my-4" key={0}>
                <span className='lead dataset-count'> {datasets.length} Datasets </span>
            </div>
        );

        for (let i = 0; i < datasets.length; i++){
            content.push(
                <div className="d-flex col-10 col-sm-6 col-md-4 col-lg-3 align-items center mx-auto my-4" key={i+1}>
                    <div className="card home" style={{width: "18rem", minHeight: "20rem"}}>
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
    }

    const getDataSets = () => {

        let Searcheddatasets = handleAllSearch(datasets);
        return outputDatasets(Searcheddatasets);
    };

    const getCategorizedDataSets = () => {

        let Searcheddatasets = handleCategorySearch(datasets);
        return outputDatasets(Searcheddatasets);

    };
    
    const [keyword, setKeyword]                             = useState('');
    const [sort, setSort]                                   = useState('');
    const [categorizedDatasets, setCategorizedDatasets]     = useState([]);

    function handleAllSearch() {
        return datasets.filter(
            (dataset) => 
                dataset.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                dataset.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ) ;
    }

    function handleCategorySearch() {
        return categorizedDatasets.filter(
            (dataset) => 
                dataset.title.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ||
                dataset.description.toLowerCase().indexOf(keyword.toLowerCase()) > -1 ) ;
    }

    const handleCategory = (value) => {
        const result = datasets.filter((dataset) => dataset.category === value);
        setCategorizedDatasets(result);
    }

    const handleSort = (e) => {

        const sortType = document.getElementById("select_sort_type").value;
        setSort(e.target.value);

        if (categorizedDatasets.length > 0) {

            if (sortType === "Alphabetical") {            
                const result = categorizedDatasets.sort((a,b) =>  a.title.localeCompare(b.title));
                setCategorizedDatasets(result);

            } else if (sortType === "Downloads") {           
                const result = categorizedDatasets.sort((a,b) =>  a.num_downloads > b.num_downloads ? -1 : 1);
                setCategorizedDatasets(result);

            } else if (sortType === "Ratings") {
                const result = categorizedDatasets.sort((a,b) =>  a.avg_rating > b.avg_rating ? -1 : 1);
                setCategorizedDatasets(result);

            } else if (sortType === "Date modified") {
                const result = categorizedDatasets.sort((a,b) =>  new Date(a.upload_time) > new Date(b.upload_time) ? -1 : 1)
                setCategorizedDatasets(result);
            }

        } else {

            if (sortType === "Alphabetical") {            
                const result = datasets.sort((a,b) =>  a.title.localeCompare(b.title));
                setDatasets(result);

            } else if (sortType === "Downloads") {           
                const result = datasets.sort((a,b) =>  a.num_downloads > b.num_downloads ? -1 : 1);
                setDatasets(result);

            } else if (sortType === "Ratings") {
                const result = datasets.sort((a,b) =>  a.avg_rating > b.avg_rating ? -1 : 1);
                setDatasets(result);

            } else if (sortType === "Date modified") {
                const result = datasets.sort((a,b) =>  new Date(a.upload_time) > new Date(b.upload_time) ? -1 : 1)
                setDatasets(result);
            }
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
                            id="search_text" 
                            value={keyword}
                            onChange={(e) => setKeyword(e.target.value)}
                        />
                        <span className="search-btn">
                            <i className="fas fa-search"></i>
                        </span>
                    </div>
                </div>

                <div className="col-6 col-md-2">
                    <select className="form-select" aria-label="Default select example" id="select_sort_type" onChange={(e) => handleSort(e)}>
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex col-12 align-items-center mx-auto my-4 d-flex">
                    <div className="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="button" onClick={() => handleCategory("ComputerScience")} className="btn-check" id="btncheck1" autoComplete="off"/>
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck1">Computer Science</label>

                        <input type="button" onClick={() => handleCategory("Education")} className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck2">Education</label>

                        <input type="button" onClick={() => handleCategory("DataVisualization")} className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck3">Data Visualization</label>

                        <input type="button" onClick={() => handleCategory("PreTrainedModal")} className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="button" onClick={() => handleCategory("All")} className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="btn btn-outline-dark mx-2 rounded" htmlFor="btncheck5">All</label>
                    </div>
                </div>



                <div className="row d-flex justify-content-evenly my-4">
                    
                    {categorizedDatasets.length > 0 && (
                        <>
                        {getCategorizedDataSets()}
                        </>
                    )}

                    {categorizedDatasets.length < 1 &&(
                        <>
                        {getDataSets()}
                        </>
                    )}

                </div>
                
            </div>
        </div>
    );
}

export default Home;