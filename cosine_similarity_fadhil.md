# Perhitungan Manual Cosine Similarity
## Aplikasi Rekomendasi Olahraga — Profil Pengguna (Fadhil)

---

## 1. Profil Pengguna (Berdasarkan Tangkapan Layar)

| Parameter | Nilai |
|-----------|-------|
| Usia | 31 tahun |
| Jenis Kelamin | Pria |
| Waktu Tersedia Harian | 30 menit |
| Tingkat Aktivitas / Pekerjaan | Tingkat Aktivitas Tinggi |
| Tujuan Kebugaran | Penurunan Berat Badan, Kebugaran Umum |
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
- A : Vektor A (profil pengguna)
- B : Vektor B (fitur latihan)
- A_i : nilai elemen ke-i dari vektor A
- B_i : nilai elemen ke-i dari vektor B
- Σ(A_i × B_i) : hasil dot product
- √Σ A_i² : magnitudo (panjang) vektor A
- √Σ B_i² : magnitudo (panjang) vektor B

---

## 3. Pembentukan Vektor (15 Dimensi)

### Dimensi Vektor

| Dimensi | Keterangan | Metode |
|---------|------------|--------|
| D1–D5 | Kategori Latihan (kardio, kekuatan, fleksibilitas, keseimbangan, hiit) | Bobot seragam 0.2 |
| D6–D8 | Intensitas (rendah, sedang, tinggi) | Dari tingkat aktivitas pengguna |
| D9–D13 | Tujuan Kebugaran (5 tujuan) | Biner: 1 jika dipilih, 0 jika tidak |
| D14 | Waktu Tersedia | min(waktu / 180, 1) |
| D15 | Usia | min(usia / 100, 1) |

---

### Vektor Profil Pengguna (Vektor A)

Vektor A dihitung berdasarkan parameter profil Fadhil:

- **D1–D5 (Kategori)**: Bobot seragam 0.2 untuk semua kategori → [0.2, 0.2, 0.2, 0.2, 0.2]
- **D6–D8 (Intensitas)**: Tingkat Aktivitas **Tinggi** → rendah=0.1, sedang=0.3, tinggi=0.6 → [0.1, 0.3, 0.6]
- **D9–D13 (Tujuan)**: Penurunan Berat Badan=1, Penambahan Otot=0, Ketahanan=0, Fleksibilitas=0, Kebugaran Umum=1 → [1, 0, 0, 0, 1]
- **D14 (Waktu Tersedia)**: min(30 / 180, 1) = **0.1667**
- **D15 (Usia)**: min(31 / 100, 1) = **0.31**

Sehingga diperoleh vektor A:

```
A = [0.2, 0.2, 0.2, 0.2, 0.2, 0.1, 0.3, 0.6, 1, 0, 0, 0, 1, 0.1667, 0.31]
     D1   D2   D3   D4   D5   D6   D7   D8   D9 D10 D11 D12 D13  D14    D15
```

#### Perhitungan Panjang Vektor A (√Σ A_i²):

```
Σ (A_i)² = 0.2² + 0.2² + 0.2² + 0.2² + 0.2²
          + 0.1² + 0.3² + 0.6²
          + 1²   + 0²   + 0²   + 0²   + 1²
          + 0.1667² + 0.31²

         = 0.04 + 0.04 + 0.04 + 0.04 + 0.04
         + 0.01 + 0.09 + 0.36
         + 1    + 0    + 0    + 0    + 1
         + 0.02779 + 0.0961

         = 0.2 + 0.46 + 1 + 1 + 0.12389
         = 2.78389

√Σ (A_i)² = √2.78389 = 1.6685
```

---

## 4. Perhitungan Latihan

### Kasus 1: Mesin Elipse (Elliptical) (ex16) — Skor Sistem: 84.79%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio → [1, 0, 0, 0, 0]
- **Intensitas**: Sedang → [0, 1, 0]
- **Manfaat**: Ketahanan, Penurunan Berat Badan, Kebugaran Umum → [1, 0, 1, 0, 1]
- **Durasi**: 30 menit → 30 / 60 = 0.5
- **Kalori**: 273 kkal → 273 / 800 = 0.34125

