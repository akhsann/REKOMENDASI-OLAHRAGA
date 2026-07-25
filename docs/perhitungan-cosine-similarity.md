# Perhitungan Manual Cosine Similarity
## Sistem Rekomendasi Olahraga

---

## 1. Deskripsi Algoritma

Sistem rekomendasi ini menggunakan **Kemiripan Cosine (Cosine Similarity)** untuk mengukur seberapa "dekat" profil pengguna dengan setiap data olahraga. Semakin besar nilai kemiripan, semakin tinggi olahraga tersebut direkomendasikan.

### Rumus Cosine Similarity

```
            A · B
cos(θ) = ----------
          ||A|| × ||B||
```

Di mana:
- `A · B` = Dot Product (hasil kali titik) antara vektor A dan B
- `||A||` = Magnitude (panjang / norma) vektor A
- `||B||` = Magnitude (panjang / norma) vektor B

### Konversi ke Skor 0–100%

Karena nilai cosine similarity berada di rentang [-1, 1], skor dinormalisasi ke skala 0–100 dengan rumus:

```
Skor (%) = ((cos(θ) + 1) / 2) × 100
```

### Koreksi Kondisi Kesehatan (applyCoachQuestionnaireRules)

Jika pengguna memiliki kondisi kesehatan tertentu, skor mendapatkan faktor pengali:
- **`aman_dengan_catatan`** → Skor × 0.92
- **`tidak_aman`** → Olahraga diblokir (tidak ditampilkan)

```
Skor Final (%) = Skor Cosine × Faktor Medis
```

---

## 2. Struktur Vektor (17 Dimensi)

Setiap profil pengguna dan data olahraga direpresentasikan sebagai vektor **17 dimensi**.

| No | Fitur | Dimensi | Deskripsi |
|----|-------|---------|-----------|
| 1–5 | Kategori | 5 | kardio, kekuatan, fleksibilitas, keseimbangan, hiit |
| 6–8 | Intensitas | 3 | rendah, sedang, tinggi |
| 9–13 | Tujuan/Manfaat | 5 | penurunan-berat-badan, penambahan-otot, ketahanan, fleksibilitas, kebugaran-umum |
| 14 | Waktu / Durasi | 1 | Dinormalisasi (dibagi maks) |
| 15–17 | Kategori Usia | 3 | remaja (10-18), dewasa (19-59), lansia (60+) |

> **Catatan:** Usia numerik (misal: 21/100 = 0.21) **tidak digunakan** dalam perhitungan.
> Cukup menggunakan **kelompok usia** (one-hot) karena lebih bermakna dan representatif.

---

## 3. Konstanta Sistem

| Konstanta | Nilai | Keterangan |
|-----------|-------|-----------| 
| `MAX_DURATION` | 60 | Durasi maksimum normalisasi latihan (menit) |
| `MAX_AVAILABLE_TIME` | 180 | Waktu tersedia maksimum pengguna (menit) |
| `MAX_CALORIES` | 800 | *(Opsional/Tidak digunakan dalam vektor 17-dimensi)* |

### Preferensi Intensitas Berdasarkan Tingkat Aktivitas

| Tingkat Aktivitas | Rendah | Sedang | Tinggi |
|-------------------|--------|--------|--------|
| Ringan | 0.6 | 0.3 | 0.1 |
| **Sedang** | **0.2** | **0.5** | **0.3** |
| Tinggi | 0.1 | 0.3 | 0.6 |

---

## 4. Profil Pengguna (Contoh Kasus)

Berdasarkan profil pengguna berikut:

| Atribut | Nilai |
|---------|-------|
| Usia | 21 Tahun |
| Kategori Usia | Dewasa (19–59 Tahun) |
| Jenis Kelamin | Pria |
| Tingkat Aktivitas | Sedang |
| Waktu Tersedia | 30 menit |
| Tujuan Kebugaran | Penambahan Otot, Ketahanan, Kebugaran Umum |
| Kondisi Kesehatan | Hipertensi |

---

## 5. Vektor Profil Pengguna (U)

### Perhitungan Setiap Dimensi

