from flask import flash, jsonify, send_file
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User
from models.Dataset import Dataset

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


class DownloadApiHandler(Resource):
    download_args = reqparse.RequestParser()
    download_args.add_argument("id", type=int, help="Id is required", required=True)
    

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }


    @cross_origin
    def post(self):
        args = DownloadApiHandler.download_args.parse_args()
        dataset_id = args.get("id")
        print(dataset_id)
        dataset = Dataset.filter_by_id(dataset_id)
        path = dataset.file_path
        print(path)
        return send_file(path, as_attachment=True)

        