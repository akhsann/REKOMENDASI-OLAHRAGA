-- Hapus tabel jika sudah ada (berguna jika Anda menggunakan template bawaan Supabase)
DROP TABLE IF EXISTS public.profiles CASCADE;
DROP TABLE IF EXISTS public.custom_exercises CASCADE;

-- Tabel untuk Profil Pengguna (termasuk progress)
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  profile_data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Mengaktifkan Row Level Security (RLS) untuk profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Kebijakan agar pengguna hanya bisa membaca dan mengubah profilnya sendiri
CREATE POLICY "Users can view their own profile" 
  ON public.profiles FOR SELECT 
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" 
  ON public.profiles FOR UPDATE 
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" 
  ON public.profiles FOR INSERT 
  WITH CHECK (auth.uid() = id);


-- Tabel untuk Latihan Khusus (Custom Exercises) yang dibuat pengguna
CREATE TABLE public.custom_exercises (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  exercise_data JSONB NOT NULL DEFAULT '{}'::jsonb
);

-- Mengaktifkan RLS untuk custom_exercises
ALTER TABLE public.custom_exercises ENABLE ROW LEVEL SECURITY;

-- Kebijakan agar SEMUA ORANG bisa membaca latihan khusus
CREATE POLICY "Everyone can view custom exercises" 
  ON public.custom_exercises FOR SELECT 
  USING (true);

CREATE POLICY "Users can insert their own custom exercises" 
  ON public.custom_exercises FOR INSERT 
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own custom exercises" 
  ON public.custom_exercises FOR UPDATE 
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own custom exercises" 
  ON public.custom_exercises FOR DELETE 
  USING (auth.uid() = user_id);


-- ---------------------------------------------------------------------------
-- Validasi pelatih (isi dari kuesioner Excel; aplikasi membaca JSON bawaan)
-- ---------------------------------------------------------------------------
DROP TABLE IF EXISTS public.coach_validation_rules CASCADE;
DROP TABLE IF EXISTS public.coach_questionnaire_meta CASCADE;

CREATE TABLE public.coach_questionnaire_meta (
  id SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
  nama TEXT,
  profesi TEXT,
  tempat_melatih TEXT,
  lama_pengalaman TEXT,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE public.coach_validation_rules (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  condition_code TEXT NOT NULL,
  questionnaire_exercise_name TEXT NOT NULL,
  safety TEXT NOT NULL CHECK (safety IN ('aman', 'tidak_aman', 'aman_dengan_catatan')),
  catatan TEXT,
  UNIQUE(condition_code, questionnaire_exercise_name)
);

ALTER TABLE public.coach_questionnaire_meta ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.coach_validation_rules ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read coach questionnaire meta"
  ON public.coach_questionnaire_meta FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated users can read coach validation rules"
  ON public.coach_validation_rules FOR SELECT TO authenticated USING (true);
