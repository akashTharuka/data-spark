from db import db


class DatasetStatus(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(10), nullable=False)

    def __repr__(self):
        return '<Status %r>' % self.name
