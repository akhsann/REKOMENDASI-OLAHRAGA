# CARA MELIHAT CLASS DIAGRAM (class_diagram.puml)

## Metode 1: Menggunakan VS Code (Paling Mudah) ⭐ RECOMMENDED

### Langkah-langkah:

1. **Install Extension PlantUML di VS Code**

   - Buka VS Code
   - Tekan `Ctrl+Shift+X` (atau klik ikon Extensions di sidebar kiri)
   - Cari "PlantUML" (oleh jebbs)
   - Install extension "PlantUML" oleh jebbs

2. **Install Java Runtime (Jika belum ada)**

   - PlantUML membutuhkan Java untuk berjalan
   - Download Java dari: https://www.java.com/download/
   - Atau jika sudah ada Java, skip langkah ini

3. **Buka File class_diagram.puml**

   - Buka file `class_diagram.puml` di VS Code
   - Klik kanan pada file → "Preview Current Diagram" atau
   - Tekan `Alt+D` (atau `Option+D` di Mac) untuk preview
   - Atau klik ikon PlantUML di status bar VS Code

4. **Export sebagai Gambar (Opsional)**
   - Setelah preview muncul, klik kanan pada preview
   - Pilih "Export Current Diagram"
   - Pilih format: PNG, SVG, atau PDF

---

## Metode 2: Menggunakan PlantUML Online (Tanpa Install)

### Langkah-langkah:

1. **Buka Website PlantUML Online**

   - Kunjungi: http://www.plantuml.com/plantuml/
   - Atau: https://www.planttext.com/
   - Atau: https://plantuml-editor.kkeisuke.com/

2. **Copy isi file class_diagram.puml**

   - Buka file `class_diagram.puml` dengan text editor
   - Select All (`Ctrl+A`) dan Copy (`Ctrl+C`)

3. **Paste ke Website**

   - Paste konten ke text area di website PlantUML
   - Diagram akan otomatis ter-render

4. **Export sebagai Gambar**
   - Klik tombol Export/Download
   - Simpan sebagai PNG, SVG, atau format lainnya

---

## Metode 3: Menggunakan Command Line (Advanced)

### Prerequisites:

- Java JDK/JRE terinstall
- Download PlantUML jar file

### Langkah-langkah:

1. **Download PlantUML**

   ```bash
   # Download dari:
   # https://plantuml.com/download
   # Simpan sebagai plantuml.jar
   ```

2. **Jalankan di Terminal/Command Prompt**

   ```bash
   # Windows (PowerShell atau CMD)
   java -jar plantuml.jar class_diagram.puml

   # Linux/Mac
   java -jar plantuml.jar class_diagram.puml
   ```

3. **Output**
   - File gambar akan terbuat dengan nama `class_diagram.png` (atau format lainnya)

### Dengan format output khusus:

```bash
# PNG
java -jar plantuml.jar -tpng class_diagram.puml

# SVG
java -jar plantuml.jar -tsvg class_diagram.puml

# PDF
java -jar plantuml.jar -tpdf class_diagram.puml
```

---

## Metode 4: Menggunakan Aplikasi Desktop

### Pilihan Aplikasi:

1. **Visual Studio Code** (dengan extension PlantUML) - **RECOMMENDED**
2. **IntelliJ IDEA / WebStorm** - Built-in PlantUML support
3. **PlantUML Editor** - Aplikasi desktop khusus
4. **Atom Editor** - Dengan package plantuml-viewer

---

## Troubleshooting

### Masalah: Extension PlantUML tidak bekerja di VS Code

**Solusi:**

1. Pastikan Java sudah terinstall:
   ```bash
   java -version
   ```
2. Jika Java tidak terinstall, download dari java.com
3. Restart VS Code setelah install Java
4. Pastikan extension PlantUML sudah di-enable

### Masalah: Diagram tidak muncul di preview

**Solusi:**

1. Cek apakah ada error di output panel VS Code (View → Output → PlantUML)
2. Pastikan syntax PlantUML valid (buka di online editor untuk test)
3. Restart VS Code

### Masalah: Java tidak ditemukan

**Solusi:**

1. Install Java JDK atau JRE
2. Set JAVA_HOME environment variable (Windows):
   - System Properties → Environment Variables
   - Add JAVA_HOME dengan path ke Java installation
3. Restart VS Code/Command Prompt

---

## Quick Start (Cara Tercepat)

1. **Buka VS Code**
2. **Install Extension "PlantUML"** (by jebbs)
3. **Install Java** (jika belum ada)
4. **Buka file `class_diagram.puml`**
5. **Tekan `Alt+D`** untuk preview
6. **Done!** ✨

---

## Alternative: Lihat di Browser dengan One-Click

Jika file sudah di GitHub:

- GitHub otomatis akan render PlantUML files
- Cukup buka file di GitHub repository

Atau gunakan:

- **PlantUML Live Editor**: https://www.planttext.com/
- **PlantUML Server**: http://www.plantuml.com/plantuml/

---

## Tips

1. **Preview Side-by-Side**: Di VS Code, buka preview di split view untuk melihat diagram dan kode secara bersamaan
2. **Auto-Refresh**: Preview akan otomatis refresh saat file di-save
3. **Export Quality**: Gunakan SVG untuk kualitas terbaik (vector), PNG untuk kompatibilitas
4. **Keyboard Shortcuts**:
   - `Alt+D` - Preview diagram
   - `Ctrl+Shift+P` → "PlantUML: Export Current Diagram"
