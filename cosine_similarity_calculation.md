# Penjelasan dan Perhitungan Algoritma Cosine Similarity
## Aplikasi Rekomendasi Olahraga

---

## 1. Pengertian Cosine Similarity

Cosine Similarity adalah metode pengukuran kemiripan antara dua vektor dalam ruang multidimensi berdasarkan sudut cosinus di antara keduanya. Metode ini mengukur seberapa mirip **arah** dua vektor, bukan besarnya.

### Rumus:

```
  A • B        Σⁿᵢ₌₁ Aᵢ × Bᵢ
──────── = ─────────────────────────────
|A| |B|    √Σⁿᵢ₌₁(Aᵢ)²  ×  √Σⁿᵢ₌₁(Bᵢ)²
```

Dimana:
- **A • B** = Dot Product (hasil kali titik) = Σⁿᵢ₌₁ Aᵢ × Bᵢ
- **|A|** = Magnitude vektor A = √Σⁿᵢ₌₁(Aᵢ)²
- **|B|** = Magnitude vektor B = √Σⁿᵢ₌₁(Bᵢ)²
- Hasil: nilai antara **-1** sampai **1** (untuk vektor positif: **0** sampai **1**)

### Interpretasi Nilai:
- **1** = vektor identik (sangat mirip)
- **0** = vektor ortogonal (tidak ada kemiripan)
- **-1** = vektor berlawanan arah

---

## 2. Penerapan pada Aplikasi Rekomendasi Olahraga

Dalam aplikasi ini, Cosine Similarity digunakan untuk menghitung **kemiripan antara profil pengguna dengan setiap data latihan**. Semakin tinggi skor kemiripan, semakin relevan latihan tersebut untuk pengguna.

### Alur Proses:

```
Profil Pengguna → Vektorisasi → Vektor U (15 dimensi)
                                                        → Cosine Similarity → Skor (0-100%)
Data Latihan    → Vektorisasi → Vektor E (15 dimensi)
```

---

## 3. Pembentukan Vektor (15 Dimensi)

Setiap profil pengguna dan data latihan diubah menjadi vektor numerik 15 dimensi:

| Dimensi | Keterangan | Vektor Pengguna (U) | Vektor Latihan (E) |
|---------|------------|--------------------|--------------------|
| D1 | Kardio | Bobot dari riwayat | One-hot (1 atau 0) |
| D2 | Kekuatan | Bobot dari riwayat | One-hot (1 atau 0) |
| D3 | Fleksibilitas | Bobot dari riwayat | One-hot (1 atau 0) |
| D4 | Keseimbangan | Bobot dari riwayat | One-hot (1 atau 0) |
| D5 | HIIT | Bobot dari riwayat | One-hot (1 atau 0) |
| D6 | Intensitas Rendah | Riwayat × 0.7 + Aktivitas × 0.3 | One-hot (1 atau 0) |
| D7 | Intensitas Sedang | Riwayat × 0.7 + Aktivitas × 0.3 | One-hot (1 atau 0) |
| D8 | Intensitas Tinggi | Riwayat × 0.7 + Aktivitas × 0.3 | One-hot (1 atau 0) |
| D9 | Penurunan Berat Badan | Biner (1 jika dipilih) | Biner (1 jika benefit) |
| D10 | Penambahan Otot | Biner (1 jika dipilih) | Biner (1 jika benefit) |
| D11 | Ketahanan | Biner (1 jika dipilih) | Biner (1 jika benefit) |
| D12 | Fleksibilitas | Biner (1 jika dipilih) | Biner (1 jika benefit) |
| D13 | Kebugaran Umum | Biner (1 jika dipilih) | Biner (1 jika benefit) |
| D14 | Waktu / Durasi | availableTime ÷ 180 | duration ÷ 60 |
| D15 | Usia / Kalori | age ÷ 100 | caloriesBurn ÷ 800 |

### Teknik Vektorisasi yang Digunakan:

1. **One-Hot Encoding** — Kategori dan intensitas latihan dikodekan sebagai vektor biner
2. **Binary Encoding** — Tujuan kebugaran dikodekan 1 (dipilih) atau 0 (tidak)
3. **Min-Max Normalization** — Nilai numerik (waktu, usia, kalori) dinormalisasi ke rentang 0–1
4. **Weighted History** — Bobot intensitas pengguna = 70% riwayat + 30% tingkat aktivitas harian

---

## 4. Contoh Perhitungan Manual

### Profil Pengguna

| Parameter | Nilai |
|-----------|-------|
| Usia | 22 tahun |
| Tingkat Aktivitas | Ringan |
| Tujuan | Penurunan Berat Badan |
| Waktu Tersedia | 15 menit |
| Kondisi Kesehatan | Nyeri Sendi |
| Riwayat Latihan | 5 latihan selesai (3 kardio, 1 kekuatan, 1 fleksibilitas) |

