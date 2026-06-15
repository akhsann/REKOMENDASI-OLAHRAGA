# PROPOSAL PROYEK APLIKASI REKOMENDASI OLAHRAGA

## BAB I PENDAHULUAN

### 1.1 Latar Belakang

Aktivitas fisik dan olahraga merupakan komponen penting dalam menjaga kesehatan dan kebugaran tubuh. Namun, banyak individu yang menghadapi kesulitan dalam memilih jenis olahraga yang sesuai dengan kondisi fisik, tujuan kebugaran, dan keterbatasan waktu mereka. Tanpa panduan yang tepat, seseorang dapat memilih olahraga yang terlalu intens, tidak sesuai dengan kondisi kesehatan, atau tidak efektif dalam mencapai tujuan mereka.

Masalah umum yang dihadapi meliputi:

- Kurangnya pengetahuan tentang jenis olahraga yang sesuai dengan tingkat kebugaran individu
- Kesulitan dalam merencanakan rutinitas olahraga yang terstruktur
- Tidak adanya sistem pelacakan progres yang komprehensif
- Minimnya akses terhadap panduan teknik olahraga yang benar
- Kesulitan menjaga konsistensi dalam berolahraga

Teknologi informasi dan komunikasi, khususnya aplikasi mobile, telah menjadi solusi efektif dalam berbagai aspek kehidupan sehari-hari. Penggunaan smartphone yang semakin meluas membuka peluang untuk mengembangkan aplikasi berbasis mobile yang dapat memberikan rekomendasi olahraga yang personal dan terstruktur.

### 1.2 Rumusan Masalah

Berdasarkan latar belakang di atas, dapat dirumuskan beberapa masalah sebagai berikut:

1. Bagaimana merancang sistem rekomendasi olahraga yang dapat menyesuaikan dengan profil pengguna (usia, jenis kelamin, tingkat kebugaran, tujuan, dan kondisi kesehatan)?
2. Bagaimana mengimplementasikan algoritma rekomendasi yang mempertimbangkan preferensi, riwayat aktivitas, dan ketersediaan waktu pengguna?
3. Bagaimana menyediakan sistem pelacakan progres yang dapat memotivasi pengguna untuk konsisten berolahraga?
4. Bagaimana menyediakan panduan tutorial olahraga yang mudah diakses dan dipahami?
5. Bagaimana merancang antarmuka pengguna yang intuitif dan menarik untuk meningkatkan pengalaman pengguna?

### 1.3 Tujuan Penelitian/Proyek

Tujuan utama dari proyek ini adalah mengembangkan aplikasi rekomendasi olahraga berbasis mobile dan web yang dapat memberikan rekomendasi personal berdasarkan profil pengguna. Tujuan spesifik meliputi:

1. **Mengembangkan Sistem Rekomendasi Personal**: Membangun algoritma rekomendasi yang mempertimbangkan berbagai faktor seperti tingkat kebugaran, tujuan, ketersediaan waktu, kondisi kesehatan, dan riwayat aktivitas pengguna.

2. **Menyediakan Fitur Pelacakan Progres**: Mengimplementasikan sistem yang dapat melacak progres pengguna, termasuk streak harian, total kalori terbakar, jumlah latihan yang diselesaikan, dan visualisasi data progres.

3. **Menyediakan Panduan Tutorial**: Menyediakan tutorial step-by-step untuk setiap jenis olahraga yang mencakup teknik, tips keselamatan, dan kesalahan umum yang harus dihindari.

4. **Mengembangkan Fitur Pendukung**: Mengimplementasikan fitur-fitur pendukung seperti pengelolaan favorit, pengingat latihan, dan manajemen profil pengguna.

5. **Menciptakan Pengalaman Pengguna yang Optimal**: Merancang antarmuka pengguna yang modern, intuitif, dan responsif untuk meningkatkan engagement pengguna.

### 1.4 Manfaat Penelitian/Proyek

Proyek ini diharapkan memberikan manfaat sebagai berikut:

#### 1.4.1 Manfaat Teoretis

- Kontribusi terhadap pengembangan sistem rekomendasi berbasis profil pengguna di domain kesehatan dan kebugaran
- Pemahaman tentang penerapan algoritma scoring dalam sistem rekomendasi personal
- Pengetahuan tentang pengembangan aplikasi mobile hybrid menggunakan teknologi web modern

#### 1.4.2 Manfaat Praktis

- **Bagi Pengguna**:

  - Memperoleh rekomendasi olahraga yang personal dan sesuai dengan kondisi mereka
  - Memiliki panduan yang jelas dalam memulai dan menjalani rutinitas olahraga
  - Dapat memantau progres kebugaran secara real-time
  - Mendapat motivasi melalui sistem pelacakan streak dan pencapaian
  - Akses mudah terhadap tutorial olahraga yang dapat diikuti kapan saja

- **Bagi Pengembang**:

  - Pengalaman dalam mengembangkan aplikasi full-stack modern
  - Pemahaman tentang integrasi teknologi web dengan platform mobile
  - Pengetahuan tentang implementasi algoritma rekomendasi berbasis rule-based