```
B = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.5, 0.34125]
     D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13  D14   D15
```

#### Perhitungan Panjang Vektor B (√Σ B_i²):
```
Σ (B_i)² = 1² + 0 + 0 + 0 + 0 + 0 + 1² + 0 + 1² + 0 + 1² + 0 + 1² + 0.5² + 0.34125²
         = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.11645
         = 5.36645

√Σ (B_i)² = √5.36645 = 2.3166
```

#### Perhitungan Dot Product (Σ A_i × B_i):
```
Posisi yang bernilai non-nol pada B: D1=1, D7=1, D9=1, D11=1, D13=1, D14=0.5, D15=0.34125

Σ A_i × B_i = (A1 × 1) + (A7 × 1) + (A9 × 1) + (A11 × 1) + (A13 × 1) + (A14 × 0.5) + (A15 × 0.34125)
            = (0.2 × 1) + (0.3 × 1) + (1 × 1) + (0 × 1) + (1 × 1) + (0.1667 × 0.5) + (0.31 × 0.34125)
            = 0.2 + 0.3 + 1 + 0 + 1 + 0.08335 + 0.10579
            = 2.68914
```

#### Perhitungan Cosine Similarity:
```
Cosine Similarity = Dot Product / (||A|| × ||B||)
                  = 2.68914 / (1.6685 × 2.3166)
                  = 2.68914 / 3.8652
                  = 0.6958
```

#### Normalisasi Skor (0–100%):
```
Skor Dasar = ((Cosine Similarity + 1) / 2) × 100
           = ((0.6958 + 1) / 2) × 100
           = (1.6958 / 2) × 100
           = 0.8479 × 100
           = 84.79%
```

#### Validasi Pelatih (Hipertensi):
- Mesin Elipse (Hipertensi) → Status: **Aman** → Faktor Pengali = **1.0**
- Skor Akhir: 84.79% × 1.0 = **84.79%** ✅ (Sesuai dengan sistem)

---

### Kasus 2: Tenis (ex25) — Skor Sistem: 81.58%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio → [1, 0, 0, 0, 0]
- **Intensitas**: Tinggi → [0, 0, 1]
- **Manfaat**: Ketahanan, Kebugaran Umum, Penurunan Berat Badan → [1, 0, 1, 0, 1]
- **Durasi**: 30 menit → 30 / 60 = 0.5
- **Kalori**: 273 kkal → 273 / 800 = 0.34125

```
B = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0.5, 0.34125]
     D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13  D14   D15
```

#### Perhitungan Panjang Vektor B (√Σ B_i²):
```
Σ (B_i)² = 1² + 1² + 1² + 1² + 1² + 0.5² + 0.34125²
         = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.11645
         = 5.36645

√Σ (B_i)² = √5.36645 = 2.3166
```

#### Perhitungan Dot Product (Σ A_i × B_i):
```
Posisi non-nol pada B: D1=1, D8=1, D9=1, D11=1, D13=1, D14=0.5, D15=0.34125

Σ A_i × B_i = (A1 × 1) + (A8 × 1) + (A9 × 1) + (A11 × 1) + (A13 × 1) + (A14 × 0.5) + (A15 × 0.34125)
            = (0.2 × 1) + (0.6 × 1) + (1 × 1) + (0 × 1) + (1 × 1) + (0.16667 × 0.5) + (0.31 × 0.34125)
            = 0.2 + 0.6 + 1 + 0 + 1 + 0.08333 + 0.10579
            = 2.98912
```

#### Perhitungan Cosine Similarity:
```
Cosine Similarity = 2.98912 / (1.6685 × 2.3166)
                  = 2.98912 / 3.8652
                  = 0.7733
```

#### Normalisasi Skor (0–100%):
```
Skor Dasar = ((0.7733 + 1) / 2) × 100
           = (1.7733 / 2) × 100
           = 88.665%
→ Dibulatkan sistem: Math.round(88.665 × 100) / 100 = 88.67%
```

#### Validasi Pelatih (Hipertensi):
- Tenis (Hipertensi) → Status: **Aman dengan Catatan** ("Batasi durasi dan hindari permainan kompetitif") → Faktor Pengali = **0.92**
- Sistem membulatkan skor dasar DULU: **88.67%**, lalu:
- Skor Akhir: 88.67% × 0.92 = 81.5764 → Math.round = **81.58%** ✅ (Sesuai dengan sistem)

