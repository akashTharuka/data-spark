import json
import os
from flask import jsonify
from flask_restful import Resource, reqparse
from flask_jwt_extended import get_jwt_identity, jwt_required

class AuthenticateApiHandler(Resource):
    authenticate_args = reqparse.RequestParser()

    @jwt_required()
    def get(self):
        print("here in authentication api handler")
        return jsonify(valid=True)