- **Bagi Industri**:
  - Kontribusi terhadap ekosistem aplikasi kesehatan dan kebugaran
  - Potensi pengembangan lebih lanjut menjadi produk komersial
  - Basis untuk penelitian lebih lanjut tentang personalisasi rekomendasi olahraga

## BAB II TINJAUAN PUSTAKA

### 2.1 Konsep Sistem Informasi/Aplikasi

#### 2.1.1 Sistem Rekomendasi (Recommendation System)

Sistem rekomendasi adalah sistem yang bertujuan untuk memprediksi preferensi atau rating yang akan diberikan pengguna terhadap suatu item. Dalam konteks aplikasi olahraga, sistem rekomendasi berfungsi untuk menyarankan jenis latihan yang paling sesuai dengan profil dan preferensi pengguna.

Sistem rekomendasi dapat diklasifikasikan menjadi beberapa jenis:

- **Content-Based Filtering**: Merekomendasikan item yang mirip dengan item yang pernah disukai pengguna sebelumnya
- **Collaborative Filtering**: Merekomendasikan item berdasarkan preferensi pengguna lain yang memiliki kesamaan
- **Hybrid Approach**: Kombinasi dari berbagai metode rekomendasi

Aplikasi ini menggunakan pendekatan content-based dengan algoritma scoring yang mempertimbangkan berbagai atribut profil pengguna dan karakteristik latihan.

#### 2.1.2 Aplikasi Mobile Hybrid

Aplikasi mobile hybrid adalah aplikasi yang dibangun menggunakan teknologi web (HTML, CSS, JavaScript) tetapi dikemas dalam wrapper native sehingga dapat dijalankan sebagai aplikasi mobile di berbagai platform. Keuntungan dari pendekatan ini adalah:

- Code reusability (satu codebase untuk multiple platform)
- Pengembangan yang lebih cepat
- Update yang mudah tanpa melalui app store
- Akses ke fitur native melalui plugin

#### 2.1.3 Sistem Manajemen Data Lokal

Aplikasi ini menggunakan local storage untuk menyimpan data pengguna. Pendekatan ini cocok untuk aplikasi yang tidak memerlukan sinkronisasi real-time antar perangkat atau untuk prototype/MVP yang fokus pada fungsionalitas core terlebih dahulu.

### 2.2 Teknologi yang Digunakan

#### 2.2.1 Framework Frontend

**React 18.3.1**

- Library JavaScript untuk membangun antarmuka pengguna
- Menggunakan paradigma komponen yang memungkinkan code reuse dan maintainability yang baik
- Hooks API untuk manajemen state dan side effects
- Virtual DOM untuk performa rendering yang optimal

**TypeScript 5.8.3**

- Superset JavaScript yang menambahkan static typing
- Membantu mengurangi bug dan meningkatkan code quality
- Memudahkan refactoring dan maintenance
- Memberikan autocomplete dan IntelliSense yang lebih baik

**Vite 5.4.19**

- Build tool modern yang menggantikan webpack
- Menyediakan development server yang sangat cepat dengan HMR (Hot Module Replacement)
- Optimized build untuk production
- Plugin ecosystem yang kaya

#### 2.2.2 Routing dan State Management

**React Router DOM 6.30.1**

- Library untuk routing dalam aplikasi React
- Mendukung client-side routing
- Fitur seperti nested routes, protected routes, dan navigation guards
- URL-based navigation yang SEO-friendly

**TanStack Query (React Query) 5.83.0**

- Library untuk data fetching dan caching
- Memudahkan manajemen server state
- Menyediakan features seperti automatic refetching, caching, dan background updates
- Meskipun aplikasi ini menggunakan localStorage, React Query dapat digunakan untuk state management yang lebih terstruktur

**React Hook Form 7.61.1**

- Library untuk manajemen form yang performant dan mudah digunakan
- Mendukung validasi dengan Zod
- Mengurangi re-render yang tidak perlu
- Uncontrolled components approach untuk performa yang lebih baik

#### 2.2.3 UI Framework dan Styling

**Tailwind CSS 3.4.17**

- Utility-first CSS framework
- Memungkinkan rapid UI development
- Highly customizable melalui configuration
- Small production bundle size melalui purging unused styles

**shadcn/ui Components**

- Collection of reusable components built dengan Radix UI dan Tailwind CSS
- Components seperti Button, Card, Dialog, Form, dll
- Copy-paste approach (bukan npm package) untuk maximum customization
- Accessible by default (WCAG compliant)

**Radix UI**

- Low-level UI primitives yang unstyled dan accessible
- Components seperti Dialog, Dropdown Menu, Select, dll
- Full keyboard navigation support
- Screen reader friendly

#### 2.2.4 Mobile Platform Integration

**Capacitor 7.4.4**

- Modern alternative untuk Cordova/PhoneGap
- Native runtime untuk web apps
- Plugin ecosystem yang kaya
- Support untuk iOS, Android, dan Web

**Capacitor Local Notifications 7.4.3**

