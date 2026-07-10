import { useState, useEffect } from 'react';
import { getUserProfile } from '@/utils/storage';
import { UserProfile, DailyProgress, CompletedExerciseEntry } from '@/types/exercise';
import { getExercises } from '@/utils/exerciseStore';
import { Navigation } from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TrendingUp, Flame, Calendar, Target, Award, Zap, Clock, Dumbbell, ChevronDown, ChevronUp } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

const Progress = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  useEffect(() => {
    const profile = getUserProfile();
    if (profile) {
      setUser(profile);
    }
  }, []);

  const allExercises = getExercises();

  const getExerciseName = (id: string): string => {
    const ex = allExercises.find((e) => e.id === id);
    return ex ? ex.name : id;
  };

  const getExerciseDuration = (id: string, storedDuration: number): number => {
    if (storedDuration > 0) return storedDuration;
    // Fallback for old data: use exercise's default duration
    const ex = allExercises.find((e) => e.id === id);
    return ex ? ex.duration : 0;
  };

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

  const formatDate = (dateStr: string): string => {
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' });
  };

  // Normalize entry — backward-compat: old logs stored plain strings
  const normalizeEntry = (entry: CompletedExerciseEntry | string): CompletedExerciseEntry => {
    if (typeof entry === 'string') return { id: entry, durationMinutes: 0 };
    return entry;
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

  // Chart data — derive exerciseCount per day
  const chartData = filteredLogs.slice(-7).map((log) => ({
    ...log,
    exerciseCount: log.exercisesCompleted.length,
  }));

  // Sort logs newest-first for history display
  const sortedLogs = [...filteredLogs].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

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
            <Button
              key={period}
              variant={selectedPeriod === period ? 'default' : 'outline'}
              size="sm"
              onClick={() => setSelectedPeriod(period)}
              className="flex-1 capitalize"
            >
              {period === 'week' ? 'Minggu Ini' : period === 'month' ? 'Bulan Ini' : 'Semua Waktu'}
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
                  <div className="text-xs text-muted-foreground">Latihan</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{weeklyStats.totalCalories.toLocaleString()}</div>
                  <div className="text-xs text-muted-foreground">Kalori</div>
                </div>
              </div>
              <div className="pt-2 border-t">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Hari Aktif:</span>
                  <span className="font-medium">{weeklyStats.daysActive}/7</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Rata-rata Harian:</span>
                  <span className="font-medium">{weeklyStats.avgDaily.toFixed(1)} latihan</span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Progress Charts */}
        {chartData.length > 0 && (
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="h-5 w-5" />
                Tren Progres
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Calories Burned Chart */}
              <div>
                <h4 className="text-sm font-medium mb-2">Kalori Terbakar per Hari</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('id-ID', { weekday: 'short' })} fontSize={12} />
                    <YAxis fontSize={12} />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString('id-ID')} formatter={(value) => [`${value} kal`, 'Kalori']} />
                    <Line type="monotone" dataKey="caloriesBurned" stroke="#8884d8" strokeWidth={2} dot={{ fill: '#8884d8', strokeWidth: 2, r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>

              {/* Exercise Count Chart */}
              <div>
                <h4 className="text-sm font-medium mb-2">Jumlah Latihan per Hari</h4>
                <ResponsiveContainer width="100%" height={120}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(date) => new Date(date).toLocaleDateString('id-ID', { weekday: 'short' })} fontSize={12} />
                    <YAxis fontSize={12} allowDecimals={false} />
                    <Tooltip labelFormatter={(date) => new Date(date).toLocaleDateString('id-ID')} formatter={(value) => [`${value} latihan`, 'Jumlah']} />
                    <Bar dataKey="exerciseCount" fill="#82ca9d" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Workout History */}
        {sortedLogs.length > 0 && (
          <Card className="animate-fade-in-up">
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Dumbbell className="h-5 w-5" />
                Riwayat Latihan
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {sortedLogs.map((log) => {
                const isExpanded = expandedLog === log.date;
                const entries = log.exercisesCompleted.map(normalizeEntry);

                return (
                  <div
                    key={log.date}
                    className="border border-border rounded-xl overflow-hidden transition-all duration-200"
                  >
                    {/* Day header — clickable to expand */}
                    <button
                      className="w-full flex items-center justify-between p-3 bg-secondary/40 hover:bg-secondary/60 transition-colors text-left"
                      onClick={() => setExpandedLog(isExpanded ? null : log.date)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <Calendar className="h-4 w-4 text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-foreground">{formatDate(log.date)}</p>
                          <p className="text-xs text-muted-foreground">
                            {entries.length} latihan · {log.caloriesBurned} kal · {log.timeSpent} mnt
                          </p>
                        </div>
                      </div>
                      {isExpanded ? (
                        <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                      )}
                    </button>

                    {/* Exercise list */}
                    {isExpanded && (
                      <div className="divide-y divide-border">
                        {entries.map((entry, idx) => (
                          <div
                            key={`${entry.id}-${idx}`}
                            className="flex items-center gap-3 px-4 py-3 bg-background/60 animate-fade-in"
                          >
                            <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                              <Dumbbell className="h-3.5 w-3.5 text-primary" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground truncate">
                                {getExerciseName(entry.id)}
                              </p>
                            </div>
                            <div className="flex items-center gap-1 text-xs text-muted-foreground flex-shrink-0">
                              <Clock className="h-3 w-3" />
                              <span>{getExerciseDuration(entry.id, entry.durationMinutes)} mnt</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </CardContent>
          </Card>
        )}

        {filteredLogs.length === 0 && (
          <Card className="animate-fade-in-up">
            <CardContent className="p-8 text-center">
              <Dumbbell className="h-12 w-12 text-muted-foreground/40 mx-auto mb-3" />
              <p className="text-muted-foreground text-sm">Belum ada riwayat latihan dalam periode ini.</p>
              <p className="text-muted-foreground/70 text-xs mt-1">Mulai latihan untuk melihat progresmu di sini!</p>
            </CardContent>
          </Card>
        )}
      </div>

      <Navigation />
    </div>
  );
};

export default Progress;
