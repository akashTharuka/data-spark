from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_restful import Api, Resource, reqparse, abort
from models.Dataset import Dataset
from models.Review import Review
# abort can used when data is invalid


class ReviewApiHandler(Resource):
    addreview_args = reqparse.RequestParser()
    addreview_args.add_argument("dataset_id", type=int, help="dataset id", required=False) #required should be True for now it's False
    addreview_args.add_argument("reviewer_id", type=int, help="Reviever id", required=False)
    addreview_args.add_argument("review", type=str, help="review", required=False)
    addreview_args.add_argument("rating", type=int, help="rating", required=False)
    
    getreview_args = reqparse.RequestParser()
    addreview_args.add_argument("dataset_id", type=int, help="dataset id", required=False) #required should be True for now it's False

    def put(self):
        args = ReviewApiHandler.addreview_args.parse_args()
        dataset_id = args.get('dataset_id')
        reviewer_id = args.get('reviewer_id')
        review = args.get('review')
        rating = args.get('rating')

        review = Review(dataset_id, reviewer_id, review, rating)
        
        try:
            review.save()
            print("Riview saved to database")
            
        except:
            return {"message": "An error occurred adding review to database"}, 500
        flash("review added Successfully")

    def get(self,dataset_id):
        # args = ReviewApiHandler.addreview_args.parse_args()
        # dataset_id = args.get('dataset_id')
        
        result = Review.getReview(dataset_id)
        datasets = []
        for x in result:
            datasets.append(x.json())
        return jsonify(datasets)