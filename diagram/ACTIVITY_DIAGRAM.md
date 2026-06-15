# Activity Diagram - Alur Pendaftaran Akun hingga Monitoring

## Deskripsi

Activity diagram ini menggambarkan alur lengkap penggunaan aplikasi rekomendasi olahraga, mulai dari pendaftaran akun hingga monitoring progres pengguna.

## Fase-Fase Utama

### 1. **Autentikasi**
- User dapat login jika sudah punya akun
- Atau melakukan registrasi dengan mengisi form
- Sistem membuat akun baru dan UserProfile default

### 2. **Setup Profil**
- Jika profil belum lengkap, user diarahkan untuk mengisi data profil
- Data yang diisi: usia, jenis kelamin, tingkat kebugaran, tujuan, waktu tersedia, kondisi kesehatan
- Sistem menyimpan UserProfile

### 3. **Rekomendasi Latihan**
- Sistem memuat UserProfile
- Sistem menghitung rekomendasi menggunakan algoritma scoring
- Sistem menampilkan 5 rekomendasi teratas

### 4. **Sesi Latihan**
- User dapat melihat tutorial sebelum memulai latihan
- User memulai sesi latihan dengan timer
- Sistem menghitung waktu dan kalori secara real-time
- Setelah selesai, sistem menyimpan progres dan update statistik

### 5. **Monitoring Progres**
- User dapat melihat statistik progres
- Sistem menampilkan grafik dan chart
- User dapat export data dalam format JSON

## Cara Melihat Diagram

### Menggunakan VS Code
1. Install extension "PlantUML" (by jebbs)
2. Buka file `activity_diagram.puml`
3. Tekan `Alt+D` untuk preview
4. Atau klik kanan → "Preview Current Diagram"

### Menggunakan Online Editor
1. Kunjungi: http://www.plantuml.com/plantuml/
2. Copy isi file `activity_diagram.puml`
3. Paste ke editor online
4. Diagram akan otomatis ter-render

### Export sebagai Gambar
- Di VS Code: Klik kanan pada preview → "Export Current Diagram"
- Pilih format: PNG, SVG, atau PDF

## Notasi yang Digunakan

- **Start/Stop**: Titik awal dan akhir aktivitas
- **Activity**: Aktivitas yang dilakukan
- **Decision**: Keputusan (if/then/else)
- **Partition**: Pengelompokan fase-fase
- **Repeat Loop**: Perulangan aktivitas
- **Note**: Catatan tambahan

## Alur Utama

```
Start
  ↓
Autentikasi (Login/Register)
  ↓
Setup Profil (jika belum lengkap)
  ↓
Rekomendasi Latihan
  ↓
Sesi Latihan (dengan loop)
  ↓
Monitoring Progres (opsional)
  ↓
Stop
```

## Catatan Penting

1. **Algoritma Rekomendasi**: Sistem menggunakan scoring berdasarkan:
   - Fitness Level (20 poin)
   - Goals Alignment (30 poin)
   - Time Availability (20 poin)
   - User Interaction (30 poin)
   - Category Diversity (10 poin)

2. **Penyimpanan Progres**: Setiap latihan yang diselesaikan akan:
   - Update completedExercises
   - Update dailyLogs dengan tanggal, latihan, kalori, waktu
   - Update totalCaloriesBurned
   - Update totalExercisesCompleted
   - Recalculate streak (current dan longest)

3. **Interaksi User**: User dapat:
   - Menambahkan latihan ke favorit
   - Melewati latihan tertentu
   - Refresh rekomendasi
   - Melihat dan export progres




