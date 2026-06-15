import { Navigation } from '@/components/Navigation';
import { WorkoutReminder } from '@/components/WorkoutReminder';
import { isNativeApp } from '@/utils/notifications';
import { Bell, Smartphone, HelpCircle } from 'lucide-react';

export default function Reminder() {
  const isNative = isNativeApp();

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary pb-20 animate-fade-in">
      <div className="max-w-md mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center gap-3 pt-4 animate-fade-in-up">
          <div className="p-3 rounded-2xl bg-gradient-to-br from-accent to-accent/80 shadow-glow animate-pulse-glow">
            <Bell className="h-6 w-6 text-accent-foreground" />
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-foreground">Pengingat Latihan</h1>
            <p className="text-sm text-muted-foreground">Kelola waktu dan jadwal notifikasi harian Anda</p>
          </div>
        </div>

        {/* Content */}
        <div className="space-y-6">
          <WorkoutReminder />

          {/* Setup Instructions Card (Only show on Web / Non-Native) */}
          {!isNative && (
            <div className="bg-card border border-border rounded-xl p-5 space-y-4 animate-fade-in-up shadow-sm" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center gap-2 pb-2 border-b">
                <Smartphone className="h-5 w-5 text-primary shrink-0" />
                <h4 className="font-semibold text-foreground">🖥️ Cara Install di HP (Android/iOS)</h4>
              </div>
              
              <div className="space-y-3 text-xs text-muted-foreground leading-relaxed">
                <p>
                  Aplikasi ini menggunakan teknologi <strong>Capacitor</strong> untuk berjalan sebagai aplikasi mobile asli. Ikuti langkah-langkah berikut untuk menginstalnya:
                </p>
                <ol className="list-decimal pl-4 space-y-2">
                  <li>
                    Pastikan Anda telah menginstal <strong>Node.js</strong> dan <strong>Android Studio</strong> di komputer Anda.
                  </li>
                  <li>
                    Jalankan perintah berikut di terminal untuk membuild aplikasi:
                    <pre className="bg-muted p-2 rounded mt-1 font-mono text-[10px] overflow-x-auto text-foreground">
                      npm run build{"\n"}
                      npx cap sync
                    </pre>
                  </li>
                  <li>
                    Buka proyek Android di Android Studio:
                    <pre className="bg-muted p-2 rounded mt-1 font-mono text-[10px] overflow-x-auto text-foreground">
                      npx cap open android
                    </pre>
                  </li>
                  <li>
                    Hubungkan HP Anda ke komputer dengan mode <em>USB Debugging</em> aktif, lalu tekan tombol <strong>Run</strong> di Android Studio untuk menginstal aplikasi.
                  </li>
                </ol>
                <div className="bg-primary/5 p-3 rounded-lg border border-primary/10 mt-2 text-[11px] text-primary">
                  💡 Setelah berjalan sebagai aplikasi native di handphone Anda, fitur <strong>Notifikasi Pengingat</strong> di atas akan otomatis aktif dan siap digunakan!
                </div>
              </div>
            </div>
          )}

          {/* Tips Card */}
          <div className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-5 space-y-3 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <h4 className="font-semibold text-foreground flex items-center gap-2">
              <HelpCircle className="h-4 w-4 text-emerald-500" />
              Tips Konsistensi Latihan
            </h4>
            <ul className="text-xs text-muted-foreground space-y-2 list-disc pl-4">
              <li>Pilih waktu latihan yang sama setiap hari agar terbentuk kebiasaan (habit) baru.</li>
              <li>Mulai dengan durasi singkat (misal 15 menit) daripada langsung memaksakan durasi panjang.</li>
              <li>Gunakan pengingat ini untuk membantu Anda mempertahankan streak latihan mingguan Anda.</li>
            </ul>
          </div>
        </div>
      </div>
      <Navigation />
    </div>
  );
}
