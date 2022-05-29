from datetime import datetime
from flask import flash, request, jsonify
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

class AddDatasetApiHandler(Resource):

    addDataset_args = reqparse.RequestParser()
    addDataset_args.add_argument("uploader_id", type=int, help="Uploader id ",location='form', required=False)
    addDataset_args.add_argument("Status_id", type=int, help="Status id", location='form', required=False)
    addDataset_args.add_argument("title", type=str, help="title", location='form', required=True)
    addDataset_args.add_argument("description", type=str, help="description", location='form', required=True)
    addDataset_args.add_argument("file", type=werkzeug.datastructures.FileStorage, help="filepath of the dataset", location='files', required=True) 
    addDataset_args.add_argument("type", type=str, help="type", location='form', required=False)
    addDataset_args.add_argument("size", type=float, help="size", location='form', required=False)

    ALLOWED_EXTENSIONS = set(['csv'])   
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")

    def allowed_file(self,filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    @jwt_required()
    @cross_origin()
    def post(self):
        args = AddDatasetApiHandler.addDataset_args.parse_args()

        identity    = get_jwt_identity()
        user        = User.find_by_id(identity)
        uploader_id = user.id
        status_id   = 2
        title       = args.get('title')
        file        = args.get('file')
        description = args.get('description')
        file_type   = args.get('type')
        file_size   = args.get('size')
        upload_time = datetime.now()
        target      = os.path.join(self.UPLOAD_FOLDER, 'test_docs') 

        if not os.path.isdir(target):
            os.mkdir(target)

        file     = request.files['file'] 
        filename = secure_filename(file.filename)
        
        if self.allowed_file(filename):  
            unique_filename = filename.rsplit('.', 1)[0].lower() + str(uuid.uuid4()) + '.' + filename.rsplit('.', 1)[1].lower()
            print(unique_filename)

            destination = "/".join([target, unique_filename])    
            file.save(destination)
            dataset = Dataset(uploader_id=uploader_id, status_id=status_id, title=title, file_path=destination,description=description, file_type=file_type, file_size=file_size, upload_time=upload_time)
        else:
            return jsonify(message="Unsuitable file type")

        try:
            dataset.save() 
        except:
            return jsonify(message="An error occurred adding user to database", titleErr="failed", descErr="failed",filepathErr="failed"), 500
                
        response = jsonify(message="User added successfully", titleErr="success", desErr="success",filepathErr="success")
        return response