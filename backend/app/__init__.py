from flask import Flask
from flask_cors import CORS


def create_app():
    app = Flask(__name__)

    CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000"}})

    app.config.from_object('app.config.Config')

    from app.routes import main_bp
    app.register_blueprint(main_bp, url_prefix='/api')

    return app


