from flask import Blueprint, request, jsonify, send_file
import gridfs
import io
from app import mongo, fs

api_blueprint = Blueprint("api", __name__)

@api_blueprint.route('/upload', methods=['POST'])
def upload_video():
    """Sube un video a MongoDB usando GridFS"""
    if 'video' not in request.files:
        return jsonify({"error": "No se envió ningún archivo"}), 400

    file = request.files['video']
    file_id = fs.put(file, filename=file.filename)

    video_data = {
        "video_id": str(file_id),
        "filename": file.filename,
        "content_type": file.content_type
    }
    mongo.db.videos.insert_one(video_data)

    return jsonify({"message": "Video subido con éxito", "video_id": str(file_id)})

@api_blueprint.route('/video/<video_id>', methods=['GET'])
def get_video(video_id):
    """Descargar un video desde MongoDB GridFS"""
    try:
        file = fs.get(video_id)
        return send_file(io.BytesIO(file.read()), mimetype=file.content_type, as_attachment=True, download_name=file.filename)
    except:
        return jsonify({"error": "Video no encontrado"}), 404

@api_blueprint.route('/videos', methods=['GET'])
def list_videos():
    """Lista todos los videos almacenados en MongoDB"""
    videos = mongo.db.videos.find({}, {"_id": 0})
    return jsonify(list(videos))