- Plugin untuk menampilkan local notifications
- Support untuk scheduled notifications
- Platform-specific customization
- Permission handling

#### 2.2.5 Data Visualization

**Recharts 2.15.4**

- Library charting untuk React
- Built on top of D3.js
- Responsive dan customizable
- Support untuk berbagai jenis chart (Line, Bar, Pie, dll)

#### 2.2.6 Validasi dan Utilities

**Zod 3.25.76**

- TypeScript-first schema validation library
- Runtime type checking
- Integration dengan React Hook Form
- Type inference yang powerful

**date-fns 3.6.0**

- Utility library untuk manipulasi tanggal
- Modular dan tree-shakeable
- Immutable functions
- Locale support

**clsx & tailwind-merge**

- Utilities untuk conditional className management
- Memudahkan dynamic styling
- Resolve Tailwind class conflicts

#### 2.2.7 Tools Development

**ESLint 9.32.0**

- Linter untuk JavaScript/TypeScript
- Mendeteksi potential bugs dan code quality issues
- Enforce coding standards
- Configurable rules

**TypeScript ESLint 8.38.0**

- ESLint plugin untuk TypeScript
- Type-aware linting rules
- Better error detection

### 2.3 Penelitian atau Proyek Terkait

Beberapa aplikasi fitness yang sudah ada di pasaran seperti MyFitnessPal, Nike Training Club, dan Strava telah membuktikan efektivitas pendekatan teknologi dalam membantu pengguna mencapai tujuan kebugaran mereka. Aplikasi-aplikasi ini umumnya memiliki fitur:

- Tracking aktivitas fisik
- Rekomendasi latihan
- Komunitas dan social features
- Integration dengan wearable devices

Namun, kebanyakan aplikasi ini kurang fokus pada personalisasi berdasarkan kondisi kesehatan spesifik atau memiliki interface yang kompleks. Aplikasi yang dikembangkan dalam proyek ini berusaha untuk menyediakan solusi yang lebih sederhana namun tetap personal dan efektif, dengan fokus pada:

- Algoritma rekomendasi yang mempertimbangkan kondisi kesehatan
- Interface yang clean dan mudah digunakan
- Sistem progres tracking yang memotivasi
- Tutorial yang komprehensif

## BAB III METODOLOGI PENELITIAN

### 3.1 Metode Pengembangan Sistem

Proyek ini menggunakan metodologi pengembangan perangkat lunak dengan pendekatan **Agile/Iterative Development**. Pendekatan ini dipilih karena:

1. **Fleksibilitas**: Memungkinkan perubahan requirement selama pengembangan
2. **Rapid Prototyping**: Dapat mengembangkan prototype dengan cepat untuk validasi konsep
3. **Incremental Delivery**: Fitur dapat dikembangkan dan diuji secara bertahap
4. **Adaptive Planning**: Perencanaan dapat disesuaikan berdasarkan feedback

**Tahapan dalam Agile Development**:

1. **Planning**: Perencanaan fitur dan requirement gathering
2. **Design**: Perancangan arsitektur dan UI/UX
3. **Development**: Implementasi fitur-fitur
4. **Testing**: Pengujian fungsionalitas dan user acceptance testing
5. **Review**: Evaluasi dan gathering feedback
6. **Iteration**: Pengulangan siklus untuk fitur-fitur berikutnya

### 3.2 Tahapan Pengembangan Sistem

#### 3.2.1 Tahap Analisis dan Perencanaan

- **Requirement Analysis**: Mengidentifikasi kebutuhan fungsional dan non-fungsional
- **User Persona Development**: Mendefinisikan karakteristik pengguna target
- **Technology Stack Selection**: Memilih teknologi yang sesuai
- **Project Planning**: Membuat timeline dan milestone

#### 3.2.2 Tahap Perancangan

- **System Architecture Design**: Merancang arsitektur aplikasi
- **Database Schema Design**: Merancang struktur data (meskipun menggunakan localStorage)
- **UI/UX Design**: Merancang wireframe dan mockup antarmuka
- **Algorithm Design**: Merancang algoritma rekomendasi

#### 3.2.3 Tahap Implementasi

**Phase 1: Setup Project dan Core Infrastructure**

- Setup project dengan Vite + React + TypeScript
- Konfigurasi Tailwind CSS dan UI components
- Setup React Router dan basic routing
- Implementasi authentication system

**Phase 2: User Profile dan Data Management**

- Implementasi user registration dan login
- User profile management
- Data storage dengan localStorage
- Form validation dengan Zod

**Phase 3: Exercise Data dan Recommendation System**

- Menyusun database latihan (exercise data)
- Implementasi algoritma rekomendasi
- Scoring system untuk matching exercise dengan user profile
- Recommendation filtering dan sorting

**Phase 4: Core Features**

- Home page dengan rekomendasi
- Exercise detail dan tutorial
- Workout session tracker
- Progress tracking system

**Phase 5: Additional Features**

- Favorites management
- Progress visualization dengan charts
- Workout reminders (notifications)
- Export progress data

**Phase 6: Mobile Integration**