| # | Fitur | Rumus | Nilai |
|---|-------|-------|-------|
| 1 | Kategori: kardio | Bobot merata | **0.2** |
| 2 | Kategori: kekuatan | Bobot merata | **0.2** |
| 3 | Kategori: fleksibilitas | Bobot merata | **0.2** |
| 4 | Kategori: keseimbangan | Bobot merata | **0.2** |
| 5 | Kategori: hiit | Bobot merata | **0.2** |
| 6 | Intensitas: rendah | Aktivitas Sedang → 0.2 | **0.2** |
| 7 | Intensitas: sedang | Aktivitas Sedang → 0.5 | **0.5** |
| 8 | Intensitas: tinggi | Aktivitas Sedang → 0.3 | **0.3** |
| 9 | Tujuan: penurunan-berat-badan | Tidak dipilih → 0 | **0** |
| 10 | Tujuan: penambahan-otot | Dipilih → 1 | **1** |
| 11 | Tujuan: ketahanan | Dipilih → 1 | **1** |
| 12 | Tujuan: fleksibilitas | Tidak dipilih → 0 | **0** |
| 13 | Tujuan: kebugaran-umum | Dipilih → 1 | **1** |
| 14 | Waktu tersedia | 30 / 180 = 0.1667 | **0.1667** |
| 15 | Usia: remaja | 21 thn bukan remaja → 0 | **0** |
| 16 | Usia: dewasa | 21 thn = dewasa → 1 | **1** |
| 17 | Usia: lansia | 21 thn bukan lansia → 0 | **0** |

### Vektor U (Ringkasan)

```
U = [0.2, 0.2, 0.2, 0.2, 0.2,   ← Kategori (5)
     0.2, 0.5, 0.3,               ← Intensitas (3)
     0, 1, 1, 0, 1,               ← Tujuan (5)
     0.1667,                      ← Waktu (1)
     0, 1, 0]                     ← Kategori Usia (3)
```

### Magnitude ||U||

```
||U||² = (0.2² × 5) + 0.2² + 0.5² + 0.3² + 0² + 1² + 1² + 0² + 1²
        + 0.1667² + 0² + 1² + 0²

       = 0.20 + 0.04 + 0.25 + 0.09 + 0 + 1 + 1 + 0 + 1
        + 0.02779 + 0 + 1 + 0

||U||² = 4.6078

||U||  = √4.6078 = 2.1466
```

---

## 6. Rincian Perhitungan Manual 5 Olahraga Teratas

Berikut adalah rincian perhitungan vektor, dot product, magnitude, cosine similarity, serta koreksi faktor medis untuk 5 latihan teratas:

---

### 6.1. Angkat Besi (Deadlift) - Skor: 85.28%

#### Data & Vektor Deadlift ($E_1$)
- **Kategori:** Kekuatan ($dim_2 = 1$)
- **Intensitas:** Tinggi ($dim_8 = 1$)
- **Manfaat:** Penambahan Otot ($dim_{10} = 1$), Ketahanan ($dim_{11} = 1$), Kebugaran Umum ($dim_{13} = 1$)
- **Durasi:** 30 min ($30 / 60 = 0.5$)
- **Kelompok Usia Cocok:** Dewasa ($dim_{16} = 1$)

```
E₁ = [0, 1, 0, 0, 0,    ← Kategori (kekuatan)
      0, 0, 1,          ← Intensitas (tinggi)
      0, 1, 1, 0, 1,    ← Manfaat
      0.5,              ← Durasi
      0, 1, 0]          ← Kategori Usia (dewasa)
```

#### Magnitude $\|E_1\|$
```
||E₁||² = 1 + 1 + 1 + 1 + 1 + 0.5² + 1 = 6.25
||E₁||  = √6.25 = 2.5000
```

#### Dot Product $U \cdot E_1$
$$U \cdot E_1 = 0.2(1) + 0.3(1) + 1(1) + 1(1) + 1(1) + 0.1667(0.5) + 1(1) = 4.5833$$

