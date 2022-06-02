from flask_restful import Resource, reqparse
from flask_jwt_extended import jwt_required
from flask_cors import cross_origin
from models.Dataset import Dataset
from flask import jsonify


class DeleteDatasetApiHandler(Resource):
    delete_args = reqparse.RequestParser()
    delete_args.add_argument("dataset_id", type=int, help="Dataset id is required", required=True)

    @jwt_required()
    @cross_origin()
    def post(self):
        args = DeleteDatasetApiHandler.delete_args.parse_args()
        dataset_id = args.get("dataset_id")

        dataset = Dataset.filter_by_id(dataset_id)

        if not dataset:
            response = jsonify(message="Dataset is not in the system")
            return response

        try:
            dataset.delete()
        except:
            response = jsonify(message="An error occurred while deleting the dataset from the database"), 500
            return response

        response = jsonify(message="Successfully deleted the dataset")
        return response
