import os
from flask import jsonify
from flask_cors import cross_origin
from flask_restful import Resource, reqparse
# abort can used when data is invalid
from models.Dataset import Dataset

from flask_jwt_extended import get_jwt_identity, jwt_required

class GetAllDatasetsApiHandler(Resource):
    getDataset_args = reqparse.RequestParser()

    @jwt_required()
    @cross_origin()
    def get(self):

        identity = get_jwt_identity()

        if not identity or identity != os.getenv('ADMIN_IDENTITY'):
            return jsonify(valid=False, msg="Invalid Token")

        result = Dataset.getAllDatasets()

        datasets = []
        for dataset in result:
            datasets.append(dataset.json())

        response = jsonify(datasets=datasets, valid=True, msg="Authentication Successfull")
        return response
        