#### Cosine Similarity & Skor Cosine
```
cos(θ) = 4.5833 / (2.1466 × 2.5000) = 4.5833 / 5.3665 = 0.8541
Skor Cosine = ((0.8541 + 1) / 2) × 100 = 92.70%
```

#### Koreksi Faktor Medis (Hipertensi)
Angkat Besi tergolong `aman_dengan_catatan` untuk kondisi Hipertensi $\rightarrow$ Pengali **$\times 0.92$**:
$$\text{Skor Akhir} = 92.70\% \times 0.92 = \mathbf{85.28\%}$$

---

### 6.2. Dumbbell - Skor: 84.07%

#### Data & Vektor Dumbbell ($E_2$)
- **Kategori:** Kekuatan ($dim_2 = 1$)
- **Intensitas:** Sedang ($dim_7 = 1$)
- **Manfaat:** Penambahan Otot ($dim_{10} = 1$), Ketahanan ($dim_{11} = 1$), Kebugaran Umum ($dim_{13} = 1$)
- **Durasi:** 30 min ($30 / 60 = 0.5$)
- **Kelompok Usia Cocok:** Remaja ($dim_{15} = 1$), Dewasa ($dim_{16} = 1$)

```
E₂ = [0, 1, 0, 0, 0,    ← Kategori (kekuatan)
      0, 1, 0,          ← Intensitas (sedang)
      0, 1, 1, 0, 1,    ← Manfaat
      0.5,              ← Durasi
      1, 1, 0]          ← Kategori Usia (remaja, dewasa)
```

#### Magnitude $\|E_2\|$
```
||E₂||² = 1 + 1 + 1 + 1 + 1 + 0.5² + 1 + 1 = 7.25
||E₂||  = √7.25 = 2.6926
```

#### Dot Product $U \cdot E_2$
$$U \cdot E_2 = 0.2(1) + 0.5(1) + 1(1) + 1(1) + 1(1) + 0.1667(0.5) + 1(1) = 4.7833$$

#### Cosine Similarity & Skor Cosine
```
cos(θ) = 4.7833 / (2.1466 × 2.6926) = 4.7833 / 5.7800 = 0.8276
Skor Cosine = ((0.8276 + 1) / 2) × 100 = 91.38%
```

#### Koreksi Faktor Medis (Hipertensi)
Dumbbell tergolong `aman_dengan_catatan` untuk kondisi Hipertensi $\rightarrow$ Pengali **$\times 0.92$**:
$$\text{Skor Akhir} = 91.38\% \times 0.92 = \mathbf{84.07\%}$$

---

### 6.3. Squats - Skor: 84.07%

#### Data & Vektor Squats ($E_3$)
- **Kategori:** Kekuatan ($dim_2 = 1$)
- **Intensitas:** Sedang ($dim_7 = 1$)
- **Manfaat:** Penambahan Otot ($dim_{10} = 1$), Ketahanan ($dim_{11} = 1$), Kebugaran Umum ($dim_{13} = 1$)
- **Durasi:** 30 min ($30 / 60 = 0.5$)
- **Kelompok Usia Cocok:** Remaja ($dim_{15} = 1$), Dewasa ($dim_{16} = 1$)

```
E₃ = [0, 1, 0, 0, 0,    ← Kategori (kekuatan)
      0, 1, 0,          ← Intensitas (sedang)
      0, 1, 1, 0, 1,    ← Manfaat
      0.5,              ← Durasi
      1, 1, 0]          ← Kategori Usia (remaja, dewasa)
```

#### Magnitude $\|E_3\|$
```
||E₃||² = 1 + 1 + 1 + 1 + 1 + 0.5² + 1 + 1 = 7.25
||E₃||  = √7.25 = 2.6926
```

#### Dot Product $U \cdot E_3$
$$U \cdot E_3 = 0.2(1) + 0.5(1) + 1(1) + 1(1) + 1(1) + 0.1667(0.5) + 1(1) = 4.7833$$

#### Cosine Similarity & Skor Cosine
```
cos(θ) = 4.7833 / (2.1466 × 2.6926) = 4.7833 / 5.7800 = 0.8276
Skor Cosine = ((0.8276 + 1) / 2) × 100 = 91.38%
```

