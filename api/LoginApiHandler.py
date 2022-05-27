import json
from flask import flash, make_response
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User
from flask import jsonify

from flask_jwt_extended import create_access_token


class LoginApiHandler(Resource):
    login_args = reqparse.RequestParser()
    login_args.add_argument("email", type=str, help="Email is required", required=True)
    login_args.add_argument("password", type=str, help="Password is required", required=True)

    msg = ""

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Login Api Handler"
        }

    def post(self):

        args = LoginApiHandler.login_args.parse_args()
        email = args.get("email")
        password = args.get("password")

        user = User.find_by_email(email)

        if not user or not user.verify_password(password):
            self.msg = "Authentication error"
            response = jsonify(msg=self.msg);
            return response

        access_token = create_access_token(identity=user.id)
        return jsonify(access_token=access_token, msg=self.msg)

