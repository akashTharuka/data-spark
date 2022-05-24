from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

class GetDatasetAPIHandler(Resource):
    getDataset_args = reqparse.RequestParser()
    # searchDataset_args.add_argument("Status_id", type=str, help="Status id", required=True)

    def get(self):
        # args = GetDatasetAPIHandler.getDataset_args.parse_args()
        status_id = 1

        result = Dataset.getAllDatasets(status_id)

        datasets = []
        for dataset in result:
            datasets.append(dataset.json())

        response = jsonify(datasets=datasets)
        return response
        
