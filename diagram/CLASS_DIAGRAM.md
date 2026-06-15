# CLASS DIAGRAM - APLIKASI REKOMENDASI OLAHRAGA

## Deskripsi Umum

Class diagram ini merepresentasikan struktur kelas, interface, dan relasi antar komponen dalam aplikasi rekomendasi olahraga berbasis React TypeScript.

## Struktur Diagram

### 1. TYPES (Tipe Data dan Interface)

#### 1.1 User Management
```
┌─────────────────┐
│      User       │
├─────────────────┤
│ + id: string    │
│ + name: string  │
│ + email: string │
│ + createdAt: string │
└─────────────────┘
         │
         │ has (1:1)
         ▼
┌─────────────────┐
│  UserProfile    │
├─────────────────┤
│ + id: string    │
│ + age: number   │
│ + gender: Gender│
│ + fitnessLevel: FitnessLevel │
│ + goals: FitnessGoal[] │
│ + availableTime: number │
│ + healthConditions: HealthCondition[] │
│ + preferences: ExercisePreferences │
│ + progress: ExerciseProgress │
└─────────────────┘
         │
         ├──────────────────┐
         │                  │
         ▼                  ▼
┌─────────────────┐  ┌─────────────────┐
│ExercisePreferences│ │ExerciseProgress │
├─────────────────┤  ├─────────────────┤
│ + favoriteExercises: string[] │ │ + dailyLogs: DailyProgress[] │
│ + completedExercises: string[] │ │ + currentStreak: number │
│ + skippedExercises: string[] │ │ + longestStreak: number │
└─────────────────┘  │ + totalCaloriesBurned: number │
                     │ + totalExercisesCompleted: number │
                     └─────────────────┘
                              │
                              │ contains
                              ▼
                     ┌─────────────────┐
                     │ DailyProgress   │
                     ├─────────────────┤
                     │ + date: string  │
                     │ + exercisesCompleted: string[] │
                     │ + caloriesBurned: number │
                     │ + timeSpent: number │
                     └─────────────────┘
```

#### 1.2 Exercise Related
```
┌─────────────────┐
│    Exercise     │
├─────────────────┤
│ + id: string    │
│ + name: string  │
│ + category: ExerciseCategory │
│ + duration: number │
│ + intensity: Intensity │
│ + benefits: string[] │
│ + description: string │
│ + equipment: string[] │
│ + targetMuscles: string[] │
│ + caloriesBurn: number │
│ + imageUrl?: string │
└─────────────────┘
         │
         │ scored in
         ▼
┌─────────────────┐
│RecommendationScore│
├─────────────────┤
│ + exercise: Exercise │
│ + score: number │
│ + reasons: string[] │
└─────────────────┘

┌─────────────────┐
│ ExerciseTutorial│
├─────────────────┤
│ + exerciseId: string │
│ + steps: TutorialStep[] │
│ + safetyTips: string[] │
│ + commonMistakes: string[] │
└─────────────────┘
         │
         │ contains
         ▼
┌─────────────────┐
│  TutorialStep   │
├─────────────────┤
│ + title: string │
│ + description: string │
│ + image?: string │
│ + tips?: string[] │
└─────────────────┘
```

#### 1.3 Enums
```
Gender: [pria, wanita, lainnya, lebih_baik_tidak_dikatakan]
FitnessLevel: [pemula, menengah, lanjutan]
ExerciseCategory: [kardio, kekuatan, fleksibilitas, keseimbangan, hiit]
Intensity: [rendah, sedang, tinggi]
FitnessGoal: [penurunan_berat_badan, penambahan_otot, ketahanan, fleksibilitas, kebugaran_umum]
HealthCondition: [hipertensi, asma, diabetes, obesitas, tidak_ada]
```

### 2. SERVICES / UTILS (Layer Business Logic)