- Setup Capacitor
- Android build configuration
- Testing di perangkat mobile
- Optimasi untuk mobile

#### 3.2.4 Tahap Pengujian

- **Unit Testing**: Testing individual functions dan components
- **Integration Testing**: Testing interaksi antar komponen
- **User Acceptance Testing**: Testing dengan pengguna aktual
- **Performance Testing**: Optimasi loading time dan responsiveness
- **Cross-platform Testing**: Testing di berbagai browser dan perangkat

#### 3.2.5 Tahap Deployment

- Build production version
- Deploy ke web hosting (jika web version)
- Build APK/IPA untuk mobile
- Distribution dan documentation

### 3.3 Diagram Sistem

#### 3.3.1 Diagram Use Case

**Aktor**:

- Pengguna (User)
- Sistem (System)

**Use Cases**:

1. **Registrasi dan Login**

   - User dapat melakukan registrasi akun baru
   - User dapat login ke akun yang sudah ada
   - Sistem memvalidasi kredensial pengguna

2. **Pengelolaan Profil**

   - User dapat membuat/mengupdate profil kebugaran
   - User dapat mengatur preferensi olahraga
   - User dapat mengatur reminder latihan

3. **Melihat Rekomendasi**

   - Sistem menampilkan rekomendasi olahraga personal
   - User dapat melihat detail setiap latihan
   - User dapat me-refresh rekomendasi

4. **Mengelola Latihan**

   - User dapat menambahkan latihan ke favorit
   - User dapat melewati latihan tertentu
   - User dapat memulai latihan dari rekomendasi

5. **Mengikuti Tutorial**

   - User dapat melihat tutorial step-by-step
   - User dapat navigasi antar step tutorial
   - User dapat memulai latihan setelah tutorial

6. **Melakukan Latihan**

   - User dapat memulai sesi latihan
   - User dapat pause/resume latihan
   - User dapat menghentikan latihan
   - User dapat menyelesaikan dan menyimpan progres

7. **Melihat Progres**

   - User dapat melihat statistik progres
   - User dapat melihat grafik progres
   - User dapat export data progres
   - User dapat melihat riwayat aktivitas

8. **Mengelola Favorit**
   - User dapat melihat daftar latihan favorit
   - User dapat menghapus dari favorit
   - User dapat memulai latihan dari favorit

#### 3.3.2 Diagram Activity - Alur Rekomendasi Latihan

**Deskripsi Alur**:

1. User login/akses aplikasi
2. Sistem memeriksa apakah user memiliki profil lengkap
3. Jika belum lengkap, redirect ke halaman profil
4. Jika lengkap, sistem mengambil data profil user
5. Sistem mengambil daftar semua latihan yang tersedia
6. Sistem menghitung similarity score untuk setiap latihan berdasarkan:
   - Tingkat kebugaran user vs intensitas latihan (20 poin)
   - Kesesuaian tujuan user dengan benefit latihan (30 poin)
   - Ketersediaan waktu user vs durasi latihan (20 poin)
   - Riwayat interaksi user (favorite, complete, skip) (30 poin)
   - Diversitas kategori latihan (10 poin)
7. Sistem mengurutkan latihan berdasarkan score
8. Sistem mengambil 5 latihan dengan score tertinggi
9. Sistem menampilkan rekomendasi ke user
10. User dapat berinteraksi dengan rekomendasi (favorite, start, skip)
11. Sistem memperbarui preferensi user berdasarkan interaksi
12. Algoritma belajar dari interaksi untuk rekomendasi berikutnya

#### 3.3.3 Diagram Activity - Alur Sesi Latihan

**Deskripsi Alur**:

1. User memilih latihan dari rekomendasi/favorit
2. Sistem menampilkan halaman tutorial
3. User membaca tutorial step-by-step
4. User memilih "Mulai Latihan"
5. Sistem menampilkan halaman workout session dengan timer
6. User memulai timer latihan
7. Sistem menghitung waktu yang berlalu
8. Sistem menghitung kalori yang terbakar secara real-time
9. Sistem menampilkan progress bar
10. User dapat pause/resume latihan
11. Jika user menyelesaikan durasi target:
    - Sistem menampilkan notifikasi selesai
    - User memilih "Selesai & Simpan"
12. Jika user menghentikan sebelum selesai:
    - Progress tidak disimpan
13. Jika selesai, sistem menyimpan progres:
    - Menambahkan latihan ke completed exercises
    - Update daily log dengan tanggal, latihan, kalori, waktu
    - Update total calories burned
    - Update total exercises completed
    - Recalculate streak (current dan longest)
14. Sistem menampilkan konfirmasi dan statistik latihan
15. Sistem redirect ke halaman utama

#### 3.3.4 Arsitektur Sistem (Secara Tekstual)

Aplikasi dibangun dengan arsitektur **Single Page Application (SPA)** berbasis React dengan struktur sebagai berikut:

**Presentation Layer (Frontend)**

- **Pages**: Halaman-halaman utama aplikasi (Login, Register, Home, Profile, Progress, Favorites, Tutorial, Workout Session)
- **Components**: Komponen UI yang reusable (ExerciseCard, Navigation, Tutorial, WorkoutReminder, dll)
- **UI Components**: Komponen dasar dari shadcn/ui (Button, Card, Dialog, Form, dll)

**Business Logic Layer**

- **Contexts**: State management global (AuthContext untuk authentication state)
- **Utils**: Utility functions dan business logic
  - `recommendation.ts`: Algoritma rekomendasi dan scoring
  - `storage.ts`: Manajemen data lokal (localStorage operations)
  - `auth.ts`: Authentication logic
  - `notifications.ts`: Notification management untuk mobile
  - `translationMaps.ts`: Mapping data untuk translasi/display

**Data Layer**

- **Data Files**: Static data
  - `exercises.ts`: Database latihan (array of exercise objects)
  - `exerciseTutorials.ts`: Tutorial untuk setiap latihan
- **Local Storage**: Persistence layer
  - User authentication data
  - User profiles
  - Progress data
  - Preferences dan settings

**Integration Layer**

- **Capacitor Plugins**: Integrasi dengan native features
  - Local Notifications
  - Native platform detection
- **React Router**: Client-side routing
- **React Query**: Data fetching dan caching (untuk future API integration)

**Build dan Deployment**

- **Vite**: Build tool dan development server
- **Capacitor**: Wrapper untuk mobile deployment
- **TypeScript Compiler**: Type checking dan compilation

## BAB IV PERANCANGAN SISTEM

### 4.1 Arsitektur Sistem

Aplikasi ini menggunakan arsitektur **component-based architecture** dengan React, yang memungkinkan modularitas dan reusability yang tinggi. Struktur folder mengikuti pattern yang umum digunakan dalam proyek React modern:

```
src/
├── components/        # Reusable UI components
│   ├── ui/           # shadcn/ui base components
│   ├── ExerciseCard.tsx
│   ├── Navigation.tsx
│   ├── Tutorial.tsx
│   └── WorkoutReminder.tsx
├── contexts/         # React Context for global state
│   └── AuthContext.tsx
├── data/            # Static data (exercises, tutorials)
│   ├── exercises.ts
│   └── exerciseTutorials.ts
├── hooks/           # Custom React hooks
│   ├── use-mobile.tsx
│   └── use-toast.ts
├── lib/             # Utility libraries
│   └── utils.ts
├── pages/           # Page components (routes)
│   ├── Index.tsx
│   ├── Login.tsx
│   ├── Register.tsx
│   ├── Profile.tsx
│   ├── Progress.tsx
│   ├── Favorites.tsx
│   ├── TutorialPage.tsx
│   └── WorkoutSession.tsx
├── types/           # TypeScript type definitions
│   ├── auth.ts
│   └── exercise.ts
└── utils/           # Business logic utilities
    ├── auth.ts
    ├── recommendation.ts
    ├── storage.ts
    ├── notifications.ts
    └── translationMaps.ts
```

**Komunikasi Antar Layer**:

1. **User Interaction Flow**:

   - User berinteraksi dengan Page/Component
   - Component memanggil utility functions atau hooks
   - Utility functions mengakses data layer (localStorage atau static data)
   - Perubahan state di-manage melalui React Context atau local state
   - UI update berdasarkan state changes

2. **Data Flow**:

   - Data mengalir dari localStorage ke components melalui utility functions
   - State changes ditrigger oleh user actions
   - State updates menyebabkan re-render components
   - Changes persist ke localStorage melalui utility functions

3. **State Management**:
   - **Global State**: Authentication state melalui AuthContext
   - **Local State**: Component-specific state melalui useState
   - **Derived State**: State yang dihitung dari other state atau data
   - **Persisted State**: State yang disimpan di localStorage

### 4.2 Perancangan Database

Meskipun aplikasi ini menggunakan localStorage (bukan database tradisional), struktur data tetap dirancang dengan prinsip database design. Berikut adalah skema data yang digunakan:

#### 4.2.1 Entity: User

```typescript
{
  id: string; // Unique identifier
  name: string; // Nama pengguna
  email: string; // Email (unique)
  password: string; // Password (dalam production harus di-hash)
  createdAt: string; // Timestamp registrasi
}
```

#### 4.2.2 Entity: UserProfile

```typescript
{
  id: string;                    // FK ke User
  age: number;                   // Usia
  gender: 'pria' | 'wanita' | ...;
  fitnessLevel: 'pemula' | 'menengah' | 'lanjutan';
  goals: FitnessGoal[];          // Array tujuan (dapat multiple)
  availableTime: number;         // Menit per hari
  healthConditions: HealthCondition[];
  preferences: {
    favoriteExercises: string[];      // Array of exercise IDs
    completedExercises: string[];     // Array of exercise IDs
    skippedExercises: string[];       // Array of exercise IDs
  };
  progress: {
    dailyLogs: DailyProgress[];       // Array log harian
    currentStreak: number;            // Streak saat ini (hari)
    longestStreak: number;            // Streak terpanjang
    totalCaloriesBurned: number;
    totalExercisesCompleted: number;
  };
}
```

#### 4.2.3 Entity: DailyProgress

```typescript
{
  date: string;                  // Format: YYYY-MM-DD
  exercisesCompleted: string[];  // Array of exercise IDs
  caloriesBurned: number;
  timeSpent: number;             // Menit
}
```

#### 4.2.4 Entity: Exercise (Static Data)

```typescript
{
  id: string;                    // Unique identifier
  name: string;
  category: ExerciseCategory;    // 'kardio' | 'kekuatan' | ...
  duration: number;              // Menit
  intensity: 'rendah' | 'sedang' | 'tinggi';
  benefits: string[];            // Array tujuan yang didukung
  description: string;
  equipment: string[];           // Peralatan yang dibutuhkan
  targetMuscles: string[];       // Otot yang ditargetkan
  caloriesBurn: number;          // Kalori per sesi
}
```

#### 4.2.5 Entity: ExerciseTutorial (Static Data)

```typescript
{
  exerciseId: string;            // FK ke Exercise
  steps: TutorialStep[];         // Array langkah-langkah
  safetyTips: string[];
  commonMistakes: string[];
}
```

#### 4.2.6 Entity: WorkoutReminder (Settings)

```typescript
{
  id: number;
  hour: number;                  // Jam (0-23)
  minute: number;                // Menit (0-59)
  enabled: boolean;
  days: number[];                // Array hari (0=Sunday, 1=Monday, ...)
}
```

**Storage Strategy**:

1. **User Authentication Data**:

   - Key: `fitness_auth_token` (token), `fitness_current_user` (user object), `fitness_users` (array of all users)

2. **User Profile Data**:

   - Key: `fitness_user_profile_{userId}` untuk setiap user
   - Fallback: `fitness_user_profile` untuk backward compatibility

3. **Workout Reminder**:
   - Key: `workoutReminder` (settings)

**Data Relationships**:

- One-to-One: User → UserProfile
- One-to-Many: UserProfile → DailyProgress (melalui dailyLogs array)
- Many-to-Many: UserProfile ↔ Exercise (melalui preferences arrays)
- One-to-One: Exercise → ExerciseTutorial

### 4.3 Perancangan Antarmuka Pengguna

#### 4.3.1 Prinsip Desain UI/UX

Aplikasi ini mengikuti prinsip-prinsip desain modern:

1. **Mobile-First Design**: Dirancang untuk mobile terlebih dahulu, kemudian dioptimalkan untuk desktop
2. **Minimalist Interface**: Clean dan uncluttered untuk mengurangi cognitive load
3. **Consistent Design Language**: Menggunakan design system yang konsisten (shadcn/ui)
4. **Visual Hierarchy**: Informasi penting ditonjolkan dengan ukuran, warna, dan spacing
5. **Feedback**: Memberikan feedback visual untuk setiap user action
6. **Accessibility**: Menggunakan semantic HTML dan ARIA attributes

#### 4.3.2 Design System

**Color Palette**:

- Primary: Warna utama untuk CTA buttons dan accent
- Secondary: Warna untuk background dan cards
- Accent: Warna untuk highlights dan special elements
- Muted: Warna untuk text yang kurang penting
- Destructive: Warna untuk actions yang merusak (delete, stop)

**Typography**:

- Font family: System fonts (untuk performa)
- Heading: Bold, ukuran 2xl, xl, lg
- Body: Regular, ukuran base, sm
- Caption: Regular, ukuran xs

**Spacing**:

- Menggunakan scale 4px (0.25rem) untuk consistency
- Padding dan margin mengikuti Tailwind spacing scale

**Components Patterns**:

- Cards untuk grouping informasi
- Buttons dengan variants (primary, outline, ghost, destructive)
- Badges untuk labels dan tags
- Progress bars untuk visualisasi progres
- Icons dari Lucide React untuk visual cues

#### 4.3.3 Halaman-Halaman Utama

**1. Halaman Login/Register**

- **Layout**: Centered card dengan form
- **Elements**:
  - Logo/Icon di atas
  - Form fields dengan icons
  - Primary CTA button
  - Link ke register/login
- **Features**: Form validation dengan real-time feedback

**2. Halaman Home (Rekomendasi)**

- **Layout**: Scrollable list dengan header
- **Elements**:
  - Header dengan title dan refresh button
  - User stats cards (completed, favorites, available time)
  - Exercise cards dengan rekomendasi
  - Info card tentang smart recommendations
  - Bottom navigation
- **Features**:
  - Animated cards dengan hover effects
  - Score badge untuk setiap rekomendasi
  - Action buttons (favorite, start, skip)

**3. Halaman Profil**

- **Layout**: Form dengan sections
- **Elements**:
  - Profile header dengan user info
  - Form fields untuk data profil
  - Checkboxes untuk goals dan health conditions
  - Workout reminder section
  - Save button
  - Logout button
- **Features**:
  - Form validation
  - Auto-save indicator (optional)

**4. Halaman Progres**