#### Koreksi Faktor Medis (Hipertensi)
Squats tergolong `aman_dengan_catatan` untuk kondisi Hipertensi $\rightarrow$ Pengali **$\times 0.92$**:
$$\text{Skor Akhir} = 91.38\% \times 0.92 = \mathbf{84.07\%}$$

---

### 6.4. Mesin Elipse (Elliptical) - Skor: 80.68%

#### Data & Vektor Elliptical ($E_4$)
- **Kategori:** Kardio ($dim_1 = 1$)
- **Intensitas:** Sedang ($dim_7 = 1$)
- **Manfaat:** Penurunan Berat Badan ($dim_9 = 1$), Ketahanan ($dim_{11} = 1$), Kebugaran Umum ($dim_{13} = 1$)
- **Durasi:** 30 min ($30 / 60 = 0.5$)
- **Kelompok Usia Cocok:** Remaja ($dim_{15} = 1$), Dewasa ($dim_{16} = 1$), Lansia ($dim_{17} = 1$)

```
E₄ = [1, 0, 0, 0, 0,    ← Kategori (kardio)
      0, 1, 0,          ← Intensitas (sedang)
      1, 0, 1, 0, 1,    ← Manfaat
      0.5,              ← Durasi
      1, 1, 1]          ← Kategori Usia (remaja, dewasa, lansia)
```

#### Magnitude $\|E_4\|$
```
||E₄||² = 1 + 1 + 1 + 1 + 1 + 0.5² + 1 + 1 + 1 = 8.25
||E₄||  = √8.25 = 2.8723
```

#### Dot Product $U \cdot E_4$
$$U \cdot E_4 = 0.2(1) + 0.5(1) + 1(1) + 1(1) + 0.1667(0.5) + 1(1) = 3.7833$$

#### Cosine Similarity & Skor Cosine
```
cos(θ) = 3.7833 / (2.1466 × 2.8723) = 3.7833 / 6.1657 = 0.6136
Skor Cosine = ((0.6136 + 1) / 2) × 100 = 80.68%
```

#### Koreksi Faktor Medis (Hipertensi)
Mesin Elipse tergolong `aman` untuk kondisi Hipertensi $\rightarrow$ Pengali **$\times 1.0$**:
$$\text{Skor Akhir} = 80.68\% \times 1.0 = \mathbf{80.68\%}$$

---

### 6.5. Pilates - Skor: 80.68%

#### Data & Vektor Pilates ($E_5$)
- **Kategori:** Fleksibilitas ($dim_3 = 1$)
- **Intensitas:** Sedang ($dim_7 = 1$)
- **Manfaat:** Ketahanan ($dim_{11} = 1$), Fleksibilitas ($dim_{12} = 1$), Kebugaran Umum ($dim_{13} = 1$)
- **Durasi:** 30 min ($30 / 60 = 0.5$)
- **Kelompok Usia Cocok:** Remaja ($dim_{15} = 1$), Dewasa ($dim_{16} = 1$), Lansia ($dim_{17} = 1$)

```
E₅ = [0, 0, 1, 0, 0,    ← Kategori (fleksibilitas)
      0, 1, 0,          ← Intensitas (sedang)
      0, 0, 1, 1, 1,    ← Manfaat
      0.5,              ← Durasi
      1, 1, 1]          ← Kategori Usia (remaja, dewasa, lansia)
```

#### Magnitude $\|E_5\|$
```
||E₅||² = 1 + 1 + 1 + 1 + 1 + 0.5² + 1 + 1 + 1 = 8.25
||E₅||  = √8.25 = 2.8723
```

#### Dot Product $U \cdot E_5$
$$U \cdot E_5 = 0.2(1) + 0.5(1) + 1(1) + 1(1) + 0.1667(0.5) + 1(1) = 3.7833$$

#### Cosine Similarity & Skor Cosine
```
cos(θ) = 3.7833 / (2.1466 × 2.8723) = 3.7833 / 6.1657 = 0.6136
Skor Cosine = ((0.6136 + 1) / 2) × 100 = 80.68%
```

