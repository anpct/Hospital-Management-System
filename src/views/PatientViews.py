from flask import request, json, Response, Blueprint, g
from ..models.PatientModel import PatientModel, PatientSchema
from ..shared.auth import Auth
from marshmallow import ValidationError

patient_api = Blueprint('patient_api', __name__)
patient_schema = PatientSchema()


@patient_api.route('/', methods=['POST'])
@Auth.auth_required
def create():
    req_data = request.get_json()
    try:
        data = patient_schema.load(req_data, partial=True)
    except ValidationError as err:
        return custom_response({'error': err.messages}, 400)
    
    patient = PatientModel(data)
    patient.save()
    ser_data = patient_schema.dump(patient)
    return custom_response(ser_data, 200)


@patient_api.route('/<int:patient_id>', methods=['DELETE'])
@Auth.auth_required
def delete(patient_id):
    patient = PatientModel.get_one_patient(patient_id)
    if not patient:
        return custom_response({'error': 'Patient not found'}, 404)
    patient.delete()
    return custom_response({'message': 'Patient deleted'}, 204)


@patient_api.route('/', methods=['GET'])
@Auth.auth_required
def get_all():
    patients = PatientModel.get_all_patients()
    data = patient_schema.dump(patients, many=True)
    return custom_response(data, 200)


@patient_api.route('/<int:patient_id>', methods=['GET'])
@Auth.auth_required
def get_one(patient_id):
    patient = PatientModel.get_one_patient(patient_id)
    if not patient:
        return custom_response({'error': 'Patient not found'}, 404)
    data = patient_schema.dump(patient)
    return custom_response(data, 200)


@patient_api.route('/<int:patient_id>', methods=['PUT'])
@Auth.auth_required
def update(patient_id):
    req_data = request.get_json()
    patient = PatientModel.get_one_patient(patient_id)
    if not patient:
        return custom_response({'error': 'Patient not found'}, 404)
    try:
        data = user_schema.load(req_data, partial=True)
    except ValidationError as err:
        return custom_response({'error': err.messages}, 400)
    patient.update(data)
    data = patient_schema.dump(patient)
    return custom_response(data, 200)    


def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )


