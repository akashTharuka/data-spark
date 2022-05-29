from sqlalchemy import false, ForeignKey
from db import db

class Dataset(db.Model):
    # __tablename__ = "dataset"
    id              = db.Column(db.Integer, primary_key=True)
    uploader_id     = db.Column(db.Integer, nullable=False)
    status_id       = db.Column(db.Integer, nullable=False)
    title           = db.Column(db.String(50),nullable=False)
    description     = db.Column(db.Text, nullable=False)
    file_path       = db.Column(db.Text,nullable=False) #String(200)
    file_type       = db.Column(db.String(20), nullable=True)
    file_size       = db.Column(db.Float, nullable=True)
    num_downloads   = db.Column(db.Integer, nullable=True, default = 0)
    avg_rating      = db.Column(db.Float, nullable=True, default = 0.0)
    num_ratings     = db.Column(db.Integer, nullable=True, default = 0)
    category        = db.Column(db.String(50), nullable=True)
    upload_time     = db.Column(db.DateTime(timezone=False), nullable=True)

    def __init__(self, uploader_id, status_id, title, file_path, description, file_type, file_size,upload_time):        
        self.uploader_id = uploader_id
        self.status_id = status_id
        self.title = title
        self.file_path = file_path
        self.description = description 
        self.file_type = file_type 
        self.file_size = file_size 
        self.upload_time = upload_time

    def json(self):
        return {'id': self.id, 
                'uploader_id': self.uploader_id, 
                'status_id': self.status_id, 
                'title': self.title,
                'description': self.description,
                'file_path': self.file_path, 
                'file_type': self.file_type, 
                'file_size': self.file_size, 
                'num_downloads': self.num_downloads, 
                'avg_rating': self.avg_rating, 
                'num_ratings': self.num_ratings,
                'category': self.category,
                'upload_time': self.upload_time}

    @classmethod
    def addAditionals(self, status_id, file_type, file_size, num_downloads, avg_rating, num_ratings):
        self.status_id = status_id 
        self.file_type = file_type 
        self.file_size = file_size 
        self.num_downloads = num_downloads
        self.avg_rating = avg_rating 
        self.num_ratings = num_ratings
        
    @classmethod
    def getDatasets(self, status_id):
        return self.query.filter_by(status_id=status_id).all()

    @classmethod
    def getAllDatasets(self):
        return self.query.all()
    
    @classmethod
    def filter_by_id(self, dataset_id):
        return self.query.filter_by(id=dataset_id).first()

    @classmethod
    def increaseDownloads(self, dataset_id):
        dataset = self.query.filter_by(id=dataset_id).first()
        dataset.num_downloads += 1
        db.session.commit()
    
    def save(self):
        db.session.add(self)
        db.session.commit()
        # print("Description: - "  + self.description)

    def update_status(self, status_id):
        self.status_id = status_id
        db.session.commit()

    def delete(self):
        db.session.delete(self)
        db.session.commit()
    

    # Create A String
    def __repr__(self):
        return '<Title %r>' % self.title

