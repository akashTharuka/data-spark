import React, { useState, useEffect } from 'react'
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
                <div className="card dataset bg-light my-3 mx-auto col-10 col-md-5 mx-1 d-flex" key={i+1} style={{border: 'none'}}>
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
    }

    const getDatasets = () => {
        let searchedDatasets = handleAllSearch(datasets);
        return outputDatasets(searchedDatasets);
    };

    const getCategorizedDatasets = () => {
        let searchedDatasets = handleCategorySearch(datasets);
        return outputDatasets(searchedDatasets);
    }

    const getEmptyDatasets = () => {
        let content = [];
        content.push (
            <div className="col-10 title text-center display-6 fs-4 mx-auto my-5 text-danger" key={0}>
                No Datasets are Available for this Category !!!
            </div>
        )
        return content;
    }

    const [keyword, setKeyword]                         = useState('');
    const [sort, setSort]                               = useState('');
    const [categorizedDatasets, setCategorizedDatasets] = useState([]);
    const [emptyDatasets, setEmptyDatasets] = useState([]);


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
        if (value === "All") {
            setCategorizedDatasets(datasets);
        } else {
            const result = datasets.filter((dataset) => dataset.category === value);
            if (result.length > 0) {
                setCategorizedDatasets(result);
            } else {
                setCategorizedDatasets([]);
                setEmptyDatasets("No Result So Far...");
            }
        }
    }

    const handleSort = (e) => {

        const sortType = document.getElementById("select_sort_type").value;
        setSort(e.target.value);
        var result;

        if (categorizedDatasets.length > 0) {

            if (sortType === "Sort Here") {
                result = categorizedDatasets

            } else if (sortType === "Alphabetical") {            
                result = categorizedDatasets.sort((a,b) =>  a.title.localeCompare(b.title));

            } else if (sortType === "Downloads") {           
                result = categorizedDatasets.sort((a,b) =>  a.num_downloads > b.num_downloads ? -1 : 1);

            } else if (sortType === "Ratings") {
                result = categorizedDatasets.sort((a,b) =>  a.avg_rating > b.avg_rating ? -1 : 1);

            } else if (sortType === "Date modified") {
                result = categorizedDatasets.sort((a,b) =>  new Date(a.upload_time) > new Date(b.upload_time) ? -1 : 1)
            }
            setCategorizedDatasets(result);

        } else {

            if (sortType === "Sort Here") {
                result = datasets

            } else if (sortType === "Alphabetical") {            
                result = datasets.sort((a,b) =>  a.title.localeCompare(b.title));

            } else if (sortType === "Downloads") {           
                result = datasets.sort((a,b) =>  a.num_downloads > b.num_downloads ? -1 : 1);

            } else if (sortType === "Ratings") {
                result = datasets.sort((a,b) =>  a.avg_rating > b.avg_rating ? -1 : 1);

            } else if (sortType === "Date modified") {
                result = datasets.sort((a,b) =>  new Date(a.upload_time) > new Date(b.upload_time) ? -1 : 1)
            }
            setDatasets(result);
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
                    <select className="form-select" aria-label="Default select example" id="select_sort_type" onChange={(e) => handleSort(e)}>
                        <option defaultValue="SortHere">Sort Here</option>
                        <option value="Alphabetical">Alphabetical</option>
                        <option value="Date modified">Date modified</option>
                        <option value="Downloads">Downloads</option>
                        <option value="Ratings">Ratings</option>
                    </select>
                </div>

                <div className="d-flex flex-column col-10 col-xl-7 mx-auto my-2">
                    <div className="btn-group flex-wrap my-2" role="group" aria-label="Basic checkbox toggle button group">
                        <input type="button" onClick={() => handleCategory("Computer Science")} className="btn-check" id="btncheck1" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck1">Computer Science</label>

                        <input type="button" onClick={() => handleCategory("Education")} className="btn-check" id="btncheck2" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck2">Education</label>

                        <input type="button" onClick={() => handleCategory("Data Visualization")} className="btn-check" id="btncheck3" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck3">Data Visualization</label>

                        <input type="button" onClick={() => handleCategory("Pre-trained Modal")} className="btn-check" id="btncheck4" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck4">Pre-trained Modal</label>

                        <input type="button" onClick={() => handleCategory("All")} className="btn-check" id="btncheck5" autoComplete="off" />
                        <label className="col-2 btn btn-outline-dark mx-2 my-2 rounded align-middle" style={{width: "10rem"}} htmlFor="btncheck5">All</label>
                    </div>
                </div>
            </div>

            <div className="row d-flex my-2">
                {categorizedDatasets.length > 0 && (
                    <>
                    {getCategorizedDatasets()}
                    </>
                )}

                {categorizedDatasets.length < 1 && emptyDatasets.length > 0 &&(
                    <>
                    {getEmptyDatasets()}
                    </>
                )}

                {categorizedDatasets.length < 1 && emptyDatasets.length < 1 &&(
                    <>
                    {getDatasets()}
                    </>
                )}
            </div>
        </div>
    );
}

export default Home;
