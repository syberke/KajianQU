﻿# 📖 KajianQu - Platform Ekosistem Islami & AI Tahsin

**KajianQu** adalah platform komprehensif yang menggabungkan manajemen konten islami, pembelajaran kitab, dan teknologi AI untuk koreksi bacaan Al-Qur'an (Tahsin).

---

## 🚀 Fitur Utama

* **Multi-Role User:** Sistem akses berbeda untuk **Admin**, **Asatidz** (dengan kode unik), dan **User**.
* **AI Tahsin Engine:** Evaluasi bacaan Al-Qur'an secara *real-time* menggunakan model *Wav2Vec2*.
* **Perpustakaan Digital:** Manajemen Kitab, Bab, dan integrasi video pembelajaran (YouTube) beserta rangkuman otomatis.
* **Live Class & Private:** Fitur kelas online dengan interaksi *real-time*, *voice chat*, dan *whiteboard* (corat-coret) untuk Asatidz.
* **Sistem Donasi:** Pengelolaan Infaq, Sodaqoh, dan Wakaf yang terintegrasi dengan verifikasi Admin serta bukti transfer.
* **Bahtsul Masail & Muamalat:** Ruang diskusi topik krusial dengan referensi artikel dan video.
* **Quotes Islami:** Galeri kutipan harian yang inspiratif.

---

## 🛠️ Arsitektur Teknologi

Proyek ini menggunakan arsitektur **Hybrid Backend** untuk memaksimalkan stabilitas dan performa:

* **Django (Core/Admin):** Menangani User Management, Database Relasional, Autentikasi, dan Dashboard Admin.
* **FastAPI (AI Engine):** Menangani pemrosesan audio AI yang berat dan *WebSockets* untuk fitur Live.
* **Database:** PostgreSQL (Relational Database).
* **AI Model:** `wav2vec2`.

---

## 📁 Struktur Folder

```
proyek-kajianku/
├── Backend/               # Core Logic & User Management
├── fast_api/             # AI Engine & Real-time Services
├── venv/                 # Virtual Environment (Shared)
├── .env                  # Configuration & Secrets
└── requirements.txt      # Dependencies List
```

 ## 💻 Cara Instalasi (Lokal)
 * **1. Clone & Persiapan**
Bash
git clone [https://github.com/username/kajianqu.git](https://github.com/username/kajianqu.git)
cd kajianqu
* **2. Setup Virtual Environment**
```
python -m venv venv
.\venv\Scripts\activate
pip install -r requirements.txt
```
* **3. Konfigurasi Database**
Buat file .env di root folder dan isi sesuai dengan kredensial PostgreSQL kamu:

```
DB_NAME=kajianqu_db
DB_USER=postgres
DB_PASSWORD=password_kamu
DB_HOST=127.0.0.1
DB_PORT=5432
```
* **4. Menjalankan Django (Port 8000)**
```
cd Django
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
* **5. Menjalankan FastAPI (Port 8080)**
Buka terminal baru, aktifkan venv, lalu jalankan:
```
cd fast_api
uvicorn main:app --port 8080 --reload
```
## 🧪 Testing API
```
Django Admin: http://127.0.0.1:8000/admin (Kelola data & verifikasi)
FastAPI Swagger: http://127.0.0.1:8080/docs (Test AI Tahsin)
```
👨‍💻 Kontributor
Ahmad Dahlan - Founder

Qiageng Berke Jaisyurrohman - Fullstack Developer & AI Specialist

Akram Mujjaman Raton - Fullstack Developer & AI Specialist

Nur Yusuf Ferdiansyah - UI/UX

© 2026 KajianQu Team. All Rights Reserved.


