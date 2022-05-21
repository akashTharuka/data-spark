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
    file_size = db.Column(db.Float, nullable=True)
    num_downloads = db.Column(db.Integer, nullable=True)
    avg_rating = db.Column(db.Float, nullable=True)
    num_ratings = db.Column(db.Integer, nullable=True)

    def __init__(self, uploader_id, status_id, title, file_path):
        self.uploader_id = uploader_id
        self.status_id = status_id
        self.title = title
        self.file_path = file_path

    def json(self):
        return {'id': self.id, 'uploader_id': self.uploader_id, 'status_id': self.status_id, 'title': self.title,
                'file_path': self.file_path, 'file_type': self.file_type, 'file_size': self.file_size, 
                'num_downloads': self.num_downloads, 'avg_rating': self.avg_rating, 'num_ratings': self.num_ratings}

    @classmethod
    def addAditionals(self, status_id, file_type, file_size, num_downloads, avg_rating, num_ratings):
        self.status_id = status_id 
        self.file_type = file_type 
        self.file_size = file_size 
        self.num_downloads = num_downloads
        self.avg_rating = avg_rating 
        self.num_ratings = num_ratings
        
    @classmethod
    def getAllDatasets(self,status_id):
        return self.query.filter_by(status_id=status_id).all()
    
    @classmethod
    def filter_by_Catogary(self,status_id,filter_id):
        return self.query.filter_by(status_id=status_id,filter_id=filter_id).all()
    
    # @classmethod
    # def filter_by_filetype(self,status_id, file_type):
    #     return self.query.filter_by(status_id=status_id,file_type=file_type).all()
    
    # @classmethod
    # def filter_by_filetype_and_catogary(self,status_id,filter_id, file_type):
    #     return self.query.filter_by(status_id=status_id,filter_id=filter_id, file_type=file_type).all()
    
    def save(self):
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.email
