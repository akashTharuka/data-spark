from sre_constants import SUCCESS
from flask import flash, jsonify, make_response
from flask_restful import Api, Resource, reqparse, abort

from models.User import User
from models.Review import Review

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required



class ReviewApiHandler(Resource):
    addreview_args = reqparse.RequestParser()
    addreview_args.add_argument("dataset_id", type=int, help="dataset id", required=False) #required should be True for now it's False
    addreview_args.add_argument("review", type=str, help="review", required=False)
    addreview_args.add_argument("rating", type=int, help="rating", required=False)
    
    getreview_args = reqparse.RequestParser()
    addreview_args.add_argument("dataset_id", type=int, help="dataset id", required=False) #required should be True for now it's False
    
    updatereview_args = reqparse.RequestParser()
    updatereview_args.add_argument("review_id", type=int, help="Review id", required=False) #required should be True for now it's False
    updatereview_args.add_argument("review", type=str, help="review", required=False)
    updatereview_args.add_argument("rating", type=int, help="rating", required=False)
    
    @jwt_required()
    def put(self):
        reviewer_id = get_jwt_identity()

        user = User.find_by_id(id)

        if not user:
            return make_response(jsonify(msg="Forbidden"), 403)
        
        args = ReviewApiHandler.addreview_args.parse_args()
        dataset_id = args.get('dataset_id')
        review = args.get('review')
        rating = args.get('rating')

        review = Review(dataset_id, reviewer_id, review, rating)
        
        try:
            review.save()
            print("Riview saved to database")
            
        except:
            return {"message": "An error occurred adding review to database"}, 500
        flash("review added Successfully")
    
    @jwt_required()
    def get(self):
        
        args = ReviewApiHandler.addreview_args.parse_args()
        dataset_id = args.get('dataset_id')
        
        result = Review.getReview(dataset_id)
        datasets = []
        for x in result:
            datasets.append(x.json())
        return jsonify(datasets)
    
    @jwt_required()
    def post(self):
        
        reviewer_id = get_jwt_identity()

        user = User.find_by_id(id)

        if not user:
            return make_response(jsonify(msg="Forbidden"), 403)
        
        args  = ReviewApiHandler.updatereview_args.parse_args()
        review_id = args.get('review_id')
        review = args.get('review')
        rating = args.get('rating')

        review =Review.getReview_by_id(review_id)
        
        if review.reviewer_id != reviewer_id:
            return make_response(jsonify(msg="Forbidden"), 403)
        
        try:
            review.update(reviewer_id,review,rating)
            print("Riview updated")
            
        except:
            return {"message": "An error occurred adding review to database"}, 500
        flash("review updated Successfully")