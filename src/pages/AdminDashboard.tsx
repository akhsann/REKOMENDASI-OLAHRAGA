import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/utils/supabase';
import { User } from '@/types/auth';
import { UserProfile } from '@/types/exercise';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Activity, LogOut } from 'lucide-react';

interface UserWithProgress extends User {
  progress?: UserProfile['progress'];
}

export default function AdminDashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const [usersList, setUsersList] = useState<UserWithProgress[]>([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(true);


  useEffect(() => {
    if (user?.role !== 'admin') {
      navigate('/');
      return;
    }

    // Load all profiles from Supabase using RPC to access auth.users emails
    const loadUsers = async () => {
      setIsLoadingUsers(true);
      try {
        // Try RPC first (requires SQL function in Supabase)
        const { data: rpcData, error: rpcError } = await supabase
          .rpc('get_users_with_profiles');

        if (!rpcError && rpcData) {
          const usersWithProgress: UserWithProgress[] = (rpcData as Array<{
            id: string;
            email: string;
            role: string;
            name: string;
            profile_data: UserProfile;
          }>)
            .filter((row) => row.role !== 'admin')
            .map((row) => ({
              id: row.id,
              name: row.name || 'Pengguna', // ← dari auth.users metadata (nama saat daftar)
              email: row.email || '-',
              createdAt: '',
              role: 'user',
              progress: row.profile_data?.progress,
            }));
          setUsersList(usersWithProgress);
          return;
        }

        // Fallback: query profiles directly (email may be embedded in profile_data)
        const { data: profiles, error } = await supabase
          .from('profiles')
          .select('id, profile_data');

        if (error) throw error;

        const usersWithProgress: UserWithProgress[] = (profiles || [])
          .map((p) => {
            const profile = p.profile_data as UserProfile & { name?: string; email?: string; role?: string };
            return {
              id: p.id,
              name: profile?.name || 'Pengguna',
              email: profile?.email || '-',
              createdAt: '',
              role: (profile?.role as 'user' | 'admin') || 'user',
              progress: profile?.progress,
            };
          })
          .filter((u) => u.role !== 'admin'); // ← Hanya tampilkan non-admin

        setUsersList(usersWithProgress);
      } catch (err) {
        console.error('Gagal memuat data pengguna:', err);
        toast({
          title: 'Gagal memuat data',
          description: 'Tidak dapat mengambil data pengguna dari database.',
          variant: 'destructive',
        });
      } finally {
        setIsLoadingUsers(false);
      }
    };

    loadUsers();
  }, [user, navigate, toast]);

  return (
    <div className="min-h-screen bg-secondary/30 p-4 md:p-12">
      <div className="max-w-6xl mx-auto space-y-6 md:space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-secondary/50 shadow-sm">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-foreground flex items-center gap-2">
              <Activity className="h-7 w-7 md:h-8 md:w-8 text-primary" />
              Admin Dashboard
            </h1>
            <p className="text-muted-foreground text-sm md:text-base mt-1">Monitor aktivitas pengguna.</p>
          </div>
          <Button variant="outline" onClick={logout} className="gap-2 w-full sm:w-auto justify-center">
            <LogOut className="h-4 w-4" />
            Logout
          </Button>
        </div>

        <Card className="border-none shadow-md overflow-hidden">
          <CardHeader className="bg-white border-b border-secondary/40 py-5">
            <CardTitle className="text-xl font-bold text-foreground">Aktivitas Pengguna</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            {isLoadingUsers ? (
              <div className="text-center text-muted-foreground py-12">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto mb-3"></div>
                Memuat data pengguna...
              </div>
            ) : usersList.length === 0 ? (
              <div className="text-center text-muted-foreground py-12">
                Belum ada pengguna terdaftar.
              </div>
            ) : (
              <>
                {/* Desktop View (Tabel) */}
                <div className="hidden md:block overflow-x-auto">
                  <Table>
                    <TableHeader className="bg-secondary/20">
                      <TableRow>
                        <TableHead className="font-semibold py-4">Nama</TableHead>
                        <TableHead className="font-semibold py-4">Email</TableHead>
                        <TableHead className="text-right font-semibold py-4">Total Latihan</TableHead>
                        <TableHead className="text-right font-semibold py-4">Total Kalori (kal)</TableHead>
                        <TableHead className="text-right font-semibold py-4">Streak Saat Ini</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {usersList.map((u) => (
                        <TableRow key={u.id} className="hover:bg-secondary/30 transition-colors border-b border-secondary/30">
                          <TableCell
                            className="font-semibold text-primary cursor-pointer hover:underline py-4"
                            onClick={() => navigate(`/admin/user/${u.id}`)}
                          >
                            {u.name}
                          </TableCell>
                          <TableCell className="text-muted-foreground">{u.email}</TableCell>
                          <TableCell className="text-right font-medium">{u.progress?.totalExercisesCompleted || 0}</TableCell>
                          <TableCell className="text-right font-medium">{u.progress?.totalCaloriesBurned || 0}</TableCell>
                          <TableCell className="text-right">
                            <span className="inline-flex items-center justify-center bg-orange-100 text-orange-700 px-3 py-1 rounded-full text-xs font-semibold">
                              🔥 {u.progress?.currentStreak || 0} hari
                            </span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Mobile View (Card List) */}
                <div className="block md:hidden divide-y divide-secondary/40">
                  {usersList.map((u) => (
                    <div   
                      key={u.id}   
                      className="p-5 hover:bg-secondary/20 active:bg-secondary/30 transition-colors cursor-pointer"
                      onClick={() => navigate(`/admin/user/${u.id}`)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <div className="space-y-0.5 pr-2">
                          <h3 className="font-bold text-base text-primary hover:underline">
                            {u.name}
                          </h3>
                          <p className="text-xs text-muted-foreground break-all">
                            {u.email}
                          </p>
                        </div>
                        <span className="inline-flex items-center bg-orange-50 text-orange-700 px-2 py-0.5 rounded-full text-[11px] font-bold border border-orange-200/50 shrink-0">
                          🔥 {u.progress?.currentStreak || 0} hari
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-3 bg-secondary/10 p-3 rounded-xl border border-secondary/20">
                        <div className="text-center border-r border-secondary/30">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Latihan</p>
                          <p className="text-sm font-bold text-foreground">{u.progress?.totalExercisesCompleted || 0}</p>
                        </div>
                        <div className="text-center">
                          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold mb-0.5">Total Kalori</p>
                          <p className="text-sm font-bold text-foreground">{u.progress?.totalCaloriesBurned || 0} <span className="text-[10px] font-normal text-muted-foreground">kal</span></p>
                        </div>
                      </div>
                                                                  
                      <div className="mt-3 flex justify-end items-center text-xs font-semibold text-primary/80">
                        Lihat Detail Progres &rarr;
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
