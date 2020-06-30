from flask import request, json, Response, Blueprint, g
from ..models.UserModel import UserModel, UserSchema
from ..shared.auth import Auth
from marshmallow import ValidationError

user_api = Blueprint('user_api', __name__)
user_schema = UserSchema()


@user_api.route('/register', methods=['POST'])
def create():
    """
    Create User Function
    """
    req_data = request.get_json()
    try:
        data = user_schema.load(req_data)
    except ValidationError as err:
        return custom_response(err.messages, 400)
    user_in_db = UserModel.get_user_by_username(data.get('username'))
    if user_in_db:
        message = {'error': 'User already exist, please supply another username'}
        return custom_response(message, 400)

    user = UserModel(data)
    user.save()
    ser_data = user_schema.dump(user)
    token = Auth.generate_token(ser_data.get('id'))
    return custom_response({'jwt_token': token, 'user': ser_data}, 201)


@user_api.route('/me', methods=['GET'])
@Auth.auth_required
def get_me():
    """
    Get me
    """
    user = UserModel.get_one_user(g.user.get('id'))
    ser_user = user_schema.dump(user)
    return custom_response(ser_user, 200)


@user_api.route('/login', methods=['POST'])
def login():
    """
    User Login Function
    """
    req_data = request.get_json()
    try:
        data = user_schema.load(req_data, partial=True)
    except ValidationError as err:
        return custom_response(err.messages, 400)
    if not data.get('username') or not data.get('password'):
        return custom_response({'error': 'you need username and password to sign in'}, 400)
    user = UserModel.get_user_by_username(data.get('username'))
    if not user:
        return custom_response({'error': 'invalid credentials'}, 400)
    if not user.check_hash(data.get('password')):
        return custom_response({'error': 'invalid credentials'}, 400)
    ser_data = user_schema.dump(user)
    token = Auth.generate_token(ser_data.get('id'))
    return custom_response({'jwt_token': token, 'user': ser_data}, 200)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )