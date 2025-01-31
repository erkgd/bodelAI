from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
import gridfs

# Inicialización de extensiones
mongo = PyMongo()
fs = None  # Se inicializará más tarde con GridFS

def create_app():
    app = Flask(__name__)
    app.config["MONGO_URI"] = "mongodb://localhost:27017/videos_db"  # Configuración de MongoDB

    # Configuración de CORS
    CORS(app)

    # Inicialización de la base de datos
    mongo.init_app(app)
    
    # Inicializar GridFS
    global fs
    fs = gridfs.GridFS(mongo.db)

    # Registro de blueprints
    from app.routes.api import api_blueprint
    app.register_blueprint(api_blueprint, url_prefix='/api')

    return app
