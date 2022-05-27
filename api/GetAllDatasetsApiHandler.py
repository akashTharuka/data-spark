from sre_constants import SUCCESS
from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

class GetAllDatasetsApiHandler(Resource):
    getDataset_args = reqparse.RequestParser()

    def get(self):

        result = Dataset.getAllDatasets()

        datasets = []
        for dataset in result:
            datasets.append(dataset.json())

        response = jsonify(datasets=datasets)
        return response
        
