from flask import Blueprint, jsonify

main_bp = Blueprint('main', __name__)

@main_bp.route('/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'success',
        'message': 'Backend is running!'
    }), 200

@main_bp.route('/test', methods=['GET'])
def test():
    return jsonify({
        'status': 'success',
        'data': 'PSYCHOSOUND backend is working'
    }), 200