from flask import Flask
from .views.UserViews import user_api as user_blueprint
from .views.PatientViews import patient_api as patient_blueprint
from .config import app_config
from .models import db


def create_app(env_name):
    app = Flask(__name__)
    db.init_app(app)
    app.config.from_object(app_config[env_name])
    app.register_blueprint(user_blueprint, url_prefix='/api/users')
    app.register_blueprint(patient_blueprint, url_prefix='/api/patients')


    @app.route('/', methods=['GET'])
    def index():
        return 'Congratulations! Your first endpoint is working'

    return app
