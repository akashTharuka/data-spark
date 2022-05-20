from email.policy import default
from flask import Flask, send_from_directory, request
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployement
from api.RegisterApiHandler import RegisterApiHandler
from api.LoginApiHandler import LoginApiHandler
from datetime import datetime

from dotenv import load_dotenv

load_dotenv()

import os

app = Flask(__name__, static_url_path='', static_folder='../client/public')
CORS(app)
api = Api(app)

# database configure
DB_USERNAME = os.getenv("DB_USERNAME")
DB_PASSWORD = os.getenv("DB_PASSWORD")
DB_HOST = os.getenv("DB_HOST")
DB_NAME = os.getenv("DB_NAME")

# print(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)

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


# @app.route('/register', methods=['POST', 'GET'])
# def register():
#     print(request.json);

# @app.route('/login', methods=['POST', 'GET'])
# def login():
#     print(request.json)


api.add_resource(RegisterApiHandler, '/register')
api.add_resource(LoginApiHandler, '/login')

if __name__ == "__main__":
    app.run(debug=True)
