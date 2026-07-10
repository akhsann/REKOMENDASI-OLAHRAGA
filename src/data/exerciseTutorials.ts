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
        tips: ['Sesuaikan berat dengan kemampuan'],
      },
      {
        title: 'Gerakan angkat beban',
        description:
          'Ikuti teknik  deadlift dengan ROM aman. Napas teratur; hindari menahan napas berlebihan pada beban berat.',
        tips: ['Buang napas pada fase yang sulit', 'Jaga barbel dekat garis vertikal tubuh sesuai gerakan'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan beban bertahap, lalu regangkan otot.',
        tips: ['Catat volume latihan untuk minggu berikutnya'],
      },
    ],
    safetyTips: ['Gunakan Personal Trainer untuk pemula'],
    commonMistakes: ['Menambah beban sebelum teknik stabil', 'Berat berlebihan pada pemula atau tanpa arahan'],
  },
  ex2: {
    exerciseId: 'ex2',
    steps: [
      {
        title: 'Pemilihan beban',
        description: 'Pilih dumbbell yang memungkinkan dengan berat semampunya.',
        tips: ['Mulai ringan', 'Area latihan bebas halangan'],
      },
      {
        title: 'Eksekusi',
        description: 'Jaga siku dan pergelangan netral sesuai gerakan. Kontrol naik dan turun tanpa ayunan momentum berlebihan.',
        tips: ['Buang napas pada fase mengangkat'],
      },
      {
        title: 'Pendinginan',
        description: 'Regangkan otot.',
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
        description: 'Peregangan hamstring.',
        tips: ['Hentikan jika lutut terasa sakit'],
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
        description: 'Sekitar 3–4 menit gerakan dinamis dari kepala hingga kaki untuk menaikkan denyut jantung secara bertahap. Meliputi peregangan leher, bahu, putaran lengan, twist badan, pinggul, dan gerakan squat dasar.',
        tips: ['Kunci otot perut (engage core) sejak awal gerakan', 'Lakukan gerakan memutar kepala dan sendi secara perlahan'],
      },
      {
        title: 'Interval (Latihan Inti)',
        description: 'Total waktu latihan 15 menit menggunakan metode HIIT dengan rasio 45 detik kerja keras (intensitas tinggi) bergantian dengan 15 detik istirahat aktif (active rest). Gerakan inti terdiri dari 9 variasi: Squat, Alternate Forward Lunges, Standing Oblique Crunch, Mountain Climber, Elbow Plank Open-Close, Plank Hip Drops, Sprint di tempat, Sumo Squat dengan putaran tangan, Sit-Up, dan diakhiri dengan Bicycle Crunch.',
        tips: [
          'Selama istirahat aktif (15 detik), jangan duduk atau diam, melainkan tetap jalan di tempat perlahan.',
          'Saat melakukan plank atau crunch, pastikan tidak ada rongga di punggung bawah dan otot perut selalu dikunci.',
          'Jaga dada tetap tegak (chest up) saat melakukan lunges.'
        ],
      },
      {
        title: 'Pendinginan',
        description: 'Sekitar 2–3 menit peregangan pasca-latihan yang dimulai dari posisi berbaring (memeluk lutut ke dada dan mengayun perlahan), lalu berdiri untuk peregangan bahu ke lutut (shoulders to knee), meregangkan punggung, hingga diakhiri dengan menarik napas dalam secara statis.',
        tips: ['Tarik napas panjang dari hidung dan hembuskan perlahan lewat mulut untuk menurunkan detak jantung.'],
      },
    ],
    safetyTips: [
      'Gunakan matras olahraga agar punggung tidak cedera saat gerakan berbaring (sit-up/bicycle crunch).',
      'Lakukan transisi bangun berdiri dari lantai secara perlahan agar tidak pusing.',
      'Posisikan tangan tepat di bawah bahu saat melakukan mountain climber untuk menjaga stabilitas.'
    ],
    commonMistakes: [
      'Duduk diam atau berhenti total saat waktu jeda istirahat (seharusnya melakukan jalan di tempat atau active rest).',
      'Membiarkan punggung bawah melengkung/terangkat (tidak engage core) saat gerakan plank dan sit-up.'
    ],
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
  ex7: {
    exerciseId: 'ex7',
    steps: [
      {
        title: 'Persiapan',
        description: 'Sepatu lari sesuai dan nyaman.',
        tips: ['Rencanakan rute datar terlebih dahulu'],
      },
      {
        title: 'Jogging',
        description: 'Tempo langkah ringan.',
        tips: ['Ayunan lengan rileks'],
      },
      {
        title: 'Pendinginan',
        description: 'peregangan.',
        tips: ['Hidrasi'],
      },
    ],
    safetyTips: ['Perhatikan permukaan dan ramai lalu lintas'],
    commonMistakes: ['Membungkuk saat lelah'],
  },
  ex8: {
    exerciseId: 'ex8',
    steps: [
      {
        title: 'Pengaturan sepeda',
        description: 'Sesuaikan tinggi sadel dan jarak stang.',
        tips: ['Sepatu tepat pada pedal dengan baik'],
      },
      {
        title: 'Mengayuh',
        description: 'Kayuh ritmis intensitas sedang; punggung stabil.',
        tips: ['Tekanan merata telapak kaki', 'Naikkan resistensi bertahap'],
      },
      {
        title: 'Pendinginan',
        description: 'Turunkan resistensi dan kayuh lambat 3–5 menit.',
        tips: ['Regangkan hamstring'],
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
        description: 'Helm, ban, rem, rantai.',
        tips: ['Bawa air'],
      },
      {
        title: 'Kayuhan luar ruang',
        description: 'Kecepatan konstan sedang; turunkan gigi saat tanjak. Pandangan fokus.',
        tips: ['Kecepatan stabil', 'Isyarat tangan saat belok'],
      },
      {
        title: 'Pendinginan',
        description: 'Flat ringan 5 menit terakhir lalu regangan leher, bahu, paha.',
        tips: ['Patuhi rambu'],
      },
    ],
    safetyTips: ['Wajib gunakan helm di jalan umum'],
    commonMistakes: ['Gigi berat terus-menerus menyebabkan nyeri lutut'],
  },
  ex10: {
    exerciseId: 'ex10',
    steps: [
      {
        title: 'Masuk Kolam Renang',
        description: 'Pemanasan tepi kolam; sesuaikan suhu; kenakan kacamata renang.',
        tips: ['Area diawasi lifeguard bila ada'],
      },
      {
        title: 'Gaya bebas',
        description: 'Badan sejajar; lengan bergantian; flutter kick dari pangkal paha; nafas ke samping.',
        tips: ['Kepala netral saat tidak bernapas'],
      },
      {
        title: 'Keluar & pendinginan',
        description: 'Renang sangat ringan akhir sesi; regangkan dada dan bahu.',
        tips: ['Bilas dan keringkan telinga'],
      },
    ],
    safetyTips: ['Berhenti jika kram atau sesak', 'Ketahui kedalaman kolam'],
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