```
┌─────────────────┐
│  AuthService    │
├─────────────────┤
│ + registerUser() │
│ + loginUser()   │
│ + getCurrentUser() │
│ + logoutUser()  │
│ + isAuthenticated() │
│ + getCurrentUserProfile() │
│ + saveCurrentUserProfile() │
│ - getStoredUsers() │
│ - saveStoredUsers() │
└─────────────────┘
         │
         │ manages
         ▼
    [User, UserProfile]

┌─────────────────┐
│ StorageService  │
├─────────────────┤
│ + saveUserProfile() │
│ + getUserProfile() │
│ + clearUserProfile() │
│ + hasUserProfile() │
│ + calculateStreak() │
│ + getTodayProgress() │
│ + updateDailyProgress() │
└─────────────────┘
         │
         │ manages
         ▼
[UserProfile, DailyProgress]

┌─────────────────┐
│RecommendationService│
├─────────────────┤
│ + calculateSimilarityScore() │
│ + getRecommendations() │
│ + updateUserPreferences() │
│ - fitnessIntensityMap │
└─────────────────┘
         │
         │ uses
         ▼
[UserProfile, Exercise, RecommendationScore]

┌─────────────────┐
│NotificationService│
├─────────────────┤
│ + isNativeApp() │
│ + requestNotificationPermission() │
│ + checkNotificationPermission() │
│ + scheduleWorkoutReminder() │
│ + cancelWorkoutReminder() │
│ + getPendingNotifications() │
└─────────────────┘
         │
         │ manages
         ▼
[WorkoutReminder]
```

### 3. CONTEXT (Global State Management)

```
┌─────────────────┐
│  AuthContext    │
├─────────────────┤
│ + user: User | null │
│ + isLoading: boolean │
│ + login() │
│ + register() │
│ + logout() │
│ + isAuthenticated: boolean │
└─────────────────┘
         │
         │ uses
         ▼
    AuthService
```

### 4. DATA (Static Data)

```
┌─────────────────┐
│  ExerciseData   │
├─────────────────┤
│ + exercises: Exercise[] │
│   {static}      │
└─────────────────┘

┌─────────────────┐
│  TutorialData   │
├─────────────────┤
│ + exerciseTutorials: Record<string, ExerciseTutorial> │
│   {static}      │
│ + getTutorial() │
│   {static}      │
└─────────────────┘
```

### 5. COMPONENTS (Reusable UI Components)

```
┌─────────────────┐
│  ExerciseCard   │
├─────────────────┤
│ - exercise: Exercise │
│ - score?: number │
│ - reasons?: string[] │
│ - isFavorite?: boolean │
│ + onFavorite()  │
│ + onStart()     │
│ + onSkip()      │
└─────────────────┘

┌─────────────────┐
│   Navigation    │
├─────────────────┤
│ - links: NavigationLink[] │
└─────────────────┘

┌─────────────────┐
│    Tutorial     │
├─────────────────┤
│ - tutorial: ExerciseTutorial │
│ - currentStep: number │
│ + nextStep()    │
│ + prevStep()    │
│ + onStart()     │
│ + onBack()      │
└─────────────────┘

┌─────────────────┐
│WorkoutReminderComponent│
├─────────────────┤
│ - reminder: WorkoutReminder │
│ - hasPermission: boolean │
│ + handleSave()  │
│ + toggleDay()   │
└─────────────────┘

┌─────────────────┐
│ ProtectedRoute  │
├─────────────────┤
│ - children: ReactNode │
└─────────────────┘
```

### 6. PAGES (Route Components)

