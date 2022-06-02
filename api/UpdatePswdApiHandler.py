from flask import flash, make_response, request
from flask_restful import Api, Resource, reqparse, abort
# abort can used when data is invalid
from models.User import User
from flask import jsonify

from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

class UpdatePswdApiHandler(Resource):
    changePwd_args = reqparse.RequestParser()
    changePwd_args.add_argument("oldPassword", type=str, help="Previous password is required", required=True)
    changePwd_args.add_argument("newPassword", type=str, help="New password is required", required=True)

    # @jwt_required()
    # def get(self):
    #     id = get_jwt_identity()

    #     user = User.find_by_id(id)

    #     if not user:
    #         return make_response(jsonify(msg="Forbidden"), 403)

    #     return jsonify(email=user.email, username=user.username)

    @jwt_required()
    def post(self):
        user_id = get_jwt_identity()

        user = User.find_by_id(user_id)

        if not user:
            response = make_response(jsonify(msg="Authorization Error: Invalid Token or Token Expired"), 401)
            return response

        args = UpdatePswdApiHandler.changePwd_args.parse_args()
        oldPassword = args.get("oldPassword")
        newPassword = args.get("newPassword")

        if not user.verify_password(oldPassword):
            response = jsonify(msg="Authentication Error")
            return response


        try:
            user.update_password(newPassword)
            # print(newPassword)
        except:
            response = jsonify(msg="An error occured while updating password")
            return response

        response = jsonify(msg="")
        return response






