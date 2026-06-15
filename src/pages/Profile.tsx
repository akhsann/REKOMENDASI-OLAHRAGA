import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, Gender, FitnessGoal, HealthCondition, ActivityLevel } from '@/types/exercise';
import { saveUserProfile, getUserProfile } from '@/utils/storage';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/Navigation';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Save, LogOut } from 'lucide-react';



const genders: { value: Gender; label: string }[] = [
  { value: 'pria', label: 'Pria' },
  { value: 'wanita', label: 'Wanita' },
  // { value: 'lainnya', label: 'Lainnya' },
  // { value: 'lebih-baik-tidak-dikatakan', label: 'Lebih Baik Tidak Dikatakan' },
];

const fitnessGoals: { value: FitnessGoal; label: string }[] = [
  { value: 'penurunan-berat-badan', label: 'Penurunan Berat Badan' },
  { value: 'penambahan-otot', label: 'Penambahan Otot' },
  { value: 'ketahanan', label: 'Membangun Ketahanan' },
  { value: 'fleksibilitas', label: 'Meningkatkan Fleksibilitas' },
  { value: 'kebugaran-umum', label: 'Kebugaran Umum' },
];

const healthConditions: { value: HealthCondition; label: string }[] = [
  { value: 'hipertensi', label: 'Hipertensi' },
  { value: 'asma', label: 'Asma' },
  { value: 'diabetes', label: 'Diabetes' },
  { value: 'obesitas', label: 'Obesitas' },
  { value: 'nyeri-sendi', label: 'Nyeri sendi' },
  { value: 'tidak-ada', label: 'Tidak Ada' },
];

