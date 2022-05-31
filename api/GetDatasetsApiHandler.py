from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

class GetDatasetsApiHandler(Resource):

    @cross_origin()
    def get(self):
        # 1 = accepted
        status_id = 1

        result = Dataset.getDatasets(status_id)

        datasets = []
        for dataset in result:
            datasets.append(dataset.json())

        response = jsonify(datasets=datasets)
        return response
        
