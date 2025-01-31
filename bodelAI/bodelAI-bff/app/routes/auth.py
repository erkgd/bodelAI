from flask import Blueprint, request, jsonify

auth_blueprint = Blueprint('auth', __name__)

@auth_blueprint.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    # Validación básica (aquí podrías usar un servicio de autenticación)
    if username == 'admin' and password == 'password':
        return jsonify({"message": "Login successful", "token": "fake-token"}), 200
    else:
        return jsonify({"error": "Invalid credentials"}), 401
