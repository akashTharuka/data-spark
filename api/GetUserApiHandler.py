from flask import jsonify
from flask_cors import cross_origin
from flask_restful import Resource, reqparse
from models.Review import Review

from flask_jwt_extended import get_jwt_identity, jwt_required


class GetUserApiHandler(Resource):
    getUser_args = reqparse.RequestParser()
    getUser_args.add_argument("datasetID", type=str, help="datasetID is required", required=True)

    reviewed = False

    @jwt_required()
    @cross_origin()
    def post(self):
        args = GetUserApiHandler.getUser_args.parse_args()
        dataset_id = args.get("datasetID")

        user_id = get_jwt_identity()
        print(user_id, dataset_id)

        review = Review.find_added_review(user_id, dataset_id)

        if review:
            self.reviewed = True

        return jsonify(reviewed=self.reviewed)