const activityLevels: {
  value: ActivityLevel;
  label: string;
  description: string;
}[] = [
  {
    value: 'ringan',
    label: 'Tingkat Aktivitas Ringan',
    description: 'Banyak duduk dan kurang gerak fisik harian. Contoh: Mahasiswa, pelajar, pegawai kantoran/administrasi, programmer/IT, desainer grafis, akuntan, customer service desk-based, content creator desk-based, freelancer remote worker.',
  },
  {
    value: 'sedang',
    label: 'Tingkat Aktivitas Sedang',
    description: 'Pekerjaan yang mengharuskan banyak berdiri, berjalan, atau beraktivitas di lapangan. Contoh: Guru, dosen, kasir, resepsionis, perawat shift ringan, barista, pegawai toko, sales counter, fotografer, event organizer, sales lapangan, teknisi, kurir, driver ojek online, petugas lapangan, polisi, TNI, cleaning service, mekanik, surveyor lapangan.',
  },
  {
    value: 'tinggi',
    label: 'Tingkat Aktivitas Tinggi',
    description: 'Pekerjaan fisik yang berat dan menguras tenaga. Contoh: Kuli bangunan, pekerja proyek, atlet, pekerja gudang, petani, nelayan, pekerja tambang, pelatih fisik, pemandu wisata outdoor, buruh angkut.',
  },
];

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, logout } = useAuth();
  const [profile, setProfile] = useState<UserProfile>({
    id: user?.id || 'user-1',
    age: 0,
    gender: 'pria',
    goals: ['kebugaran-umum'],
    availableTime: 30,
    healthConditions: ['tidak-ada'],
    activityLevel: 'ringan',
    preferences: {
      favoriteExercises: [],
      completedExercises: [],
      skippedExercises: [],
    },
    progress: {
      currentStreak: 0,
      longestStreak: 0,
      totalExercisesCompleted: 0,
      totalCaloriesBurned: 0,
      dailyLogs: [],
    },
  });

  useEffect(() => {
    const existingProfile = getUserProfile();
    if (existingProfile) {
      setProfile(existingProfile);
    } else if (user) {
      // Initialize profile with user ID
      setProfile((prev) => ({ ...prev, id: user.id }));
    }
  }, [user]);

  const handleSave = () => {
    saveUserProfile(profile);
    toast({
      title: 'Profile saved!',
      description: 'Your fitness profile has been updated successfully.',
    });
    navigate('/');
  };

  const toggleGoal = (goal: FitnessGoal) => {
    setProfile((prev) => {
      return {
        ...prev,
        goals: prev.goals.includes(goal) ? prev.goals.filter((g) => g !== goal) : [...prev.goals, goal],
      };
    });
  };

  const toggleHealthCondition = (condition: HealthCondition) => {
    setProfile((prev) => {
      let newConditions: HealthCondition[];
      if (condition === 'tidak-ada') {
        // If "tidak-ada" is selected, clear all other conditions
        newConditions = ['tidak-ada'];
      } else {
        // If any other condition is selected, remove "tidak-ada" and toggle the condition
        const filteredConditions = prev.healthConditions.filter((c) => c !== 'tidak-ada');
        if (filteredConditions.includes(condition)) {
          newConditions = filteredConditions.filter((c) => c !== condition);
          // If no conditions left, add "tidak-ada"
          if (newConditions.length === 0) {
            newConditions = ['tidak-ada'];
          }
        } else {
          newConditions = [...filteredConditions, condition];
        }
      }
      return {
        ...prev,
        healthConditions: newConditions,
      };
    });
  };

  const selectedActivityLevel = activityLevels.find((level) => level.value === profile.activityLevel);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 animate-fade-in-up">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-glow animate-pulse-glow">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Profil Anda</h1>
            <p className="text-sm text-muted-foreground">Personalisasi perjalanan kebugaran Anda</p>
            {user && (
              <div className="mt-1 text-xs text-muted-foreground">
                {user.name} • {user.email}
              </div>
            )}
          </div>
        </div>

        {/* Profile Form */}
        <Card className="p-6 space-y-6 animate-scale-in hover-lift">
          {/* Age */}
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Usia</Label>
            <Input
              id="age"
              type="text"
              inputMode="numeric"
              pattern="[0-9]*"
              value={profile.age === 0 ? '' : profile.age.toString()}
              onChange={(e) => {
                const raw = e.target.value.replace(/[^0-9]/g, '').replace(/^0+(?=\d)/, '');
                const num = Math.min(100, Math.max(0, parseInt(raw) || 0));
                setProfile({ ...profile, age: raw === '' ? 0 : num });
              }}
              placeholder="Masukkan usia Anda"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Jenis Kelamin</Label>
            <Select value={profile.gender} onValueChange={(value: Gender) => setProfile({ ...profile, gender: value })}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {genders.map((gender) => (
                  <SelectItem key={gender.value} value={gender.value}>
                    {gender.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>



          {/* Available Time */}
          <div className="space-y-2">
            <Label htmlFor="time">Waktu Tersedia Harian</Label>
            <Select 
              value={profile.availableTime.toString()} 
              onValueChange={(value) => setProfile({ ...profile, availableTime: parseInt(value) })}
            >
              <SelectTrigger id="time">
                <SelectValue placeholder="Pilih durasi waktu" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="15">15 menit</SelectItem>
                <SelectItem value="30">30 menit</SelectItem>
                <SelectItem value="60">60 menit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Daily Activity Level */}
          <div className="space-y-2">
            <Label>Tingkat Aktivitas / Pekerjaan Harian</Label>
            <Select
              value={profile.activityLevel}
              onValueChange={(value: ActivityLevel) => {
                setProfile((prev) => ({
                  ...prev,
                  activityLevel: value,
                }));
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Pilih tingkat aktivitas harian" />
              </SelectTrigger>
              <SelectContent>
                {activityLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedActivityLevel && (
              <p className="text-xs text-muted-foreground">{selectedActivityLevel.description}</p>
            )}
          </div>

          {/* Fitness Goals */}
          <div className="space-y-3">
            <Label>Tujuan Kebugaran (pilih semua yang sesuai)</Label>
            <div className="space-y-3">
              {fitnessGoals.map((goal) => (
                <div key={goal.value} className="flex items-center space-x-3">
                  <Checkbox id={goal.value} checked={profile.goals.includes(goal.value)} onCheckedChange={() => toggleGoal(goal.value)} />
                  <Label htmlFor={goal.value} className="cursor-pointer font-normal">
                    {goal.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Health Conditions */}
          <div className="space-y-3">
            <Label>Kondisi Kesehatan/Riwayat Medis (pilih semua yang sesuai)</Label>
            <div className="space-y-3">
              {healthConditions.map((condition) => (
                <div key={condition.value} className="flex items-center space-x-3">
                  <Checkbox id={condition.value} checked={profile.healthConditions.includes(condition.value)} onCheckedChange={() => toggleHealthCondition(condition.value)} />
                  <Label htmlFor={condition.value} className="cursor-pointer font-normal">
                    {condition.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Save Button */}
        <Button onClick={handleSave} className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2 hover-scale shadow-glow animate-fade-in-up" size="lg">
          <Save className="h-4 w-4" />
          Simpan Profil
        </Button>

        {/* Logout Button */}
        <Button
          onClick={() => {
            logout();
            toast({
              title: 'Logout berhasil',
              description: 'Anda telah keluar dari akun',
            });
          }}
          variant="outline"
          className="w-full gap-2 hover-scale"
          size="lg"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </Button>
      </div>

      <Navigation />
    </div>
  );
}
