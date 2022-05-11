from flask import Flask, jsonify, request, jsonify
from flask_bcrypt import Bcrypt
from config import ApplicationConfig
from models import db, User

app = Flask(__name__);
app.config.from_object(ApplicationConfig)

bcrypt = Bcrypt(app)

# initialize the application instance
db.init_app(app)

with app.app_context():
    db.create_all()

@app.route("/register")
def register_user():
    email = request.json["email"]
    password = request.json["password"]

    user_exists = User.query.filter_by(email=email).first() is not None

    hashed_password = bcrypt.generate_password_hash(password)
    new_user = User(email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    return jsonify({
        "id": new_user.id,
        "email": new_user.email
    })

if __name__ == "__main__":
    app.run(debug=True)