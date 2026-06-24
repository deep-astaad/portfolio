# Aman Deep Singh - Portfolio & Interactive CV

Welcome to my personal portfolio and interactive CV! This is a highly polished, desktop-optimized, responsive web application designed with standard modern React, Tailwind CSS, and Framer Motion. It acts as both a developer showcase and a print-optimized digital resume.

🚀 **Live Preview:** [https://deep-astaad.github.io/portfolio/](https://deep-astaad.github.io/portfolio/) *(or your configured GitHub Pages URL)*

---

## 🛠️ Technology Stack

- **Frontend:** React 18 (TypeScript)
- **Bundler & Build Tool:** Vite
- **Styling:** Tailwind CSS (Modern `@import` syntax)
- **Animations:** Framer Motion (`motion/react`)
- **Icons:** Lucide React
- **CI/CD:** GitHub Actions (Node.js 22 Workflow)

---

## ✨ Key Features

### 1. Interactive Resume & Printable CV
- **Visual Modal:** Access a gorgeous, layered digital resume representation directly in-app.
- **Print & PDF Export Optimized:** Styled using sophisticated `@media print` stylesheets. When printed (or saved as a PDF), the layout dynamically converts to a clean, elegant black-and-white grid, removing interactive UI components and wrapping lines perfectly over multiple pages.
- *Tip:* For absolute pixel-perfect printing/saving, open the applet in a separate window or tab before invoking the print command (`Ctrl+P` or `Cmd+P`).

### 2. Career Path Timeline
- **Software Engineer (Full-Time):** Oct 2024 – Present | SMS DataTech Corporation (Tokyo, Japan)
  - Focused on scaling distributed architectures on AWS, REST API optimization, and real-time backend pipelines.
- **Software Engineer Intern:** July 2023 – Sept 2024 | SMS DataTech Corporation (Tokyo, Japan)
  - Designed self-healing log aggregation mechanisms and custom telemetry systems.

### 3. Core Skills Inventory
Organized categories including:
- **Languages:** Python, Go, C/C++, SQL, JavaScript
- **Frameworks:** Django, FastAPI, Celery, Scrapy
- **Databases:** PostgreSQL, MySQL, RDS/Aurora, Redis
- **AI Assisted Development:** Claude Code, Codex, Antigravity, OpenCode

### 4. Verified Certifications
- **Supervised Machine Learning: Regression and Classification** (Coursera / Stanford / DeepLearning.AI)
- **AWS Certified Solutions Architect – Associate**
- **AWS Certified CloudOps Engineer – Associate**

### 5. Technical Blogs
- Embedded custom technical writing pieces with interactive filtering tags, view tracking, and user-friendly visual styling.
- Features a clean, custom author profile utilizing my actual local profile asset (`src/profile.png`).

---

## 🚀 GitHub Actions CI/CD Deployment

The repository includes a modern, zero-config deployment pipeline using GitHub Actions (`.github/workflows/deploy.yml`) built on **Node.js 22**. 

On every push to `master` / `main`, the workflow:
1. Clones the repository.
2. Sets up a Node 22 environment.
3. Installs dependencies securely.
4. Generates a production build in `./dist`.
5. Uploads and deploys the bundle directly to **GitHub Pages**.

### Setting Up GitHub Pages
1. Push your code to your GitHub repository.
2. In your GitHub repository settings, navigate to **Settings** > **Pages**.
3. Under **Build and deployment**, set the **Source** to **GitHub Actions**.
4. The workflow will automatically handle building and publishing your static site to `https://<your-username>.github.io/<repository-name>/`.

---

## 💻 Local Development

To run this project locally, clone the repository and run:

```bash
# Install dependencies
npm install

# Start the dev server
npm run dev

# Run typescript linter verification
npm run lint

# Build for production
npm run build
```
