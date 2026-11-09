import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine, inspect
from sqlalchemy.orm import sessionmaker

from backend.app.main import app
from backend.app.database import Base, get_db
from backend.app.models.user import UserRole
from backend.app.utils.seeder import seed_database

# Use in-memory or dedicated test sqlite db
TEST_SQLALCHEMY_DATABASE_URL = "sqlite:///./test_foodsta.db"

test_engine = create_engine(
    TEST_SQLALCHEMY_DATABASE_URL,
    connect_args={"check_same_thread": False}
)
TestingSessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=test_engine)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


app.dependency_overrides[get_db] = override_get_db

client = TestClient(app)


@pytest.fixture(autouse=True, scope="module")
def setup_database():
    Base.metadata.create_all(bind=test_engine)
    yield
    Base.metadata.drop_all(bind=test_engine)


def test_database_tables_exist():
    """Verify that all core database tables are created."""
    inspector = inspect(test_engine)
    tables = inspector.get_table_names()
    
    expected_tables = [
        "users",
        "chef_profiles",
        "restaurant_profiles",
        "followers",
        "posts",
        "comments",
        "likes",
        "saved_posts",
        "recipes",
        "recipe_ingredients",
        "competitions",
        "battle_submissions",
        "judge_evaluations",
        "battle_votes",
        "job_positions",
        "job_applications",
        "notifications",
        "conversations",
        "messages"
    ]
    
    for table in expected_tables:
        assert table in tables, f"Expected table '{table}' not found in database"


def test_root_and_health_endpoints():
    """Test health check and root endpoints."""
    res_root = client.get("/")
    assert res_root.status_code == 200
    assert res_root.json()["status"] == "online"

    res_health = client.get("/health")
    assert res_health.status_code == 200
    assert res_health.json()["database"] == "connected"


def test_user_registration_all_roles():
    """Test registration across the 5 distinct roles."""
    roles = [
        ("chef_test", "chef@test.com", UserRole.CHEF),
        ("judge_test", "judge@test.com", UserRole.CRITIC_JUDGE),
        ("employer_test", "employer@test.com", UserRole.RESTAURANT_EMPLOYER),
        ("enthusiast_test", "enthusiast@test.com", UserRole.ENTHUSIAST),
        ("admin_test", "admin@test.com", UserRole.ADMIN),
    ]

    for username, email, role in roles:
        payload = {
            "username": username,
            "email": email,
            "full_name": f"Test {username}",
            "password": "SecurePassword123!",
            "role": role.value,
            "title": "Head Chef" if role == UserRole.CHEF else None,
            "restaurant": "Test Kitchen" if role == UserRole.CHEF else None
        }
        res = client.post("/api/auth/register", json=payload)
        assert res.status_code == 201, f"Failed for {role}: {res.text}"
        data = res.json()
        assert "access_token" in data
        assert data["username"] == username
        assert data["role"] == role.value


def test_duplicate_registration_prevented():
    """Ensure duplicate email or username is rejected."""
    payload = {
        "username": "chef_test",
        "email": "another@test.com",
        "full_name": "Duplicate Chef",
        "password": "Password123!",
        "role": "chef"
    }
    res = client.post("/api/auth/register", json=payload)
    assert res.status_code == 400
    assert "already exists" in res.json()["detail"]


def test_login_and_jwt_validation():
    """Test login with valid and invalid credentials, and retrieve /me profile."""
    # Invalid password
    res_invalid = client.post("/api/auth/login", json={
        "username_or_email": "chef_test",
        "password": "WrongPassword!"
    })
    assert res_invalid.status_code == 401

    # Valid login
    res_valid = client.post("/api/auth/login", json={
        "username_or_email": "chef_test",
        "password": "SecurePassword123!"
    })
    assert res_valid.status_code == 200
    token_data = res_valid.json()
    token = token_data["access_token"]
    assert token

    # Access protected /api/auth/me
    headers = {"Authorization": f"Bearer {token}"}
    res_me = client.get("/api/auth/me", headers=headers)
    assert res_me.status_code == 200
    me_data = res_me.json()
    assert me_data["username"] == "chef_test"
    assert me_data["role"] == "chef"
    assert me_data["chef_profile"] is not None


def test_follow_and_chef_directory():
    """Test chef listing and follow/unfollow toggle."""
    # Login as enthusiast
    res_login = client.post("/api/auth/login", json={
        "username_or_email": "enthusiast_test",
        "password": "SecurePassword123!"
    })
    token = res_login.json()["access_token"]
    headers = {"Authorization": f"Bearer {token}"}

    # Get chefs
    res_chefs = client.get("/api/users/chefs")
    assert res_chefs.status_code == 200
    chefs = res_chefs.json()
    assert len(chefs) >= 1

    target_chef = chefs[0]
    # Follow target chef
    res_follow = client.post(f"/api/users/{target_chef['id']}/follow", headers=headers)
    assert res_follow.status_code == 200
    assert res_follow.json()["following"] is True

    # Unfollow target chef
    res_unfollow = client.post(f"/api/users/{target_chef['id']}/follow", headers=headers)
    assert res_unfollow.status_code == 200
    assert res_unfollow.json()["following"] is False

