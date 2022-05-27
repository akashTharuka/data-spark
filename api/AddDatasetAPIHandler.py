from flask import flash, request
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.Dataset import Dataset

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class AddDatasetApiHandler(Resource):
    addDataset_args = reqparse.RequestParser()
    addDataset_args.add_argument("uploader_id", type=int, help="Uploader id ", required=False)
    addDataset_args.add_argument("Status_id", type=int, help="Status id", required=False)
    addDataset_args.add_argument("title", type=str, help="title", required=True)
    addDataset_args.add_argument("file_path", type=str, help="filepath of the dataset", required=True)

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    def post(self):
        args = AddDatasetApiHandler.addDataset_args.parse_args()
        uploader_id = 1 #uploder id should get from the session and put it on here
        status_id = 1
        title = args.get('title')
        file_path = args.get('filepath')
        token = args.get('token')

        identity = get_jwt_identity(token);
        print(identity);

        dataset = Dataset(uploader_id=uploader_id, status_id=status_id, title=title,file_path=file_path)

        try:
            dataset.save()
        except:
            return {"message": "An error occurred adding user to database"}, 500
