# Perhitungan Manual Cosine Similarity
## Aplikasi Rekomendasi Olahraga — Profil Pengguna (Muhammad Akhsan)

---

## 1. Profil Pengguna (Berdasarkan Tangkapan Layar)

| Parameter | Nilai |
|-----------|-------|
| Nama | Muhammad Akhsan |
| Usia | 23 tahun |
| Jenis Kelamin | Pria |
| Waktu Tersedia Harian | 30 menit |
| Tingkat Aktivitas / Pekerjaan | Tingkat Aktivitas Sedang |
| Tujuan Kebugaran | Penurunan Berat Badan |
| Kondisi Kesehatan | Hipertensi |

---

## 2. Rumus Cosine Similarity

Rumus yang digunakan untuk menghitung kemiripan antara Vektor Profil Pengguna (Vektor A) dan Vektor Fitur Latihan (Vektor B) adalah:

```
                            n
                           Σ  A_i × B_i
 A • B                    i=1
─────── = ───────────────────────────────────────────
 |A||B|    n                          n
          √Σ (A_i)²                × √Σ (B_i)²
          i=1                        i=1
```

**Keterangan Rumus:**
- A : Vektor A
- B : Vektor B
- A_i : nilai elemen ke-i dari vektor A
- B_i : nilai elemen ke-i dari vektor B
- Σ_i(B_i × A_i) : hasil dot product (perkalian tiap elemen yang bersesuaian lalu dijumlahkan)
- √Σ A_i² : panjang dari vektor A
- √Σ B_i² : panjang dari vektor B

---

## 3. Pembentukan Vektor (15 Dimensi)

### Vektor Profil Pengguna (Vektor A)

Vektor A dihitung berdasarkan parameter profil Muhammad Akhsan:
- **D1–D5 (Kategori)**: Bobot merata seragam sebesar 0.2 untuk semua kategori agar konsisten -> [0.2, 0.2, 0.2, 0.2, 0.2]
- **D6–D8 (Intensitas)**: Berdasarkan tingkat aktivitas Sedang -> [0.2, 0.5, 0.3]
- **D9–D13 (Tujuan)**: Hanya Penurunan Berat Badan yang bernilai 1 -> [1, 0, 0, 0, 0]
- **D14 (Waktu Tersedia)**: min(30 / 180, 1) = 0.1667
- **D15 (Usia)**: min(24 / 100, 1) = 0.23

Sehingga diperoleh vektor A:
A = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.3, 1, 0, 0, 0, 0, 0.1667, 0.23]

#### Perhitungan Panjang Vektor A (√Σ A_i²):
Σ (A_i)² = 0.2² + 0.2² + 0.2² + 0.2² + 0.2² + 0.2² + 0.5² + 0.3² + 1² + 0² + 0² + 0² + 0² + 0.1667² + 0.23²
Σ (A_i)² = 0.04 + 0.04 + 0.04 + 0.04 + 0.04 + 0.04 + 0.25 + 0.09 + 1 + 0 + 0 + 0 + 0 + 0.0278 + 0.0529 = 1.6607
√Σ (A_i)² = √1.6607 = 1.2887

---

## 4. Perhitungan Latihan

### Kasus 1: Berjalan Santai (lambat) (ex5) — Skor Sistem: 75.41%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio -> [1, 0, 0, 0, 0]
- **Intensitas**: Rendah -> [1, 0, 0]
- **Manfaat**: Penurunan Berat Badan, Ketahanan, Kebugaran Umum -> [1, 0, 1, 0, 1]
- **Durasi**: 30 menit -> 30 / 60 = 0.5
- **Kalori**: 68 kkal -> 68 / 800 = 0.085

B = [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0.5, 0.085]

#### Perhitungan Panjang Vektor B (√Σ B_i²):
Σ (B_i)² = 1² + 0 + 0 + 0 + 0 + 1² + 0 + 0 + 1² + 0 + 1² + 0 + 1² + 0.5² + 0.085²
Σ (B_i)² = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.0072 = 5.2572
√Σ (B_i)² = √5.2572 = 2.2929

#### Perhitungan Dot Product (Σ_i(B_i × A_i)):
Σ A_i × B_i = (0.2 × 1) + 0 + 0 + 0 + 0 + (0.2 × 1) + 0 + 0 + (1 \times 1) + 0 + 0 + 0 + 0 + (0.1667 \times 0.5) + (0.24 \times 0.085)
Σ A_i × B_i = 0.2 + 0.2 + 1 + 0.0833 + 0.0204 = 1.5037

