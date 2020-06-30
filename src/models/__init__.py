from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()
from .UserModel import UserModel, UserSchema
from .PatientModel import PatientModel, PatientSchema
from .MedicineModel import MedicineSchema, MedicineModel
from .DiagnosticsModel import DiagnosticsModel, DiagnosticsSchema
from .MasterMedicineModel import MasterMedicineModel, MasterMedicineSchema