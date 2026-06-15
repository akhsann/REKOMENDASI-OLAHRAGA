export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
  tips?: string[];
}

export interface ExerciseTutorial {
  exerciseId: string;
  steps: TutorialStep[];
  safetyTips: string[];
  commonMistakes: string[];
}

/** Tutorial selaras dengan urutan olahraga kuesioner validasi pelatih (`exercises.ts` ex1–ex30). */
export const exerciseTutorials: Record<string, ExerciseTutorial> = {
  ex1: {
    exerciseId: 'ex1',
    steps: [
      {
        title: 'Persiapan & postur',
        description:
          'Panaskan sendi dan lakukan set pemanasan dengan palang kosong atau beban sangat ringan. Berdiri dengan kaki selebar bahu, punggung netral, dan inti aktif.',
        tips: ['Sesuaikan berat dengan kemampuan', 'Gunakan sepatu sol datar di gym'],
      },
      {
        title: 'Gerakan angkat beban',
        description:
          'Ikuti teknik yang diawasi pelatih (misalnya squat dengan barbel, bench press, atau deadlift dengan ROM aman). Napas teratur; hindari menahan napas berlebihan pada beban berat tanpa pengawasan.',
        tips: ['Buang napas pada fase yang sulit', 'Jaga barbel dekat garis vertikal tubuh sesuai gerakan'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan beban bertahap, lalu regangkan otot yang dipakai selama 5–10 menit.',
        tips: ['Catat volume latihan untuk minggu berikutnya'],
      },
    ],
    safetyTips: ['Gunakan spotter untuk napas dan satu-rep-maks', 'Jangan membulatkan punggung pada tarikan dari lantai'],
    commonMistakes: ['Menambah beban sebelum teknik stabil', 'Valsalva berlebihan pada pemula atau tanpa arahan'],
  },
  ex2: {
    exerciseId: 'ex2',
    steps: [
      {
        title: 'Pemilihan beban',
        description: 'Pilih dumbbell yang memungkinkan 10–12 reps dengan bentuk baik untuk gerakan target (curl, press, row, dll.).',
        tips: ['Mulai ringan', 'Area latihan bebas halangan'],
      },
      {
        title: 'Eksekusi',
        description: 'Jaga siku dan pergelangan netral sesuai gerakan. Kontrol naik dan turun tanpa ayunan momentum berlebihan.',
        tips: ['Buang napas pada fase mengangkat', 'Tahan core ringan'],
      },
      {
        title: 'Pendinginan',
        description: 'Regangkan otot yang baru dilatih secara statis singkat.',
        tips: ['Minum air', 'Istirahat antar set'],
      },
    ],
    safetyTips: ['Jangan mengunci sendi keras pada gerakan press ringan', 'Turunkan beban ke rak dengan aman'],
    commonMistakes: ['Membungkuk untuk mengangkat dumbbell dari lantai', 'Ayunan pinggul untuk cheat curl'],
  },
  ex3: {
    exerciseId: 'ex3',
    steps: [
      {
        title: 'Panaskan pinggul dan lutut',
        description: 'Peregangan dinamis ringan: lunges kecil, squat tanpa beban, lingkar lutut.',
        tips: ['Kaki selebar bahu atau sedikit lebih lebar sesuai variasi'],
      },
      {
        title: 'Squat',
        description:
          'Turunkan pinggul ke belakang-bawah sambil lutut mengikuti arah jari kaki. Turun hingga nyaman tanpa membulatkan punggung; dorong melalui tumit/mid-foot untuk bangkit.',
        tips: ['Dada tetap panjang', 'Lutut tidak boleh kolaps ke dalam'],
      },
      {
        title: 'Pendinginan',
        description: 'Peregangan hamstring dan quadriceps singkat.',
        tips: ['Hentikan jika lutut terasa tajam'],
      },
    ],
    safetyTips: ['Gunakan depth yang aman untuk sendi Anda', 'Hindari valgus lutut berlebihan'],
    commonMistakes: ['Heels terangkat', 'Pinggul tidak mundur (quad-dominan tanpa hip hinge)'],
  },
  ex4: {
    exerciseId: 'ex4',
    steps: [
      {
        title: 'Pemanasan',
        description: '5–10 menit gerakan dinamis dan denyut jantung naik bertahap.',
        tips: ['Siapkan timer kerja/istirahat'],
      },
      {
        title: 'Interval',
        description:
          'Kerja keras singkat (misalnya 20–40 detik) bergantian dengan istirahat aktif atau pasif. Contoh: jumping jack, mountain climber, sprint pendek, kettlebell swing ringan.',
        tips: ['Tekankan bentuk di atas kecepatan di awal', 'Sesuaikan rasio kerja/istirahat'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan di tempat perlahan lalu peregangan dinamis dan statis pendek.',
        tips: ['Tarik napas panjang'],
      },
    ],
    safetyTips: ['Permukaan tidak licin', 'Berhenti jika pusing atau nyeri dada'],
    commonMistakes: ['Interval pertama tanpa pemanasan', 'Terus memaksakan saat bentuk rusak'],
  },
  ex5: {
    exerciseId: 'ex5',
    steps: [
      {
        title: 'Persiapan',
        description: 'Kenakan sepatu nyaman. Mulai dengan tempo pelan dan postur tegak.',
        tips: ['Pilih jalur aman dan terang'],
      },
      {
        title: 'Berjalan santai',
        description: 'Langkah natural ~3–4 km/jam. Ayunkan lengan rileks.',
        tips: ['Napas santai', 'Pandangan ke depan'],
      },
      {
        title: 'Pendinginan',
        description: 'Perlahan tempo terakhir lalu regangkan betis dan paha ringan.',
        tips: ['Minum air'],
      },
    ],
    safetyTips: ['Waspada lalu lintas dan permukaan tidak rata'],
    commonMistakes: ['Membungkuk melihat ponsel terus-menerus'],
  },
  ex6: {
    exerciseId: 'ex6',
    steps: [
      {
        title: 'Pemanasan',
        description: 'Mulai dari jalan santai 3 menit, lalu tingkatkan ritme.',
        tips: ['Sepatu jalan nyaman'],
      },
      {
        title: 'Berjalan cepat',
        description: 'Langkah lebih pendek dan cepat; tumit mendarat lalu gulir ke depan. Ayunan lengan 90°.',
        tips: ['Tegakkan dada', 'Cadence stabil'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan kecepatan bertahap 5 menit akhir.',
        tips: ['Regangkan betis dan hamstring'],
      },
    ],
    safetyTips: ['Pilih alas yang tidak licin', 'Hentikan jika sesak tidak biasa'],
    commonMistakes: ['Overstride besar dengan tumit keras'],
  },
  ex7: {
    exerciseId: 'ex7',
    steps: [
      {
        title: 'Persiapan',
        description: 'Sepatu lari sesuai; mulai jalan cepat 5 menit.',
        tips: ['Rencanakan rute datar terlebih dahulu'],
      },
      {
        title: 'Jogging',
        description: 'Tempo percakapan: langkah ringan, pergelangan di bawah lutut, tubuh condong tipis dari pergelangan kaki.',
        tips: ['Ayunan lengan rileks', 'Pendaratan mid-foot ringan'],
      },
      {
        title: 'Pendinginan',
        description: 'Transisi ke jalan 5 menit; peregangan statis pendek.',
        tips: ['Hidrasi'],
      },
    ],
    safetyTips: ['Perhatikan permukaan dan ramai lalu lintas'],
    commonMistakes: ['Membungkuk saat lelah', 'Heel strike keras dengan kaki lurus'],
  },
  ex8: {
    exerciseId: 'ex8',
    steps: [
      {
        title: 'Pengaturan sepeda',
        description: 'Sesuaikan tinggi sadel dan jarak setang. Pemanasan resistensi rendah.',
        tips: ['Sepatu mengikat pedal dengan baik'],
      },
      {
        title: 'Mengayuh',
        description: 'Kayuh ritmis intensitas sedang; punggung stabil, lutut tidak menyimpang ke dalam.',
        tips: ['Tekanan merata telapak kaki', 'Naikkan resistensi bertahap'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan resistensi dan kayuh lambat 3–5 menit.',
        tips: ['Regangkan quadriceps dan hamstring'],
      },
    ],
    safetyTips: ['Sadel dan pedal terkunci aman', 'Hidrasi'],
    commonMistakes: ['Sadel terlalu rendah membebani lutut', 'Bertumpu pada pegangan'],
  },
  ex9: {
    exerciseId: 'ex9',
    steps: [
      {
        title: 'M-check',
        description: 'Helm, ban, rem, rantai. Pakaian terlihat.',
        tips: ['Bawa air'],
      },
      {
        title: 'Kayuhan luar ruang',
        description: 'Kecepatan konstan sedang; turunkan gigi saat tanjak. Pandangan jauh.',
        tips: ['Cadence stabil', 'Isyarat tangan saat belok'],
      },
      {
        title: 'Pendinginan',
        description: 'Flat ringan 5 menit terakhir lalu regangan leher, bahu, paha.',
        tips: ['Patuhi rambu'],
      },
    ],
    safetyTips: ['Wajib helm di jalan umum', 'Hati pintu parkir'],
    commonMistakes: ['Gigi berat terus-menerus merusak lutut'],
  },
  ex10: {
    exerciseId: 'ex10',
    steps: [
      {
        title: 'Masuk air',
        description: 'Pemanasan tepi kolam; sesuaikan suhu; kenakan kacamata renang.',
        tips: ['Area diawasi lifeguard bila ada'],
      },
      {
        title: 'Gaya bebas',
        description: 'Badan sejajar; lengan bergantian; flutter kick dari pangkal paha; napas ke samping.',
        tips: ['Kepala netral saat tidak bernapas'],
      },
      {
        title: 'Keluar & pendinginan',
        description: 'Renang sangat ringan akhir sesi; regangkan dada dan bahu.',
        tips: ['Bilas dan keringkan telinga'],
      },
    ],
    safetyTips: ['Berhenti jika kram atau sesak', 'Ketahui kedalaman'],
    commonMistakes: ['Kaki mengayuh seperti sepeda', 'Kepala terlalu tinggi mengganggu posisi'],
  },
  ex11: {
    exerciseId: 'ex11',
    steps: [
      {
        title: 'Persiapan',
        description: 'Matras rata; napas melalui hidung; tubuh hangat ringan.',
        tips: ['Matikan distraksi'],
      },
      {
        title: 'Praktik',
        description: 'Rangkaian pose yang dipilih instruktur atau mandiri; jangan paksa nyeri tajam.',
        tips: ['Panjangkan tulang belakang', 'Gunakan blok jika perlu'],
      },
      {
        title: 'Savasana singkat',
        description: 'Relaksasi 3–5 menit untuk menutup sesi.',
        tips: ['Bangun perlahan'],
      },
    ],
    safetyTips: ['Modifikasi untuk hipertensi/inversi ekstrem sesuai anjuran profesional'],
    commonMistakes: ['Menahan napas', 'Memaksakan fleksi dalam'],
  },
  ex12: {
    exerciseId: 'ex12',
    steps: [
      {
        title: 'Pemanasan sendi',
        description: 'Pergelangan, bahu, pinggul; beberapa squat tanpa beban.',
        tips: ['Matras jika lantai keras'],
      },
      {
        title: 'Gerakan tubuh',
        description: 'Push-up atau variasi lutut, squat tubuh, plank pendek sesuai level.',
        tips: ['Garis tubuh lurus di plank/push-up'],
      },
      {
        title: 'Recovery',
        description: 'Child pose atau regangan punggung ringan.',
        tips: ['Progres beban/volume bertahap'],
      },
    ],
    safetyTips: ['Variasi lutut jika belum kuat push-up penuh'],
    commonMistakes: ['Pinggul jatuh atau naik tinggi di plank'],
  },
  ex13: {
    exerciseId: 'ex13',
    steps: [
      {
        title: 'Mesin',
        description: 'Naik dengan aman; pegangan ringan; mulai kecepatan rendah.',
        tips: ['Postur tegak'],
      },
      {
        title: 'Langkah',
        description: 'Tekan pijakan penuh melalui tumit-ke-depan; jangan sandarkan berat di tangan.',
        tips: ['Sesuaikan tingkat sesuai denyut target'],
      },
      {
        title: 'Turun',
        description: 'Perlambat ke nol sebelum turun; regangkan betis.',
        tips: ['Lap pegangan'],
      },
    ],
    safetyTips: ['Hati-hati naik/turun saat sabuk bergerak'],
    commonMistakes: ['Tumpu pada handrail mengurangi beban kaki'],
  },
  ex14: {
    exerciseId: 'ex14',
    steps: [
      {
        title: 'Pemanasan irama',
        description: 'Marching atau langkah ringan dengan musik BPM sedang.',
        tips: ['Ruang gerak cukup'],
      },
      {
        title: 'Kombinasi',
        description: 'Langkah menyamping, sentuhan kaki, kombinasi lengan—sesuaikan dampak sendi Anda.',
        tips: ['Satu kaki sering kontak lantai untuk low impact'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan BPM; regangan berdiri.',
        tips: ['Hidrasi'],
      },
    ],
    safetyTips: ['Sepatu dengan cengkeram baik'],
    commonMistakes: ['Membungkuk saat lelah'],
  },
  ex15: {
    exerciseId: 'ex15',
    steps: [
      {
        title: 'Catch',
        description: 'Duduk benar; tali kaki kencang; lengan lurus; lutut fleksi.',
        tips: ['Damper sedang untuk pemula'],
      },
      {
        title: 'Drive',
        description: 'Dorong kaki lalu tarik handle ke dada bawah; punggung netral.',
        tips: ['Urutan kaki-punggung-lengan'],
      },
      {
        title: 'Recovery',
        description: 'Luruskan lengan, geser maju, tekuk lutut halus.',
        tips: ['Napas teratur'],
      },
    ],
    safetyTips: ['Jangan hyperextend punggung di akhir tarikan'],
    commonMistakes: ['Tarik dengan lengan dulu'],
  },
  ex16: {
    exerciseId: 'ex16',
    steps: [
      {
        title: 'Mulai',
        description: 'Kaki di tengah pedal; genggam handle; gerakan lambat menyalakan monitor.',
        tips: ['Postur tegak'],
      },
      {
        title: 'Kayuhan elips',
        description: 'Sinkron lengan-kaki; tekanan merata kaki; sesekali mundur ringan.',
        tips: ['Jangan condong ke monitor'],
      },
      {
        title: 'Akhir',
        description: 'Resistensi nol, perlambat; turun setelah berhenti.',
        tips: ['Regangkan pinggul'],
      },
    ],
    safetyTips: ['Tunggu berhenti penuh sebelum turun'],
    commonMistakes: ['Terlalu banyak berpegangan dengan lengan'],
  },
  ex17: {
    exerciseId: 'ex17',
    steps: [
      {
        title: 'Pemanasan',
        description: 'Gerakan pinggul dan bahu ke musik tempo sedang.',
        tips: ['Area tidak licin'],
      },
      {
        title: 'Gerakan tari',
        description: 'Langkah ballroom atau tari sosial dengan transfer berat halus dan lengan ekspresif.',
        tips: ['Core aktif saat putar'],
      },
      {
        title: 'Pendinginan',
        description: 'Perlahan dengan lagu lebih lambat; regangan tubuh.',
        tips: ['Minum air'],
      },
    ],
    safetyTips: ['Sepatu sesuai lantai', 'Hindari putaran lutut terkunci'],
    commonMistakes: ['Terlalu kaku di pinggul'],
  },
  ex18: {
    exerciseId: 'ex18',
    steps: [
      {
        title: 'Perlengkapan',
        description: 'Helm, lutut, siku; latihan berdiri di rumput terlebih dahulu.',
        tips: ['Lutut sedikit fleksi, pusat gravitasi rendah'],
      },
      {
        title: 'Meluncur',
        description: 'Dorong diagonal belakang bergantian; pandangan depan; ayunan lengan.',
        tips: ['Belajar rem dasar'],
      },
      {
        title: 'Berhenti',
        description: 'Rem tumit atau T-stop; regangkan pergelangan kaki.',
        tips: ['Latih jatuh ke depan ke pelindung'],
      },
    ],
    safetyTips: ['Area datar dan tidak ramai', 'Jalur turunan curam untuk lanjutan'],
    commonMistakes: ['Lutut kaku vertikal'],
  },
  ex19: {
    exerciseId: 'ex19',
    steps: [
      {
        title: 'Ukuran tali',
        description: 'Tali mencapai ketiak saat diinjak tengah; pergelangan hangat.',
        tips: ['Sepatu dengan amortisasi'],
      },
      {
        title: 'Loncatan dasar',
        description: 'Putar pergelangan; lompatan kecil 2–3 cm; mendarat halus bola kaki.',
        tips: ['Siku dekat tubuh'],
      },
      {
        title: 'Pendinginan',
        description: 'Regangkan betis dan achilles.',
        tips: ['Permukaan tidak tersekat'],
      },
    ],
    safetyTips: ['Berhenti jika nyeri lutut tajam', 'Matras/kayu lebih ramah sendi'],
    commonMistakes: ['Putaran lengan besar', 'Lompatan tinggi tidak perlu'],
  },
  ex20: {
    exerciseId: 'ex20',
    steps: [
      {
        title: 'Pemanasan',
        description: 'Mobilisasi sendi dan aktivasi ringan inti.',
        tips: ['Matras tebal'],
      },
      {
        title: 'Senam',
        description: 'Rangkaian kelenturan, rol, atau gerakan dasar gimnastik sesuai level—tanpa ballistic paksa.',
        tips: ['Napas terarah'],
      },
      {
        title: 'Akhir',
        description: 'Regangan statis pendek dan relaksasi.',
        tips: ['Awasi instruktur untuk skill baru'],
      },
    ],
    safetyTips: ['Tidak memaksakan oversplit atau landing keras tanpa progresi'],
    commonMistakes: ['Menahan napas di pose sulit'],
  },
  ex21: {
    exerciseId: 'ex21',
    steps: [
      {
        title: 'Penyelarasan',
        description: 'Bernapas lateral / tulang rusuk; tulang belakang netral di imprint halus jika diajarkan.',
        tips: ['Core aktif tanpa kaku'],
      },
      {
        title: 'Seri kontrol',
        description: 'Gerakan lambat: hundred modificasi, roll-down, bridge pelvis sesuai level.',
        tips: ['Presisi di atas amplitudo besar'],
      },
      {
        title: 'Selesai',
        description: 'Stretch ringan punggung dan hamstring.',
        tips: ['Kelas bersertifikat untuk reformer'],
      },
    ],
    safetyTips: ['Modifikasi untuk osteoporosis atau nyeri akut sesuai terapis'],
    commonMistakes: ['Menggunakan leher untuk flexi thoracic'],
  },
  ex22: {
    exerciseId: 'ex22',
    steps: [
      {
        title: 'Hangat',
        description: 'Langkah irama dan gerakan pinggul ke musik.',
        tips: ['Sepatu dengan pivot baik'],
      },
      {
        title: 'Kombinasi Zumba',
        description: 'Ikuti blok koreografi Latin/fitness; sesuaikan dampak (modifikasi langkah rendah).',
        tips: ['Senyum dan napas'],
      },
      {
        title: 'Cooldown',
        description: 'Tempo turun; regangan.',
        tips: ['Hidrasi'],
      },
    ],
    safetyTips: ['Lantai tidak licin', 'Berhenti jika pusing'],
    commonMistakes: ['Melompat keras tanpa progresi'],
  },
  ex23: {
    exerciseId: 'ex23',
    steps: [
      {
        title: 'Persiapan lapangan',
        description: 'Pemanasan jalan ke bola; beberapa ayunan pelan.',
        tips: ['Air dan topi jika panas'],
      },
      {
        title: 'Round',
        description: 'Berjalan membawa tas/stik; ayunan kontrol; hindari overuse bahu.',
        tips: ['Gunakan kereta dorong jika nyeri punggung'],
      },
      {
        title: 'Selesai',
        description: 'Jalan pelan; regangan punggung dan bahu.',
        tips: ['Teknik angkat tas yang benar'],
      },
    ],
    safetyTips: ['Perhatikan orang di sekitar saat swing'],
    commonMistakes: ['Ayunan hanya dari lengan tanpa rotasi ringan tubuh'],
  },
  ex24: {
    exerciseId: 'ex24',
    steps: [
      {
        title: 'Siap raket',
        description: 'Grip benar; stance ringan; latihan footwork tanpa shuttle.',
        tips: ['Sepatu non-marking indoor'],
      },
      {
        title: 'Permainan',
        description: 'Pukulan forehand/backhand dengan putaran pergelangan; kembali ke tengah.',
        tips: ['Gunakan kaki untuk mencapai shuttle'],
      },
      {
        title: 'Akhir',
        description: 'Cooldown berjalan; regangan betis dan bahu.',
        tips: ['Minum elektrolit'],
      },
    ],
    safetyTips: ['Waspada gesekan lapangan', 'Pemanasan bahu'],
    commonMistakes: ['Memukul hanya dengan lengan'],
  },
  ex25: {
    exerciseId: 'ex25',
    steps: [
      {
        title: 'Pemanasan lapangan',
        description: 'Mini jog dan shadow swing.',
        tips: ['Sepatu court'],
      },
      {
        title: 'Rally',
        description: 'Gerakan singkat ke bola; rotasi pinggul pada groundstroke; follow-through.',
        tips: ['Kembali baseline'],
      },
      {
        title: 'Cooldown',
        description: 'Ambil bola dengan jalan; regangan forearm.',
        tips: ['Henti jika nyeri siku lateral'],
      },
    ],
    safetyTips: ['Permukaan basah berisiko'],
    commonMistakes: ['Terlalu dekat tubuh pada kontak bola'],
  },
  ex26: {
    exerciseId: 'ex26',
    steps: [
      {
        title: 'Grip dan ruang',
        description: 'Raket padel pendek; pemanasan di dalam kotak servis.',
        tips: ['Tinjau aturan dinding klub'],
      },
      {
        title: 'Permainan',
        description: 'Stroke pendek dan voli; banyak gerakan lateral cepat seperti tenis.',
        tips: ['Komunikasi dengan pasangan'],
      },
      {
        title: 'Akhir',
        description: 'Jalan pelan; regangan lutut dan punggung bawah.',
        tips: ['Lensa pemula gunakan bola lebih lambat'],
      },
    ],
    safetyTips: ['Perhatikan bola pantul dari kaca/dinding'],
    commonMistakes: ['Jarak raket terlalu jauh dari tubuh di voli'],
  },
  ex27: {
    exerciseId: 'ex27',
    steps: [
      {
        title: 'Throw & catch',
        description: 'Pemanasan lempar jarak dekat; rotasi bahu pelan.',
        tips: ['Gunakan glove sesuai tangan'],
      },
      {
        title: 'Latihan lapangan',
        description: 'Ground ball, fly ringan, atau batting tee sesuai level—singkat dan teknik dulu.',
        tips: ['Panaskan shoulder sebelum overhand keras'],
      },
      {
        title: 'Cooldown',
        description: 'Regangan bahu dan punggung bawah.',
        tips: ['Istirahat rotasi lempar'],
      },
    ],
    safetyTips: ['Pitch volume tinggi butuh progresi mingguan', 'Elbow guard pemuda'],
    commonMistakes: ['Mechainisme lempar tanpa kaki'],
  },
  ex28: {
    exerciseId: 'ex28',
    steps: [
      {
        title: 'Tim warm-up',
        description: 'Lay-up lines ringan; passing dinamis.',
        tips: ['Sepatu basket'],
      },
      {
        title: 'Permainan',
        description: 'Defense stance rendah; transisi sprint pendek; tembakan dengan lutut fleksi.',
        tips: ['Tetap bergerak off-ball'],
      },
      {
        title: 'Cooldown',
        description: 'Free throw atau jalan; regangan kaki.',
        tips: ['Hidrasi bertahap'],
      },
    ],
    safetyTips: ['Landings ramai—beri jarak', 'High-top opsional untuk pergelangan'],
    commonMistakes: ['Dribel terlalu tinggi'],
  },
  ex29: {
    exerciseId: 'ex29',
    steps: [
      {
        title: 'Persiapan',
        description: 'Toss dan passing atas rendah; lincahkan pergelangan.',
        tips: ['Sepatu indoor/outdoor sesuai lapangan'],
      },
      {
        title: 'Permainan',
        description: 'Serve, bump, set spike sesuai posisi; komunikasi “mine/yours”.',
        tips: ['Posisi siap rendah di pertahanan'],
      },
      {
        title: 'Akhir',
        description: 'Jalan lapangan; regangan bahu dan lutut.',
        tips: ['Spike volume untuk pemula dibatasi'],
      },
    ],
    safetyTips: ['Antisipasi tabrakan net/rekan'],
    commonMistakes: ['Berdiri tegak menunggu bola'],
  },
  ex30: {
    exerciseId: 'ex30',
    steps: [
      {
        title: 'Pemanasan bola',
        description: 'Juggling atau passing lambat; aktivasi hamstring dinamis.',
        tips: ['Sepatu dan shin guard sesuai'],
      },
      {
        title: 'Latihan',
        description: 'Small-sided game atau dribel/cone; sprint intermittent pendek.',
        tips: ['Minuman strategi istirahat'],
      },
      {
        title: 'Cooldown',
        description: 'Jalan lapangan; regangan adduktor dan quadriceps.',
        tips: ['Es pada benturan kontrol'],
      },
    ],
    safetyTips: ['Tackle keras hanya dengan pengawasan dan teknik', 'Permukaan berlubang'],
    commonMistakes: ['Memaksakan sprint saat lelah'],
  },
  default: {
    exerciseId: 'default',
    steps: [
      {
        title: 'Pemanasan',
        description: 'Lakukan pemanasan ringan selama 5–10 menit untuk mempersiapkan tubuh.',
        tips: ['Peregangan dinamis', 'Naikkan denyut bertahap'],
      },
      {
        title: 'Latihan utama',
        description: 'Lakukan latihan dengan teknik yang benar dan intensitas sesuai level Anda.',
        tips: ['Form lebih dahulu dari volume'],
      },
      {
        title: 'Pendinginan',
        description: 'Peregangan statis pendek dan napas tenang.',
        tips: ['Minum air'],
      },
    ],
    safetyTips: ['Hentikan jika nyeri tajam', 'Gunakan peralatan yang tepat'],
    commonMistakes: ['Tanpa pemanasan', 'Tanpa pendinginan'],
  },
};

export function getTutorial(exerciseId: string): ExerciseTutorial {
  return exerciseTutorials[exerciseId] || exerciseTutorials['default'];
}
