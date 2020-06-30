from flask import json, Response, Blueprint, request
from ..models.DiagnosticsModel import DiagnosticsModel, DiagnosticsSchema
from ..shared.auth import Auth
from marshmallow import ValidationError


diagnostics_api = Blueprint('diagnostics_api', __name__)
diagnostics_schema = DiagnosticsSchema()


@diagnostics_api.route('/', methods=['POST'])
@Auth.auth_required
def create():
    req_data = request.get_json()
    try:
        data = diagnostics_schema.load(req_data)
    except ValidationError as err:
        return custom_response(err.messages, 404)
    diagnostics = DiagnosticsModel(data)
    diagnostics.save()
    ser_data = diagnostics_schema.dump(diagnostics)
    return custom_response(ser_data, 200)


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )