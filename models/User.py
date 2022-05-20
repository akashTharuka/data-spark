from db import db
from flask_login import UserMixin
from werkzeug.security import generate_password_hash, check_password_hash

class User(db.Model, UserMixin):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(50), nullable=False, unique=True)
    username = db.Column(db.String(50), nullable=False)
    logged_flag = db.Column(db.Boolean, nullable=True)
    password = db.Column(db.String(255), nullable=False)
    num_uploads = db.Column(db.Integer, nullable=True)

    def __init__(self, email, username, password):
        self.email = email
        self.username = username
        self.password = generate_password_hash(password)
        # print(self.password)
        # self.logged_flag = True
        self.num_uploads = 0

    def json(self):
        return {'id': self.id, 'email': self.email, 'username': self.username, 'logged_flag': self.logged_flag,
                'password': self.password, 'num_uploads': self.num_uploads}

    @classmethod
    def find_by_email(cls, email):
        return cls.query.filter_by(email=email).first()

    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.email

    def verify_password(self, password):
        return check_password_hash(self.password, password)
