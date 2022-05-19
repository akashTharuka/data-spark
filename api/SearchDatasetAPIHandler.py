from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

class SearchDatasetAPIHandler(Resource):
    register_args = reqparse.RequestParser()
    register_args.add_argument("Status_id", type=str, help="Status id", required=True)

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    def post(self,status_id):
        return Dataset.getAllDatasets(status_id)
        
