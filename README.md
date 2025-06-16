# 🐾 Wildify – Wildlife Research Datasheet Manager

Wildify is a cloud-based web application built to assist wildlife researchers in managing, storing, and analyzing field datasheets. By eliminating traditional paper-based data collection, Wildify ensures secure, scalable, and accessible storage of vital ecological data.

## 🌐 Overview

The goal of Wildify is to streamline wildlife research operations by providing:

- Digital forms for field data entry
- Secure storage of scanned datasheets and CSV files
- Role-based access for collaboration
- Real-time data analytics and visualization
- Cloud hosting using AWS for reliability and scalability

## 🚀 Features

- 🔐 **Authentication & Access Control** – Role-based access for Admins, Researchers, and Reviewers
- 📤 **Data Upload** – Upload field observations through forms or CSVs
- 🧾 **Scanned Datasheet Storage** – Store digitized field notes for archival and analysis
- 📊 **Data Visualization** – View charts and analytics on dashboard
- 🔍 **Advanced Search** – Filter by species, date, researcher, and more
- 📦 **Export Functionality** – Download datasets and reports for research usage

## 🧠 Technologies Used

| Layer       | Tech Stack                             |
|-------------|----------------------------------------|
| Frontend    | React.js, HTML5, CSS3, JavaScript      |
| Backend     | Node.js, Express.js                    |
| Database    | MySQL (via MySQL Workbench)            |
| Hosting     | AWS EC2                                |
| Authentication | AWS IAM / OAuth 2.0                 |
| Data Format | JSON, CSV, Scanned PDF/Images          |
| Protocols   | HTTPS, REST API, JWT for Auth          |


## ⚙️ Installation & Setup

### 1️⃣ Prerequisites

- Node.js & npm
- MySQL server (local or cloud)
- AWS account (for deployment)
- Git

### 2️⃣ Clone the Repository

```bash
git clone https://github.com/your-username/wildify.git
cd wildify
3️⃣ Setup Environment Variables
Create a .env file in the backend/ directory using the .env.example provided:

env
Copy
Edit
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=wildify_db
JWT_SECRET=your_jwt_secret
4️⃣ Start the Frontend
bash
Copy
Edit
cd frontend
npm install
npm run start:frontend
5️⃣ Start the Backend
bash
Copy
Edit
cd backend
npm install
node index.js
Make sure your MySQL server is running and the wildify_db database is created.

📊 System Design
User Types

Admin – Manage users and data

Researcher – Submit and analyze data

Reviewer – Read-only access to data

Data Structure

Observations: species name, count, location, timestamp

Metadata: temperature, humidity, researcher details

File uploads: scanned field datasheets, CSVs

🔐 Security Features
AES-256 encryption for stored data

HTTPS-enabled communication

JWT-based secure login

Multi-Factor Authentication (MFA) for sensitive accounts

Automated backups and logging

📈 Performance Targets
Support for 500+ concurrent users

Query response time <2s

Scalable backend via containerization (future enhancement)

🔧 Future Enhancements
📱 Mobile app with offline data collection support

🤖 AI-powered species recognition from images

🔔 Automated notifications for new insights or observations

🗂️ Integration with GIS tools for geospatial analysis

📌 References
Nielsen, J. (1994). Usability Engineering

Holovaty & Kaplan-Moss. (2009). The Definitive Guide to Django

Grinberg, M. (2018). Flask Web Development

Sullivan, B. L. et al. (2014). The eBird enterprise

Amazon Web Services Documentation

📝 Conclusion
Wildify offers a comprehensive and user-friendly platform for wildlife data management. It combines powerful analytics with intuitive design, ensuring researchers can focus on fieldwork while the system handles storage, security, and collaboration. By going digital, Wildify aims to modernize biodiversity conservation efforts and facilitate data-driven decision-making in ecological research.

