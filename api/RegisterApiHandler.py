import json
from flask import flash, jsonify
from flask_cors import cross_origin
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User

from flask_jwt_extended import create_access_token, get_jwt_identity, jwt_required


class RegisterApiHandler(Resource):
    register_args = reqparse.RequestParser()
    register_args.add_argument("email", type=str, help="Email is required", required=True)
    register_args.add_argument("username", type=str, help="Username is required", required=True)
    register_args.add_argument("password", type=str, help="Password is required", required=True)

    emailErr = ""
    usernameErr = ""
    valid = True

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    @cross_origin()
    def post(self):
        args = RegisterApiHandler.register_args.parse_args()
        email = args.get("email")
        username = args.get("username")
        password = args.get("password")

        if User.find_by_email(email):
            self.emailErr = "Email already exists"
            self.valid = False

        if User.find_by_username(username):
            self.usernameErr = "Username already exists"
            self.valid = False

        if not self.valid:
            response = jsonify(emailErr=self.emailErr, usernameErr=self.usernameErr)
            return response

        user = User(email=email, username=username, password=password)

        try:
            user.save()
        except:
            response = jsonify(message="An error occured while adding user to the database")
            return response

        access_token = create_access_token(identity=user.id)
        response = jsonify(access_token=access_token, message="User added successfully", emailErr="success", usernameErr="success")
        return response
