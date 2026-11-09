from typing import List, Optional
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from backend.app.database import get_db
from backend.app.models.user import User, ChefProfile, Follower, UserRole
from backend.app.models.post import Post
from backend.app.schemas.user import UserResponse, UserUpdate
from backend.app.security.dependencies import get_current_user

router = APIRouter(prefix="/users", tags=["Users & Chefs"])


@router.get("/chefs", response_model=List[UserResponse])
def get_chefs(
    specialty: Optional[str] = None,
    verified_only: bool = False,
    db: Session = Depends(get_db)
):
    """Retrieve directory of chefs and culinary masters."""
    query = db.query(User).filter(User.role.in_([UserRole.CHEF, UserRole.CRITIC_JUDGE]))
    if verified_only:
        query = query.filter(User.is_verified == True)
    
    users = query.all()
    results = []
    for u in users:
        # Check specialty filter
        if specialty and u.chef_profile and specialty.lower() != "all":
            specialties = [s.lower() for s in (u.chef_profile.specialties or [])]
            if specialty.lower() not in specialties and specialty.lower() not in (u.chef_profile.title or "").lower():
                continue

        results.append(UserResponse(
            id=u.id,
            email=u.email,
            username=u.username,
            full_name=u.full_name,
            role=u.role,
            avatar_url=u.avatar_url,
            bio=u.bio,
            is_active=u.is_active,
            is_verified=u.is_verified,
            is_master_chef=u.is_master_chef,
            created_at=u.created_at,
            chef_profile=u.chef_profile,
            restaurant_profile=u.restaurant_profile,
            followers_count=len(u.followers),
            following_count=len(u.following),
            posts_count=len(u.posts),
            is_following=False
        ))
    return results


@router.get("/{user_id}", response_model=UserResponse)
def get_user_by_id(user_id: str, db: Session = Depends(get_db)):
    u = db.query(User).filter(User.id == user_id).first()
    if not u:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")
    
    return UserResponse(
        id=u.id,
        email=u.email,
        username=u.username,
        full_name=u.full_name,
        role=u.role,
        avatar_url=u.avatar_url,
        bio=u.bio,
        is_active=u.is_active,
        is_verified=u.is_verified,
        is_master_chef=u.is_master_chef,
        created_at=u.created_at,
        chef_profile=u.chef_profile,
        restaurant_profile=u.restaurant_profile,
        followers_count=len(u.followers),
        following_count=len(u.following),
        posts_count=len(u.posts),
        is_following=False
    )


@router.post("/{user_id}/follow")
def toggle_follow(
    user_id: str,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="You cannot follow yourself")
    
    target = db.query(User).filter(User.id == user_id).first()
    if not target:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="User not found")

    existing = db.query(Follower).filter(
        Follower.follower_id == current_user.id,
        Follower.followed_id == user_id
    ).first()

    if existing:
        db.delete(existing)
        db.commit()
        return {"success": True, "following": False, "followers_count": len(target.followers)}
    else:
        new_follow = Follower(follower_id=current_user.id, followed_id=user_id)
        db.add(new_follow)
        db.commit()
        return {"success": True, "following": True, "followers_count": len(target.followers)}

