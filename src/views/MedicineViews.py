# Imports
from flask import request, json, Response, Blueprint
from ..models.MedicineModel import MedicineModel, MedicineSchema
from ..models.MasterMedicineModel import MasterMedicineModel
from ..shared.auth import Auth
from marshmallow import ValidationError

medicine_api = Blueprint("medicine_api", __name__)
medicine_schema = MedicineSchema()


# Endpoint for creation
@medicine_api.route('/', methods=['POST'])
@Auth.auth_required
def create():

    req_data = request.get_json()
    try:
        data = medicine_schema.load(req_data)
    except ValidationError as err:
        return custom_response(err.messages, 400)

    valid = MasterMedicineModel.check_validity_and_update(data)
    if not valid:
        return custom_response({'error': 'Please enter a valid quantity'}, 404)

    medicine = MedicineModel(data)
    medicine.save()
    ser_data = medicine_schema.dump(medicine)
    return custom_response(ser_data, 200)


# Custom response
def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )
