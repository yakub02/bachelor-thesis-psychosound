import sys
import os
import getpass

sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import create_app, db
from app.models.user import User


def create_admin_user():
    """Create an admin user interactively."""
    app = create_app()

    with app.app_context():
        print("=== Create Admin User ===")

        user_count = User.query.count()
        if user_count > 0:
            print(f"Warning: {user_count} user(s) already exist in the database.")
            confirm = input("Continue creating another admin? (yes/no): ")
            if confirm.lower() not in ['yes', 'y']:
                print("Aborted.")
                return

        while True:
            username = input("Enter admin username: ").strip()
            if len(username) >= 3 and len(username) <= 80:
                existing = User.query.filter_by(username=username).first()
                if existing:
                    print("Username already exists. Please choose another.")
                    continue
                break
            else:
                print("Username must be between 3 and 80 characters.")

        while True:
            password = getpass.getpass("Enter admin password: ")
            if len(password) >= 8:
                password_confirm = getpass.getpass("Confirm password: ")
                if password == password_confirm:
                    break
                else:
                    print("Passwords do not match. Please try again.")
            else:
                print("Password must be at least 8 characters long.")

        user = User(username=username)
        user.set_password(password)

        db.session.add(user)
        db.session.commit()

        print(f"\nAdmin user '{username}' created successfully!")
        print(f"User ID: {user.id}")


if __name__ == '__main__':
    create_admin_user()
