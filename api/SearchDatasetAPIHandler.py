from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

class SearchDatasetAPIHandler(Resource):
    searchDataset_args = reqparse.RequestParser()
    # searchDataset_args.add_argument("Status_id", type=str, help="Status id", required=True)
    
    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    def post(self):
        args = SearchDatasetAPIHandler.searchDataset_args.parse_args()
        status_id = 1

        result = Dataset.getAllDatasets(status_id)
        datasets = []
        for x in result:
            datasets.append(x.json())
        return jsonify(datasets)
        
