from email.policy import default
from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS, cross_origin  # comment this on deployement
from api.RegisterApiHandler import RegisterApiHandler
from api.LoginApiHandler import LoginApiHandler
from api.ProfileApiHandler import ProfileApiHandler
# from api.ProfileApiHandler import ProfileApiHandler
from datetime import datetime

from api.AddDatasetAPIHandler import AddDatasetApiHandler
# from api.SearchDatasetAPIHandler import SearchDatasetAPIHandler
from api.ViewDatasetDetailsApiHandler import ViewDatasetDetailsApiHandler
from api.AddReviewApiHandler import AddReviewApiHandler
from api.GetDatasetDetailsApiHandler import GetDatasetDetailsApiHandler
from api.GetDatasetAPIHandler import GetDatasetAPIHandler
from dotenv import load_dotenv

from flask_jwt_extended import JWTManager

load_dotenv()

import os

app = Flask(__name__, static_url_path='', static_folder='../client/public')
CORS(app)
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

app.secret_key = "secret"


@app.before_first_request
def create_tables():
    from db import db
    db.init_app(app)
    db.create_all()


@app.route('/', defaults={'path': ''})
def serve(path):
    return send_from_directory(app.static_folder, 'index.html')

api.add_resource(RegisterApiHandler, '/register')
api.add_resource(AddDatasetApiHandler, '/addDataSet')
api.add_resource(GetDatasetAPIHandler, '/getDataset')
api.add_resource(LoginApiHandler, '/login')
api.add_resource(ViewDatasetDetailsApiHandler, '/viewDetails')
api.add_resource(AddReviewApiHandler, '/addReview')
api.add_resource(GetDatasetDetailsApiHandler, '/getDatasetDetails')
api.add_resource(ProfileApiHandler, '/profile')

if __name__ == "__main__":
    app.run(debug=True)
