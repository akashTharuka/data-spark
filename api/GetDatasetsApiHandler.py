from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset
import os.path
from os import path

class GetDatasetsApiHandler(Resource):

    @cross_origin()
    def get(self):
        # 1 = accepted
        status_id = 1

        result = Dataset.getDatasets(status_id)

        datasets = []
        for dataset in result:
            file_name = dataset.file_name
            UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")
            target      = os.path.join(UPLOAD_FOLDER, 'test_docs')
            destination = "/".join([target, file_name])
            if not path.exists(destination):
                Dataset.deleteDataset(dataset.id)
            datasets.append(dataset.json())

        response = jsonify(datasets=datasets)
        return response
        
