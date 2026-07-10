import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase } from '@/utils/supabase';
import { UserProfile, DailyProgress, CompletedExerciseEntry } from '@/types/exercise';
import { getExercises } from '@/utils/exerciseStore';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
  ArrowLeft, Flame, Award, Target, Zap, Calendar,
  TrendingUp, User, Activity, Clock, Dumbbell, ChevronDown, ChevronUp,
} from 'lucide-react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, BarChart, Bar,
} from 'recharts';

interface UserData {
  id: string;
  email: string;
  profile: UserProfile & { name?: string; email?: string };
}

export default function AdminUserDetail() {
  const { userId } = useParams<{ userId: string }>();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPeriod, setSelectedPeriod] = useState<'week' | 'month' | 'all'>('week');
  const [expandedLog, setExpandedLog] = useState<string | null>(null);

  const allExercises = getExercises();

  const getExerciseName = (id: string): string => {
    const ex = allExercises.find((e) => e.id === id);
    return ex ? ex.name : id;
  };

  const getExerciseDuration = (id: string, storedDuration: number): number => {
    if (storedDuration > 0) return storedDuration;
    const ex = allExercises.find((e) => e.id === id);
    return ex ? ex.duration : 0;
  };

  const normalizeEntry = (entry: CompletedExerciseEntry | string): CompletedExerciseEntry => {
    if (typeof entry === 'string') return { id: entry, durationMinutes: 0 };
    return entry;
  };

  useEffect(() => {
    if (!userId) return;

    const loadUserDetail = async () => {
      setIsLoading(true);
      try {
        // Try RPC first to get email
        const { data: rpcData } = await supabase.rpc('get_users_with_profiles');
        if (rpcData) {
          const found = (rpcData as Array<{
            id: string; email: string; role: string; name: string; profile_data: UserProfile;
          }>).find((r) => r.id === userId);

          if (found) {
            setUserData({
              id: found.id,
              email: found.email,
              profile: { ...found.profile_data, name: found.name }, // pakai nama dari auth metadata
            });
            return;
          }
        }

        // Fallback: direct profile query
        const { data, error } = await supabase
          .from('profiles')
          .select('id, profile_data')
          .eq('id', userId)
          .single();

        if (error || !data) throw new Error('User not found');
        const profile = data.profile_data as UserProfile & { name?: string; email?: string };
        setUserData({ id: data.id, email: profile?.email || '-', profile });
      } catch (err) {
        console.error('Gagal memuat detail pengguna:', err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserDetail();
  }, [userId]);

  const getFilteredLogs = (logs: DailyProgress[], period: string): DailyProgress[] => {
    if (!logs) return [];
    const now = new Date();
    const cutoff = new Date();
    switch (period) {
      case 'week': cutoff.setDate(now.getDate() - 7); break;
      case 'month': cutoff.setMonth(now.getMonth() - 1); break;
      default: return logs;
    }
    return logs.filter((log) => new Date(log.date) >= cutoff);
  };

  const getWeeklyStats = (logs: DailyProgress[]) => {
    const weekLogs = getFilteredLogs(logs, 'week');
    return {
      totalExercises: weekLogs.reduce((s, l) => s + l.exercisesCompleted.length, 0),
      totalCalories: weekLogs.reduce((s, l) => s + l.caloriesBurned, 0),
      totalTime: weekLogs.reduce((s, l) => s + l.timeSpent, 0),
      daysActive: weekLogs.length,
      avgDaily: weekLogs.length > 0
        ? weekLogs.reduce((s, l) => s + l.exercisesCompleted.length, 0) / 7
        : 0,
    };
  };

  const getChartData = (logs: DailyProgress[]) =>
    logs.map((log) => ({
      date: log.date,
      calories: log.caloriesBurned,
      exercises: log.exercisesCompleted.length,
      time: Math.round(log.timeSpent),
    }));

  if (isLoading) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="text-center space-y-3">
          <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="text-muted-foreground">Memuat data pengguna...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-secondary/30 flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">Data pengguna tidak ditemukan.</p>
          <Button onClick={() => navigate('/admin')}>Kembali ke Dashboard</Button>
        </div>
      </div>
    );
  }

  const { profile } = userData;
  const progress = profile?.progress;
  const dailyLogs = progress?.dailyLogs || [];
  const filteredLogs = getFilteredLogs(dailyLogs, selectedPeriod);
  const weeklyStats = getWeeklyStats(dailyLogs);
  const chartData = getChartData(filteredLogs);

  const periodLabels: Record<string, string> = {
    week: 'Minggu Ini',
    month: 'Bulan Ini',
    all: 'Semua Waktu',
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top Bar */}
      <div className="bg-background border-b sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate('/admin')}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg leading-tight">
                {profile?.name || 'Pengguna'}
              </h1>
              <p className="text-sm text-muted-foreground">{userData.email}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-6 py-8 space-y-8">

        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: <Flame className="h-5 w-5 text-orange-500" />, label: 'Streak Saat Ini', value: progress?.currentStreak ?? 0, unit: 'hari', color: 'from-orange-50 to-orange-100/50 dark:from-orange-950/30 dark:to-orange-900/10 border-orange-200/60' },
            { icon: <Award className="h-5 w-5 text-yellow-500" />, label: 'Streak Terbaik', value: progress?.longestStreak ?? 0, unit: 'hari', color: 'from-yellow-50 to-yellow-100/50 dark:from-yellow-950/30 dark:to-yellow-900/10 border-yellow-200/60' },
            { icon: <Target className="h-5 w-5 text-green-500" />, label: 'Total Latihan', value: progress?.totalExercisesCompleted ?? 0, unit: 'sesi', color: 'from-green-50 to-green-100/50 dark:from-green-950/30 dark:to-green-900/10 border-green-200/60' },
            { icon: <Zap className="h-5 w-5 text-blue-500" />, label: 'Total Kalori', value: (progress?.totalCaloriesBurned ?? 0).toLocaleString(), unit: 'kal', color: 'from-blue-50 to-blue-100/50 dark:from-blue-950/30 dark:to-blue-900/10 border-blue-200/60' },
          ].map((stat) => (
            <Card key={stat.label} className={`bg-gradient-to-br ${stat.color} border`}>
              <CardContent className="p-5">
                <div className="flex items-center gap-2 mb-3">{stat.icon}<span className="text-xs text-muted-foreground font-medium">{stat.label}</span></div>
                <div className="text-3xl font-bold text-foreground">{stat.value}</div>
                <div className="text-xs text-muted-foreground mt-1">{stat.unit}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Period Selector + Weekly Summary */}
        <div className="flex flex-col md:flex-row gap-6">
          {/* Period Filter */}
          <Card className="md:w-56 shrink-0">
            <CardHeader><CardTitle className="text-sm">Filter Periode</CardTitle></CardHeader>
            <CardContent className="space-y-2">
              {(['week', 'month', 'all'] as const).map((p) => (
                <button
                  key={p}
                  onClick={() => setSelectedPeriod(p)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    selectedPeriod === p
                      ? 'bg-primary text-primary-foreground'
                      : 'hover:bg-secondary text-muted-foreground'
                  }`}
                >
                  {periodLabels[p]}
                </button>
              ))}
            </CardContent>
          </Card>

          {/* Weekly Summary */}
          <Card className="flex-1">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Calendar className="h-4 w-4" />
                Ringkasan {periodLabels[selectedPeriod]}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Latihan', value: selectedPeriod === 'week' ? weeklyStats.totalExercises : filteredLogs.reduce((s, l) => s + l.exercisesCompleted.length, 0), icon: <Activity className="h-4 w-4 text-primary" /> },
                  { label: 'Kalori', value: (selectedPeriod === 'week' ? weeklyStats.totalCalories : filteredLogs.reduce((s, l) => s + l.caloriesBurned, 0)).toLocaleString(), icon: <Flame className="h-4 w-4 text-orange-500" /> },
                  { label: 'Hari Aktif', value: `${selectedPeriod === 'week' ? weeklyStats.daysActive : filteredLogs.length}${selectedPeriod === 'week' ? '/7' : ''}`, icon: <Calendar className="h-4 w-4 text-green-500" /> },
                  { label: 'Waktu (menit)', value: Math.round(selectedPeriod === 'week' ? weeklyStats.totalTime : filteredLogs.reduce((s, l) => s + l.timeSpent, 0)), icon: <Clock className="h-4 w-4 text-blue-500" /> },
                ].map((s) => (
                  <div key={s.label} className="text-center p-3 rounded-xl bg-secondary/50">
                    <div className="flex justify-center mb-1">{s.icon}</div>
                    <div className="text-2xl font-bold text-foreground">{s.value}</div>
                    <div className="text-xs text-muted-foreground">{s.label}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        {chartData.length > 0 ? (
          <div className="grid md:grid-cols-2 gap-6">
            {/* Calories Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-purple-500" />
                  Kalori Terbakar per Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                    <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} fontSize={11} />
                    <YAxis fontSize={11} />
                    <Tooltip
                      labelFormatter={(d) => new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                      formatter={(v) => [`${v} kal`, 'Kalori']}
                    />
                    <Line type="monotone" dataKey="calories" stroke="#8b5cf6" strokeWidth={2.5} dot={{ fill: '#8b5cf6', r: 4 }} activeDot={{ r: 6 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Exercise Count Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="text-base flex items-center gap-2">
                  <Activity className="h-4 w-4 text-emerald-500" />
                  Jumlah Latihan per Hari
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} />
                    <XAxis dataKey="date" tickFormatter={(d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })} fontSize={11} />
                    <YAxis fontSize={11} allowDecimals={false} />
                    <Tooltip
                      labelFormatter={(d) => new Date(d).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long' })}
                      formatter={(v) => [`${v} latihan`, 'Jumlah']}
                    />
                    <Bar dataKey="exercises" fill="#10b981" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        ) : (
          <Card>
            <CardContent className="py-16 text-center text-muted-foreground">
              <Activity className="h-10 w-10 mx-auto mb-3 opacity-30" />
              <p className="font-medium">Tidak ada data latihan</p>
              <p className="text-sm mt-1">Pengguna belum mencatat aktivitas pada periode ini.</p>
            </CardContent>
          </Card>
        )}

        {/* Log Harian */}
        {filteredLogs.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <Dumbbell className="h-4 w-4" />
                Riwayat Latihan ({filteredLogs.length} hari)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 max-h-[600px] overflow-y-auto pr-1">
                {[...filteredLogs].reverse().map((log) => {
                  const isExpanded = expandedLog === log.date;
                  const entries = log.exercisesCompleted.map(normalizeEntry);
                  return (
                    <div key={log.date} className="border border-border rounded-xl overflow-hidden">
                      {/* Day header */}
                      <button
                        className="w-full flex items-center justify-between py-3 px-4 bg-secondary/40 hover:bg-secondary/70 transition-colors text-left"
                        onClick={() => setExpandedLog(isExpanded ? null : log.date)}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-semibold text-sm text-foreground">
                              {new Date(log.date).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                            <p className="text-xs text-muted-foreground mt-0.5">
                              {entries.length} latihan · {log.caloriesBurned} kal · {Math.round(log.timeSpent)} mnt
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-orange-500">{log.caloriesBurned} kal</span>
                          {isExpanded
                            ? <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                            : <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />}
                        </div>
                      </button>

                      {/* Per-exercise detail */}
                      {isExpanded && (
                        <div className="divide-y divide-border">
                          {entries.map((entry, idx) => (
                            <div
                              key={`${entry.id}-${idx}`}
                              className="flex items-center gap-3 px-5 py-3 bg-background/60"
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
              </div>
            </CardContent>
          </Card>
        )}

      </div>
    </div>
  );
}
