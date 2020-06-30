# Imports
import os

# Settings for development environment
class Development(object):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DEBUG = True
    TESTING = False
    JWT_SECRET_KEY = 'uhfiush889nkjk)(&)*(&$UHJKKFJ'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'tcs.db')
    SQLALCHEMY_TRACK_MODIFICATIONS = False


# Settings for production environment
class Production(object):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'tcs.db')
    JWT_SECRET_KEY = 'uhfiush889nkjk)(&)*(&$UHJKKFJ'
    SQLALCHEMY_TRACK_MODIFICATIONS = False



app_config = {
    'development': Development,
    'production': Production,
}
