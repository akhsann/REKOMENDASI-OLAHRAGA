import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserProfile, FitnessLevel, Gender, FitnessGoal } from '@/types/exercise';
import { saveUserProfile, getUserProfile } from '@/utils/storage';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Navigation } from '@/components/Navigation';
import { WorkoutReminder } from '@/components/WorkoutReminder';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { useToast } from '@/hooks/use-toast';
import { User, Save } from 'lucide-react';

const fitnessLevels: { value: FitnessLevel; label: string }[] = [
  { value: 'beginner', label: 'Beginner' },
  { value: 'intermediate', label: 'Intermediate' },
  { value: 'advanced', label: 'Advanced' },
];

const genders: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'other', label: 'Other' },
  { value: 'prefer-not-to-say', label: 'Prefer not to say' },
];

const fitnessGoals: { value: FitnessGoal; label: string }[] = [
  { value: 'weight-loss', label: 'Weight Loss' },
  { value: 'muscle-gain', label: 'Muscle Gain' },
  { value: 'endurance', label: 'Build Endurance' },
  { value: 'flexibility', label: 'Improve Flexibility' },
  { value: 'general-fitness', label: 'General Fitness' },
];

export default function Profile() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profile, setProfile] = useState<UserProfile>({
    id: 'user-1',
    age: 25,
    gender: 'prefer-not-to-say',
    fitnessLevel: 'beginner',
    goals: ['general-fitness'],
    availableTime: 30,
    preferences: {
      favoriteExercises: [],
      completedExercises: [],
      skippedExercises: [],
    },
  });

  useEffect(() => {
    const existingProfile = getUserProfile();
    if (existingProfile) {
      setProfile(existingProfile);
    }
  }, []);

  const handleSave = () => {
    saveUserProfile(profile);
    toast({
      title: 'Profile saved!',
      description: 'Your fitness profile has been updated successfully.',
    });
    navigate('/');
  };

  const toggleGoal = (goal: FitnessGoal) => {
    setProfile((prev) => ({
      ...prev,
      goals: prev.goals.includes(goal)
        ? prev.goals.filter((g) => g !== goal)
        : [...prev.goals, goal],
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 animate-fade-in-up">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow shadow-glow animate-pulse-glow">
            <User className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-foreground">Your Profile</h1>
            <p className="text-sm text-muted-foreground">Personalize your fitness journey</p>
          </div>
        </div>

        {/* Profile Form */}
        <Card className="p-6 space-y-6 animate-scale-in hover-lift">
          {/* Age */}
          {/* Age */}
          <div className="space-y-2">
            <Label htmlFor="age">Age</Label>
            <Input
              id="age"
              type="number"
              value={profile.age}
              onChange={(e) => setProfile({ ...profile, age: parseInt(e.target.value) || 0 })}
              min="13"
              max="100"
            />
          </div>

          {/* Gender */}
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <Select
              value={profile.gender}
              onValueChange={(value: Gender) => setProfile({ ...profile, gender: value })}
            >
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

          {/* Fitness Level */}
          <div className="space-y-2">
            <Label htmlFor="fitness-level">Fitness Level</Label>
            <Select
              value={profile.fitnessLevel}
              onValueChange={(value: FitnessLevel) => setProfile({ ...profile, fitnessLevel: value })}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {fitnessLevels.map((level) => (
                  <SelectItem key={level.value} value={level.value}>
                    {level.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Available Time */}
          <div className="space-y-2">
            <Label htmlFor="time">Daily Available Time (minutes)</Label>
            <Input
              id="time"
              type="number"
              value={profile.availableTime}
              onChange={(e) =>
                setProfile({ ...profile, availableTime: parseInt(e.target.value) || 0 })
              }
              min="5"
              max="180"
            />
          </div>

          {/* Fitness Goals */}
          <div className="space-y-3">
            <Label>Fitness Goals (select all that apply)</Label>
            <div className="space-y-3">
              {fitnessGoals.map((goal) => (
                <div key={goal.value} className="flex items-center space-x-3">
                  <Checkbox
                    id={goal.value}
                    checked={profile.goals.includes(goal.value)}
                    onCheckedChange={() => toggleGoal(goal.value)}
                  />
                  <Label htmlFor={goal.value} className="cursor-pointer font-normal">
                    {goal.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Workout Reminder Section */}
        <WorkoutReminder />

        {/* Save Button */}
        <Button
          onClick={handleSave}
          className="w-full bg-gradient-to-r from-primary to-primary-glow hover:opacity-90 gap-2 hover-scale shadow-glow animate-fade-in-up"
          size="lg"
        >
          <Save className="h-4 w-4" />
          Save Profile
        </Button>
      </div>

      <Navigation />
    </div>
  );
}