> *Kunci: sistem menjalankan `Math.round(score × 100) / 100` pada skor dasar sebelum mengalikan faktor pelatih.*

---

### Kasus 3: Berjalan Santai (lambat) (ex5) — Skor Sistem: 81.49%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio → [1, 0, 0, 0, 0]
- **Intensitas**: Rendah → [1, 0, 0]
- **Manfaat**: Kebugaran Umum, Ketahanan, Penurunan Berat Badan → [1, 0, 1, 0, 1]
- **Durasi**: 30 menit → 30 / 60 = 0.5
- **Kalori**: 68 kkal → 68 / 800 = 0.085

```
B = [1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 0, 1, 0.5, 0.085]
     D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13  D14   D15
```

#### Perhitungan Panjang Vektor B (√Σ B_i²):
```
Σ (B_i)² = 1² + 1² + 1² + 1² + 1² + 0.5² + 0.085²
         = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.007225
         = 5.257225

√Σ (B_i)² = √5.257225 = 2.2929
```

#### Perhitungan Dot Product (Σ A_i × B_i):
```
Posisi non-nol pada B: D1=1, D6=1, D9=1, D11=1, D13=1, D14=0.5, D15=0.085

Σ A_i × B_i = (A1 × 1) + (A6 × 1) + (A9 × 1) + (A11 × 1) + (A13 × 1) + (A14 × 0.5) + (A15 × 0.085)
            = (0.2 × 1) + (0.1 × 1) + (1 × 1) + (0 × 1) + (1 × 1) + (0.16667 × 0.5) + (0.31 × 0.085)
            = 0.2 + 0.1 + 1 + 0 + 1 + 0.08333 + 0.02635
            = 2.40968
```

#### Perhitungan Cosine Similarity:
```
Cosine Similarity = 2.40968 / (1.66850 × 2.29286)
                  = 2.40968 / 3.82561
                  = 0.6299
```

#### Normalisasi Skor (0–100%):
```
Skor Dasar = ((0.62988 + 1) / 2) × 100
           = (1.62988 / 2) × 100
           = 81.494%
→ Dibulatkan sistem: Math.round(81.494 × 100) / 100 = 81.49%
```

#### Validasi Pelatih (Hipertensi):
- Berjalan Santai (Hipertensi) → Status: **Aman** → Faktor Pengali = **1.0**
- Skor Akhir: 81.49% × 1.0 = **81.49%** ✅ (Sesuai dengan sistem)

---

### Kasus 4: Bulu Tangkis (ex24) — Skor Sistem: 81.34%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio → [1, 0, 0, 0, 0]
- **Intensitas**: Tinggi → [0, 0, 1]
- **Manfaat**: Ketahanan, Kebugaran Umum, Penurunan Berat Badan → [1, 0, 1, 0, 1]
- **Durasi**: 30 menit → 30 / 60 = 0.5
- **Kalori**: 170 kkal → 170 / 800 = 0.2125

```
B = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0.5, 0.2125]
     D1 D2 D3 D4 D5 D6 D7 D8 D9 D10 D11 D12 D13  D14   D15
```

#### Perhitungan Panjang Vektor B (√Σ B_i²):
```
Σ (B_i)² = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.04516
         = 5.29516

√Σ (B_i)² = √5.29516 = 2.3011
```

#### Perhitungan Dot Product (Σ A_i × B_i):
```
Σ A_i × B_i = (0.2×1) + (0.6×1) + (1×1) + (0×1) + (1×1) + (0.16667×0.5) + (0.31×0.2125)
            = 0.2 + 0.6 + 1 + 0 + 1 + 0.08333 + 0.065875
            = 2.94921
```

#### Perhitungan Cosine Similarity:
```
Cosine Similarity = 2.94921 / (1.66850 × 2.30112)
                  = 2.94921 / 3.83942
                  = 0.7681
```

#### Normalisasi Skor (0–100%):
```
Skor Dasar = ((0.7681 + 1) / 2) × 100
           = (1.7681 / 2) × 100
           = 88.405%
→ Dibulatkan sistem: Math.round(88.405 × 100) / 100 = 88.41%
```

