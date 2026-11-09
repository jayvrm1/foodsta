from sqlalchemy.orm import Session
from backend.app.database import SessionLocal, engine, Base
from backend.app.models.user import User, ChefProfile, RestaurantProfile, UserRole
from backend.app.models.competition import Competition
from backend.app.models.career import JobPosition
from backend.app.security.password import get_password_hash


def seed_database():
    """Seeds initial users covering all 5 roles, plus prominent chefs, restaurants, and competitions."""
    Base.metadata.create_all(bind=engine)
    db: Session = SessionLocal()

    try:
        # Check if already seeded
        if db.query(User).filter(User.username == "admin").first():
            print("Database already seeded.")
            return

        print("Seeding database with default users and roles...")

        default_password = get_password_hash("Foodsta2026!")

        # 1. Administrator
        admin = User(
            id="user-admin-01",
            email="admin@foodsta.com",
            username="admin",
            full_name="FOODSTA Administrator",
            hashed_password=default_password,
            role=UserRole.ADMIN,
            avatar_url="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80",
            bio="FOODSTA Platform Operations and Official Competition Director.",
            is_active=True,
            is_verified=True,
            is_master_chef=True
        )
        db.add(admin)

        # 2. Food Critic / Official Judge
        judge = User(
            id="user-judge-elena",
            email="judge@foodsta.com",
            username="elena_arzak",
            full_name="Elena Arzak",
            hashed_password=default_password,
            role=UserRole.CRITIC_JUDGE,
            avatar_url="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?auto=format&fit=crop&w=400&q=80",
            bio="3-Star Michelin Chef & Grand Jury Member. Pioneering Basque research and flavor synthesis.",
            is_active=True,
            is_verified=True,
            is_master_chef=True
        )
        db.add(judge)
        judge_profile = ChefProfile(
            user_id=judge.id,
            title="3-Star Michelin Chef & Grand Jury",
            restaurant="Arzak",
            restaurant_location="San Sebastián, Spain",
            michelin_stars=3,
            experience_years=28,
            expert_rating=4.98,
            battles_won=14,
            specialties=["Basque Avant-Garde", "Flavor Chemistry", "Sensory Analysis"],
            awards=["World's Best Female Chef", "3 Michelin Stars (Since 1989)"]
        )
        db.add(judge_profile)

        # 3. Professional Chef
        chef = User(
            id="user-chef-massimo",
            email="chef@foodsta.com",
            username="massimo_bottura",
            full_name="Massimo Bottura",
            hashed_password=default_password,
            role=UserRole.CHEF,
            avatar_url="https://images.unsplash.com/photo-1583394293214-28ded15ee548?auto=format&fit=crop&w=400&q=80",
            bio="Chef Patron of Osteria Francescana. Reinventing Italian culinary heritage through art and philosophy.",
            is_active=True,
            is_verified=True,
            is_master_chef=True
        )
        db.add(chef)
        chef_profile = ChefProfile(
            user_id=chef.id,
            title="Chef Patron",
            restaurant="Osteria Francescana",
            restaurant_location="Modena, Italy",
            michelin_stars=3,
            experience_years=32,
            expert_rating=4.99,
            battles_won=18,
            specialties=["Modern Italian", "Molecular Gastronomy", "Emilian Heritage"],
            awards=["World's 50 Best #1 (2016, 2018)", "3 Michelin Stars"]
        )
        db.add(chef_profile)

        # 4. Restaurant / Employer
        employer = User(
            id="user-employer-geranium",
            email="employer@foodsta.com",
            username="geranium_cph",
            full_name="Geranium Copenhagen",
            hashed_password=default_password,
            role=UserRole.RESTAURANT_EMPLOYER,
            avatar_url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
            bio="3-Star Michelin establishment situated in Copenhagen, Denmark.",
            is_active=True,
            is_verified=True
        )
        db.add(employer)
        rest_profile = RestaurantProfile(
            id="rest-geranium",
            user_id=employer.id,
            name="Geranium",
            logo_url="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=400&q=80",
            cover_image_url="https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&w=1200&q=80",
            location="Copenhagen, Denmark",
            cuisine="Nordic Botanical",
            michelin_stars=3,
            description="Pure, botanical-forward culinary theater overlooking Fælledparken.",
            website="https://geranium.dk"
        )
        db.add(rest_profile)

        # 5. Food Enthusiast
        enthusiast = User(
            id="user-enthusiast-clara",
            email="enthusiast@foodsta.com",
            username="clara_gourmet",
            full_name="Clara Dupont",
            hashed_password=default_password,
            role=UserRole.ENTHUSIAST,
            avatar_url="https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=80",
            bio="Culinary explorer, food science enthusiast, and home modernist cook.",
            is_active=True,
            is_verified=False
        )
        db.add(enthusiast)

        # Seed an initial competition (Chef Battles)
        comp = Competition(
            id="battle-mushroom",
            title="The Sacred Mushroom: Umami Matrix Challenge",
            theme="Wild Mycological Gastronomy & Volatile Synergy",
            description="Re-engineer the boundaries of wild mushrooms using computational flavor pairing (RecipeDB & FlavorDB) to extract maximum savory glutamic potential.",
            cover_image="https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=1200&q=80",
            status="active",
            required_ingredients=["Wild Porcini or Morel", "Aged Umami Emulsion", "Volatile Aromatic Herb"],
            rules=["100% original dish formulation", "Must identify at least 2 primary shared volatile compounds", "Submission must include recipe steps and plating photo"],
            submission_deadline="Nov 15, 2026",
            prize_pool="$18,000 USD",
            prize_first="$12,000 + Golden Truffle Trophy",
            prize_second="$4,000 + Silver Boning Knife",
            prize_third="$2,000 + Bronze Pin"
        )
        db.add(comp)

        # Seed an initial job listing
        job = JobPosition(
            id="job-senior-sous-geranium",
            restaurant_id="rest-geranium",
            title="Senior Sous Chef (Innovation Lab)",
            cuisine="Nordic Haute Cuisine",
            salary_range="€68,000 - €82,000 / yr + Housing",
            employment_type="Full-time",
            experience_required="5+ years in Michelin starred brigade",
            description="Lead the botanical research & development brigade at Geranium.",
            requirements=["Extensive background in fermentation and cold extraction", "Strong leadership skills", "Culinary arts degree or equivalent master apprenticeship"],
            perks=["Relocation allowance to Copenhagen", "Private healthcare", "35 paid vacation days"]
        )
        db.add(job)

        db.commit()
        print("Database seeded successfully with all 5 roles!")
    except Exception as e:
        db.rollback()
        print(f"Error seeding database: {e}")
    finally:
        db.close()


if __name__ == "__main__":
    seed_database()