- **Layout**: Dashboard dengan stats dan charts
- **Elements**:
  - Motivational message banner
  - Key stats cards (streak, total exercises, calories)
  - Period selector (week, month, all)
  - Weekly summary card
  - Progress charts (calories, exercise count)
  - Recent activity list
  - Export button
- **Features**:
  - Interactive charts dengan tooltips
  - Filter by period
  - Export to JSON

**5. Halaman Tutorial**

- **Layout**: Step-by-step guide
- **Elements**:
  - Progress indicator dots
  - Step content card
  - Tips section
  - Safety tips (di step terakhir)
  - Common mistakes (di step terakhir)
  - Navigation buttons (previous, next, start)
- **Features**:
  - Step navigation
  - Smooth transitions

**6. Halaman Workout Session**

- **Layout**: Full-screen timer dengan controls
- **Elements**:
  - Large timer display
  - Progress bar
  - Stats cards (calories, time remaining)
  - Control buttons (start, pause, resume, stop)
  - Exercise info card
  - Completion dialog
- **Features**:
  - Real-time timer
  - Automatic calorie calculation
  - Progress tracking
  - Completion confirmation

**7. Halaman Favorites**

- **Layout**: List of favorite exercises
- **Elements**:
  - Header dengan count
  - Exercise cards
  - Empty state dengan message
- **Features**:
  - Remove from favorites
  - Quick start dari favorites

#### 4.3.4 Komponen UI Kunci

**ExerciseCard**:

- Menampilkan informasi latihan secara kompak
- Score badge untuk rekomendasi
- Category, duration, intensity badges
- Action buttons (favorite, start, skip)
- Hover effects untuk interactivity

**Navigation**:

- Bottom navigation bar (mobile pattern)
- Icons dengan labels
- Active state indicator
- Smooth transitions

**WorkoutReminder**:

- Toggle untuk enable/disable
- Time picker
- Day selector dengan visual feedback
- Permission request handling

**Progress Charts**:

- Line chart untuk trends
- Bar chart untuk comparisons
- Responsive design
- Interactive tooltips

#### 4.3.5 Responsive Design

- **Mobile (< 768px)**: Single column layout, bottom navigation, touch-friendly buttons
- **Tablet (768px - 1024px)**: Adjusted spacing, larger touch targets
- **Desktop (> 1024px)**: Max width container, optimized spacing

#### 4.3.6 Animasi dan Transisi

Aplikasi menggunakan animasi ringan untuk meningkatkan UX:

- **Fade In**: Untuk page transitions
- **Scale In**: Untuk cards appearance
- **Slide**: Untuk navigation
- **Pulse**: Untuk loading states
- **Hover Effects**: Untuk interactive elements

## BAB V PENUTUP

### 5.1 Kesimpulan

Berdasarkan pengembangan aplikasi rekomendasi olahraga ini, dapat disimpulkan beberapa hal:

1. **Keberhasilan Pengembangan**: Aplikasi telah berhasil dikembangkan dengan fitur-fitur utama yang mencakup sistem rekomendasi personal, pelacakan progres, tutorial latihan, dan manajemen profil pengguna. Aplikasi dapat berjalan sebagai web application dan mobile application melalui Capacitor.

2. **Implementasi Algoritma Rekomendasi**: Algoritma rekomendasi berbasis scoring telah berhasil diimplementasikan dengan mempertimbangkan berbagai faktor seperti tingkat kebugaran, tujuan, ketersediaan waktu, dan riwayat aktivitas pengguna. Sistem ini dapat belajar dari interaksi pengguna untuk memberikan rekomendasi yang semakin relevan.

3. **Pengalaman Pengguna**: Antarmuka pengguna dirancang dengan prinsip modern UI/UX, menggunakan design system yang konsisten, dan menyediakan feedback visual yang jelas. Aplikasi responsif dan dapat diakses di berbagai perangkat.

4. **Teknologi yang Digunakan**: Stack teknologi modern (React, TypeScript, Vite, Tailwind CSS) memberikan foundation yang solid untuk pengembangan lebih lanjut. Penggunaan TypeScript meningkatkan code quality dan maintainability.

5. **Fungsi Pelacakan Progres**: Sistem pelacakan progres yang komprehensif telah diimplementasikan, termasuk streak tracking, kalori tracking, dan visualisasi data dengan charts. Fitur ini dapat memotivasi pengguna untuk konsisten berolahraga.

6. **Tutorial dan Panduan**: Sistem tutorial step-by-step yang informatif telah tersedia untuk membantu pengguna memahami teknik latihan yang benar, meningkatkan keselamatan, dan menghindari kesalahan umum.

7. **Mobile Integration**: Integrasi dengan platform mobile melalui Capacitor memungkinkan aplikasi untuk mengakses fitur native seperti local notifications, sehingga pengguna dapat menerima pengingat latihan.

### 5.2 Rencana Pengembangan Lanjutan

Untuk meningkatkan kualitas dan fungsionalitas aplikasi, berikut adalah rencana pengembangan lanjutan:

#### 5.2.1 Backend Integration

