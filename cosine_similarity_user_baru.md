# Perhitungan Manual Cosine Similarity
## Aplikasi Rekomendasi Olahraga — Profil Pengguna (alamsyah)

---

## Profil Pengguna

| Parameter | Nilai |
|-----------|-------|
| Nama | alamsyah |
| Usia | 21 tahun |
| Jenis Kelamin | Pria |
| Waktu Tersedia Harian | 30 menit |
| Tingkat Aktivitas / Pekerjaan | Tingkat Aktivitas Tinggi |
| Tujuan Kebugaran | Penurunan Berat Badan |
| Kondisi Kesehatan | Hipertensi |

---

## Daftar Hasil Rekomendasi (dari Aplikasi)

| # | Nama Latihan | Kategori | Intensitas | Kalori/30min | Skor Kesesuaian |
|---|-------------|----------|------------|-------------|-----------------|
| 1 | Sepak Bola | Kardio | Tinggi | 273 kal | **82.06%** |
| 2 | HIIT | HIIT | Tinggi | 239 kal | **82%** |
| 3 | Bola Basket | Kardio | Tinggi | 205 kal | **81.92%** |
| 4 | Lompat Tali | Kardio | Sedang | 341 kal | **77.27%** |
| 5 | Mesin Elipse (Elliptical) | Kardio | Sedang | 273 kal | **77.14%** |

---

## Struktur Vektor (15 Dimensi)

| # | Dimensi | Keterangan |
|---|---------|------------|
| D1–D5 | Kategori (5) | kardio, kekuatan, fleksibilitas, keseimbangan, hiit |
| D6–D8 | Intensitas (3) | rendah, sedang, tinggi |
| D9–D13 | Tujuan (5) | penurunan-berat-badan, penambahan-otot, ketahanan, fleksibilitas, kebugaran-umum |
| D14 | Waktu / Durasi (1) | dinormalisasi |
| D15 | Usia / Kalori (1) | dinormalisasi |

---

## Konstanta Normalisasi

```
MAX_AVAILABLE_TIME = 180  (waktu tersedia pengguna)
MAX_DURATION       = 60   (durasi latihan)
MAX_AGE            = 100  (usia pengguna)
MAX_CALORIES       = 800  (kalori latihan)
```

Preferensi Intensitas berdasarkan Tingkat Aktivitas:
```
ACTIVITY_INTENSITY_PREFERENCE['tinggi'] = {
  rendah: 0.1,
  sedang: 0.3,
  tinggi: 0.6
}
```

---

## LANGKAH 1: Pembentukan Vektor Pengguna (U)

### D1–D5: Bobot Kategori (merata)

| Dimensi | Kategori | Nilai |
|---------|----------|-------|
| D1 | Kardio | **0.20** |
| D2 | Kekuatan | **0.20** |
| D3 | Fleksibilitas | **0.20** |
| D4 | Keseimbangan | **0.20** |
| D5 | HIIT | **0.20** |

### D6–D8: Bobot Intensitas (dari tingkat aktivitas tinggi)

| Dimensi | Intensitas | Nilai |
|---------|-----------|-------|
| D6 | Rendah | **0.10** |
| D7 | Sedang | **0.30** |
| D8 | Tinggi | **0.60** |

### D9–D13: Tujuan Kebugaran (biner)

| Dimensi | Tujuan | Dipilih? | Nilai |
|---------|--------|----------|-------|
| D9 | Penurunan Berat Badan | ✅ | **1** |
| D10 | Penambahan Otot | ❌ | **0** |
| D11 | Ketahanan | ❌ | **0** |
| D12 | Fleksibilitas | ❌ | **0** |
| D13 | Kebugaran Umum | ❌ | **0** |

### D14: Waktu Tersedia

```
D14 = min(30 / 180, 1) = 0.1667
```

### D15: Usia

```
D15 = min(21 / 100, 1) = 0.21
```

### Vektor Pengguna (U):

```
U = [0.20, 0.20, 0.20, 0.20, 0.20, 0.10, 0.30, 0.60, 1.00, 0.00, 0.00, 0.00, 0.00, 0.1667, 0.21]
```

---

## LANGKAH 2–8: Perhitungan Cosine Similarity Setiap Latihan

### Rumus yang Digunakan