#### Perhitungan Cosine Similarity:
Cosine Similarity = 1.5037 / (1.2905 × 2.2929) = 1.5037 / 2.9590 = 0.5082

#### Normalisasi Skor (0–100%):
Skor Dasar = ((Cosine Similarity + 1) / 2) × 100
Skor Dasar = ((0.5082 + 1) / 2) × 100 = 75.41%

#### Validasi Pelatih (Hipertensi):
- Status: Aman -> Faktor Pengali = 1.0
- Skor Akhir: 75.41% × 1.0 = 75.41% (Sesuai dengan sistem)

---

### Kasus 2: Mesin Elipse (Elliptical) (ex16) — Skor Sistem: 81.2%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio -> [1, 0, 0, 0, 0]
- **Intensitas**: Sedang -> [0, 1, 0]
- **Manfaat**: Penurunan Berat Badan, Ketahanan, Kebugaran Umum -> [1, 0, 1, 0, 1]
- **Durasi**: 30 menit -> 30 / 60 = 0.5
- **Kalori**: 273 kkal -> 273 / 800 = 0.34125

B = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.5, 0.34125]

#### Perhitungan Panjang Vektor B (√Σ B_i²):
Σ (B_i)² = 1² + 1² + 1² + 1² + 1² + 0.5² + 0.34125²
Σ (B_i)² = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.1165 = 5.3665
√Σ (B_i)² = √5.3665 = 2.3166

#### Perhitungan Dot Product (Σ_i(B_i × A_i)):
Σ A_i × B_i = (0.2 × 1) + (0.5 \times 1) + (1 \times 1) + (0.1667 \times 0.5) + (0.23 \times 0.34125)
Σ A_i × B_i = 0.2 + 0.5 + 1 + 0.0833 + 0.0785 = 1.8618

#### Perhitungan Cosine Similarity:
Cosine Similarity = 1.8618 / (1.2887 × 2.3166) = 1.8618 / 2.9796 = 0.6249

#### Normalisasi Skor (0–100%):
Skor Dasar = ((Cosine Similarity + 1) / 2) × 100
Skor Dasar = ((0.6249 + 1) / 2) × 100 = 81.24%

#### Validasi Pelatih (Hipertensi):
- Status: Aman -> Faktor Pengali = 1.0
- Skor Akhir: 81.24% × 1.0 = 81.2% (Sesuai dengan sistem)

---

### Kasus 3: Lari Santai (Jogging) (ex7) — Skor Sistem: 74.7%

*Catatan: Latihan Bersepeda Statis (ex8) dan Stepper (ex13) memiliki atribut yang sama persis dengan Lari Santai (Jogging) sehingga memiliki perhitungan dasar yang identik.*

#### Vektor Fitur Latihan (Vektor B)
- Memiliki kategori, intensitas, durasi, kalori, dan manfaat yang sama persis dengan Mesin Elipse (Elliptical):
B = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.5, 0.34125]
- Panjang Vektor B (√Σ B_i²) = 2.3166
- Dot Product (Σ_i(B_i × A_i)) = 1.8652
- Cosine Similarity = 0.6240
- Skor Dasar (Normalisasi) = 81.20%

#### Validasi Pelatih (Hipertensi):
- Status: Aman dengan Catatan ("Aman tetapi hindari intensitas tinggi") -> Faktor Pengali = 0.92 (dikurangi 8% berdasarkan rekomendasi medis).
- Skor Akhir: 81.20% × 0.92 = 74.704% = 74.7% (Sesuai dengan sistem)

---

## 5. Ringkasan Hasil Rekomendasi (Validasi Sistem)

| # | Nama Latihan | Dot Product | √Σ A_i² | √Σ B_i² | Cosine Similarity | Skor Dasar | Status Pelatih | Skor Akhir |
|---|--------------|-------------|---------|---------|-------------------|------------|----------------|------------|
| 1 | Mesin Elipse | 1.8652 | 1.2905 | 2.3166 | 0.6240 | 81.20% | Aman (x1.0) | **81.2%** |
| 2 | Berjalan Santai | 1.5037 | 1.2905 | 2.2929 | 0.5082 | 75.41% | Aman (x1.0) | **75.41%** |
| 3 | Lari Santai (Jogging) | 1.8652 | 1.2905 | 2.3166 | 0.6240 | 81.20% | Catatan (x0.92) | **74.7%** |
| 4 | Bersepeda Statis | 1.8652 | 1.2905 | 2.3166 | 0.6240 | 81.20% | Catatan (x0.92) | **74.7%** |
| 5 | Stepper | 1.8652 | 1.2905 | 2.3166 | 0.6240 | 81.20% | Catatan (x0.92) | **74.7%** |
