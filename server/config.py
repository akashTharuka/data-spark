# separate configuration file

from dotenv import load_dotenv
import os

load_dotenv()

class ApplicationConfig:
    SECRET_KEY = os.environ["SECRET_KEY"]
    # stops logging useless messages
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # everytime you run the database, logs what is happening in the database
    SQLALCHEMY_ECHO = True
    # raw string
    SQLALCHEMY_DATABASE_URI = r"sqlite:///./db.sqlite"