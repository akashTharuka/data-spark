from flask import flash, request, jsonify
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from flask_cors import cross_origin
from models.Dataset import Dataset
from models.User import User
import os
import werkzeug
from werkzeug.utils import secure_filename

from flask_jwt_extended import get_jwt_identity, jwt_required

class AddDatasetApiHandler(Resource):

    addDataset_args = reqparse.RequestParser()
    addDataset_args.add_argument("uploader_id", type=int, help="Uploader id ",location='form', required=False)
    addDataset_args.add_argument("Status_id", type=int, help="Status id", location='form', required=False)
    addDataset_args.add_argument("title", type=str, help="title", location='form', required=True)
    addDataset_args.add_argument("description", type=str, help="description", location='form', required=True)
    addDataset_args.add_argument("file", type=werkzeug.datastructures.FileStorage, help="filepath of the dataset", location='files', required=True) 

    ALLOWED_EXTENSIONS = set(['csv'])
    UPLOAD_FOLDER = 'C:\Projects\data-spark/api\datasets'

    def allowed_file(self,filename):
        return '.' in filename and filename.rsplit('.', 1)[1].lower() in self.ALLOWED_EXTENSIONS

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    @jwt_required()
    @cross_origin()
    def post(self):

        identity = get_jwt_identity()
        user = User.find_by_id(identity)

        args = AddDatasetApiHandler.addDataset_args.parse_args()
        uploader_id = user.id #uploder id should get from the session and put it on here
        status_id = 2
        title = args.get('title')
        file = args.get('file')
        description = args.get('description')
        token = args.get('token')
        file_type = args.get('type')
        file_size = args.get('size')
        # identity = get_jwt_identity(token);
        # print(identity);
        target=os.path.join(self.UPLOAD_FOLDER,'test_docs')
        if not os.path.isdir(target):
            os.mkdir(target)
        file = request.files['file'] 
        filename = secure_filename(file.filename)
        destination="/".join([target, filename])
        
        if self.allowed_file(filename):            
            file.save(destination)
            dataset = Dataset(uploader_id=uploader_id, status_id=status_id, title=title, file_path=destination,description=description, file_type=file_type, file_size=file_size)
        else:
            return jsonify(message="Unsuitable file type")
        

        try:
            dataset.save() 
        except:
            return jsonify(message="An error occurred adding user to database", titleErr="failed", descErr="failed",filepathErr="failed"), 500
                
        response = jsonify(message="User added successfully", titleErr="success", desErr="success",filepathErr="success")
        return response