# 🔍 Social Media Forensics Tool (SMFT)

[![Python](https://img.shields.io/badge/Python-3.11-blue?logo=python&logoColor=white)](https://www.python.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.116-009688?logo=fastapi&logoColor=white)](https://fastapi.tiangolo.com/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react&logoColor=black)](https://reactjs.org/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-Database-4169E1?logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.3-38B2AC?logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A **full-stack digital forensics platform** designed for collecting, analyzing, preserving, and reporting social media data across multiple platforms. Built for cybersecurity professionals, law enforcement, OSINT analysts, and digital investigators to gather actionable intelligence from public social media activity.

---

## 📋 Table of Contents

- [Features](#-features)
- [Architecture](#-architecture)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Modules](#-modules)
  - [Collector Module](#1-collector-module)
  - [Analyzer Module](#2-analyzer-module)
  - [Preserver Module](#3-preserver-module)
  - [Reporter Module](#4-reporter-module)
- [Frontend Pages](#-frontend-pages)
- [Database Schema](#-database-schema)
- [API Endpoints](#-api-endpoints)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Utility Scripts](#-utility-scripts)
- [Contributing](#-contributing)
- [License](#-license)

---

## ✨ Features

### 🔹 Multi-Platform Data Collection
- Collect public posts from **Twitter/X**, **Instagram**, **Facebook**, and **Reddit**
- Keyword and hashtag-based search with configurable post limits
- Real-time collection progress tracking with batch processing
- SHA-256 hash generation for every collected record to ensure **forensic integrity**

### 🔹 Advanced Analysis
- **Sentiment Analysis** — Classify posts as Positive, Neutral, Negative, or Threat with confidence scores
- **Timeline Analysis** — Visualize posting trends over time, detect peak activity periods and unusual patterns
- **Network Analysis** — Interactive force-directed graphs to map user relationships, detect clusters, identify top influencers, and flag suspicious patterns
- **Keyword / Word Cloud Analysis** — D3-powered word cloud visualization of trending keywords and hashtags
- **Geolocation Mapping** — Leaflet-based interactive maps pinpointing user locations with sentiment-based markers

### 🔹 Evidence Preservation
- Cryptographic hashing (SHA-256) of all collected data for tamper detection
- Hash manifest export for chain-of-custody documentation
- Database-backed storage for auditability

### 🔹 Comprehensive Reporting
- **PDF Report Generation** — Full case reports (landscape A4) with embedded charts, tables, and maps
- **CSV Export** — Structured tabular exports for datasets and analysis results
- **JSON Export** — Machine-readable data export
- **Map Image Export** — Download geolocation maps as PNG images
- **Word Cloud Image Export** — Download word cloud visualizations as PNG

### 🔹 Interactive Dashboard
- Summary cards with total, positive, neutral, and negative post counts
- Analytics tabs with embedded visualizations
- Detail modals for drill-down investigation
- Full case report download with a single click

---

## 🏗 Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        FRONTEND (React 18)                      │
│  Dashboard │ DataCollection │ Sentiment │ Timeline │ Network    │
│  Geolocation │ WordCloud │ Reports │ Analytics │ Settings       │
│─────────────────────────────────────────────────────────────────│
│  Components: Navbar, Header, Footer, DashboardCard, MapChart,  │
│  TimelineChart, RelationshipGraph, WordCloudChart, SummaryTable │
│  DetailModal, AnalyticsTabs, DateTimeFilter, Loader, Tooltip   │
└──────────────────────────────┬──────────────────────────────────┘
                               │ REST API (HTTP)
┌──────────────────────────────┴──────────────────────────────────┐
│                      BACKEND (FastAPI)                          │
│  /collector  │  /analyzer  │  /preserver  │  /reporter          │
│─────────────────────────────────────────────────────────────────│
│  Models: User, Post, Comment                                    │
│  Utils: Geolocation, Hash, Logger, Scraper                     │
│  Database: SQLAlchemy ORM + Alembic Migrations                 │
└──────────────────────────────┬──────────────────────────────────┘
                               │
                  ┌────────────┴────────────┐
                  │     PostgreSQL Database  │
                  │   (users, posts, comments│
                  │    + location, sentiment)│
                  └─────────────────────────┘
```

---

## 🛠 Tech Stack

### Backend
| Technology | Purpose |
|---|---|
| **Python 3.11** | Core backend language |
| **FastAPI** | High-performance async REST API framework |
| **SQLAlchemy** | ORM for database operations |
| **Alembic** | Database migration management |
| **PostgreSQL** | Primary relational database |
| **Uvicorn** | ASGI server |
| **snscrape** | Social media data scraping |
| **TextBlob / NLTK** | Natural Language Processing & sentiment analysis |
| **Pandas / NumPy** | Data processing and analysis |
| **Matplotlib / Seaborn** | Server-side chart generation |
| **Folium** | Server-side geolocation map generation |
| **FPDF** | PDF report generation |
| **WordCloud** | Server-side word cloud generation |
| **BeautifulSoup / lxml** | HTML parsing and web scraping |
| **NetworkX** | Graph-based relationship analysis |
| **Pydantic** | Data validation and serialization |
| **python-dotenv** | Environment variable management |

### Frontend
| Technology | Purpose |
|---|---|
| **React 18** | UI library with functional components and hooks |
| **React Router v6** | Client-side routing (11 routes) |
| **Tailwind CSS 3.3** | Utility-first CSS framework |
| **Chart.js + react-chartjs-2** | Interactive charts (line, bar, pie) |
| **Leaflet + react-leaflet** | Interactive geolocation maps |
| **D3 + d3-cloud** | Word cloud visualizations |
| **react-force-graph-2d** | Force-directed network graphs |
| **Framer Motion** | Animations and transitions |
| **jsPDF + html2canvas** | Client-side PDF report generation |
| **react-csv** | CSV export functionality |
| **react-icons** | Icon library |
| **react-modal** | Accessible modal dialogs |
| **react-tabs** | Tabbed interface components |

---

## 📁 Project Structure

```
social_media_forensics_tool/
│
├── backend/                        # Backend application
│   ├── app/
│   │   ├── __init__.py
│   │   ├── main.py                 # FastAPI app entry point with router registration
│   │   ├── config.py               # Environment variable configuration
│   │   ├── database.py             # SQLAlchemy engine, session, and Base setup
│   │   ├── create_tables.py        # Script to create database tables
│   │   │
│   │   ├── collector/              # Data collection module
│   │   │   ├── collector_router.py # Main collector API router
│   │   │   ├── twitter_collector.py    # Twitter/X data collector
│   │   │   ├── facebook_collector.py   # Facebook data collector
│   │   │   ├── instagram_collector.py  # Instagram data collector
│   │   │   └── reddit_collector.py     # Reddit data collector
│   │   │
│   │   ├── analyzer/               # Analysis module
│   │   │   ├── analysis_router.py  # Analyzer API router
│   │   │   ├── sentiment_analysis.py   # Sentiment classification engine
│   │   │   ├── keyword_analysis.py     # Keyword extraction & frequency analysis
│   │   │   ├── timeline_analysis.py    # Temporal pattern analysis
│   │   │   ├── relationship_analysis.py # User relationship mapping
│   │   │   └── influencer_analysis.py  # Influencer detection & ranking
│   │   │
│   │   ├── preserver/              # Evidence preservation module
│   │   │   └── preserver_router.py # Preserver API router
│   │   │
│   │   ├── reporter/               # Report generation module
│   │   │   ├── report_router.py    # Reporter API router
│   │   │   ├── pdf_report.py       # PDF report generator
│   │   │   ├── charts.py           # Server-side chart generation
│   │   │   └── map_report.py       # Geolocation map report generator
│   │   │
│   │   ├── models/                 # SQLAlchemy ORM models
│   │   │   ├── __init__.py
│   │   │   ├── user_model.py       # User model (id, username, posts)
│   │   │   ├── post_model.py       # Post model (id, content, timestamp, user_id)
│   │   │   └── comment_model.py    # Comment model
│   │   │
│   │   ├── database/               # Database utilities
│   │   │   ├── __init__.py
│   │   │   ├── db.py               # Database connection helpers
│   │   │   └── schemas.py          # Pydantic schemas for API validation
│   │   │
│   │   ├── routes/                 # Additional API routes
│   │   │   ├── analysis_routes.py  # Analysis-specific endpoints
│   │   │   └── post_routes.py      # Post CRUD endpoints
│   │   │
│   │   └── utils/                  # Utility modules
│   │       ├── geolocation.py      # Geocoding and coordinate resolution
│   │       ├── hash_utils.py       # SHA-256 hashing for forensic integrity
│   │       ├── logger.py           # Application logging configuration
│   │       └── scraper_utils.py    # Web scraping helper functions
│   │
│   ├── .env                        # Environment variables (not tracked)
│   ├── requirements.txt            # Python dependencies
│   └── dev.db                      # SQLite dev database
│
├── frontend/                       # Frontend application
│   ├── src/
│   │   ├── App.jsx                 # Root component with routing
│   │   ├── Routes.jsx              # Route configuration
│   │   ├── index.jsx               # React entry point
│   │   ├── index.css               # Global styles
│   │   │
│   │   ├── pages/                  # Page components (11 pages)
│   │   │   ├── Dashboard.jsx       # Main dashboard with cards & analytics
│   │   │   ├── Analytics.jsx       # Analytics overview
│   │   │   ├── Overview.jsx        # System overview
│   │   │   ├── DataCollection.jsx  # Multi-platform data collection UI
│   │   │   ├── SentimentAnalysis.jsx # Sentiment analysis results
│   │   │   ├── TimelineAnalysis.jsx  # Temporal trend visualization
│   │   │   ├── NetworkAnalysis.jsx   # Social network graph
│   │   │   ├── Geolocation.jsx       # Interactive geolocation map
│   │   │   ├── WordCloudPage.jsx     # Word cloud visualization
│   │   │   ├── Reports.jsx          # Case report generation & export
│   │   │   └── Settings.jsx         # Application settings
│   │   │
│   │   ├── components/             # Reusable UI components (15 components)
│   │   │   ├── Header.jsx          # App header
│   │   │   ├── Navbar.jsx          # Navigation bar
│   │   │   ├── Footer.jsx          # App footer
│   │   │   ├── DashboardCard.jsx   # Metric display card
│   │   │   ├── AnalyticsTabs.jsx   # Tabbed analytics interface
│   │   │   ├── SummaryTable.jsx    # Data summary table
│   │   │   ├── DetailModal.jsx     # Detail inspection modal
│   │   │   ├── TimelineChart.jsx   # Line chart component
│   │   │   ├── MapChart.jsx        # Map visualization component
│   │   │   ├── RelationshipGraph.jsx # Force-directed graph component
│   │   │   ├── WordCloudChart.jsx  # Word cloud component
│   │   │   ├── DateTimeFilter.jsx  # Date/time range filter
│   │   │   ├── Loader.jsx          # Loading spinner
│   │   │   ├── Notification.jsx    # Toast notification
│   │   │   └── Tooltip.jsx         # Tooltip component
│   │   │
│   │   ├── services/               # API service layer
│   │   │   ├── api.js              # Base API configuration
│   │   │   ├── twitterService.js   # Twitter API service
│   │   │   ├── facebookService.js  # Facebook API service
│   │   │   ├── instagramService.js # Instagram API service
│   │   │   └── redditService.js    # Reddit API service
│   │   │
│   │   ├── styles/
│   │   │   └── globals.css         # Global CSS styles
│   │   │
│   │   └── utils/
│   │       ├── formatDate.js       # Date formatting utilities
│   │       └── mapHelpers.js       # Map utility functions
│   │
│   ├── public/                     # Static assets
│   ├── package.json                # Node.js dependencies
│   ├── tailwind.config.js          # Tailwind CSS configuration
│   └── postcss.config.js           # PostCSS configuration
│
├── alembic/                        # Database migrations
│   ├── env.py                      # Alembic environment configuration
│   ├── script.py.mako              # Migration template
│   └── versions/                   # Migration files
│       ├── db611d0f8a87_add_location_column_to_users_table.py
│       ├── a7194e1062ae_add_platform_sentiment_keywords_to_posts.py
│       ├── 20250929_add_comments_table.py
│       └── 20250929_add_lat_lng_to_users.py
│
├── scripts/                        # Utility & automation scripts
│   ├── run_collector.py            # Run data collection pipeline
│   ├── run_analysis.py             # Run analysis pipeline
│   ├── generate_report.py          # Generate forensic reports
│   ├── list_usernames.py           # List all tracked usernames
│   ├── list_users_with_posts.py    # List users who have posts
│   ├── list_users_without_location.py # Find users missing location data
│   ├── print_user_coords.py        # Display user coordinates
│   ├── update_user_locations.py    # Update location data for users
│   ├── update_coords_for_users_with_posts.py # Geocode users with posts
│   ├── extract_user_locations_from_posts.py  # Extract locations from post content
│   └── set_negative_sentiment.py   # Flag negative sentiment posts
│
├── data/                           # Data storage directory
│   └── socialmedia.db              # SQLite database for local development
│
├── reports/                        # Generated reports output directory
├── alembic.ini                     # Alembic configuration
├── run_backend.py                  # Backend startup script
├── requirements.txt                # Root-level dependencies
└── .gitignore                      # Git ignore rules
```

---

## 📦 Modules

### 1. Collector Module

The **Collector** is responsible for gathering public social media data from multiple platforms.

| Collector | File | Description |
|---|---|---|
| **Twitter/X** | `twitter_collector.py` | Collects tweets by keyword (via Tweepy / snscrape) |
| **Facebook** | `facebook_collector.py` | Collects page posts (via Graph API / scraper) |
| **Instagram** | `instagram_collector.py` | Collects user posts (via Instaloader / API) |
| **Reddit** | `reddit_collector.py` | Collects subreddit posts (via PRAW / Pushshift) |

**Key Features:**
- Keyword/hashtag-based search
- Configurable post limits (1–500)
- SHA-256 hash per record for forensic integrity
- Engagement metrics (likes, shares, comments)
- Exportable as CSV, JSON, or hash manifest

**API Endpoints:**
```
POST /collector/twitter/collect?keyword=<keyword>&limit=10
POST /collector/facebook/collect?page=<page>&limit=5
POST /collector/instagram/collect?username=<user>&limit=5
POST /collector/reddit/collect?subreddit=<sub>&limit=5
```

---

### 2. Analyzer Module

The **Analyzer** provides multi-layered analysis of collected data.

| Analysis Type | File | Description |
|---|---|---|
| **Sentiment** | `sentiment_analysis.py` | Classifies posts as Positive, Neutral, Negative, or Threat |
| **Keyword** | `keyword_analysis.py` | Extracts and ranks frequently used keywords/hashtags |
| **Timeline** | `timeline_analysis.py` | Detects posting trends, peak activity, and anomalies |
| **Relationship** | `relationship_analysis.py` | Maps user connections and interaction patterns |
| **Influencer** | `influencer_analysis.py` | Identifies and ranks key influencers by engagement |

**Technologies Used:**
- **TextBlob / NLTK** for NLP-based sentiment scoring
- **NetworkX** for graph-based relationship analysis
- **Pandas** for time-series analysis
- **D3.js** (frontend) for word cloud visualization
- **ForceGraph2D** (frontend) for interactive network graphs

---

### 3. Preserver Module

The **Preserver** ensures forensic integrity and chain-of-custody for collected evidence.

- **SHA-256 Hashing** — Every collected record is hashed using its platform, query, user, timestamp, content, engagement, and URL fields
- **Hash Manifest Generation** — Exportable `.sha256.txt` files documenting all record hashes
- **Database Persistence** — All data stored in PostgreSQL with audit trails

---

### 4. Reporter Module

The **Reporter** generates comprehensive forensic case reports.

| Report Type | File | Description |
|---|---|---|
| **PDF Reports** | `pdf_report.py` | Full case reports with charts and tables (using FPDF) |
| **Charts** | `charts.py` | Server-side chart generation (Matplotlib/Seaborn) |
| **Map Reports** | `map_report.py` | Geolocation-based HTML map reports (using Folium) |

**Export Formats:**
- 📄 PDF (full case report with embedded visualizations)
- 📊 CSV (structured tabular data)
- 📋 JSON (machine-readable format)
- 🗺️ PNG (map screenshots)
- ☁️ PNG (word cloud images)

---

## 🖥 Frontend Pages

| Page | Route | Description |
|---|---|---|
| **Dashboard** | `/` `/dashboard` | Main overview with cards, summary table, analytics tabs, and full case report download |
| **Analytics** | `/analytics` | Analytical overview with tabbed visualizations |
| **Overview** | `/overview` | System and project overview |
| **Data Collection** | `/datacollection` | Multi-platform data collection interface with progress tracking, SHA-256 hashing, and data export |
| **Sentiment Analysis** | `/sentimentanalysis` | Sentiment distribution cards (Positive/Neutral/Negative/Threat) and results table |
| **Timeline Analysis** | `/timelineanalysis` | Line chart trends, peak activity periods, and activity log table |
| **Network Analysis** | `/networkanalysis` | Interactive force-directed graph, user stats, influencer detection, suspicious pattern flagging |
| **Geolocation** | `/geolocation` | Interactive Leaflet map with markers for users with negative sentiment |
| **Word Cloud** | `/wordcloud` | D3-powered word cloud from collected keywords/hashtags with glassmorphism UI |
| **Reports** | `/reports` | Case report generation with PDF and CSV download |
| **Settings** | `/settings` | Application configuration |

---

## 🗄 Database Schema

### Users Table
| Column | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Auto-incrementing primary key |
| `username` | String (Unique) | Social media username |
| `location` | String | User's reported location |
| `lat` | Float | Latitude coordinate |
| `lng` | Float | Longitude coordinate |

### Posts Table
| Column | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Auto-incrementing primary key |
| `content` | String | Post text content |
| `timestamp` | DateTime | Post creation time |
| `user_id` | Integer (FK) | Reference to Users table |
| `platform` | String | Source platform |
| `sentiment` | String | Sentiment classification |
| `keywords` | String | Extracted keywords |

### Comments Table
| Column | Type | Description |
|---|---|---|
| `id` | Integer (PK) | Auto-incrementing primary key |
| *(additional columns per migration)* | | |

### Migrations History
1. `db611d0f8a87` — Add `location` column to users table
2. `a7194e1062ae` — Add `platform`, `sentiment`, `keywords` columns to posts table
3. `20250929` — Add `comments` table
4. `20250929` — Add `lat`, `lng` columns to users table

---

## 🔌 API Endpoints

### Health Check
```
GET /                         → { "message": "Social Media Forensics Tool API is running 🚀" }
```

### Collector
```
GET  /collector/test          → Test collector module
POST /collector/twitter/collect?keyword=&limit=
POST /collector/facebook/collect?page=&limit=
POST /collector/instagram/collect?username=&limit=
POST /collector/reddit/collect?subreddit=&limit=
```

### Analyzer
```
GET /analyzer/test            → Test analyzer module
```

### Reporter
```
GET /reporter/test            → Test reporter module
```

### Preserver
```
GET /preserver/test           → Test preserver module
```

---

## 🚀 Getting Started

### Prerequisites

- **Python 3.11+**
- **Node.js 18+** and **npm**
- **PostgreSQL** (or use SQLite for local development)

### 1. Clone the Repository

```bash
git clone https://github.com/baddiputi/Social-Media-Forensic-Tools.git
cd Social-Media-Forensic-Tools
```

### 2. Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate       # macOS/Linux
# venv\Scripts\activate        # Windows

# Install dependencies
pip install -r requirements.txt

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials

# Run database migrations
alembic upgrade head

# Start the backend server
uvicorn app.main:app --reload --port 8000
```

The API will be available at `http://localhost:8000`

**Swagger docs:** `http://localhost:8000/docs`

### 3. Frontend Setup

```bash
# Navigate to frontend (from project root)
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

The frontend will be available at `http://localhost:3000`

---

## 🔐 Environment Variables

Create a `.env` file in the `backend/` directory:

```env
# Database Configuration
DATABASE_URL=postgresql://user:password@localhost:5432/smft_db
POSTGRES_USER=your_username
POSTGRES_PASSWORD=your_password
POSTGRES_DB=smft_db
POSTGRES_HOST=localhost
POSTGRES_PORT=5432

# Reddit API Credentials (for Reddit collector)
REDDIT_CLIENT_ID=your_reddit_client_id
REDDIT_CLIENT_SECRET=your_reddit_client_secret
REDDIT_USER_AGENT=SMFT/1.0
```

---

## 🔧 Utility Scripts

Located in the `scripts/` directory for automation and data management:

| Script | Description |
|---|---|
| `run_collector.py` | Execute the data collection pipeline |
| `run_analysis.py` | Run analysis across collected data |
| `generate_report.py` | Generate forensic investigation reports |
| `list_usernames.py` | List all tracked usernames in the database |
| `list_users_with_posts.py` | List users who have at least one post |
| `list_users_without_location.py` | Find users without location metadata |
| `print_user_coords.py` | Display latitude/longitude for all users |
| `update_user_locations.py` | Update location data for user records |
| `update_coords_for_users_with_posts.py` | Geocode locations for users with posts |
| `extract_user_locations_from_posts.py` | Extract geographic info from post text |
| `set_negative_sentiment.py` | Bulk-flag posts with negative sentiment |

**Usage:**
```bash
cd scripts
python run_collector.py
python run_analysis.py
python generate_report.py
```

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add your feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 📸 Output

### Data Collection
Collect public posts from multiple platforms with keyword search, configurable limits, and date filters. Data is hashed with SHA-256 for forensic integrity and can be exported as CSV, JSON, or hash manifest.

![Data Collection](screenshots/data_collection.jpg)

---

### Sentiment Analysis
Classify collected posts into Positive, Neutral, Negative, and Threat categories with confidence scores. Export results as CSV or JSON.

![Sentiment Analysis](screenshots/sentiment_analysis.jpg)

---

### Timeline Analysis
Visualize posting trends over time with interactive line charts. Detect peak activity periods and unusual posting patterns.

![Timeline Analysis](screenshots/timeline_analysis.jpg)

---

### Network Analysis
Map the social network of users with interactive force-directed graphs. Identify top influencers, detect clusters, and flag suspicious connection patterns.

![Network Analysis](screenshots/network_analysis.jpg)

---

### Interactive Network Graph
Explore user connections with a fully interactive graph — hover to highlight nodes, view group colors, and inspect user details.

![Interactive Network Graph](screenshots/network_graph.jpg)

---

### Geolocation Analysis
Visualize the locations of users with negative sentiment on an interactive Leaflet map. Export the map as a PNG image.

![Geolocation Analysis](screenshots/geolocation_analysis.jpg)

---

### Word Cloud
D3-powered word cloud visualization of trending keywords and hashtags extracted from collected posts. Download as image.

![Word Cloud](screenshots/word_cloud.jpg)

---

## 📬 Contact

For questions, issues, or collaboration:
- **GitHub:** [venkatbaddiputi](https://github.com/baddiputi)
- **Repository:** [Social-Media-Forensic-Tools](https://github.com/baddiputi/Social-Media-Forensic-Tools)

---

<p align="center">
  Built with ❤️ for Digital Forensics & Cybersecurity
</p>
