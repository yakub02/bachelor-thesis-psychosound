from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, get_jwt_identity
from app.services.auth_service import AuthService
from app.services.user_service import UserService

auth_bp = Blueprint('auth', __name__)


@auth_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new admin user.
    Security: Only allow if no users exist (first admin) or if called by authenticated admin.
    """
    data = request.get_json()

    # Validate input
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({
            'status': 'error',
            'message': 'Username and password are required'
        }), 400

    username = data.get('username').strip()
    password = data.get('password')

    # Validate username length
    if len(username) < 3 or len(username) > 80:
        return jsonify({
            'status': 'error',
            'message': 'Username must be between 3 and 80 characters'
        }), 400

    # Validate password strength
    if len(password) < 8:
        return jsonify({
            'status': 'error',
            'message': 'Password must be at least 8 characters long'
        }), 400

    # Check if this is the first user (allow) or require authentication
    user_count = UserService.get_user_count()

    if user_count > 0:
        # For subsequent users, require JWT authentication
        # This prevents unauthorized admin creation
        return jsonify({
            'status': 'error',
            'message': 'Registration is closed. Contact an administrator.'
        }), 403

    # Create user
    user = UserService.create_user(username, password)

    if not user:
        return jsonify({
            'status': 'error',
            'message': 'Username already exists'
        }), 409

    return jsonify({
        'status': 'success',
        'message': 'User created successfully',
        'data': user.to_dict()
    }), 201


@auth_bp.route('/login', methods=['POST'])
def login():
    """
    Login with username and password.
    Returns JWT access token on success.
    """
    data = request.get_json()

    # Validate input
    if not data or not data.get('username') or not data.get('password'):
        return jsonify({
            'status': 'error',
            'message': 'Username and password are required'
        }), 400

    username = data.get('username')
    password = data.get('password')

    # Authenticate user
    auth_result = AuthService.authenticate_user(username, password)

    if not auth_result:
        return jsonify({
            'status': 'error',
            'message': 'Invalid username or password'
        }), 401

    return jsonify({
        'status': 'success',
        'message': 'Login successful',
        'data': {
            'access_token': auth_result['access_token'],
            'user': auth_result['user']
        }
    }), 200


@auth_bp.route('/me', methods=['GET'])
@jwt_required()
def get_current_user():
    """
    Get current authenticated user information.
    Requires valid JWT token in Authorization header.
    """
    # Get user ID from JWT token
    current_user_id = get_jwt_identity()

    # Get user from database
    user = AuthService.get_user_by_id(current_user_id)

    if not user:
        return jsonify({
            'status': 'error',
            'message': 'User not found'
        }), 404

    return jsonify({
        'status': 'success',
        'data': user.to_dict()
    }), 200


@auth_bp.route('/verify', methods=['GET'])
@jwt_required()
def verify_token():
    """
    Verify if JWT token is valid.
    Returns user info if token is valid.
    """
    current_user_id = get_jwt_identity()
    user = AuthService.get_user_by_id(current_user_id)

    if not user:
        return jsonify({
            'status': 'error',
            'message': 'Invalid token'
        }), 401

    return jsonify({
        'status': 'success',
        'message': 'Token is valid',
        'data': user.to_dict()
    }), 200
