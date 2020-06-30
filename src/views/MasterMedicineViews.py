from ..models.MasterMedicineModel import MasterMedicineModel, MasterMedicineSchema
from  flask import Response, json, Blueprint
from marshmallow import ValidationError
from ..shared.auth import Auth

master_medicine_api = Blueprint('master_medicine_api', __name__)
master_medinine_schema = MasterMedicineSchema


@master_medicine_api.route('/', methods=['POST'])
@Auth.auth_required
def create():
    req_data = request.get_json()
    try:
        data = MasterMedicineSchema.load(req_data)
    except ValidationError as err:
        return custom_response(err.messages, 200)
    master_medicine = MasterMedicineModel(data)
    master_medicine.save()
    res_data = master_medicine_schema.dump(master_medicine)
    return custom_response(res_data, 200)


@master_medicine_api.route('/', methods=['GET'])
@Auth.auth_required
def get_medicine():
    data = MasterMedicineModel.get_all_medicines_available()
    res_data = master_medinine_schema.dump(data, many=True)
    return custom_response(res_data, 200)

def custom_response(res, status_code):
    """
    Custom Response Function
    """
    return Response(
        mimetype="application/json",
        response=json.dumps(res),
        status=status_code
    )


