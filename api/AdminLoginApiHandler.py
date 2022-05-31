import os
from flask_restful import Resource, reqparse
# abort can used when data is invalid
from flask import jsonify

from flask_jwt_extended import create_access_token


class AdminLoginApiHandler(Resource):
    login_args = reqparse.RequestParser()
    login_args.add_argument("username", type=str, help="Username is required", required=True)
    login_args.add_argument("password", type=str, help="Password is required", required=True)

    msg = ""

    def post(self):

        args = AdminLoginApiHandler.login_args.parse_args()
        username = args.get("username")
        password = args.get("password")

        ADMIN_USERNAME = os.getenv("ADMIN_USERNAME")
        ADMIN_PASSWORD = os.getenv("ADMIN_PASSWORD")
        ADMIN_IDENTITY = os.getenv("ADMIN_IDENTITY")

        if not username == ADMIN_USERNAME or not password == ADMIN_PASSWORD:
            self.msg = "Authentication Error"
            response = jsonify(msg=self.msg);
            return response


        access_token = create_access_token(identity=ADMIN_IDENTITY)
        return jsonify(access_token=access_token, msg=self.msg)