#### Koreksi Faktor Medis (Hipertensi)
Pilates tergolong `aman` untuk kondisi Hipertensi $\rightarrow$ Pengali **$\times 1.0$**:
$$\text{Skor Akhir} = 80.68\% \times 1.0 = \mathbf{80.68\%}$$

---

## 8. Rekapitulasi Skor (Hasil Pengujian Aplikasi)

| No | Olahraga | Kategori | Intensitas | Skor Cosine | Faktor Medis | Skor Akhir |
|----|----------|----------|------------|-------------|--------------|------------|
| 1 | Angkat Besi (Deadlift) | Kekuatan | Tinggi | 92.70% | × 0.92 (hipertensi) | **85.28%** |
| 2 | Dumbbell | Kekuatan | Sedang | 91.38% | × 0.92 (hipertensi) | **84.07%** |
| 3 | Squats | Kekuatan | Sedang | 91.38% | × 0.92 (hipertensi) | **84.07%** |
| 4 | Mesin Elipse (Elliptical) | Kardio | Sedang | 80.68% | × 1.0 (aman) | **80.68%** |
| 5 | Pilates | Fleksibilitas | Sedang | 80.68% | × 1.0 (aman) | **80.68%** |

---

## 9. Diagram Alur Sistem

```
                        ┌─────────────────────────┐
                        │   Profil Pengguna (U)   │
                        │  Usia, Aktivitas, Tujuan │
                        │  Waktu, Kondisi Medis   │
                        └────────────┬────────────┘
                                     │
                              userProfileToVector()
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │    Vektor U (17 dim)    │
                        └────────────┬────────────┘
                                     │
              ┌──────────────────────┼──────────────────────┐
              │                      │                      │
    ┌─────────▼────────┐  ┌─────────▼────────┐  ┌─────────▼────────┐
    │  Olahraga 1 (E1) │  │  Olahraga 2 (E2) │  │  Olahraga N (En) │
    │  exerciseToVec() │  │  exerciseToVec() │  │  exerciseToVec() │
    └─────────┬────────┘  └─────────┬────────┘  └─────────┬────────┘
              │                      │                      │
    ┌─────────▼────────┐  ┌─────────▼────────┐  ┌─────────▼────────┐
    │ cos(U,E1)=0.6136 │  │ cos(U,E2)=0.8534 │  │    cos(U,En)    │
    │ Skor = 80.68%   │  │ Skor = 92.67%   │  │   Skor = ...%   │
    └─────────┬────────┘  └─────────┬────────┘  └─────────┬────────┘
              │                      │                      │
              └──────────────────────┼──────────────────────┘
                                     │
                    applyCoachQuestionnaireRules()
                    (Koreksi kondisi kesehatan & usia)
                                     │
                                     ▼
                        ┌─────────────────────────┐
                        │  Ranking Rekomendasi    │
                        │  (Diurutkan by Skor)    │
                        └─────────────────────────┘
```

---

## 10. Kesimpulan

Sistem rekomendasi olahraga ini menggunakan **Cosine Similarity 17-dimensi** yang mempertimbangkan:

1. ✅ **Kategori olahraga** — preferensi merata, semua kategori terbuka
2. ✅ **Intensitas** — disesuaikan dengan tingkat aktivitas harian pengguna
3. ✅ **Tujuan kebugaran** — matching langsung dengan goals pengguna
4. ✅ **Waktu tersedia** — memastikan olahraga sesuai jadwal pengguna
5. ✅ **Kategori Usia** — mengklasifikasikan Remaja/Dewasa/Lansia (one-hot), tanpa usia numerik
6. ✅ **Kondisi kesehatan** — validasi medis via `applyCoachQuestionnaireRules()`

Hasilnya adalah skor kecocokan yang akurat, **terverifikasi secara matematis** sesuai dengan perhitungan manual di atas.

---

*Dokumen ini dibuat berdasarkan implementasi di `src/utils/recommendation.ts`*  
*Tanggal: 25 Juli 2026*
