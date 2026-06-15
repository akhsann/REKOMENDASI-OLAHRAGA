import { useState, useEffect } from 'react';
import { getUserProfile } from '@/utils/storage';
import { UserProfile, DailyProgress } from '@/types/exercise';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Flame, Calendar, Target, Award, Zap } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Progress = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');

  useEffect(() => {
    const profile = getUserProfile();
    if (profile) {
      setUser(profile);
    }
  }, []);

  const getFilteredLogs = (logs: DailyProgress[], period: string): DailyProgress[] => {
    const now = new Date();
    const cutoff = new Date();

    switch (period) {
      case 'week':
        cutoff.setDate(now.getDate() - 7);
        break;
      case 'month':
        cutoff.setMonth(now.getMonth() - 1);
        break;
      default:
        return logs;
    }

    return logs.filter((log) => new Date(log.date) >= cutoff);
  };

  const getWeeklyStats = (logs: DailyProgress[]) => {
    const weekLogs = getFilteredLogs(logs, 'week');
    const totalExercises = weekLogs.reduce((sum, log) => sum + log.exercisesCompleted.length, 0);
    const totalCalories = weekLogs.reduce((sum, log) => sum + log.caloriesBurned, 0);
    const totalTime = weekLogs.reduce((sum, log) => sum + log.timeSpent, 0);
    const avgDaily = weekLogs.length > 0 ? totalExercises / 7 : 0;

    return { totalExercises, totalCalories, totalTime, avgDaily, daysActive: weekLogs.length };
  };

  const getMotivationalMessage = (streak: number, totalExercises: number) => {
    if (streak >= 30) return '🏆 Kamu hebat! Streak 30+ hari!';
    if (streak >= 14) return '🔥 Konsistensi luar biasa! Teruskan!';
    if (streak >= 7) return '💪 Kamu sedang membangun kebiasaan yang baik!';
    if (totalExercises >= 50) return '🎯 Sudah setengah jalan ke 100 latihan!';
    if (totalExercises >= 25) return '🚀 Kamu membuat kemajuan besar!';
    return '🌟 Setiap latihan berarti. Terus semangat!';
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Loading progress...</p>
        </div>
      </div>
    );
  }

  const filteredLogs = getFilteredLogs(user.progress.dailyLogs, selectedPeriod);
  const weeklyStats = getWeeklyStats(user.progress.dailyLogs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="pt-4 space-y-4 animate-fade-in-up">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-2xl bg-gradient-to-br from-primary to-primary-glow animate-pulse-glow shadow-glow">
              <TrendingUp className="h-6 w-6 text-primary-foreground" />
            </div>
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground">Progres Kamu</h1>
              <p className="text-sm text-muted-foreground">Pantau perjalanan kebugaranmu</p>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl p-4 animate-fade-in-up">
            <p className="text-sm font-medium text-foreground">{getMotivationalMessage(user.progress.currentStreak, user.progress.totalExercisesCompleted)}</p>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-3">
          <Card className="hover-lift animate-scale-in">
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Flame className="h-4 w-4 text-orange-500" />
                <span className="text-xs text-muted-foreground">Streak Saat Ini</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{user.progress.currentStreak}</div>
              <div className="text-xs text-muted-foreground">hari</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Award className="h-4 w-4 text-yellow-500" />
                <span className="text-xs text-muted-foreground">Streak Terbaik</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{user.progress.longestStreak}</div>
              <div className="text-xs text-muted-foreground">hari</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.2s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Target className="h-4 w-4 text-green-500" />
                <span className="text-xs text-muted-foreground">Total Latihan</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{user.progress.totalExercisesCompleted}</div>
              <div className="text-xs text-muted-foreground">selesai</div>
            </CardContent>
          </Card>

          <Card className="hover-lift animate-scale-in" style={{ animationDelay: '0.3s' }}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 mb-2">
                <Zap className="h-4 w-4 text-blue-500" />
                <span className="text-xs text-muted-foreground">Kalori Terbakar</span>
              </div>
              <div className="text-2xl font-bold text-foreground">{user.progress.totalCaloriesBurned.toLocaleString()}</div>
              <div className="text-xs text-muted-foreground">total</div>
            </CardContent>
          </Card>
        </div>

        {/* Period Selector */}
        <div className="flex gap-2">
          {(['week', 'month', 'all'] as const).map((period) => (
            <Button key={period} variant={selectedPeriod === period ? 'default' : 'outline'} size="sm" onClick={() => setSelectedPeriod(period)} className="flex-1 capitalize">
              {period === 'all' ? 'Semua Waktu' : `Minggu ini`}
            </Button>
          ))}
        </div>

        {/* Weekly Summary */}
        {selectedPeriod === 'week' && (
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                Ringkasan Minggu ini
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{weeklyStats.totalExercises}</div>
                  <div className="text-xs text-muted-foreground">Exercises</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{weeklyStats.totalCalories.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Calories</div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Active Days:</span>
                  <span className="font-medium">{weeklyStats.daysActive}/7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Daily Average:</span>
                  <span className="font-medium">{weeklyStats.avgDaily.toFixed(1)} exercises</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Charts */}
        {filteredLogs.length > 0 && (
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Progress Trends
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Calories Burned Chart */}
              <div>
                <h4 className="text-sm font-medium mb-2">Daily Calories Burned</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={filteredLogs.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })} fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} formatter={(value) => [`${value} cal`, 'Calories']} />
                    <Line type="monotone" dataKey="caloriesBurned" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Exercise Count Chart */}
              <div>
                <h4 className="text-sm font-medium mb-2">Daily Exercise Count</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={filteredLogs.slice(-7)}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('en-US', { weekday: 'short' })} fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString()} formatter={(value) => [`${value} exercises`, 'Count']} />
                    <Bar dataKey="exercisesCompleted.length" fill="#82ca9d" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}


      </div>

      <Navigation />
    </div>
  );
};

export default Progress;
