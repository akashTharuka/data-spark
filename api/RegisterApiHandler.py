from flask import flash
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User


class RegisterApiHandler(Resource):
    register_args = reqparse.RequestParser()
    register_args.add_argument("email", type=str, help="Email is required", required=True)
    register_args.add_argument("username", type=str, help="Username is required", required=True)
    register_args.add_argument("password", type=str, help="Password is required", required=True)
    register_args.add_argument("confirmPassword", type=str, help="Confirm Password is required", required=True)

    def get(self):
        return {
            'resultStatus': 'SUCCESS',
            'message': "Register Api Handler"
        }

    def post(self):
        # print(request.json)

        args = RegisterApiHandler.register_args.parse_args()
        email = args.get("email")
        username = args.get("username")
        password = args.get("password")
        confirmPassword = args.get("confirmPassword")

        # if password != confirmPassword:
        #     return {"message": "Password is mismatching"}, 400

        if User.find_by_email(email):
            return {"message": "email already exists"}, 400

        user = User(email=email, username=username, password=password)

        try:
            user.save()
        except:
            return {"message": "An error occurred adding user to database"}, 500
        return {"message": "User added Successfully"}, 200