- **Mengembangkan Backend API**: Migrasi dari localStorage ke backend database (PostgreSQL/MongoDB) untuk penyimpanan data yang lebih aman dan scalable
- **User Authentication yang Lebih Aman**: Implementasi JWT authentication, password hashing dengan bcrypt, dan email verification
- **Data Sinkronisasi**: Fitur sync data antar perangkat pengguna
- **Cloud Backup**: Backup otomatis data pengguna ke cloud storage

#### 5.2.2 Algoritma Rekomendasi yang Lebih Canggih

- **Machine Learning Integration**: Implementasi machine learning model untuk personalisasi yang lebih akurat
  - Collaborative filtering untuk rekomendasi berdasarkan pengguna serupa
  - Neural network untuk pattern recognition dalam preferensi pengguna
  - Reinforcement learning untuk optimasi rekomendasi real-time
- **Contextual Recommendations**: Rekomendasi berdasarkan waktu hari, cuaca, lokasi, dan faktor kontekstual lainnya
- **Dynamic Difficulty Adjustment**: Sistem yang secara otomatis menyesuaikan intensitas latihan berdasarkan progres pengguna

#### 5.2.3 Fitur Sosial dan Kompetisi

- **Social Features**:
  - Fitur untuk berbagi progres dengan teman
  - Leaderboard untuk kompetisi sehat
  - Challenges dan goals bersama
- **Community**: Forum diskusi, tips dari pengguna lain, dan sharing workout routines

#### 5.2.4 Integrasi Wearable Devices

- **Fitness Tracker Integration**: Integrasi dengan smartwatch dan fitness bands (Fitbit, Garmin, Apple Watch)
- **Health Data Sync**: Sinkronisasi data kesehatan dari Health apps (Apple Health, Google Fit)
- **Real-time Monitoring**: Monitoring heart rate, steps, dan metrics lain selama latihan

#### 5.2.5 Konten dan Personalisasi Lanjutan

- **Video Tutorials**: Menambahkan video tutorial untuk setiap latihan
- **Custom Workout Plans**: Membuat program latihan yang disesuaikan untuk periode tertentu (30-day challenge, weight loss program, dll)
- **Nutrition Integration**: Fitur untuk tracking nutrisi dan kalori intake
- **Multiple Languages**: Support untuk berbagai bahasa

#### 5.2.6 Advanced Analytics

- **Detailed Analytics Dashboard**:
  - Analisis tren jangka panjang
  - Predictions untuk pencapaian goals
  - Recommendations untuk improvement
- **Export Reports**: Generate PDF reports untuk progres
- **Integration dengan Google Analytics**: Tracking usage patterns untuk improvement

#### 5.2.7 Performance dan Optimasi

- **Performance Optimization**:
  - Code splitting untuk faster initial load
  - Image optimization dan lazy loading
  - Caching strategy yang lebih baik
- **Offline Support**: PWA (Progressive Web App) features untuk offline functionality
- **App Performance Monitoring**: Integration dengan performance monitoring tools

#### 5.2.8 Testing dan Quality Assurance

- **Comprehensive Testing**:
  - Unit tests dengan Jest/Vitest
  - Integration tests
  - E2E tests dengan Cypress/Playwright
- **Accessibility Audit**: Memastikan aplikasi accessible untuk semua pengguna (WCAG compliance)
- **Security Audit**: Penetration testing dan security best practices

#### 5.2.9 Monetization (Opsional)

- **Freemium Model**: Fitur dasar gratis, fitur premium berbayar
- **Subscription Plans**: Monthly/yearly subscriptions untuk premium features
- **In-app Purchases**: Pembelian program latihan khusus atau konten premium

#### 5.2.10 Deployment dan Distribution

- **Web Deployment**: Deploy ke hosting modern (Vercel, Netlify, atau cloud platforms)
- **App Store Distribution**:
  - Publish ke Google Play Store (Android)
  - Publish ke App Store (iOS)
- **CI/CD Pipeline**: Automated testing dan deployment
- **Version Management**: Semver dan changelog management

### 5.3 Harapan dan Kontribusi

Diharapkan aplikasi ini dapat:

1. Membantu masyarakat dalam memulai dan mempertahankan rutinitas olahraga yang sehat
2. Memberikan kontribusi terhadap literasi teknologi dalam domain kesehatan dan kebugaran
3. Menjadi basis untuk penelitian lebih lanjut tentang personalisasi rekomendasi dalam aplikasi kesehatan
4. Menginspirasi pengembang lain untuk membuat aplikasi yang bermanfaat bagi masyarakat

Dengan pengembangan yang berkelanjutan dan perbaikan berdasarkan feedback pengguna, aplikasi ini memiliki potensi untuk menjadi solusi yang efektif dalam membantu masyarakat mencapai tujuan kebugaran mereka.

---

**Catatan**: Proposal ini disusun berdasarkan analisis source code, struktur folder, dependencies, dan konfigurasi proyek yang ada. Beberapa asumsi dibuat untuk bagian-bagian yang belum terimplementasi secara eksplisit, namun tetap berdasarkan best practices dan pola yang ada dalam codebase.


