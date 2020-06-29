from marshmallow import fields, Schema
import datetime
from . import db
from marshmallow.validate import Length, Regexp

class PatientModel(db.Model):
    
    __tablename__ = 'patients'
    id = db.Column(db.Integer, primary_key=True)
    ssn = db.Column(db.Integer, nullable=False, unique=True)
    name = db.Column(db.String(128), nullable=False)
    age = db.Column(db.Integer, nullable=False)
    admited_on = db.Column(db.DateTime)
    type_of_bed = db.Column(db.String(128), nullable=False)
    address = db.Column(db.String(1000), nullable=False)
    state = db.Column(db.String(255), nullable=False)
    city = db.Column(db.String(255), nullable=False)

    def __init__(self, data):
        self.ssn = data.get('ssn')
        self.name = data.get('name')
        self.age = data.get('age')
        self.admited_on = datetime.datetime.utcnow()
        self.type_of_bed = data.get('type_of_bed')
        self.address = data.get('address')
        self.state = data.get('state')
        self.city = data.get('city')

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    def update(self, data):
        for key, item in data.items():
            setattr(self, key, item)
        db.session.commit()

    @staticmethod
    def get_one_patient(id):
        return PatientModel.query.get(id)
    
    @staticmethod
    def get_all_patients():
        return PatientModel.query.all()


class PatientSchema(Schema):
    id = fields.Integer(dump_only=True)
    ssn = fields.Integer(required=True, validate=Length(equal=9))
    name = fields.String(required=True, validate=Regexp(regex="^[a-zA-Z ]*$"))
    age = fields.Integer(required=True, validate=Length(min=1, max=3))
    admited_on = fields.DateTime(required=True)
    type_of_bed = fields.String(required=True)
    address = fields.String(required=True)
    state = fields.String(required=True)
    city = fields.String(required=True)


