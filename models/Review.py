from db import db
from models.Dataset import Dataset


class Review(db.Model):
    id          = db.Column(db.Integer, primary_key=True)
    dataset_id  = db.Column(db.Integer, nullable=True)
    reviewer_id = db.Column(db.Integer, nullable=True)
    review      = db.Column(db.Text, nullable=True)
    rating      = db.Column(db.Integer, nullable=True)

    def __init__(self, dataset_id, reviewer_id, review, rating):
        self.dataset_id = dataset_id
        self.reviewer_id = reviewer_id
        self.review = review
        self.rating = rating

    def json(self):
        return {'id': self.id, 'dataset_id': self.dataset_id, 'reviewer_id': self.reviewer_id, 'review': self.review,
                'rating': self.rating}
        
    @classmethod
    def getReviews(self, dataset_id):
        return self.query.filter_by(dataset_id=dataset_id).all()
    
    @classmethod
    def getReview_by_id(self, review_id):
        return self.query.filter_by(id=review_id).first()

    @classmethod
    def find_added_review(self, reviewer_id, dataset_id):
        return self.query.filter_by(reviewer_id=reviewer_id, dataset_id=dataset_id).first()
    
    def save(self):
        dataset = Dataset.filter_by_id(self.dataset_id)
        total_rating = (dataset.avg_rating * dataset.num_ratings)
        dataset.avg_rating = (total_rating + self.rating)/ (dataset.num_ratings+1)
        dataset.num_ratings+=1
        db.session.add(self)
        db.session.commit()

    def update(self, review, rating):
        dataset = Dataset.filter_by_id(self.dataset_id)
        total_rating = (dataset.avg_rating * dataset.num_ratings)
        dataset.avg_rating = (total_rating - self.rating + rating)/ (dataset.num_ratings)
        self.rating = rating
        self.review = review
        db.session.commit()
    
    def delete(self):
        dataset = Dataset.filter_by_id(self.dataset_id)
        total_rating = (dataset.avg_rating * dataset.num_ratings)
        dataset.avg_rating = (total_rating - self.rating)/ (dataset.num_ratings - 1)
        dataset.num_ratings-=1
        db.session.delete(self)
        db.session.commit()

    # Create A String
    def __repr__(self):
        return '<Review %r>' % self.review
