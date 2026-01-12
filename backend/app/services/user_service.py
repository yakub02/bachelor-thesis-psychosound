from app import db
from app.models.user import User


class UserService:
    @staticmethod
    def create_user(username, password):
        """
        Create a new user.
        Returns the created user or None if username already exists.
        """
        # Check if username already exists
        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return None

        # Create new user
        user = User(username=username)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        return user

    @staticmethod
    def get_all_users():
        """Get all users."""
        return User.query.all()

    @staticmethod
    def get_user_count():
        """Get total number of users."""
        return User.query.count()

    @staticmethod
    def delete_user(user_id):
        """Delete a user by ID."""
        user = User.query.get(user_id)
        if user:
            db.session.delete(user)
            db.session.commit()
            return True
        return False