```
┌─────────────────┐
│   IndexPage     │
├─────────────────┤
│ - user: UserProfile │
│ - recommendations: RecommendationScore[] │
│ + loadRecommendations() │
│ + handleFavorite() │
│ + handleStart() │
│ + handleSkip() │
└─────────────────┘
         │
         │ uses
         ▼
[RecommendationService, StorageService]

┌─────────────────┐
│  ProfilePage    │
├─────────────────┤
│ - profile: UserProfile │
│ + handleSave()  │
│ + toggleGoal()  │
│ + toggleHealthCondition() │
└─────────────────┘

┌─────────────────┐
│  ProgressPage   │
├─────────────────┤
│ - user: UserProfile │
│ - selectedPeriod: string │
│ + getFilteredLogs() │
│ + getWeeklyStats() │
│ + exportProgress() │
└─────────────────┘

┌─────────────────┐
│ FavoritesPage   │
├─────────────────┤
│ - user: UserProfile │
│ - favoriteExercises: Exercise[] │
│ + handleUnfavorite() │
│ + handleStart() │
└─────────────────┘

┌─────────────────┐
│   LoginPage     │
├─────────────────┤
│ + onSubmit()    │
└─────────────────┘

┌─────────────────┐
│  RegisterPage   │
├─────────────────┤
│ + onSubmit()    │
└─────────────────┘

┌─────────────────┐
│  TutorialPage   │
├─────────────────┤
│ - exerciseId: string │
│ - tutorial: ExerciseTutorial │
│ + handleStart() │
│ + handleBack()  │
└─────────────────┘

┌─────────────────┐
│WorkoutSessionPage│
├─────────────────┤
│ - exerciseId: string │
│ - isActive: boolean │
│ - timeElapsed: number │
│ - caloriesBurned: number │
│ + handleStart() │
│ + handlePause() │
│ + handleComplete() │
└─────────────────┘
```

### 7. APP (Root Component)

```
┌─────────────────┐
│      App        │
├─────────────────┤
│ - queryClient: QueryClient │
└─────────────────┘
         │
         │ routes to
         ├──────────┬──────────┬──────────┬──────────┐
         ▼          ▼          ▼          ▼          ▼
    IndexPage  ProfilePage ProgressPage FavoritesPage ...
```

## Relasi Utama

### 1. Composition Relationships
- `User` **has** `UserProfile` (1:1)
- `UserProfile` **contains** `ExercisePreferences` (1:1)
- `UserProfile` **contains** `ExerciseProgress` (1:1)
- `ExerciseProgress` **contains** `DailyProgress[]` (1:many)
- `ExerciseTutorial` **contains** `TutorialStep[]` (1:many)

### 2. Aggregation Relationships
- `RecommendationScore` **references** `Exercise`
- `ExerciseTutorial` **references** `Exercise`
- `DailyProgress` **references** `Exercise` (via IDs)

### 3. Dependency Relationships
- `Pages` **use** `Services` untuk business logic
- `Components` **use** `Services` untuk data operations
- `AuthContext` **uses** `AuthService`
- `WorkoutReminderComponent` **uses** `NotificationService`

### 4. Inheritance/Enum Usage
- `UserProfile` **uses** `Gender`, `FitnessLevel`, `FitnessGoal`, `HealthCondition`
- `Exercise` **uses** `ExerciseCategory`, `Intensity`

## Alur Data

```
User Input
    │
    ▼
Pages (UI Layer)
    │
    ▼
Services/Utils (Business Logic)
    │
    ▼
Storage/LocalStorage (Data Persistence)
    │
    ▼
Types/Interfaces (Data Structure)
```

## Catatan Penting

1. **TypeScript Interfaces**: Semua "classes" dalam diagram ini sebenarnya adalah TypeScript interfaces/types, bukan actual classes (karena React menggunakan functional components).

2. **Service Layer**: Services direpresentasikan sebagai utility modules dengan functions, bukan sebagai classes dengan instances.

3. **Component Pattern**: Components adalah functional components React, bukan class components.

4. **State Management**: 
   - Global state menggunakan React Context (AuthContext)
   - Local state menggunakan React hooks (useState)
   - Persisted state menggunakan localStorage

5. **Data Flow**:
   - Unidirectional data flow (React pattern)
   - Props down, events up
   - Services sebagai business logic layer

## File PlantUML

Diagram lengkap dalam format PlantUML dapat ditemukan di file `class_diagram.puml`. File tersebut dapat di-render menggunakan:
- Online: http://www.plantuml.com/plantuml/
- VS Code Extension: PlantUML
- Local: PlantUML jar file

