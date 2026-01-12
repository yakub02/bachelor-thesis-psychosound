from flask_jwt_extended import create_access_token
from app import db
from app.models.user import User


class AuthService:
    @staticmethod
    def authenticate_user(username, password):
        """
        Authenticate a user with username and password.
        Returns JWT token if successful, None otherwise.
        """
        user = User.query.filter_by(username=username).first()

        if user and user.check_password(password):
            # Create JWT token with user identity
            access_token = create_access_token(identity=str(user.id))
            return {
                'access_token': access_token,
                'user': user.to_dict()
            }

        return None

    @staticmethod
    def get_user_by_id(user_id):
        """Get user by ID."""
        return User.query.get(user_id)

    @staticmethod
    def get_user_by_username(username):
        """Get user by username."""
        return User.query.filter_by(username=username).first()
