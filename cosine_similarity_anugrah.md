# Perhitungan Manual Cosine Similarity
## Aplikasi Rekomendasi Olahraga — Profil Pengguna (Anugrah)

---

## Profil Pengguna

| Parameter | Nilai |
|-----------|-------|
| Nama | Anugrah |
| Usia | 21 tahun |
| Jenis Kelamin | Pria |
| Waktu Tersedia Harian | 30 menit |
| Tingkat Aktivitas / Pekerjaan | Tingkat Aktivitas Sedang |
| Tujuan Kebugaran | Penambahan Otot, Membangun Ketahanan, Kebugaran Umum |
| Kondisi Kesehatan | Hipertensi |

---

## Daftar Hasil Rekomendasi (dari Aplikasi)

| # | Nama Latihan | Kategori | Intensitas | Kalori/30min | Skor Kesesuaian |
|---|-------------|----------|------------|-------------|-----------------|
| 1 | Angkat Beban (Angkat Besi) | Kekuatan | Tinggi | 273 kal | **91.28%** |
| 2 | Dumbbell | Kekuatan | Sedang | 273 kal | **86.06%** |
| 3 | Squats | Kekuatan | Sedang | 273 kal | **86.06%** |
| 4 | Baseball | Kardio | Sedang | 170 kal | **86.05%** |
| 5 | Kalistenik | Kekuatan | Sedang | 162 kal | **86.04%** |

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
ACTIVITY_INTENSITY_PREFERENCE['sedang'] = {
  rendah: 0.2,
  sedang: 0.5,
  tinggi: 0.3
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

### D6–D8: Bobot Intensitas (dari tingkat aktivitas sedang)

| Dimensi | Intensitas | Nilai |
|---------|-----------|-------|
| D6 | Rendah | **0.20** |
| D7 | Sedang | **0.50** |
| D8 | Tinggi | **0.30** |

### D9–D13: Tujuan Kebugaran (biner)

| Dimensi | Tujuan | Dipilih? | Nilai |
|---------|--------|----------|-------|
| D9 | Penurunan Berat Badan | ❌ | **0** |
| D10 | Penambahan Otot | ✅ | **1** |
| D11 | Ketahanan | ✅ | **1** |
| D12 | Fleksibilitas | ❌ | **0** |
| D13 | Kebugaran Umum | ✅ | **1** |

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
U = [0.20, 0.20, 0.20, 0.20, 0.20, 0.20, 0.50, 0.30, 0.00, 1.00, 1.00, 0.00, 1.00, 0.1667, 0.21]
```

---

## LANGKAH 2: Perhitungan Cosine Similarity Setiap Latihan

### Rumus yang Digunakan

```
Dot Product:        U · E = Σ Uᵢ × Eᵢ
Magnitude:          ||U|| = √(Σ Uᵢ²)
Cosine Similarity:  cos(θ) = (U · E) / (||U|| × ||E||)
Normalisasi:        skor = ((cos(θ) + 1) / 2) × 100
```

### Magnitude Vektor Pengguna (||U||) — digunakan untuk semua latihan:

```
||U||² = 0.20² + 0.20² + 0.20² + 0.20² + 0.20²
       + 0.20² + 0.50² + 0.30²
       + 0² + 1.00² + 1.00² + 0² + 1.00²
       + 0.1667² + 0.21²

      = 0.04 + 0.04 + 0.04 + 0.04 + 0.04
       + 0.04 + 0.25 + 0.09
       + 0 + 1.00 + 1.00 + 0 + 1.00
       + 0.0278 + 0.0441

      = 3.6519

||U|| = √3.6519 = 1.9110
```

---

### 1. Angkat Beban (Angkat Besi) (ex1) — Skor: 91.28%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kekuatan |
| Intensitas | Tinggi |
| Benefits | penambahan-otot, ketahanan, kebugaran-umum |
| Kalori | 273 kal |

**Vektor Latihan:**
```
E = [0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 0, 1, 0.50, 0.3413]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 0 | 0 |
| D2 (kekuatan) | 0.20 | 1 | **0.2000** |
| D3 (fleksibilitas) | 0.20 | 0 | 0 |
| D4 (keseimbangan) | 0.20 | 0 | 0 |
| D5 (hiit) | 0.20 | 0 | 0 |
| D6 (rendah) | 0.20 | 0 | 0 |
| D7 (sedang) | 0.50 | 0 | 0 |
| D8 (tinggi) | 0.30 | 1 | **0.3000** |
| D9 (penurunan BB) | 0.00 | 0 | 0 |
| D10 (penambahan otot) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 1.00 | 1 | **1.0000** |
| D12 (fleksibilitas) | 0.00 | 0 | 0 |
| D13 (kebugaran umum) | 1.00 | 1 | **1.0000** |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0833** |
| D15 (usia/kalori) | 0.21 | 0.3413 | **0.0717** |

```
U · E = 0.2000 + 0.3000 + 1.0000 + 1.0000 + 1.0000 + 0.0833 + 0.0717 = 3.6550

||E||² = 0 + 1² + 0 + 0 + 0 + 0 + 0 + 1² + 0 + 1² + 1² + 0 + 1² + 0.50² + 0.3413² 
       = 5 + 0.25 + 0.1165 = 5.3665
||E||  = √5.3665 = 2.3166

cos(θ) = 3.6550 / (1.9110 × 2.3166) = 3.6550 / 4.4269 = 0.8256
skor   = ((0.8256 + 1) / 2) × 100 = 91.28%

Coach (hipertensi) = aman → faktor = 1.0
Skor Akhir = 91.28%
```

---

### 2. Dumbbell (ex2) — Skor: 86.06%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kekuatan |
| Intensitas | Sedang |
| Benefits | penambahan-otot, ketahanan, kebugaran-umum |
| Kalori | 273 kal |

**Vektor Latihan:**
```
E = [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0.50, 0.3413]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 0 | 0 |
| D2 (kekuatan) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.50 | 1 | **0.5000** |
| D10 (penambahan otot) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 1.00 | 1 | **1.0000** |
| D13 (kebugaran umum) | 1.00 | 1 | **1.0000** |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0833** |
| D15 (usia/kalori) | 0.21 | 0.3413 | **0.0717** |

```
U · E = 0.2000 + 0.5000 + 1.0000 + 1.0000 + 1.0000 + 0.0833 + 0.0717 = 3.8550

||E||² = 1² + 1² + 1² + 1² + 1² + 0.50² + 0.3413² = 5.3665
||E||  = √5.3665 = 2.3166

cos(θ) = 3.8550 / (1.9110 × 2.3166) = 3.8550 / 4.4269 = 0.8708
skor   = ((0.8708 + 1) / 2) × 100 = 93.54%

Coach (hipertensi) = aman dengan catatan ("Sama seperti sebelumnya, gunakan intensitas ringan- sedang") 
                     → faktor = 0.92
Skor Akhir = 93.54% × 0.92 = 86.0568 → dibulatkan 86.06%
```

---

### 3. Squats (ex3) — Skor: 86.06%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kekuatan |
| Intensitas | Sedang |
| Benefits | penambahan-otot, ketahanan, kebugaran-umum |
| Kalori | 273 kal |

**Vektor Latihan:**
```
E = [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0.50, 0.3413]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D2 (kekuatan) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.50 | 1 | **0.5000** |
| D10 (penambahan otot) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 1.00 | 1 | **1.0000** |
| D13 (kebugaran umum) | 1.00 | 1 | **1.0000** |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0833** |
| D15 (usia/kalori) | 0.21 | 0.3413 | **0.0717** |

```
U · E = 0.2000 + 0.5000 + 1.0000 + 1.0000 + 1.0000 + 0.0833 + 0.0717 = 3.8550

||E||² = 1² + 1² + 1² + 1² + 1² + 0.50² + 0.3413² = 5.3665
||E||  = √5.3665 = 2.3166

cos(θ) = 3.8550 / (1.9110 × 2.3166) = 3.8550 / 4.4269 = 0.8708
skor   = ((0.8708 + 1) / 2) × 100 = 93.54%

Coach (hipertensi) = aman dengan catatan ("Sama seperti sebelumnya, gunakan intensitas ringan- sedang") 
                     → faktor = 0.92
Skor Akhir = 93.54% × 0.92 = 86.0568 → dibulatkan 86.06%
```

---

### 4. Baseball (ex27) — Skor: 86.05%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Sedang |
| Benefits | ketahanan, kebugaran-umum, penambahan-otot |
| Kalori | 170 kal |

**Vektor Latihan:**
```
E = [1, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0.50, 0.2125]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D1 (kardio) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.50 | 1 | **0.5000** |
| D10 (penambahan otot) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 1.00 | 1 | **1.0000** |
| D13 (kebugaran umum) | 1.00 | 1 | **1.0000** |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0833** |
| D15 (usia/kalori) | 0.21 | 0.2125 | **0.0446** |

```
U · E = 0.2000 + 0.5000 + 1.0000 + 1.0000 + 1.0000 + 0.0833 + 0.0446 = 3.8279

||E||² = 1² + 1² + 1² + 1² + 1² + 0.50² + 0.2125² = 5.2952
||E||  = √5.2952 = 2.3011

cos(θ) = 3.8279 / (1.9110 × 2.3011) = 3.8279 / 4.3974 = 0.8705
skor   = ((0.8705 + 1) / 2) × 100 = 93.53%

Coach (hipertensi) = aman dengan catatan ("Hindari sprint yang berlebihan") 
                     → faktor = 0.92
Skor Akhir = 93.53% × 0.92 = 86.0476 → dibulatkan 86.05%
```

---

### 5. Kalistenik (ex12) — Skor: 86.04%

| Atribut | Nilai |
|---------|-------|
| Kategori | Kekuatan |
| Intensitas | Sedang |
| Benefits | penambahan-otot, kebugaran-umum, ketahanan |
| Kalori | 162 kal |

**Vektor Latihan:**
```
E = [0, 1, 0, 0, 0, 0, 1, 0, 0, 1, 1, 0, 1, 0.50, 0.2025]
```

**Dot Product (U · E):**

| Dimensi | U[i] | E[i] | U×E |
|---------|------|------|-----|
| D2 (kekuatan) | 0.20 | 1 | **0.2000** |
| D7 (sedang) | 0.50 | 1 | **0.5000** |
| D10 (penambahan otot) | 1.00 | 1 | **1.0000** |
| D11 (ketahanan) | 1.00 | 1 | **1.0000** |
| D13 (kebugaran umum) | 1.00 | 1 | **1.0000** |
| D14 (waktu/durasi) | 0.1667 | 0.50 | **0.0833** |
| D15 (usia/kalori) | 0.21 | 0.2025 | **0.0425** |

```
U · E = 0.2000 + 0.5000 + 1.0000 + 1.0000 + 1.0000 + 0.0833 + 0.0425 = 3.8258

||E||² = 1² + 1² + 1² + 1² + 1² + 0.50² + 0.2025² = 5.2910
||E||  = √5.2910 = 2.3002

cos(θ) = 3.8258 / (1.9110 × 2.3002) = 3.8258 / 4.3956 = 0.8704
skor   = ((0.8704 + 1) / 2) × 100 = 93.52%

Coach (hipertensi) = aman dengan catatan ("Gunakan Intensitas rendah - sedang saja") 
                     → faktor = 0.92
Skor Akhir = 93.52% × 0.92 = 86.0384 → dibulatkan 86.04%
```

---

## Tabel Ringkasan Hasil Perhitungan

| # | Latihan | U · E | ||U|| | ||E|| | cos(θ) | Normalisasi | Coach | Skor Akhir |
|---|---------|-------|-------|-------|--------|-------------|-------|------------|
| 1 | Angkat Beban (Angkat Besi) | 3.6550 | 1.9110 | 2.3166 | 0.8256 | 91.28% | aman (×1.0) | **91.28%** |
| 2 | Dumbbell | 3.8550 | 1.9110 | 2.3166 | 0.8708 | 93.54% | catatan (×0.92) | **86.06%** |
| 3 | Squats | 3.8550 | 1.9110 | 2.3166 | 0.8708 | 93.54% | catatan (×0.92) | **86.06%** |
| 4 | Baseball | 3.8279 | 1.9110 | 2.3011 | 0.8705 | 93.53% | catatan (×0.92) | **86.05%** |
| 5 | Kalistenik | 3.8258 | 1.9110 | 2.3002 | 0.8704 | 93.52% | catatan (×0.92) | **86.04%** |

---

## Validasi Pelatih (Coach Validation) — Kondisi Hipertensi

| Latihan | Status Coach | Faktor | Pengaruh | Catatan Khusus |
|---------|-------------|--------|----------|----------------|
| Angkat Beban | `aman` | ×1.0 | Tidak ada pengurangan | Dengan menggunakan beban yang ringan dan tidak melebihi kemampuan pengangkat |
| Dumbbell | `aman_dengan_catatan` | ×0.92 | Pengurangan 8% | Sama seperti sebelumnya, gunakan intensitas ringan- sedang |
| Squats | `aman_dengan_catatan` | ×0.92 | Pengurangan 8% | Sama seperti sebelumnya, gunakan intensitas ringan- sedang |
| Baseball | `aman_dengan_catatan` | ×0.92 | Pengurangan 8% | Hindari sprint yang berlebihan |
| Kalistenik | `aman_dengan_catatan` | ×0.92 | Pengurangan 8% | Gunakan Intensitas rendah - sedang saja |

> **Aturan Coach:**
> - `aman` → faktor = 1.0
> - `aman_dengan_catatan` → faktor = 0.92 (pengurangan 8%)
> - `tidak_aman` → latihan **diblokir**

---

## Diagram Alur Perhitungan

```
┌─────────────────────────────┐    ┌─────────────────────────────┐
|     Profil Pengguna         |    |     Data Latihan            |
|     Usia: 21                |    |     (contoh: Dumbbell)      |
|     Aktivitas: Sedang       |    |     Kekuatan, Sedang        |
|     Tujuan: 3 Tujuan        |    |     273 kal/30 min          |
|     Kondisi: Hipertensi     |    |     3 benefits              |
└──────────────┬──────────────┘    └───────────┬─────────────────┘
               |                                |
               ▼                                ▼
┌──────────────────────┐          ┌──────────────────────┐
| Vektor U (15 dimensi)|          | Vektor E (15 dimensi)|
| D1-D5: semua 0.2     |          | D2: kekuatan = 1     |
| D6-D8: dari activity |          | D7: sedang = 1       |
|   level sedang       |          | D10,D11,D13 = 1      |
| D10,D11,D13 = 1      |          | D14: 0.50            |
| D14: 0.1667          |          | D15: 0.3413          |
| D15: 0.21            |          |                      |
└──────────┬───────────┘          └──────────┬───────────┘
           │                                  │
           └──────────────┬───────────────────┘
                          ▼
               ┌─────────────────────┐
               | Dot Product         |
               | U · E = 3.8550      |
               ├─────────────────────┤
               | ||U|| = 1.9110      |
               | ||E|| = 2.3166      |
               ├─────────────────────┤
               | Cosine Similarity   |
               | cos(θ) = 0.8708     |
               ├─────────────────────┤
               | Normalisasi (0-100) |
               | = 93.54%            |
               ├─────────────────────┤
               | Coach Validation    |
               | hipertensi: catatan |
               | faktor = 0.92       |
               ├─────────────────────┤
               | SKOR AKHIR = 86.06% |
               └─────────────────────┘
```

---

## Analisis Mengapa "Angkat Beban" Menempati Peringkat Pertama

Meskipun **Dumbbell** dan **Squats** memiliki tingkat kemiripan dasar (Base Score) yang lebih tinggi (**93.54%** dibanding **91.28%** untuk Angkat Beban), **Angkat Beban (Angkat Besi)** menempati peringkat pertama pada hasil akhir sistem (**91.28%**). Hal ini disebabkan oleh:

1. **Efek Validasi Pelatih (Hipertensi):**
   * **Angkat Beban (Angkat Besi)** dikategorikan `aman` oleh Pelatih dengan catatan ringan, sehingga memiliki faktor pengali **1.0** (tidak ada pengurangan skor).
   * **Dumbbell** dan **Squats** dikategorikan `aman_dengan_catatan` ("Sama seperti sebelumnya, gunakan intensitas ringan- sedang") yang otomatis memicu faktor pengali **0.92** (pemotongan skor sebesar 8%).

2. **Perbedaan Kecocokan Intensitas:**
   * Di dalam perhitungan kemiripan dasar (sebelum faktor Pelatih), Dumbbell dan Squats memiliki nilai dot product yang lebih tinggi karena intensitasnya yang **sedang** (D7 = 1) sangat sesuai dengan profil aktivitas harian Sedang pengguna (bobot D7 = 0.5).
   * Angkat Beban memiliki intensitas **tinggi** (D8 = 1) yang bobot kecocokannya lebih rendah di profil pengguna (bobot D8 = 0.3).
   * Namun, selisih kecocokan intensitas ini (~2.26%) lebih kecil dibandingkan dampak penalti dari validasi medis Pelatih (8%).
