from audioop import avg, avgpp
from turtle import title
from unittest import result

from sqlalchemy import false
from db import db
from models.Dataset import Dataset


class Review(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    dataset_id  = db.Column(db.Integer, nullable=True)
    reviewer_id = db.Column(db.Integer,nullable=True)
    review      = db.Column(db.String(50),nullable=True)
    rating      = db.Column(db.String(200),nullable=True)

    def __init__(self, dataset_id, reviewer_id, review, rating):
        self.dataset_id = dataset_id
        self.reviewer_id = reviewer_id
        self.review = review
        self.rating = rating

    def json(self):
        return {'id': self.id, 'uploader_id': self.dataset_id, 'status_id': self.reviewer_id, 'title': self.review,
                'file_path': self.rating}
        
    @classmethod
    def getReview(self,dataset_id):
        return self.query.filter_by(dataset_id=dataset_id).all()
    
    def save(self):
        dataset = Dataset.filter_by_id(self.dataset_id)
        dataset.avg_rating = (dataset.avg_rating * dataset.num_ratings + self.rating)/ (dataset.num_ratings+1)
        dataset.num_ratings+=1
        db.session.add(self)
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    
    

    # Create A String
    def __repr__(self):
        return '<Name %r>' % self.email
