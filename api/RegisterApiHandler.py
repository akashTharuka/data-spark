from flask import flash
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User

class RegisterApiHandler(Resource):
    register_args = reqparse.RequestParser()
    register_args.add_argument("email", type=str, help="Email", required=True)
    register_args.add_argument("username", type=str, help="Username", required=True)
    register_args.add_argument("password", type=str, help="Password", required=True)
    register_args.add_argument("confirmPassword", type=str, help="Confirm Password", required=True)

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

        user = User(email=email, username=username, password=password)

        try:
            user.save()
        except:
            return {"message": "An error occurred adding user to database"}, 500
        flash("User added Successfully")
