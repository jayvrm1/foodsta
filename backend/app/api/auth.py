from fastapi import APIRouter, Depends, HTTPException, status
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.user import User, ChefProfile, RestaurantProfile, UserRole
from backend.app.schemas.auth import UserRegister, UserLogin, TokenResponse
from backend.app.schemas.user import UserResponse
from backend.app.security.password import verify_password, get_password_hash
from backend.app.security.jwt import create_access_token
from backend.app.security.dependencies import get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])


@router.post("/register", response_model=TokenResponse, status_code=status.HTTP_201_CREATED)
def register(user_in: UserRegister, db: Session = Depends(get_db)):
    # Check if email exists
    if db.query(User).filter(User.email == user_in.email.lower()).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this email already exists"
        )
    # Check if username exists
    if db.query(User).filter(User.username == user_in.username.lower()).first():
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="A user with this username already exists"
        )

    # Create new User
    db_user = User(
        email=user_in.email.lower(),
        username=user_in.username.lower(),
        full_name=user_in.full_name,
        hashed_password=get_password_hash(user_in.password),
        role=user_in.role,
        avatar_url=user_in.avatar_url or f"https://api.dicebear.com/7.x/avataaars/svg?seed={user_in.username}",
        bio=user_in.bio or f"Culinary creator & {user_in.role.value} on FOODSTA.",
        is_active=True,
        is_verified=(user_in.role in [UserRole.CHEF, UserRole.CRITIC_JUDGE, UserRole.ADMIN])
    )
    db.add(db_user)
    db.flush()

    # Automatically create ChefProfile if role is chef or critic_judge
    if user_in.role in [UserRole.CHEF, UserRole.CRITIC_JUDGE]:
        chef_profile = ChefProfile(
            user_id=db_user.id,
            title=user_in.title or ("Executive Chef" if user_in.role == UserRole.CHEF else "Culinary Critic & Judge"),
            restaurant=user_in.restaurant or "Independent Atelier",
            restaurant_location=user_in.restaurant_location or "Global",
            experience_years=user_in.experience_years or 5,
            expert_rating=4.8,
            battles_won=0,
            specialties=["Gastronomy", "Flavor Chemistry"] if user_in.role == UserRole.CHEF else ["Sensory Evaluation"]
        )
        db.add(chef_profile)

    # Automatically create RestaurantProfile if role is restaurant_employer
    elif user_in.role == UserRole.RESTAURANT_EMPLOYER:
        rest_profile = RestaurantProfile(
            user_id=db_user.id,
            name=user_in.restaurant or f"{user_in.full_name}'s Establishment",
            location=user_in.restaurant_location or "Global",
            cuisine="Haute Cuisine",
            description=user_in.bio or "Premier culinary destination partner."
        )
        db.add(rest_profile)

    db.commit()
    db.refresh(db_user)

    # Generate JWT token
    token = create_access_token({"sub": db_user.id, "role": db_user.role.value, "username": db_user.username})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=db_user.id,
        username=db_user.username,
        full_name=db_user.full_name,
        role=db_user.role.value,
        avatar_url=db_user.avatar_url,
        is_verified=db_user.is_verified,
        is_master_chef=db_user.is_master_chef
    )


@router.post("/login", response_model=TokenResponse)
def login(credentials: UserLogin, db: Session = Depends(get_db)):
    ident = credentials.username_or_email.lower().strip()
    user = db.query(User).filter(
        (User.email == ident) | (User.username == ident)
    ).first()

    if not user or not verify_password(credentials.password, user.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username/email or password"
        )

    if not user.is_active:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Account is disabled"
        )

    token = create_access_token({"sub": user.id, "role": user.role.value, "username": user.username})

    return TokenResponse(
        access_token=token,
        token_type="bearer",
        user_id=user.id,
        username=user.username,
        full_name=user.full_name,
        role=user.role.value,
        avatar_url=user.avatar_url,
        is_verified=user.is_verified,
        is_master_chef=user.is_master_chef
    )


@router.get("/me", response_model=UserResponse)
def get_current_user_profile(
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    followers_count = len(current_user.followers)
    following_count = len(current_user.following)
    posts_count = len(current_user.posts)

    return UserResponse(
        id=current_user.id,
        email=current_user.email,
        username=current_user.username,
        full_name=current_user.full_name,
        role=current_user.role,
        avatar_url=current_user.avatar_url,
        bio=current_user.bio,
        is_active=current_user.is_active,
        is_verified=current_user.is_verified,
        is_master_chef=current_user.is_master_chef,
        created_at=current_user.created_at,
        chef_profile=current_user.chef_profile,
        restaurant_profile=current_user.restaurant_profile,
        followers_count=followers_count,
        following_count=following_count,
        posts_count=posts_count,
        is_following=False
    )