### Data Latihan: Lari Santai (Jogging)

| Atribut | Nilai |
|---------|-------|
| Kategori | Kardio |
| Intensitas | Sedang |
| Durasi | 30 menit |
| Benefits | Ketahanan, Penurunan Berat Badan, Kebugaran Umum |
| Kalori (30 min) | 288 kal |

---

### Langkah 1: Hitung Vektor Pengguna (U)

**D1–D5 (Kategori):** Dari 5 latihan selesai (3 kardio, 1 kekuatan, 1 fleksibilitas):

| Dimensi | Perhitungan | Nilai |
|---------|-------------|-------|
| D1 (kardio) | 3 ÷ 5 | **0.60** |
| D2 (kekuatan) | 1 ÷ 5 | **0.20** |
| D3 (fleksibilitas) | 1 ÷ 5 | **0.20** |
| D4 (keseimbangan) | 0 ÷ 5 | **0.00** |
| D5 (hiit) | 0 ÷ 5 | **0.00** |

**D6–D8 (Intensitas):** Aktivitas = ringan → preferensi: {rendah: 0.6, sedang: 0.3, tinggi: 0.1}

Asumsi riwayat: 1 rendah, 3 sedang, 1 tinggi:

| Dimensi | Rumus (riwayat×0.7 + aktivitas×0.3) | Nilai |
|---------|--------------------------------------|-------|
| D6 (rendah) | (1/5)×0.7 + 0.6×0.3 = 0.14 + 0.18 | **0.32** |
| D7 (sedang) | (3/5)×0.7 + 0.3×0.3 = 0.42 + 0.09 | **0.51** |
| D8 (tinggi) | (1/5)×0.7 + 0.1×0.3 = 0.14 + 0.03 | **0.17** |

**D9–D13 (Tujuan):** Hanya memilih penurunan berat badan:

| D9 | D10 | D11 | D12 | D13 |
|----|-----|-----|-----|-----|
| **1** | 0 | 0 | 0 | 0 |

**D14 (Waktu):** 15 ÷ 180 = **0.0833**

**D15 (Usia):** 22 ÷ 100 = **0.22**

**Vektor U:**
```
U = [0.60, 0.20, 0.20, 0.00, 0.00, 0.32, 0.51, 0.17, 1, 0, 0, 0, 0, 0.0833, 0.22]
```

---

### Langkah 2: Hitung Vektor Latihan (E)

**D1–D5 (Kategori):** Kardio → one-hot = [1, 0, 0, 0, 0]

**D6–D8 (Intensitas):** Sedang → one-hot = [0, 1, 0]

**D9–D13 (Benefits):** Penurunan BB, Ketahanan, Kebugaran Umum:

| D9 | D10 | D11 | D12 | D13 |
|----|-----|-----|-----|-----|
| **1** | 0 | **1** | 0 | **1** |

**D14 (Durasi):** 30 ÷ 60 = **0.50**

**D15 (Kalori):** 288 ÷ 800 = **0.36**

**Vektor E:**
```
E = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.50, 0.36]
```

---

### Langkah 3: Hitung Dot Product (U · E)

**Rumus:** `A • B = Σⁿᵢ₌₁ Aᵢ × Bᵢ`

| Dimensi | U[i] | E[i] | U[i] × E[i] |
|---------|------|------|--------------|
| D1 (kardio) | 0.60 | 1 | **0.6000** |
| D2 (kekuatan) | 0.20 | 0 | 0.0000 |
| D3 (fleksibilitas) | 0.20 | 0 | 0.0000 |
| D4 (keseimbangan) | 0.00 | 0 | 0.0000 |
| D5 (hiit) | 0.00 | 0 | 0.0000 |
| D6 (rendah) | 0.32 | 0 | 0.0000 |
| D7 (sedang) | 0.51 | 1 | **0.5100** |
| D8 (tinggi) | 0.17 | 0 | 0.0000 |
| D9 (penurunan BB) | 1 | 1 | **1.0000** |
| D10 (penambahan otot) | 0 | 0 | 0.0000 |
| D11 (ketahanan) | 0 | 1 | 0.0000 |
| D12 (fleksibilitas) | 0 | 0 | 0.0000 |
| D13 (kebugaran umum) | 0 | 1 | 0.0000 |
| D14 (waktu/durasi) | 0.0833 | 0.50 | **0.0417** |
| D15 (usia/kalori) | 0.22 | 0.36 | **0.0792** |

```
U · E = 0.6000 + 0.5100 + 1.0000 + 0.0417 + 0.0792 = 2.2309
```

---

### Langkah 4: Hitung Magnitude (Norma Euclidean)

**Rumus:** `|A| = √Σⁿᵢ₌₁(Aᵢ)²` dan `|B| = √Σⁿᵢ₌₁(Bᵢ)²`

**Magnitude Vektor Pengguna (||U||):**

