import sys
import os

# Add parent directory to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from app import create_app, db


def reset_database():
    """Drop all tables and recreate them."""
    app = create_app()

    with app.app_context():
        print("WARNING: This will delete all data in the database!")
        confirm = input("Are you sure? Type 'yes' to continue: ")

        if confirm.lower() != 'yes':
            print("Aborted.")
            return

        print("Dropping all tables...")
        db.drop_all()
        print("Creating all tables...")
        db.create_all()
        print("Database reset complete!")


if __name__ == '__main__':
    reset_database()
