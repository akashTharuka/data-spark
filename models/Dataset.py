from audioop import avgpp
from turtle import title

from sqlalchemy import false
from db import db


class Dataset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    uploader_id = db.Column(db.Integer, nullable=False)
    status_id = db.Column(db.Integer,nullable=False)
    title = db.Column(db.String(50),nullable=False)
    file_path = db.Column(db.String(200),nullable=False)
    file_type = db.Column(db.String(20), nullable=True)
    file_size = db.Column(db.Double, nullable=True)
    num_downloads = db.Column(db.Integer, nullable=True)
    avg_rating = db.Column(db.Double, nullable=True)
    num_ratings = db.Column(db.Integer, nullable=True)

    def __init__(self, uploader_id, status_id, title, file_path):
        self.email = uploader_id
        self.username = status_id
        self.password = file_path

    """def json(self):
        return {'id': self.id, 'email': self.email, 'username': self.username, 'logged_flag': self.logged_flag,
                'password': self.password, 'num_uploads': self.num_uploads}"""

    @classmethod
    def addAditionals(self, status_id, file_type, file_size, num_downloads, avg_rating, num_ratings):
        self.status_id = status_id 
        self.file_type = file_type 
        self.file_size = file_size 
        self.num_downloads = num_downloads
        self.avg_rating = avg_rating 
        self.num_ratings = num_ratings
        
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.email
