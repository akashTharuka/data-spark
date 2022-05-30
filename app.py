from email.policy import default
from flask import Flask, send_from_directory, request, send_file
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin
from api.EditDatasetApiHandler import EditDatasetApiHandler
from api.GetAllDatasetsApiHandler import GetAllDatasetsApiHandler
from api.GetUserApiHandler import GetUserApiHandler
from api.RegisterApiHandler import RegisterApiHandler
from api.LoginApiHandler import LoginApiHandler
from api.AdminLoginApiHandler import AdminLoginApiHandler
from api.ProfileApiHandler import ProfileApiHandler
# from api.ProfileApiHandler import ProfileApiHandler
from datetime import datetime
from api.DatasetStatusApiHandler import DatasetStatusApiHandler
from api.EditDatasetApiHandler import EditDatasetApiHandler
from api.AddDatasetAPIHandler import AddDatasetApiHandler
# from api.SearchDatasetAPIHandler import SearchDatasetAPIHandler
from api.DeleteDatasetApiHandler import DeleteDatasetApiHandler

from api.GetDatasetDetailsApiHandler import GetDatasetDetailsApiHandler
from api.GetDatasetsApiHandler import GetDatasetsApiHandler
from api.ReviewApiHandler import ReviewApiHandler
from api.UpdatePswdApiHandler import UpdatePswdApiHandler
from dotenv import load_dotenv

from models.Dataset import Dataset

from flask_jwt_extended import JWTManager

load_dotenv()

import os

app = Flask(__name__, static_url_path='', static_folder='../client/public')
CORS(app) #, expose_headers='Authorization'
api = Api(app)

app.config['JWT_TOKEN_LOCATION'] = ['headers']
# Setup the Flask-JWT-Extended extension
app.config["JWT_SECRET_KEY"] = os.getenv("JWT_SECRET_KEY")
# app.config['CORS_HEADERS'] = 'Content-Type'
jwt = JWTManager(app)

# database configure
DB_USERNAME = os.getenv('DB_USERNAME')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_NAME = os.getenv('DB_NAME')

app.config[
    'SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://' + DB_USERNAME + ':' + DB_PASSWORD + '@' + DB_HOST + '/' + DB_NAME
# app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://{}:{}@{}/{}".format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = os.getenv("SECRET_KEY")


@app.before_first_request
def create_tables():
    from db import db
    db.init_app(app)
    db.create_all()


@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

@app.route("/files/<dataset_id>")
def get_file(dataset_id):
    dataset = Dataset.filter_by_id(dataset_id)
    Dataset.increaseDownloads(dataset_id)
    path = dataset.file_path
    return send_file(path, as_attachment=True)


api.add_resource(RegisterApiHandler, '/register')
api.add_resource(AddDatasetApiHandler, '/addDataSet')
api.add_resource(GetDatasetsApiHandler, '/getDatasets')
api.add_resource(GetAllDatasetsApiHandler, '/getAllDatasets')
api.add_resource(LoginApiHandler, '/login')
api.add_resource(AdminLoginApiHandler, '/adminlogin')
api.add_resource(ReviewApiHandler, '/review')
api.add_resource(GetDatasetDetailsApiHandler, '/getDatasetDetails')
api.add_resource(ProfileApiHandler, '/profile')
api.add_resource(UpdatePswdApiHandler,'/updatePassword')
api.add_resource(GetUserApiHandler, '/getUser')
api.add_resource(DatasetStatusApiHandler, '/changeStatus')
api.add_resource(EditDatasetApiHandler, '/updateDataSet')
api.add_resource(DeleteDatasetApiHandler, '/deleteDataset')

if __name__ == "__main__":
    app.run(debug=True)