```
Dot Product:        A · B = Σ Aᵢ × Bᵢ
Magnitude:          ||A|| = √(Σ Aᵢ²)
Cosine Similarity:  cos(θ) = (A · B) / (||A|| × ||B||)
Normalisasi:        skor = ((cos(θ) + 1) / 2) × 100
```

### Magnitude Vektor Pengguna (||U||) — digunakan untuk semua latihan:

```
||U||² = 0.20² + 0.20² + 0.20² + 0.20² + 0.20²
       + 0.10² + 0.30² + 0.60²
       + 1.00² + 0² + 0² + 0² + 0²
       + 0.1667² + 0.21²

     = 0.04 + 0.04 + 0.04 + 0.04 + 0.04
       + 0.01 + 0.09 + 0.36
       + 1.00 + 0 + 0 + 0 + 0
       + 0.0278 + 0.0441

     = 1.7319

||U|| = √1.7319 = 1.3160
```

---

### 1. Sepak Bola (ex30) — Skor: 82.06%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Tinggi |
| Benefits | ketahanan, penurunan-berat-badan, kebugaran-umum |
| Kalori | 273 kal |

**Vektor Latihan:**
```
E = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0.50, 0.3413]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 1 | **0.2000** |
| D2 (kekuatan) | 0.20 | 0 | 0 |
| D3 (fleksibilitas) | 0.20 | 0 | 0 |
| D4 (keseimbangan) | 0.20 | 0 | 0 |
| D5 (hiit) | 0.20 | 0 | 0 |
| D6 (rendah) | 0.10 | 0 | 0 |
| D7 (sedang) | 0.30 | 0 | 0 |
| D8 (tinggi) | 0.60 | 1 | **0.6000** |
| D9 (penurunan BB) | 1.00 | 1 | **1.0000** |
| D10 (penambahan otot) | 0 | 0 | 0 |
| D11 (ketahanan) | 0 | 1 | 0 |
| D12 (fleksibilitas) | 0 | 0 | 0 |
| D13 (kebugaran umum) | 0 | 1 | 0 |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0834** |
| D15 (usia/kalori) | 0.21 | 0.3413 | **0.0717** |

```
U · E = 0.2000 + 0.6000 + 1.0000 + 0.0834 + 0.0717 = 1.9551

||E||² = 1 + 0 + 0 + 0 + 0 + 0 + 0 + 1 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.1165 = 5.3665
||E||  = √5.3665 = 2.3166

cos(θ) = 1.9551 / (1.3160 × 2.3166) = 1.9551 / 3.0486 = 0.6413
skor   = ((0.6413 + 1) / 2) × 100 = 82.06%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 82.06%
```

---

### 2. HIIT (ex4) — Skor: 82%

| Atribut | Nilai |
|---------|-------|
| Kategori | HIIT |
| Intensitas | Tinggi |
| Benefits | penurunan-berat-badan, ketahanan, kebugaran-umum |
| Kalori | 239 kal |

**Vektor Latihan:**
```
E = [0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0.50, 0.2988]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 0 | 0 |
| D2 (kekuatan) | 0.20 | 0 | 0 |
| D3 (fleksibilitas) | 0.20 | 0 | 0 |
| D4 (keseimbangan) | 0.20 | 0 | 0 |
| D5 (hiit) | 0.20 | 1 | **0.2000** |
| D6 (rendah) | 0.10 | 0 | 0 |
| D7 (sedang) | 0.30 | 0 | 0 |
| D8 (tinggi) | 0.60 | 1 | **0.6000** |
| D9 (penurunan BB) | 1.00 | 1 | **1.0000** |
| D10 (penambahan otot) | 0 | 0 | 0 |
| D11 (ketahanan) | 0 | 1 | 0 |
| D12 (fleksibilitas) | 0 | 0 | 0 |
| D13 (kebugaran umum) | 0 | 1 | 0 |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0834** |
| D15 (usia/kalori) | 0.21 | 0.2988 | **0.0627** |

```
U · E = 0.2000 + 0.6000 + 1.0000 + 0.0834 + 0.0627 = 1.9461

||E||² = 0 + 0 + 0 + 0 + 1 + 0 + 0 + 1 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.0893 = 5.3393
||E||  = √5.3393 = 2.3108

cos(θ) = 1.9461 / (1.3160 × 2.3108) = 1.9461 / 3.0410 = 0.6400
skor   = ((0.6400 + 1) / 2) × 100 = 82.00%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 82.00%
```

