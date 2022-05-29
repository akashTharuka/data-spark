from models.Dataset import Dataset
from flask_restful import Resource, reqparse
from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required
from flask_cors import cross_origin
from flask import jsonify

class DatasetStatusApiHandler(Resource):
    dataset_args = reqparse.RequestParser()
    dataset_args.add_argument("dataset_id", type=int, help="Dataset id is required", required=True)
    dataset_args.add_argument("category", type=str, help="Category is required", required=False)

    @jwt_required()
    @cross_origin()
    def put(self):
        args = DatasetStatusApiHandler.dataset_args.parse_args()
        dataset_id = args.get("dataset_id")
        category = args.get("category")
        dataset = Dataset.filter_by_id(dataset_id)

        try:
            dataset.update_dataset(1, category)
        except:
            response = jsonify(message="An error occured while updating the status"), 401
            return response

        response = jsonify(message="Status updated successfully", valid=True)
        return response

    @jwt_required()
    @cross_origin()
    def post(self):
        args = DatasetStatusApiHandler.dataset_args.parse_args()

        dataset_id = args.get("dataset_id")
        dataset = Dataset.filter_by_id(dataset_id)

        try:
            dataset.delete()
        except:
            response = jsonify(message="An error occured while Deleting the database"), 401
            return response

        response = jsonify(message="Dataset Deleted Successfully", valid=True)
        return response