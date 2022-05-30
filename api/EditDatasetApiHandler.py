from datetime import datetime
from flask import flash, request, jsonify, make_response
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from flask_cors import cross_origin
from models.Dataset import Dataset
from models.User import User
import os
import werkzeug
from werkzeug.utils import secure_filename
import uuid

from flask_jwt_extended import get_jwt_identity, jwt_required

class EditDatasetApiHandler(Resource):

    editDataset_args = reqparse.RequestParser()
    editDataset_args.add_argument("dataset_id", type=int, help="Dataset id ",location='form', required=True)
    editDataset_args.add_argument("title", type=str, help="title", location='form', required=True)
    editDataset_args.add_argument("description", type=str, help="description", location='form', required=True)

    @jwt_required()
    @cross_origin()
    def post(self):
        args = EditDatasetApiHandler.editDataset_args.parse_args()

        dataset_id = args.get('dataset_id')
        title       = args.get('title')
        description = args.get('description')
        upload_time = datetime.now()
        
        dataset = Dataset.filter_by_id(dataset_id)
        
        if not dataset:
            response = make_response(jsonify(msg="Data not found: dataset not foound"), 404)
            return response

        
        identity    = get_jwt_identity()
        user        = User.find_by_id(identity)
        if not user:
            response = make_response(jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 401)
            return response

        if dataset.uploader_id != identity:
            response = make_response(jsonify(msg="Access denied: user cannot edit dataset"), 403)
            return response

        try:
            dataset.edit(title,description, upload_time)
        except:
            return jsonify(message="An error occurred Editing Dataset"), 500
                
        response = jsonify(message="Dataset Updated successfully")
        return response