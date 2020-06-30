from . import db
from marshmallow import fields, Schema, validates, ValidationError
from marshmallow.validate import Length, Regexp
from .MasterDiagnosticsModel import MasterDiagnosticsSchema

class DiagnosticsModel(db.Model):

    __tablename__ = "diagnostics"

    id = db.Column(db.Integer, primary_key=True)
    diagnostic = db.Column(db.Integer, db.ForeignKey('master_diagnostics.id'), nullable=False)
    patient = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    def __init__(self, data):
        self.name = data.get('name')
        self.diagnostic = data.get('diagnostic')
        self.patient = data.get('patient')
    
    def save(self):
        db.session.add(self)
        db.session.commit()
    
    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()
    
    def delete(self):
        db.session.delete(self) 
        db.session.commit()


class DiagnosticsSchema(Schema):
    diagnostic = fields.Integer(required=True)
    id = fields.Integer(dump_only=True)
    patient = fields.Integer(required=True)
    diagnostics = fields.Nested(MasterDiagnosticsSchema, many=True)