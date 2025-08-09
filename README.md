# Travel Blog Dashboard

Proyek ini adalah aplikasi dashboard untuk mengelola **artikel**, **kategori**, dan **komentar** dalam platform blog bertema travel.  
Aplikasi dibangun menggunakan **React + TypeScript**, **Vite**, dan **Tailwind CSS** dengan komponen UI dari **Shadcn/UI**.

## 🚀 Fitur Utama

### 1. Artikel

- Menampilkan daftar artikel dengan pagination.
- Fitur pencarian artikel.
- Fitur filter berdasarkan kategori.
- Detail artikel lengkap.
- Form untuk membuat dan mengedit artikel.
- Upload gambar artikel.

### 2. Kategori

- Menampilkan daftar kategori dengan pagination.
- Menambahkan kategori baru.
- Mengedit kategori yang sudah ada.
- Menghapus kategori.

### 3. Komentar

- Menampilkan komentar untuk setiap artikel.
- Menambahkan komentar baru.
- Mengedit komentar yang sudah ada.
- Menghapus komentar.

### 4. Autentikasi

- Login dan register.
- Proteksi halaman dashboard menggunakan route terautentikasi.

---

## 📂 Struktur Proyek

src/
├── components/ # Komponen UI dan spesifik fitur <br/>
├── hooks/ # Custom hooks untuk articles, categories, comments
├── pages/ # Halaman aplikasi
├── services/ # API service untuk komunikasi dengan backend
├── lib/ # Utility functions dan config
├── constant/ # Data konstan
└── types/ # TypeScript type definitions

---

## 🔄 Fitur yang Belum Diimplementasikan

### 1. Global State Management dengan **Zustand**

Saat ini, state untuk artikel, kategori, dan komentar masih dikelola di masing-masing hooks.  
Rencana implementasi:

- **articleStore** → Menyimpan state & actions terkait artikel.
- **categoryStore** → Menyimpan state & actions terkait kategori.
- **commentStore** → Menyimpan state & actions terkait komentar.

Keuntungan:

- State lebih terpusat, mudah diakses dari mana saja.
- Mempermudah sinkronisasi data antar halaman/komponen.
- Mengurangi duplikasi logika API call di berbagai hooks.

### 2. Pencarian dengan **Debounce**

Fitur pencarian saat ini langsung memanggil API setiap kali input berubah.  
Yang belum di implementasi:

- Menambahkan debounce agar API hanya dipanggil setelah user berhenti mengetik selama interval tertentu (misalnya 500ms).
- Meningkatkan performa dan mengurangi beban server.

Implementasi `debounce` dapat memanfaatkan:

- Utility `debounce` manual.
- Atau library seperti `lodash.debounce`.

---

## 📌 Catatan Implementasi Mendatang

Jika implementasi Zustand berhasil:

- Logic yang ada di `src/hooks/useArticles.ts` akan dipindahkan ke `articleStore`.
- Logic yang ada di `src/hooks/useCategory.ts` akan dipindahkan ke `categoryStore`.
- Logic yang ada di `src/hooks/useComments.ts` akan dipindahkan ke `commentStore`.

---

## 🛠️ Tech Stack

- **React + TypeScript**
- **Vite**
- **Tailwind CSS**
- **Shadcn/UI**
- **Zustand** (planned)
- **Lodash.debounce** (planned)
- **JWT Authentication**
- **REST API Services**

---

## 📦 Instalasi

```bash
# Clone repository
git clone <repo-url>

# Masuk ke folder project
cd travel

# Install dependencies
npm install

# Jalankan aplikasi
npm run dev
```
