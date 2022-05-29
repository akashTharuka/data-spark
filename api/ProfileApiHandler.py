from flask import flash, make_response, request
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User
from models.Dataset import Dataset
from flask import jsonify

from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class ProfileApiHandler(Resource):
    register_args = reqparse.RequestParser()
    register_args.add_argument("email", type=str, help="Email is required", required=True)
    register_args.add_argument("username", type=str, help="Username is required", required=True)
    register_args.add_argument("password", type=str, help="Password is required", required=True)

    emailErr = ""
    usernameErr = ""
    passwordErr = ""
    valid = True

    @jwt_required()
    def get(self):
        user_id = get_jwt_identity()

        user = User.find_by_id(user_id) 

        if not user:
            return make_response(jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 403)

        return jsonify(email=user.email, username=user.username, userID=user.id, msg="Authorization Successfull")

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()

        user = User.find_by_id(user_id)

        if not user:
            response = make_response(jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 401)
            return response

        args = ProfileApiHandler.register_args.parse_args()

        email    = args.get("email")
        username = args.get("username")
        password = args.get("password")

        if not user.verify_password(password):
            self.passwordErr = "Authentication Error"
            response = jsonify(message=self.passwordErr)
            return response

        # if email != user.email and User.find_by_email(email):
        #     self.emailErr = "Email already exists"
        #     self.valid = False

        # if username != user.username and User.find_by_username(username):
        #     self.usernameErr = "Username already exists"
        #     self.valid = False

        # if not self.valid:
        #     response = jsonify(emailErr=self.emailErr, usernameErr=self.usernameErr)
        #     return response

        try:
            user.update(email, username)
            # print(email, username)
        except:
            response = jsonify(message="An error occured while adding user to the database")
            return response

        response = jsonify(message="", emailErr="success", usernameErr="success")
        return response






