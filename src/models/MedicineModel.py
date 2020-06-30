from . import db
from marshmallow import fields, Schema, validates, ValidationError
from marshmallow.validate import Length, Regexp


class MedicineModel(db.Model):

    __tablename__ = "medicines"

    id = db.Column(db.Integer, primary_key=True)
    medicine_id = db.Column(db.Integer, db.ForeignKey('master_medicine.id'), nullable=False)
    name = db.Column(db.String(128), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    patient = db.Column(db.Integer, db.ForeignKey('patients.id'), nullable=False)

    def __init___(self, data):
        self.name = data.get('name')
        self.quantity = data.get('quantity')
    
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


class MedicineSchema(Schema):

    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=Regexp(regex=r'^[a-zA-Z ]+$', error="Name must conatin only alphabets"))
    quantity = fields.Integer(required=True)
    patient = fields.Integer(required=True)