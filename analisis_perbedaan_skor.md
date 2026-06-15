# Analisis Perbedaan Skor: 81.18% (Sistem) vs 81.24% (Manual)

## Latihan: Mesin Elipse (Elliptical) — ex16

---

## Penyebab Utama: Urutan `benefits` Berbeda

### Di dokumen manual Anda (baris 106):
```
Manfaat: Penurunan Berat Badan, Ketahanan, Kebugaran Umum → [1, 0, 1, 0, 1]
```

### Di source code (`exercises.ts` baris 284):
```typescript
benefits: ['ketahanan', 'penurunan-berat-badan', 'kebugaran-umum'],
```

### Urutan dimensi tujuan dalam sistem (D9–D13):
```
ALL_GOALS = ['penurunan-berat-badan', 'penambahan-otot', 'ketahanan', 'fleksibilitas', 'kebugaran-umum']
```

### Encoding yang benar (sesuai sistem):
| Dimensi | Goal | Ada di benefits? | Nilai |
|---------|------|-----------------|-------|
| D9  | penurunan-berat-badan | ✅ Ya | 1 |
| D10 | penambahan-otot | ❌ Tidak | 0 |
| D11 | ketahanan | ✅ Ya | 1 |
| D12 | fleksibilitas | ❌ Tidak | 0 |
| D13 | kebugaran-umum | ✅ Ya | 1 |

**Encoding: [1, 0, 1, 0, 1]** — ini **sama** dengan yang Anda tulis di manual.

> [!NOTE]
> Urutan `benefits` di `exercises.ts` tidak mempengaruhi encoding karena sistem menggunakan `.includes()` untuk cek kecocokan. Jadi encoding Vektor B untuk tujuan **sudah benar**.

---

## Penyebab Sebenarnya: Nilai Usia

### Di profil pengguna (tangkapan layar):
- Usia: **23 tahun**
- D15 = 23 / 100 = **0.23**

### Di dokumen manual Anda (baris 54):
```
D15 (Usia): min(24 / 100, 1) = 0.23
```

> [!WARNING]
> Anda menulis **24** dalam rumus tapi hasilnya **0.23** — ini inkonsisten. 
> - Jika usia = 23 → D15 = 0.23 ✅ (sesuai profil)
> - Jika usia = 24 → D15 = 0.24 (berbeda)

Namun karena Anda tetap menggunakan **0.23** sebagai nilai vektor, ini bukan penyebab perbedaan 81.18% vs 81.24%.

---

## Penyebab Sebenarnya: Perbedaan Pembulatan di Langkah Menengah

Mari kita hitung ulang dengan **presisi penuh** (tanpa pembulatan tengah jalan):

### Vektor A (Profil Pengguna):
```
A = [0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.5, 0.3, 1, 0, 0, 0, 0, 0.16666..., 0.23]
```

> [!IMPORTANT]
> **D14 (Waktu)**: 30 / 180 = 0.1666666... (berulang), bukan 0.1667 yang dibulatkan.

### Vektor B (Mesin Elipse):
```
B = [1, 0, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1, 0.5, 0.34125]
```

### Langkah 1: Dot Product (presisi penuh)

| Dimensi | A_i | B_i | A_i × B_i |
|---------|-----|-----|-----------|
| D1 | 0.2 | 1 | 0.2 |
| D2 | 0.2 | 0 | 0 |
| D3 | 0.2 | 0 | 0 |
| D4 | 0.2 | 0 | 0 |
| D5 | 0.2 | 0 | 0 |
| D6 | 0.2 | 0 | 0 |
| D7 | 0.5 | 1 | 0.5 |
| D8 | 0.3 | 0 | 0 |
| D9 | 1 | 1 | 1 |
| D10 | 0 | 0 | 0 |
| D11 | 0 | 1 | 0 |
| D12 | 0 | 0 | 0 |
| D13 | 0 | 1 | 0 |
| D14 | 0.16666... | 0.5 | **0.08333...** |
| D15 | 0.23 | 0.34125 | **0.078487...** |

```
Dot Product = 0.2 + 0.5 + 1 + 0.08333... + 0.078487...
            = 1.861820...
```

### Langkah 2: Magnitude A (presisi penuh)

```
Σ(A_i²) = 6×(0.04) + 0.25 + 0.09 + 1 + 0 + 0 + 0 + 0 + (1/6)² + 0.23²
        = 0.24 + 0.25 + 0.09 + 1 + 0.027777... + 0.0529
        = 1.660677...

|A| = √1.660677... = 1.288672...
```

### Langkah 3: Magnitude B (presisi penuh)

```
Σ(B_i²) = 1 + 1 + 1 + 1 + 1 + 0.25 + 0.34125²
        = 5.25 + 0.116451...
        = 5.366451...

|B| = √5.366451... = 2.316563...
```

### Langkah 4: Cosine Similarity (presisi penuh)

```
cos(θ) = 1.861820... / (1.288672... × 2.316563...)
       = 1.861820... / 2.985625...
       = 0.623571...
```

### Langkah 5: Normalisasi ke 0–100%

```
Skor = ((0.623571... + 1) / 2) × 100
     = (1.623571... / 2) × 100
     = 81.1786...%
     ≈ 81.18%  ← Ini yang ditampilkan sistem!
```

---

## Perbandingan: Mengapa Manual Mendapat 81.24%?

Di dokumen manual Anda, ada **pembulatan di langkah menengah**:

| Langkah | Nilai Manual (dibulatkan) | Nilai Sistem (presisi penuh) |
|---------|--------------------------|------------------------------|
| D14 | **0.1667** | 0.16666... |
| Σ(A_i²) | **1.6607** | 1.660677... |
| \|A\| | **1.2887** | 1.288672... |
| Dot Product | **1.8618** | 1.861820... |
| \|A\| × \|B\| | **2.9796** | 2.985625... |
| Cosine Similarity | **0.6249** | 0.623571... |
| **Skor Akhir** | **81.24%** | **81.18%** |

> [!CAUTION]
> Perbedaan kritis ada di **|A| × |B|**: 
> - Manual: 1.2887 × 2.3166 = **2.9796**
> - Sistem: 1.288672... × 2.316563... = **2.9856**
> 
> Penyebut yang lebih kecil di manual membuat cosine similarity lebih besar → skor lebih tinggi.

---

## Kesimpulan

| Aspek | Keterangan |
|-------|-----------|
| **Penyebab** | Pembulatan angka di langkah-langkah menengah perhitungan manual |
| **Selisih** | 81.24% − 81.18% = **0.06%** |
| **Yang benar** | **81.18%** (sistem), karena menggunakan presisi floating-point penuh |
| **Solusi** | Perbarui dokumen manual agar menggunakan presisi lebih tinggi atau samakan skor akhir dengan hasil sistem |

> [!TIP]
> Untuk mencocokkan manual dengan sistem, Anda bisa:
> 1. Gunakan presisi lebih tinggi (minimal 6 desimal) di setiap langkah perhitungan
> 2. Atau tuliskan catatan bahwa pembulatan menengah menyebabkan selisih kecil (~0.06%)
