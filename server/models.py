from flask_sqlalchemy import SQLAlchemy
from uuid import uuid4

db = SQLAlchemy();

# returns a new unique id
def get_uuid():
    return uuid4().hex

# User Model
class User(db.Model):
    __tablename__ = "users";
    # when an id is not provided, a unique id will be assigned
    id = db.Column(db.String(32), primary_key=True, unique=True, default=get_uuid)
    # email can be 345 characters long
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.Text, nullable=False)