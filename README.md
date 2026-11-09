# FOODSTA 2.0 – The Global Culinary Social Network

**FOODSTA** is the global culinary social network and professional development platform connecting chefs, computational gastronomy (RecipeDB & FlavorDB), competitive cooking battles, and international career opportunities.

---

## Architecture & Technology Stack

### Frontend
- **Framework**: React 19 (`react`, `react-dom`)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 (`@tailwindcss/vite`)
- **Icons & Animation**: Lucide React (`lucide-react`), Motion (`motion`)
- **Routing**: React Router DOM v7
- **Bundler**: Vite 8

### Backend
- **Framework**: Python 3.12 + FastAPI
- **Database**: PostgreSQL (Production) / SQLite (Local Development) via SQLAlchemy 2.0
- **Security**: JWT Authentication (HS256) & bcrypt password hashing
- **Access Control**: Role-Based Access Control (RBAC) supporting 5 roles:
  - Food Enthusiast (`enthusiast`)
  - Professional Chef (`chef`)
  - Food Critic / Official Judge (`critic_judge`)
  - Restaurant / Employer (`restaurant_employer`)
  - Administrator (`admin`)
- **Validation**: Pydantic v2 & Pydantic Settings
- **Migrations**: Alembic

---

## Key Features

1. **Culinary Social Network**
   - Instagram-style feed with rich recipe integration and culinary photography.
   - Stories rail with fullscreen interactive story previews.
   - Post likes, comments, and bookmarking.

2. **Chef Profiles & Directory**
   - Verified master chef badges with golden profile rings.
   - Professional biography, Michelin stars, brigade experience history, awards, and certifications.
   - Follow/unfollow mechanics and specialty filtering.

3. **Chef Battles (Culinary Arena)**
   - Competition tracking: Active, Upcoming, and Completed (Hall of Fame).
   - Dish submissions with inspiration, ingredient breakdown, and identified flavor compounds.
   - Community voting system.
   - Official 5-part expert judging formula:
     - Creativity: 25%
     - Taste & Flavour: 25%
     - Presentation: 20%
     - Cooking Technique: 20%
     - Ingredient Utilisation: 10%

4. **FlavourLab (Computational Gastronomy)**
   - Molecular pairing sandbox exploring shared aromatic volatile compounds.
   - Synergy indexing and cross-referenced recipe discovery.
   - Prepared for official Foodoscope FlavorDB & RecipeDB API integration.

5. **Leaderboard**
   - Transparent culinary meritocracy rankings based on verified battle victories (40%), Michelin/expert evaluations (30%), recipe technical depth (20%), and community reach (10%).

6. **Career Connect**
   - Partner restaurant showcases and Michelin establishment discovery.
   - Brigade position listings (Sous Chef, Pastry, Fine Dining) with structured application flow.

7. **Direct Messaging & Notifications**
   - Activity notifications (likes, follows, judge evaluations, career submissions).
   - Direct messaging interface between culinary network participants.

---

## Getting Started

### 1. Frontend Setup
```bash
# Install dependencies
npm install --legacy-peer-deps

# Start Vite development server (port 3000)
npm run dev

# Build for production
npm run build
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create and activate Python virtual environment
python -m venv venv
# On Windows:
venv\Scripts\activate
# On Linux/macOS:
source venv/bin/activate

# Install Python requirements
pip install -r requirements.txt

# Run initial database seeder
python -m app.utils.seeder

# Start FastAPI Uvicorn server (port 8001)
uvicorn app.main:app --host 127.0.0.1 --port 8001 --reload
```

### 3. API Documentation
Once the backend is running, open:
- Swagger UI: [http://127.0.0.1:8001/api/docs](http://127.0.0.1:8001/api/docs)
- ReDoc: [http://127.0.0.1:8001/api/redoc](http://127.0.0.1:8001/api/redoc)

---

## License

Proprietary – FOODSTA Culinary Technologies.
