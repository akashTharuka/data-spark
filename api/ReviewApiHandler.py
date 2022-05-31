from flask import flash, jsonify, make_response
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort

from models.User import User
from models.Review import Review

from flask_jwt_extended import get_jwt_identity, jwt_required



class ReviewApiHandler(Resource):
    review_args = reqparse.RequestParser()
    review_args.add_argument("dataset_id", type=int, help="dataset id is required", required=True)
    review_args.add_argument("review", type=str, help="review is required", required=True)
    review_args.add_argument("rating", type=int, help="rating is required", required=True)
    
    @jwt_required()
    def post(self):
        reviewer_id = get_jwt_identity()

        user = User.find_by_id(reviewer_id)

        if not user:
            return jsonify(msg="Authorization Error: Invalid Token or Token Expired", valid=False)
        
        args = ReviewApiHandler.review_args.parse_args()
        dataset_id = args.get('dataset_id')
        review = args.get('review')
        rating = args.get('rating')

        review = Review(dataset_id, reviewer_id, review, rating)
        
        try:
            review.save()
            print("Review saved to database")
            return jsonify(msg="success")
        except:
            return jsonify(message="An error occurred adding review to database"), 500
    

    # def get(self):
        
    #     args = ReviewApiHandler.addreview_args.parse_args()
    #     dataset_id = args.get('dataset_id')
        
    #     result = Review.getReview(dataset_id)
    #     datasets = []
    #     for x in result:
    #         datasets.append(x.json())
    #     return jsonify(datasets=datasets)
    
    @jwt_required()
    @cross_origin()
    def put(self):
        
        reviewer_id = get_jwt_identity()

        user = User.find_by_id(reviewer_id)

        if not user:
            return jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 403
        
        args  = ReviewApiHandler.review_args.parse_args()
        dataset_id = args.get('dataset_id')
        review_text = args.get('review')
        rating = args.get('rating')

        review = Review.find_added_review(reviewer_id, dataset_id)

        print("dataset_id ", dataset_id, "review ", review_text, "rating", rating )
        # if review.reviewer_id != reviewer_id:
        #     return make_response(jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 403)
        
        try:
            review.update(review_text, rating)
            print("Review updated")
        except:
            return jsonify(message="An error occurred adding review to database"), 500

        return jsonify(messge="review added successfully")