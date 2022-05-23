from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
from models.Dataset import Dataset
from models.Review import Review
from models.User import User
# abort can used when data is invalid

from flask_jwt_extended import  get_jwt_identity, jwt_required


class AddReviewApiHandler(Resource):
    addreview_args = reqparse.RequestParser()
    addreview_args.add_argument("dataset_id", type=int, help="dataset id", required=False) #required should be True for now it's False
    addreview_args.add_argument("reviewer_id", type=int, help="Reviever id", required=False)
    addreview_args.add_argument("review", type=str, help="comments", required=False)
    addreview_args.add_argument("rating", type=int, help="rating", required=False)

    @jwt_required()
    def put(self):
        identity = get_jwt_identity()

        user = User.find_by_id(identity)
        args = AddReviewApiHandler.addreview_args.parse_args()
        dataset_id = args.get('dataset_id')
        reviewer_id = user.id
        review = args.get('review')
        rating = args.get('rating')

        review = Review(dataset_id, reviewer_id, review, rating)
        
        try:
            review.save()
            print("Review saved to database")
            return jsonify(msg="success")
        except:
            return jsonify(message="An error occurred adding review to database"), 500
