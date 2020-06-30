from flask import Flask
from .views.UserViews import user_api as user_blueprint
from .views.PatientViews import patient_api as patient_blueprint
from .views.MedicineViews import medicine_api as medicine_blueprint
from .views.MasterMedicineViews import master_medicine_api as master_medicine_blueprint
from .views.DiagnosticsViews import diagnostics_api as diagnostics_blueprint
from .config import app_config
from .models import db


def create_app(env_name):
    app = Flask(__name__)
    db.init_app(app)
    app.config.from_object(app_config[env_name])
    app.register_blueprint(user_blueprint, url_prefix='/api/users')
    app.register_blueprint(patient_blueprint, url_prefix='/api/patients')
    app.register_blueprint(medicine_blueprint, url_prefix='/api/medicine')
    app.register_blueprint(diagnostics_blueprint, url_prefix='/api/diagnostics')
    app.register_blueprint(master_medicine_blueprint, url_prefix='/api/master-medicine')

    @app.route('/', methods=['GET'])
    def index():
        return 'Congratulations! Your first endpoint is working'

    return app
