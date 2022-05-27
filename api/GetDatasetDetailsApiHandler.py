from sre_constants import SUCCESS
from flask import flash, jsonify, request
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
from models.Review import Review
from models.User import User
from models.Dataset import Dataset


class GetDatasetDetailsApiHandler(Resource):

    def get(self):

        dataset_id = request.args.get('id')
        dataset = Dataset.filter_by_id(dataset_id)
        title = dataset.title
        description = dataset.description
        fileType = dataset.file_type
        fileSize = dataset.file_size
        downloads = dataset.num_downloads
        avgRating = dataset.avg_rating

        uploaderID = dataset.uploader_id
        uploader = User.find_by_id(uploaderID)

        uploaderName = uploader.username

        datasetDetails = {
            "title": title,
            "description": description,
            "fileType": fileType,
            "fileSize": fileSize,
            "downloads": downloads,
            "avgRating": avgRating,
            "uploaderName": uploaderName
        }
        
        result = Review.getReview(dataset_id)
        reviews = []
        for review in result:
            user = User.find_by_id(review.reviewer_id)
            reviewer = user.username
            rating = review.rating
            comment = review.review
            feedback = {"reviewer": reviewer, "rating": rating, "comment": comment}
            reviews.append(feedback)

        response = jsonify(reviews=reviews, datasetDetails=datasetDetails)
        return response