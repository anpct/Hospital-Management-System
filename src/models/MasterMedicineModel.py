from . import db
from marshmallow import fields, Schema, validates, ValidationError
from marshmallow.validate import Length, Regexp


class MasterMedicineModel(db.Model):

    __tablename__="master_medicine"

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(128), nullable=False)
    quantity = db.Column(db.Integer, nullable=False)
    rate = db.Column(db.Integer, nullable=False)

    def __init__(self, data):
        self.name = data.get('name')
        self.quantity = data.get('quantity')
        self.rate = data.get('rate')
    
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
    
    @staticmethod
    def get_all_medicines_available():
        return MasterMedicineModel.query.all()



class MasterMedicineSchema(Schema):
    id = fields.Integer(dump_only=True)
    name = fields.String(required=True, validate=Regexp(regex=r'^[a-zA-Z ]+$', error='Please enter a valid name'))
    quantity = fields.Integer(required=True)
    rate = fields.Integer(required=True)