```
||U|| = √(0.60² + 0.20² + 0.20² + 0² + 0² + 0.32² + 0.51² + 0.17² + 1² + 0² + 0² + 0² + 0² + 0.0833² + 0.22²)
     = √(0.3600 + 0.0400 + 0.0400 + 0 + 0 + 0.1024 + 0.2601 + 0.0289 + 1.0000 + 0 + 0 + 0 + 0 + 0.0069 + 0.0484)
     = √(1.8867)
     = 1.3736
```

**Magnitude Vektor Latihan (||E||):**

```
||E|| = √(1² + 0² + 0² + 0² + 0² + 0² + 1² + 0² + 1² + 0² + 1² + 0² + 1² + 0.50² + 0.36²)
     = √(1 + 0 + 0 + 0 + 0 + 0 + 1 + 0 + 1 + 0 + 1 + 0 + 1 + 0.25 + 0.1296)
     = √(4.3796)
     = 2.0927
```

---

### Langkah 5: Hitung Cosine Similarity

**Rumus:** `A • B / (|A| × |B|) = Σⁿᵢ₌₁ Aᵢ × Bᵢ / (√Σⁿᵢ₌₁(Aᵢ)² × √Σⁿᵢ₌₁(Bᵢ)²)`

```
cos(θ) = 2.2309 / (1.3736 × 2.0927)
       = 2.2309 / 2.8745
       = 0.7761
```

---

### Langkah 6: Normalisasi ke Skala 0–100

Karena cosine similarity dapat menghasilkan nilai -1 sampai 1, dilakukan normalisasi:

**Rumus:** `skor = ((cos(θ) + 1) / 2) × 100`

```
skor = ((0.7761 + 1) / 2) × 100
     = (1.7761 / 2) × 100
     = 0.8881 × 100
     = 88.81%
```

---

### Langkah 7: Validasi Pelatih (Coach Validation)

Setelah skor cosine similarity dihitung, sistem memeriksa kondisi kesehatan pengguna terhadap data kuesioner pelatih:

| Status | Aksi |
|--------|------|
| `aman` | Tidak ada perubahan skor |
| `aman_dengan_catatan` | Skor × 0.92 (dikurangi 8%) |
| `tidak_aman` | Latihan dihapus dari rekomendasi |

Untuk kasus ini, Lari Santai dengan kondisi nyeri sendi berstatus **aman**, sehingga tidak ada pengurangan skor.

---

### Langkah 8: Hasil Akhir

```
Skor akhir = 88.81% (dibulatkan ke 2 desimal)
```

Skor ini ditampilkan di antarmuka sebagai **≈ 87–89%** (variasi kecil tergantung distribusi riwayat latihan pengguna).

---

## 5. Ringkasan Proses

```
┌─────────────────────┐    ┌──────────────────────┐
│   Profil Pengguna   │    │    Data Latihan       │
│   Usia: 22          │    │    Lari Santai        │
│   Aktivitas: Ringan │    │    Kardio, Sedang     │
│   Tujuan: Penurunan │    │    288 kal/30 min     │
│   Berat Badan       │    │    3 benefits         │
└────────┬────────────┘    └────────┬─────────────┘
         │                          │
         ▼                          ▼
┌─────────────────┐       ┌──────────────────┐
│ Vektor U        │       │ Vektor E         │
│ (15 dimensi)    │       │ (15 dimensi)     │
└────────┬────────┘       └────────┬─────────┘
         │                         │
         └──────────┬──────────────┘
                    ▼
         ┌─────────────────────┐
         │ Dot Product         │
         │ U · E = 2.2309      │
         ├─────────────────────┤
         │ ||U|| = 1.3736      │
         │ ||E|| = 2.0927      │
         ├─────────────────────┤
         │ Cosine Similarity   │
         │ = 0.7761            │
         ├─────────────────────┤
         │ Normalisasi (0-100) │
         │ = 88.81%            │
         ├─────────────────────┤
         │ Coach Validation    │
         │ nyeri-sendi: aman   │
         │ faktor = 1.0        │
         ├─────────────────────┤
         │ SKOR AKHIR ≈ 88.81% │
         └─────────────────────┘
```

---

## 6. Kesimpulan

Algoritma Cosine Similarity pada aplikasi ini bekerja dengan cara:

1. **Mengubah** profil pengguna dan data latihan menjadi vektor numerik 15 dimensi
2. **Menghitung** kemiripan arah kedua vektor menggunakan rumus cosine
3. **Menormalisasi** hasil ke skala 0–100%
4. **Menerapkan** validasi pelatih berdasarkan kondisi kesehatan
5. **Mengurutkan** semua latihan berdasarkan skor tertinggi
6. **Menampilkan** 5 rekomendasi teratas kepada pengguna

Semakin tinggi skor, semakin cocok latihan tersebut dengan profil pengguna.
