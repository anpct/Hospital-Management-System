# Imports
import os
from flask_script import Manager, Server
from flask_migrate import Migrate, MigrateCommand

from src.app import create_app, db

# Selecting environmet
env_name = 'production'
app = create_app(env_name)

migrate = Migrate(app=app, db=db) # Registering database

manager = Manager(app=app) # Registering app

manager.add_command('db', MigrateCommand) # Adding commands
manager.add_command("runserver", Server(threaded=True))

if __name__ == '__main__':
  manager.run()