---

### 3. Bola Basket (ex28) — Skor: 81.92%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Tinggi |
| Benefits | ketahanan, penurunan-berat-badan, kebugaran-umum |
| Kalori | 205 kal |

**Vektor Latihan:**
```
E = [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 0, 1, 0.50, 0.2563]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 1 | **0.2000** |
| D5 (hiit) | 0.20 | 0 | 0 |
| D8 (tinggi) | 0.60 | 1 | **0.6000** |
| D9 (penurunan BB) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 0 | 1 | 0 |
| D13 (kebugaran umum) | 0 | 1 | 0 |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0834** |
| D15 (usia/kalori) | 0.21 | 0.2563 | **0.0538** |

```
U · E = 0.2000 + 0.6000 + 1.0000 + 0.0834 + 0.0538 = 1.9372

||E||² = 1 + 0 + 0 + 0 + 0 + 0 + 0 + 1 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.0657 = 5.3157
||E||  = √5.3157 = 2.3056

cos(θ) = 1.9372 / (1.3160 × 2.3056) = 1.9372 / 3.0342 = 0.6384
skor   = ((0.6384 + 1) / 2) × 100 = 81.92%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 81.92%
```

---

### 4. Lompat Tali (ex19) — Skor: 77.27%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Sedang |
| Benefits | ketahanan, penurunan-berat-badan, kebugaran-umum |
| Kalori | 341 kal |

**Vektor Latihan:**
```
E = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.50, 0.4263]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.30 | 1 | **0.3000** |
| D9 (penurunan BB) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 0 | 1 | 0 |
| D13 (kebugaran umum) | 0 | 1 | 0 |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0834** |
| D15 (usia/kalori) | 0.21 | 0.4263 | **0.0895** |

```
U · E = 0.2000 + 0.3000 + 1.0000 + 0.0834 + 0.0895 = 1.6729

||E||² = 1 + 0 + 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.1817 = 5.4317
||E||  = √5.4317 = 2.3306

cos(θ) = 1.6729 / (1.3160 × 2.3306) = 1.6729 / 3.0671 = 0.5454
skor   = ((0.5454 + 1) / 2) × 100 = 77.27%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 77.27%
```

---

### 5. Mesin Elipse / Elliptical (ex16) — Skor: 77.14%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Sedang |
| Benefits | ketahanan, penurunan-berat-badan, kebugaran-umum |
| Kalori | 273 kal |

**Vektor Latihan:**
```
E = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.50, 0.3413]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.30 | 1 | **0.3000** |
| D9 (penurunan BB) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 0 | 1 | 0 |
| D13 (kebugaran umum) | 0 | 1 | 0 |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0834** |
| D15 (usia/kalori) | 0.21 | 0.3413 | **0.0717** |

```
U · E = 0.2000 + 0.3000 + 1.0000 + 0.0834 + 0.0717 = 1.6551

||E||² = 1 + 0 + 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.1165 = 5.3665
||E||  = √5.3665 = 2.3166