#### Validasi Pelatih (Hipertensi):
- Bulu Tangkis (Hipertensi) → Status: **Aman dengan Catatan** ("Batasi durasi dan hindari permainan kompetitif") → Faktor Pengali = **0.92**
- Skor Akhir: 88.41% × 0.92 = 81.3372 → Math.round = **81.34%** ✅ (Sesuai dengan sistem)

---

### Kasus 5: Lari Santai (Jogging) (ex7) — Skor Sistem: 78.01%

#### Vektor Fitur Latihan (Vektor B)
- **Kategori**: Kardio → [1, 0, 0, 0, 0]
- **Intensitas**: Sedang → [0, 1, 0]
- **Manfaat**: Ketahanan, Penurunan Berat Badan, Kebugaran Umum → [1, 0, 1, 0, 1]
- **Durasi**: 30 menit → 30 / 60 = 0.5
- **Kalori**: 273 kkal → 273 / 800 = 0.34125

```
B = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.5, 0.34125]
```
*(Vektor B identik dengan Mesin Elipse)*

- Panjang Vektor B = √5.36645 = **2.3166**
- Dot Product = **2.68912**
- Cosine Similarity = 2.68912 / 3.8652 = **0.6957**
- Skor Dasar = **84.785%**
- Dibulatkan sistem: Math.round(84.785 × 100) / 100 = **84.79%**

#### Validasi Pelatih (Hipertensi):
- Lari Santai (Hipertensi) → Status: **Aman dengan Catatan** ("Aman tetapi hindari intensitas tinggi") → Faktor Pengali = **0.92**
- Skor Akhir: 84.79% × 0.92 = 78.0068 → Math.round = **78.01%** ✅ (Sesuai dengan sistem)

---

## 5. Ringkasan Hasil Rekomendasi (Validasi Sistem)

| # | Nama Latihan | Dot Product | \|\|A\|\| | \|\|B\|\| | Cosine Similarity | Skor Dasar (bulat) | Status Pelatih | Skor Akhir |
|---|--------------|-------------|---------|---------|-------------------|--------------------|----------------|------------|
| 1 | Mesin Elipse (Elliptical) | 2.6891 | 1.6685 | 2.3166 | 0.6957 | 84.79% | Aman (×1.0) | **84.79%** |
| 2 | Tenis | 2.9891 | 1.6685 | 2.3166 | 0.7733 | 88.67% | Catatan (×0.92) | **81.58%** |
| 3 | Berjalan Santai (lambat) | 2.4097 | 1.6685 | 2.2929 | 0.6299 | 81.49% | Aman (×1.0) | **81.49%** |
| 4 | Bulu Tangkis | 2.9492 | 1.6685 | 2.3011 | 0.7681 | 88.41% | Catatan (×0.92) | **81.34%** |
| 5 | Lari Santai (Jogging) | 2.6891 | 1.6685 | 2.3166 | 0.6957 | 84.79% | Catatan (×0.92) | **78.01%** |

---

## 6. Perbedaan Utama dengan Profil Akhsan

| Parameter | Akhsan | Fadhil |
|-----------|--------|--------|
| Usia | 23 tahun | 31 tahun |
| Tingkat Aktivitas | Sedang | **Tinggi** |
| Tujuan Kebugaran | Penurunan Berat Badan | Penurunan Berat Badan + **Kebugaran Umum** |
| D6 (rendah) | 0.2 | **0.1** |
| D7 (sedang) | 0.5 | **0.3** |
| D8 (tinggi) | 0.3 | **0.6** |
| D13 (kebugaran-umum) | 0 | **1** |
| D15 (usia) | 0.23 | **0.31** |
| \|\|A\|\| | 1.2887 | **1.6685** |

Karena Fadhil memiliki **Tingkat Aktivitas Tinggi** (bobot D8=0.6) dan **dua tujuan** (D9=1, D13=1), vektor profilnya lebih besar (||A||=1.6685 vs 1.2887 Akhsan), sehingga skor cosine similarity terhadap latihan-latihan intensitas tinggi menjadi lebih besar pula.
