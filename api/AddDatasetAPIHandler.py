from datetime import datetime
from flask import request, jsonify
from flask_restful import Resource, reqparse
# abort can used when data is invalid
from flask_cors import cross_origin
from models.Dataset import Dataset
from models.User import User
import os

from flask_jwt_extended import get_jwt_identity, jwt_required

class AddDatasetApiHandler(Resource):

    addDataset_args = reqparse.RequestParser()
    addDataset_args.add_argument("uploader_id", type=int, help="Uploader id is required", required=False)
    # addDataset_args.add_argument("Status_id", type=int, help="Status id is required", location='form', required=False)
    addDataset_args.add_argument("dataset_title", type=str, help="title is required", required=False)
    addDataset_args.add_argument("description", type=str, help="description is required", required=False)
    # addDataset_args.add_argument("file", type=werkzeug.datastructures.FileStorage, help="filepath of the dataset", location='files', required=True) 
    addDataset_args.add_argument("type", type=str, help="type is required", required=False)
    addDataset_args.add_argument("size", type=float, help="size required", required=False)
    addDataset_args.add_argument("download_url", type=str, help="downlod url is required", required=False)
    addDataset_args.add_argument("file_extension", type=str, help="file extension is required", required=False)

    ALLOWED_EXTENSIONS = set(['csv'])   
    UPLOAD_FOLDER = os.getenv("UPLOAD_FOLDER")

    def allowed_file(self,file_extension):
        # return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS
        return file_extension in self.ALLOWED_EXTENSIONS

    @jwt_required()
    @cross_origin()
    def post(self):
        args = AddDatasetApiHandler.addDataset_args.parse_args()

        identity    = get_jwt_identity()
        user        = User.find_by_id(identity)
        uploader_id = user.id
        status_id   = 2
        title       = args.get('dataset_title')
        # file        = args.get('file')
        description = args.get('description')
        file_type   = args.get('type')
        file_size   = args.get('size')
        upload_time = datetime.now()
        # target      = os.path.join(self.UPLOAD_FOLDER, 'test_docs') 

        download_url = args.get("download_url")
        file_extension = args.get("file_extension")

        print(download_url)

        # if not os.path.isdir(target):
        #     os.mkdir(target)

        # file     = request.files['file'] 
        # filename = secure_filename(file.filename)
        
        if self.allowed_file(file_extension):  
            # unique_filename = filename.rsplit('.', 1)[0].lower() + str(uuid.uuid4()) + '.' + filename.rsplit('.', 1)[1].lower()
            # print(unique_filename)

            # destination = "/".join([target, unique_filename])    
            # file.save(destination)
            print(uploader_id, status_id, title, download_url, description, file_type, file_size, upload_time)
            dataset = Dataset(uploader_id=uploader_id, status_id=status_id, title=title, file_path=download_url,description=description, file_type=file_type, file_size=file_size, upload_time=upload_time)
        else:
            return jsonify(message="Unsuitable file type")

        print(dataset)
        try:
            dataset.save() 
        except:
            return jsonify(message="An error occurred adding user to database", titleErr="failed", descErr="failed",filepathErr="failed"), 500
                
        response = jsonify(message="User added successfully", titleErr="success", desErr="success",filepathErr="success")
        return response