cos(θ) = 1.6551 / (1.3160 × 2.3166) = 1.6551 / 3.0486 = 0.5429
skor   = ((0.5429 + 1) / 2) × 100 = 77.14%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 77.14%
```

---

## Tabel Ringkasan Hasil Perhitungan

| # | Latihan | U · E | ||U|| | ||E|| | cos(θ) | Normalisasi | Coach | Skor Akhir |
|---|---------|-------|-------|-------|--------|-------------|-------|------------|
| 1 | Sepak Bola | 1.9551 | 1.3160 | 2.3166 | 0.6413 | 82.06% | aman (×1.0) | **82.06%** |
| 2 | HIIT | 1.9461 | 1.3160 | 2.3108 | 0.6400 | 82.00% | aman (×1.0) | **82.00%** |
| 3 | Bola Basket | 1.9372 | 1.3160 | 2.3056 | 0.6384 | 81.92% | aman (×1.0) | **81.92%** |
| 4 | Lompat Tali | 1.6729 | 1.3160 | 2.3306 | 0.5454 | 77.27% | aman (×1.0) | **77.27%** |
| 5 | Mesin Elipse | 1.6551 | 1.3160 | 2.3166 | 0.5429 | 77.14% | aman (×1.0) | **77.14%** |

---

## Validasi Pelatih (Coach Validation) — Kondisi Hipertensi

| Latihan | Status Coach | Faktor | Pengaruh |
|---------|-------------|--------|----------|
| Sepak Bola | `aman` | ×1.0 | Tidak ada pengurangan |
| HIIT | `aman` | ×1.0 | Tidak ada pengurangan |
| Bola Basket | `aman` | ×1.0 | Tidak ada pengurangan |
| Lompat Tali | `aman` | ×1.0 | Tidak ada pengurangan |
| Mesin Elipse | `aman` | ×1.0 | Tidak ada pengurangan |

> **Aturan Coach:**
> - `aman` → faktor = 1.0
> - `aman_dengan_catatan` → faktor = 0.92 (pengurangan 8%)
> - `tidak_aman` → latihan **diblokir**

---

## Diagram Alur Perhitungan

```
┌─────────────────────────────┐    ┌─────────────────────────────┐
│     Profil Pengguna         │    │     Data Latihan            │
│     Usia: 21                │    │     (contoh: Sepak Bola)    │
│     Aktivitas: Tinggi       │    │     Kardio, Tinggi          │
│     Tujuan: Penurunan BB    │    │     273 kal/30 min          │
│     Kondisi: Hipertensi     │    │     3 benefits              │
└──────────────┬──────────────┘    └───────────┬─────────────────┘
               │                                │
               ▼                                ▼
┌──────────────────────┐          ┌──────────────────────┐
│ Vektor U (15 dimensi)│          │ Vektor E (15 dimensi)│
│ D1-D5: semua 0.2     │          │ D1: kardio = 1       │
│ D6-D8: dari activity │          │ D8: tinggi = 1       │
│   level tinggi       │          │ D9,D11,D13 = 1       │
│ D9: penurunan BB = 1 │          │ D14: 0.50            │
│ D14: 0.1667          │          │ D15: 0.3413          │
│ D15: 0.21            │          │                      │
└──────────┬───────────┘          └──────────┬───────────┘
           │                                  │
           └──────────────┬───────────────────┘
                          ▼
               ┌─────────────────────┐
               │ Dot Product         │
               │ U · E = 1.9551      │
               ├─────────────────────┤
               │ ||U|| = 1.3160      │
               │ ||E|| = 2.3166      │
               ├─────────────────────┤
               │ Cosine Similarity   │
               │ cos(θ) = 0.6413     │
               ├─────────────────────┤
               │ Normalisasi (0-100) │
               │ = 82.06%            │
               ├─────────────────────┤
               │ Coach Validation    │
               │ hipertensi: aman    │
               │ faktor = 1.0        │
               ├─────────────────────┤
               │ SKOR AKHIR = 82.06% │
               └─────────────────────┘
```

---

## Analisis Mengapa Latihan Ini Mendapat Skor Tertinggi

### Faktor utama yang meningkatkan skor:

1. **Intensitas Tinggi cocok dengan Aktivitas Tinggi** — Latihan intensitas tinggi (Sepak Bola, HIIT, Bola Basket) memberikan kontribusi D8 = 0.60 pada dot product, lebih besar dari intensitas sedang (D7 = 0.30)
2. **Tujuan Penurunan Berat Badan** — Semua 5 latihan memiliki benefit ini (D9 = 1), memberikan kontribusi 1.0 pada dot product
3. **Kategori Kardio** — Memberikan kontribusi D1 = 0.20, sedangkan HIIT memberikan D5 = 0.20

### Perbandingan kontribusi intensitas:

| Latihan | Intensitas | Kontribusi D6-D8 |
|---------|-----------|-----------------|
| Sepak Bola | Tinggi | 0.60 × 1 = **0.60** |
| HIIT | Tinggi | 0.60 × 1 = **0.60** |
| Bola Basket | Tinggi | 0.60 × 1 = **0.60** |
| Lompat Tali | Sedang | 0.30 × 1 = **0.30** |
| Mesin Elipse | Sedang | 0.30 × 1 = **0.30** |

> Selisih 0.30 pada dot product menyebabkan perbedaan skor ~5% antara kelompok intensitas tinggi (82%) vs sedang (77%).
