from email.policy import default
from flask import Flask, send_from_directory
from flask_restful import Api, Resource, reqparse
from flask_cors import CORS  # comment this on deployement
from api.RegisterApiHandler import RegisterApiHandler
from datetime import datetime
import os

from api.SearchUserHandler import SerachUserHandler

app = Flask(__name__, static_url_path='', static_folder='../client/public')
CORS(app)
api = Api(app)

# database configure
# DB_USERNAME = os.getenv('DB_USERNAME')
# DB_PASSWORD = os.getenv('DB_PASSWORD')
# DB_HOST = os.getenv('DB_HOST')
# DB_NAME = os.getenv('DB_NAME')
DB_USERNAME='root'
DB_PASSWORD=''
DB_HOST='localhost'
DB_NAME='datasparkdb'

print ("mysql+pymysql://"+str(DB_USERNAME)+":"+str(DB_PASSWORD)+"@"+str(DB_HOST)+"/"+str(DB_NAME))

app.config['SQLALCHEMY_DATABASE_URI'] = "mysql+pymysql://{}:{}@{}/{}".format(DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME)
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

api.add_resource(RegisterApiHandler, '/register')

if __name__ == "__main__":
    app.run(debug=True)
