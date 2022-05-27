import React, { useState, useEffect } from 'react';

import { images } from '../javascript/imageImports';

const Rating = ({ setRating }) => {

    return (
        <div className="rating d-flex flex-row-reverse justify-content-center position-relative p-0 overflow-hidden">
            <input type="radio" onClick={(e) => setRating(5)} name="rating" id="rating-5" className='d-none' />
            <label htmlFor="rating-5"></label>

            <input type="radio" onClick={(e) => setRating(4)} name="rating" id="rating-4" className='d-none' />
            <label htmlFor="rating-4"></label>

            <input type="radio" onClick={(e) => setRating(3)} name="rating" id="rating-3" className='d-none' />
            <label htmlFor="rating-3"></label>

            <input type="radio" onClick={(e) => setRating(2)} name="rating" id="rating-2" className='d-none' />
            <label htmlFor="rating-2"></label>

            <input type="radio" onClick={(e) => setRating(1)} name="rating" id="rating-1" className='d-none' />
            <label htmlFor="rating-1"></label>

            <div className="emoji-wrapper text-center position-absolute overflow-hidden">
                <div className="emoji d-flex flex-column align-items-center">
                    <img src={images.rating0} alt="rating-0" />
                    <img src={images.rating1} alt="rating-1" />
                    <img src={images.rating2} alt="rating-2" />
                    <img src={images.rating3} alt="rating-3" />
                    <img src={images.rating4} alt="rating-4" />
                    <img src={images.rating5} alt="rating-5" />
                </div>
            </div>
        </div>
    );
}

export default Rating;
