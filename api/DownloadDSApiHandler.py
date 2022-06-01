from email import message
from flask_restful import Resource, reqparse
from flask import flash, jsonify
from flask_cors import cross_origin
from models.Dataset import Dataset

class DownloadDSApiHandler(Resource):
    download_args = reqparse.RequestParser()
    download_args.add_argument("dataset_id", type=int, help="dataset id is required", required=True)

    @cross_origin()
    def post(self):
        args = DownloadDSApiHandler.download_args.parse_args()

        dataset_id = args.get("dataset_id")
        dataset = Dataset.filter_by_id(dataset_id)
        
        if(not dataset):
            return jsonify(message="dataset not found")

        try:
            dataset.increaseDownloads()
        except:
            return jsonify(message="An error occurred increasing number of downloads")

        return jsonify(message="Successfully downloaded")