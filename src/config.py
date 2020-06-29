import os


class Development(object):
    BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    DEBUG = True
    TESTING = False
    JWT_SECRET_KEY = 'uhfiush889nkjk)(&)*(&$UHJKKFJ'
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(BASE_DIR, 'tcs.db')


class Production(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_DATABASE_URI = os.getenv('DATABASE_URL')
    JWT_SECRET_KEY = os.getenv('JWT_SECRET_KEY')


app_config = {
    'development': Development,
    'production': Production,
}
