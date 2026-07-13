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
        title: 'Persiapan & Atur Postur',
        description: 'Lakukan pemanasan sendi, lalu coba angkat stik barbel kosong atau beban yang sangat ringan dulu. Berdirilah dengan kaki selebar bahu, posisi punggung lurus alami (tidak membungkuk), dan kencangkan otot perut (core).',
        tips: ['Sesuaikan total berat beban dengan kemampuan aslimu, jangan gengsi!'],
      },
      {
        title: 'Gerakan Mengangkat (Deadlift)',
        description: 'Lakukan gerakan deadlift dengan jarak turun-naik beban yang aman (sesuai kelenturanmu). Atur napas dengan teratur dan jangan pernah menahan napas saat mengangkat beban.',
        tips: [
          'Buang napas lewat mulut saat kamu berjuang mendorong badan ke atas untuk berdiri tegak',
          'Jaga posisi stik barbel agar selalu menempel dekat dengan kaki sepanjang gerakan'
        ],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Turunkan berat beban secara bertahap pada set terakhir (drop set santai), lalu lakukan peregangan otot punggung dan paha.',
        tips: ['Data pencapaian hari ini di Aplikasi buat modal naik level di sesi latihan berikutnya'],
      },
    ],
    safetyTips: [
      'Sangat disarankan memakai jasa pelatih (Personal Trainer) kalau kamu baru pertama kali belajar deadlift biar nggak cedera saraf kejepit'
    ],
    commonMistakes: [
      'Nafsu menambah berat beban padahal posisi punggung saat mengangkat masih melengkung atau belum stabil',
      'Mencoba mengangkat beban ekstrem (ego lifting) tanpa pengawasan atau panduan dari yang ahli'
    ],
  },
  ex2: {
    exerciseId: 'ex2',
    steps: [
      {
        title: 'Pilih Beban yang Pas',
        description: 'Pilih sepasang dumbbell dengan berat yang sesuai dengan kemampuanmu (jangan langsung pakai yang terlalu berat).',
        tips: [
          'Lebih baik mulai dari beban yang ringan dulu untuk pemanasan',
          'Pastikan area sekitarmu kosong dan bebas dari barang yang bisa bikin tersandung'
        ],
      },
      {
        title: 'Mulai Latihan (Eksekusi)',
        description: 'Jaga posisi siku tetap stabil dan pergelangan tangan lurus searah gerakan. Kontrol gerakan dumbbell saat naik maupun turun, jangan asal diayunkan menggunakan momentum.',
        tips: ['Buang napas lewat mulut saat kamu mengangkat beban ke atas'],
      },
      {
        title: 'Pendinginan',
        description: 'Taruh dumbbell kembali, lalu lakukan peregangan pada otot-otot yang baru saja dilatih agar tidak kaku.',
        tips: [
          'Minum air putih secukupnya',
          'Beri jeda istirahat (rest) selama 1–2 menit di antara setiap set'
        ],
      },
    ],
    safetyTips: [
      'Jangan meluruskan lengan sampai sendi sikut terkunci total saat melakukan gerakan mendorong (press) supaya sendi nggak cedera',
      'Taruh kembali dumbbell ke rak beban dengan hati-hati setelah selesai digunakan'
    ],
    commonMistakes: [
      'Membungkukkan punggung saat mengambil dumbbell dari lantai',
      'Sengaja mengayunkan pinggul ke depan demi memaksakan beban naik saat latihan lengan'
    ],
  },
  ex3: {
    exerciseId: 'ex3',
    steps: [
      {
        title: 'Pemanasan Pinggul & Lutut',
        description: 'Lakukan peregangan aktif yang ringan: langkah menekuk (lunges) kecil, squat tanpa beban, dan putar lutut perlahan.',
        tips: ['Buka kaki selebar bahu atau sedikit lebih lebar agar posisi berdiri terasa kokoh'],
      },
      {
        title: 'Gerakan Squat',
        description: 'Dorong pinggul ke belakang dan turunkan badan seperti mau duduk, pastikan arah lutut searah dengan jari kaki. Turun sejauh yang kamu nyaman tanpa membuat punggung melengkung, lalu dorong badan ke atas dengan tumpuan pada telapak kaki.',
        tips: ['Jaga dada tetap tegak dan busung, jangan menunduk', 'Jaga lutut agar tidak menekuk atau lemas ke arah dalam'],
      },
      {
        title: 'Pendinginan',
        description: 'Lakukan peregangan pada otot paha belakang (hamstring) secara perlahan.',
        tips: ['Segera hentikan gerakan jika lututmu terasa sakit atau nyeri tajam'],
      },
    ],
    safetyTips: [
      'Jangan dipaksakan jongkok terlalu dalam (depth) kalau ototmu belum lentur, sesuaikan dengan kenyamanan sendi',
      'Jaga lutut tetap stabil menghadap luar dan jangan biarkan menekuk lemas ke dalam saat naik (valgus)'
    ],
    commonMistakes: [
      'Tumit kaki terangkat dari lantai saat jongkok (bikin tidak seimbang)',
      'Langsung menekuk lutut ke depan tanpa mendorong pinggul ke belakang dulu (bikin lutut cepat sakit karena menahan beban sendirian)'
    ],
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
        title: 'Persiapan & Postur',
        description: 'Pakai sepatu yang paling nyaman di kakimu. Mulai langkahmu dengan ritme pelan dulu sambil menjaga posisi badan tetap tegap.',
        tips: ['Pilih jalur berjalan yang aman, bersih, dan punya penerangan yang cukup'],
      },
      {
        title: 'Mulai Jalan Santai',
        description: 'Melangkah secara alami dengan kecepatan santai (tidak perlu terburu-buru), lalu ayunkan kedua lenganmu dengan rileks di samping badan.',
        tips: ['Atur napas biar tetap santai', 'Jaga pandangan fokus ke depan'],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Di menit-menit terakhir, perlambat langkah kakimu secara bertahap, lalu lakukan peregangan ringan pada otot betis dan paha.',
        tips: ['Segera minum air putih secukupnya setelah selesai jalan kaki'],
      },
    ],
    safetyTips: [
      'Tetap waspada dengan kendaraan sekitar dan perhatikan jalanan yang berlubang atau tidak rata biar nggak tersandung'
    ],
    commonMistakes: [
      'Jalan sambil membungkuk karena keasyikan lihat layar HP terus-menerus (bikin leher pegal dan rawan menabrak sesuatu!)'
    ],
  },
  ex6: {
    exerciseId: 'ex6',
    steps: [
      {
        title: 'Persiapan & Rute',
        description: 'Pakai sepatu lari yang paling nyaman dan pas di kaki, lalu lakukan peregangan kaki tipis-tipis sebelum mulai.',
        tips: ['Untuk pemula, pilih rute jalanan yang datar dulu, hindari tanjakan ekstrem'],
      },
      {
        title: 'Mulai Jogging!',
        description: 'Lari dengan langkah kaki yang santai dan ritme yang stabil. Nggak usah buru-buru, yang penting napasmu tetap terjaga.',
        tips: ['Jaga ayunan lengan tetap rileks di samping badan untuk menghemat tenaga'],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Jangan langsung berhenti total! Turunkan tempo menjadi jalan kaki santai selama beberapa menit, lalu lakukan peregangan otot kaki.',
        tips: ['Segera minum air putih (hidrasi) setelah selesai biar nggak dehidrasi'],
      },
    ],
    safetyTips: [
      'Selalu perhatikan kondisi jalanan biar nggak tersandung, dan tetap waspada kalau joging di pinggir jalan raya yang ramai lalu lintas'
    ],
    commonMistakes: [
      'Badan mulai membungkuk ke depan saat lelah (tetap usahakan dada tegak dan pandangan lurus ke depan supaya paru-paru bebas menghirup oksigen)'
    ],
  },
  ex7: {
    exerciseId: 'ex7',
    steps: [
      {
        title: 'Atur Posisi Sepeda',
        description: 'Sesuaikan tinggi sadel (jok) setinggi pinggulmu saat berdiri, lalu atur jarak setang agar posisi dudukmu nyaman.',
        tips: ['Pastikan posisi telapak kaki menapak dengan pas dan mantap di pedal'],
      },
      {
        title: 'Mulai Mengayuh',
        description: 'Kayuh sepeda dengan irama yang stabil pada intensitas sedang, dan usahakan posisi punggung tetap lurus (jangan meliuk-liuk).',
        tips: [
          'Gunakan seluruh telapak kaki untuk menekan pedal secara merata',
          'Naikkan tingkat berat beban (resistensi) secara bertahap sesuai kemampuanmu'
        ],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Turunkan berat beban (resistensi) ke tingkat paling ringan, lalu kayuh pelan-pelan selama 3–5 menit.',
        tips: ['Setelah turun dari sepeda, lakukan peregangan pada otot paha belakang (hamstring)'],
      },
    ],
    safetyTips: [
      'Pastikan tuas pengunci sadel dan pedal sudah terpasang kencang sebelum kamu naik',
      'Siapkan botol minum di dekatmu dan minumlah di sela-sela latihan (hidrasi)'
    ],
    commonMistakes: [
      'Memasang posisi sadel terlalu rendah (bikin kaki menekuk berlebihan dan membebani lutut)',
      'Terlalu heboh bertumpu atau bersandar pada stang sepeda (bikin otot perut/core jadi nggak bekerja)'
    ],
  },
  ex8: {
    exerciseId: 'ex8',
    steps: [
      {
        title: 'Cek Sepeda (M-Check)',
        description: 'Lakukan pengecekan menyeluruh dari depan ke belakang: pastikan helm siap, ban tidak kempes, rem pakem, dan rantai tidak seret atau lepas.',
        tips: ['Selalu bawa botol minum di holder sepeda'],
      },
      {
        title: 'Waktunya Gowes!',
        description: 'Mulai gowes dengan kecepatan santai yang stabil. Ingat untuk memindahkan operan ke gigi yang lebih ringan saat jalanan menanjak, dan tetap fokus lihat jalan di depan.',
        tips: ['Jaga kecepatan tetap stabil agar tidak cepat lelah', 'Gunakan isyarat tangan saat ingin belok atau berhenti sebagai tanda untuk kendaraan lain'],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Di 5 menit terakhir sebelum sampai, gowes santai di jalanan yang rata (flat) tanpa beban berat, lalu lakukan peregangan otot leher, bahu, dan paha.',
        tips: ['Selalu patuhi rambu-rambu lalu lintas di jalan ya!'],
      },
    ],
    safetyTips: [
      'Wajib hukumnya pakai helm demi keselamatan, terutama saat bersepeda di jalan raya yang ramai'
    ],
    commonMistakes: [
      'Memaksakan pakai gigi berat terus-menerus (bikin gowesan terasa keras, otot paha cepat pegal, dan bisa memicu nyeri lutut)'
    ],
  },
  ex9: {
    exerciseId: 'ex9',
    steps: [
      {
        title: 'Masuk ke Kolam Renang',
        description: 'Lakukan peregangan ringan di tepi kolam, basahi tubuh biar nggak kaget dengan suhu air, lalu pakai kacamata renangmu.',
        tips: ['Pilih kolam yang ada pengawasnya (lifeguard) demi keamanan'],
      },
      {
        title: 'Latihan Gaya Bebas',
        description: 'Posisikan badan sejajar dan mendatar di permukaan air, kayuh lengan bergantian, lakukan tendangan lurus dari pangkal paha (bukan lutut), dan tengokkan kepala ke samping saat mengambil napas.',
        tips: ['Saat sedang tidak mengambil napas, wajah harus menghadap lurus ke bawah kolam (rileks)'],
      },
      {
        title: 'Pendinginan & Keluar',
        description: 'Tutup sesi dengan berenang santai dan sangat pelan, lalu lakukan peregangan pada otot dada serta bahu.',
        tips: ['Bilas tubuh dengan air bersih dan pastikan keringkan bagian telinga agar tidak kemasukan air'],
      },
    ],
    safetyTips: [
      'Segera menepi dan naik jika kaki mulai kram atau napas terasa sesak',
      'Cek dulu kedalaman kolam sebelum melompat, pastikan sesuai dengan tinggi badanmu'
    ],
    commonMistakes: [
      'Menendang air dengan lutut ditekuk seperti sedang mengayuh sepeda (bikin badan berat dan nggak maju-maju)',
      'Mengangkat kepala terlalu tinggi ke depan saat ambil napas (bikin pantat dan kaki otomatis tenggelam)'
    ],
  },
  ex10: {
    exerciseId: 'ex10',
    steps: [
      {
        title: 'Persiapan & Fokus',
        description: 'Gelar matras di lantai yang rata, atur napas dengan tenang lewat hidung, dan lakukan peregangan ringan agar tubuh terasa hangat.',
        tips: ['Jauhkan HP dan matikan hal-hal yang bisa memecah konsentrasi (distraksi)'],
      },
      {
        title: 'Praktik Gerakan (Pose)',
        description: 'Ikuti rangkaian gerakan yoga sesuai arahan instruktur atau pilihanmu sendiri. Nikmati tarikan ototnya, tapi jangan dipaksa kalau terasa nyeri tajam.',
        tips: ['Usahakan posisi punggung/tulang belakang tetap lurus memanjang', 'Gunakan balok yoga (block) sebagai bantuan jika tubuhmu belum sampai menyentuh lantai'],
      },
      {
        title: 'Relaksasi Akhir (Savasana)',
        description: 'Tidur terlentang dengan rileks selama 3–5 menit untuk menutup sesi latihan dan menenangkan pikiran.',
        tips: ['Saat selesai, bangun dan balikkan badan secara perlahan, jangan langsung melompat berdiri'],
      },
    ],
    safetyTips: [
      'Jika punya riwayat tekanan darah tinggi, hindari gerakan melipat tubuh ke bawah yang ekstrem atau posisi kepala di bawah (inversi) tanpa pengawasan ahli'
    ],
    commonMistakes: [
      'Sering menahan napas saat menahan pose (ingat, napas harus tetap mengalir!)',
      'Memaksakan diri melipat tubuh terlalu dalam padahal otot masih kaku (bisa bikin otot pinggang ketarik)'
    ],
  },
  ex11: {
    exerciseId: 'ex11',
    steps: [
      {
        title: 'Posisi Awal di Mesin',
        description: 'Naik ke mesin dengan hati-hati, pegang pegangan tangan (handrail) dengan santai, lalu mulai kayuh dengan kecepatan paling rendah dulu.',
        tips: ['Jaga postur tubuh tetap tegak dan tegap, jangan membungkuk'],
      },
      {
        title: 'Mulai Melangkah (Stepping)',
        description: 'Tekan pijakan ke bawah menggunakan seluruh telapak kaki (fokuskan tenaga lewat tumit), dan jangan tumpukan berat badanmu ke tangan.',
        tips: ['Sesuaikan tingkat kecepatan mesin dengan target latihan kardio kamu'],
      },
      {
        title: 'Selesai & Turun',
        description: 'Perlambat gerakan kaki sampai mesin benar-benar berhenti total sebelum kamu turun, lalu lakukan peregangan pada otot betis.',
        tips: ['Budayakan bersihkan dan lap bekas keringat di pegangan mesin setelah dipakai, ya!'],
      },
    ],
    safetyTips: [
      'Jangan sekali-kali mencoba naik atau melompat turun dari mesin selagi pijakannya masih bergerak aktif'
    ],
    commonMistakes: [
      'Terlalu heboh bertumpu pada pegangan tangan (bikin berat badan pindah ke lengan, jadi latihan kakinya kurang maksimal dan kalori yang terbakar lebih sedikit)'
    ],
  },
  ex12: {
    exerciseId: 'ex12',
    steps: [
      {
        title: 'Pemanasan Irama',
        description: 'Jalan di tempat (marching) atau melangkah ringan mengikuti ketukan musik yang temponya santai biar tubuh mulai panas.',
        tips: ['Pastikan ruang gerakmu cukup luas agar tangan dan kaki nggak mentok benda sekitar'],
      },
      {
        title: 'Kombinasi Gerakan',
        description: 'Lakukan variasi langkah menyamping (step touch), sentuhan ujung kaki, diselingi gerakan lengan. Jika ingin yang ramah sendi, hindari gerakan melompat.',
        tips: ['Biar lebih aman untuk lutut (low impact), pastikan salah satu kakimu selalu menapak di lantai saat bergerak'],
      },
      {
        title: 'Pendinginan',
        description: 'Pilih lagu dengan tempo yang lebih lambat, turunkan intensitas gerakan, lalu lakukan peregangan badan sambil berdiri.',
        tips: ['Segera minum air putih untuk mengembalikan cairan tubuh setelah berkeringat'],
      },
    ],
    safetyTips: [
      'Wajib pakai sepatu olahraga yang solnya kesat dan mencengkeram lantai dengan baik biar nggak slip'
    ],
    commonMistakes: [
      'Membungkukkan badan saat mulai lelah (tetap jaga dada tegak dan perut kencang agar punggung nggak sakit)'
    ],
  },
  ex13: {
    exerciseId: 'ex13',
    steps: [
      {
        title: 'Posisi Siap (Catch)',
        description: 'Duduk tegak di bantalan, kencangkan tali pengikat kaki, luruskan lengan ke depan memegang handle, dan tekuk lututmu ke arah dada.',
        tips: ['Atur tuas beban kipas (damper) di angka sedang (level 3-5) dulu kalau kamu masih pemula'],
      },
      {
        title: 'Dorong & Tarik (Drive)',
        description: 'Dorong badan ke belakang pakai kekuatan kaki dulu, condongkan badan sedikit ke belakang, lalu tarik handle ke arah dada bagian bawah dengan punggung tetap lurus.',
        tips: ['Ingat urutan kekuatannya: dorong pakai Kaki -> mainkan Punggung -> baru tarik pakai Lengan'],
      },
      {
        title: 'Kembali ke Awal (Recovery)',
        description: 'Luruskan lengan kembali ke depan, biarkan badan ikut condong maju, lalu tekuk lutut secara perlahan untuk kembali ke posisi siap.',
        tips: ['Atur napas: buang napas saat mendorong/menarik, dan ambil napas saat kembali maju'],
      },
    ],
    safetyTips: [
      'Jangan melentingkan atau merebahkan punggung terlalu jauh ke belakang (hyperextend) di akhir tarikan karena bisa bikin pinggang cedera'
    ],
    commonMistakes: [
      'Asal menarik stik pakai tenaga lengan duluan sebelum kaki mendorong (bikin gerakan jadi macet dan lengan cepat pegal)'
    ],
  },
  ex14: {
    exerciseId: 'ex14',
    steps: [
      {
        title: 'Posisi Awal & Mulai',
        description: 'Posisikan telapak kaki pas di tengah pedal, genggam pegangannya (handle), lalu kayuh perlahan.',
        tips: ['Jaga postur badan tetap tegak, jangan membungkuk'],
      },
      {
        title: 'Mulai Mengayuh (Elips)',
        description: 'Gerakkan tangan dan kaki secara bersamaan. Pijak pedal secara merata dengan seluruh telapak kaki, dan sesekali coba kayuh ke arah belakang untuk variasi otot.',
        tips: ['Jaga jarak tubuh, jangan mencondongkan badan'],
      },
      {
        title: 'Selesai & Turun',
        description: 'Turunkan tingkat berat beban (resistensi) ke angka paling rendah, perlambat kayuhan, dan tunggu sampai mesin benar-benar berhenti sebelum turun.',
        tips: ['Setelah turun, lakukan peregangan pada otot pinggul dan paha'],
      },
    ],
    safetyTips: [
      'Jangan sekali-kali nekat melompat turun saat pedal mesin masih berputar cepat! Tunggu sampai berhenti total'
    ],
    commonMistakes: [
      'Terlalu bertumpu dan bergelantungan pada pegangan tangan (bikin otot perut dan kaki jadi kurang bekerja, tangan juga jadi cepat pegal)'
    ],
  },
  ex15: {
    exerciseId: 'ex15',
    steps: [
      {
        title: 'Pakai Pengaman & Cari Keseimbangan',
        description: 'Wajib pakai helm serta pelindung lutut dan siku. Biar nggak langsung kepeleset, latihan berdiri dan jaga keseimbangan di atas rumput atau karpet dulu.',
        tips: ['Tekuk lutut sedikit dan turunkan badan agak merendah biar posisi tubuhmu stabil'],
      },
      {
        title: 'Mulai Meluncur',
        description: 'Dorong kakimu ke arah belakang-samping secara bergantian, jaga pandangan tetap lurus ke depan, dan ayunkan lengan dengan santai.',
        tips: ['Sebelum meluncur cepat, pastikan kamu sudah belajar cara mengerem paling dasar'],
      },
      {
        title: 'Cara Mengerem & Selesai',
        description: 'Gunakan rem tumit bawaan sepatu roda atau seret kaki belakang membentuk huruf T (T-stop) untuk berhenti, lalu regangkan pergelangan kaki.',
        tips: ['Latihan trik jatuh yang aman: condongkan badan ke depan dan gunakan pelindung telapak tanganmu untuk menahan'],
      },
    ],
    safetyTips: [
      'Cari tempat latihan yang datar, mulus, dan sepi dari kendaraan atau pejalan kaki',
      'Jangan coba-coba main di turunan tajam dulu kalau kamu belum mahir'
    ],
    commonMistakes: [
      'Berdiri dengan lutut tegak lurus dan kaku (bikin badan jadi oleng dan gampang jatuh terjungkal ke belakang)'
    ],
  },
  ex16: {
    exerciseId: 'ex16',
    steps: [
      {
        title: 'Atur Panjang Tali',
        description: 'Injak tengah tali, lalu tarik ke atas. Pastikan ujung gagang tali sejajar dengan ketiakmu. Jangan lupa putar-putar pergelangan tangan dulu buat pemanasan.',
        tips: ['Pakai sepatu lari yang empuk agar pijakan kaki lebih nyaman'],
      },
      {
        title: 'Mulai Melompat',
        description: 'Gerakkan tali dengan putaran pergelangan tangan, bukan bahu. Lompat tipis saja (2-3 cm dari lantai) dan mendaratlah menggunakan ujung depan kaki (bukan tumit).',
        tips: ['Jaga posisi siku tetap dekat dengan badan agar putaran tali stabil'],
      },
      {
        title: 'Pendinginan',
        description: 'Lakukan peregangan pada otot betis dan tendon di belakang pergelangan kaki (achilles) agar tidak kaku.',
        tips: ['Pilih permukaan lantai yang datar dan tidak keras, hindari beton yang terlalu kasar'],
      },
    ],
    safetyTips: [
      'Segera berhenti kalau kamu merasa ada nyeri tajam di lutut',
      'Lompat di atas matras yoga atau lantai kayu jauh lebih aman buat kesehatan sendi dibanding lantai semen keras'
    ],
    commonMistakes: [
      'Memutar lengan terlalu lebar (bikin cepat capek) dan melompat terlalu tinggi (bikin lutut cepat sakit)'
    ],
  },
  ex17: {
    exerciseId: 'ex17',
    steps: [
      {
        title: 'Fokus & Penyelarasan Tubuh',
        description: 'Latih napas dalam-dalam lewat rusuk (napas dada), posisikan punggung dalam keadaan lurus alami (netral), atau ratakan punggung bawah ke lantai (imprint) jika disarankan instruktur.',
        tips: ['Kencangkan otot perut (core) secara rileks, jangan ditahan sampai badan kaku'],
      },
      {
        title: 'Latihan Kontrol Otot',
        description: 'Lakukan gerakan lambat dan fokus, seperti modifikasi gerakan The Hundred (pompa tangan), roll-down, atau angkat pinggul (pelvic bridge) sesuai kemampuanmu.',
        tips: ['Utamakan gerakan yang benar dan rapi daripada memaksakan gerakan yang terlalu lebar/tinggi'],
      },
      {
        title: 'Selesai & Peregangan',
        description: 'Lakukan peregangan ringan pada otot punggung dan paha bagian belakang (hamstring) agar tubuh terasa ringan.',
        tips: ['Kalau mau coba pakai alat khusus (reformer), pastikan kamu didampingi instruktur yang berlisensi ya!'],
      },
    ],
    safetyTips: [
      'Jika punya riwayat nyeri sendi akut atau masalah tulang, selalu minta gerakan modifikasi yang aman ke instruktur atau terapismu'
    ],
    commonMistakes: [
      'Mendorong badan ke atas pakai otot leher saat mengangkat dada (flexi thoracic)—harusnya kekuatan bertumpu pada otot perut, bukan leher yang dipaksa ketarik'
    ],
  },
  ex18: {
    exerciseId: 'ex18',
    steps: [
      {
        title: 'Pemanasan (Warm-up)',
        description: 'Mulai gerakkan kaki mengikuti irama musik dan goyang pinggul tipis-tipis biar tubuh siap buat dance.',
        tips: ['Pakai sepatu olahraga yang bagian sol bawahnya gampang dipakai berputar (pivot) agar kaki tidak seret'],
      },
      {
        title: 'Serunya Zumba!',
        description: 'Ikuti gerakan koreografi dance Latin dan fitness dari instruktur. Kalau gerakannya terlalu intens atau capek, ganti dengan langkah yang lebih santai dan rendah loncatannya.',
        tips: ['Jangan lupa senyum, nikmati musiknya, dan atur napas ya!'],
      },
      {
        title: 'Pendinginan (Cooldown)',
        description: 'Turunkan tempo gerakan perlahan-lahan mengikuti musik yang lebih santai, lalu lakukan peregangan badan.',
        tips: ['Segera minum air putih buat mengganti keringat yang keluar banyak'],
      },
    ],
    safetyTips: [
      'Pastikan lantai tempatmu joget nggak licin biar nggak gampang terpeleset',
      'Jangan dipaksakan! Langsung istirahat atau duduk kalau kepala mulai terasa pusing'
    ],
    commonMistakes: [
      'Langsung heboh melompat-lompat tinggi di awal lagu tanpa pemanasan atau tanpa melihat contoh gerakan bertahap dari instruktur (bikin lutut sakit)'
    ],
  },
  ex19: {
    exerciseId: 'ex19',
    steps: [
      {
        title: 'Pemanasan Awal',
        description: 'Jalan santai menuju posisi bola sambil sesekali melakukan ayunan stik golf (swing) pelan-pelan tanpa bola biar badan nggak kaku.',
        tips: ['Bawa air minum dan pakai topi kalau cuaca lapangan lagi panas terik'],
      },
      {
        title: 'Mulai Main (Round)',
        description: 'Jalan kaki menyusuri lapangan sambil membawa tas stik, fokus pada ayunan stik yang terkontrol, dan jangan paksa bahu bergerak berlebihan.',
        tips: ['Pakai kereta dorong tas golf (trolley) saja kalau punggung kamu mulai terasa pegal'],
      },
      {
        title: 'Selesai Main',
        description: 'Jalan santai untuk menenangkan otot, lalu regangkan otot punggung dan bahu biar besok nggak encok.',
        tips: ['Perhatikan posisi tubuh saat mengangkat tas golf, gunakan kekuatan kaki bukan punggung biar nggak cedera'],
      },
    ],
    safetyTips: [
      'Selalu tengok kanan-kiri dan pastikan jarak aman dengan orang di sekitarmu sebelum mengayun stik golf!'
    ],
    commonMistakes: [
      'Mengayun stik golf cuma pakai tenaga lengan tanpa ikut memutar badan (bikin pukulan nggak jauh dan tangan cepat cedera)'
    ],
  },
  ex20: {
    exerciseId: 'ex20',
    steps: [
      {
        title: 'Siap Raket',
        description: 'Pegang raket dengan benar, pasang posisi badan yang rileks dan siap, lalu latihan gerakan langkah kaki tanpa kok.',
        tips: ['Wajib pakai sepatu badminton supaya lantai lapangan indoor tidak rusak atau lecet'],
      },
      {
        title: 'Waktunya Main!',
        description: 'Gunakan pukulan forehand atau backhand dengan sentakan pergelangan tangan. Setelah memukul, langsung cepat balik ke posisi tengah lapangan.',
        tips: ['Kejar kok dengan langkah kaki yang lebar, jangan cuma menjulurkan tangan'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan santai keliling lapangan, lalu regangkan otot betis dan bahu agar tidak pegal-pegal.',
        tips: ['Minum air yang mengandung elektrolit atau air putih untuk mengembalikan cairan tubuh'],
      },
    ],
    safetyTips: [
      'Hati-hati kaki tersangkut atau slip di lapangan',
      'Pemanasan bahu harus maksimal supaya sendi lengan tidak kaget saat dipakai smash keras'
    ],
    commonMistakes: [
      'Memukul kok cuma pakai tenaga lengan membuat pukulan lemah dan lengan cepat lelah, seharusnya dibantu sentakan pergelangan tangan'
    ],
  },
  ex21: {
    exerciseId: 'ex21',
    steps: [
      {
        title: 'Pemanasan Lapangan',
        description: 'Lari-lari kecil keliling lapangan dan lakukan ayunan raket tanpa bola (shadow swing) biar otot lengan luwes.',
        tips: ['Gunakan sepatu khusus lapangan tenis (court shoes) supaya kaki mencengkeram dengan baik'],
      },
      {
        title: 'Rally & Pukulan',
        description: 'Kejar bola dengan langkah cepat, putar pinggul saat memukul bola pantul (groundstroke), dan selesaikan ayunan raket sampai ke atas bahu (follow-through).',
        tips: ['Setelah memukul, langsung cepat-cepat balik ke garis belakang (baseline) lapangan'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan santai sambil memungut bola di lapangan, lalu regangkan otot lengan bawah (pergelangan tangan).',
        tips: ['Segera istirahat jika siku bagian luar terasa nyeri (gejala tennis elbow)'],
      },
    ],
    safetyTips: [
      'Jangan main kalau lapangan basah atau licin karena rawan terpeleset dan cedera'
    ],
    commonMistakes: [
      'Memukul bola dalam posisi bola terlalu dekat dengan badan (bikin ayunan raket macet dan pukulan nggak bertenaga)'
    ],
  },
  ex22: {
    exerciseId: 'ex22',
    steps: [
      {
        title: 'Cek Grip & Pemanasan',
        description: 'Pegang raket padel dengan nyaman (posisi tangan agak pendek di gagang), lalu lakukan pemanasan operan santai di dalam kotak servis.',
        tips: ['Pahami dulu aturan pantulan bola di dinding lapangan tempat kamu main'],
      },
      {
        title: 'Waktunya Tanding!',
        description: 'Lakukan pukulan pendek dan langsung sambar bola di depan net. Siap-siap banyak gerak geser ke kanan-kiri dengan cepat mirip main tenis.',
        tips: ['Selalu ngobrol dan kompak dengan pasangan mainmu biar nggak berebutan bola'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan santai di lapangan, lalu regangkan otot lutut dan punggung bagian bawah supaya nggak kaku.',
        tips: ['Untuk pemula, gunakan bola padel yang lebih lambat dulu supaya lebih mudah mengontrol permainan'],
      },
    ],
    safetyTips: [
      'Selalu waspada dan perhatikan arah bola setelah memantul dari kaca atau dinding biar nggak kaget atau kena muka'
    ],
    commonMistakes: [
      'Posisi raket terlalu jauh dari badan saat melakukan pukulan di depan net (bikin pukulan jadi lemah dan susah dikontrol)'
    ],
  },
  ex23: {
    exerciseId: 'ex23',
    steps: [
      {
        title: 'Pemanasan Tim',
        description: 'Latihan lay-up santai bergantian (lay-up lines) dan oper-operan bola sambil bergerak maju.',
        tips: ['Wajib pakai sepatu basket yang kesat biar nggak gampang terpeleset'],
      },
      {
        title: 'Game On!',
        description: 'Pasang posisi bertahan yang rendah (defense stance), siap lari cepat saat transisi serang/tahan, dan tekuk lutut sedikit saat menembak (shooting) biar lebih akurat.',
        tips: ['Jangan diam saja! Tetap bergerak cari ruang kosong walau lagi nggak pegang bola (off-ball)'],
      },
      {
        title: 'Pendinginan',
        description: 'Latihan tembakan bebas (free throw) santai atau jalan keliling lapangan, lalu regangkan otot-otot kaki.',
        tips: ['Minum air putih sedikit demi sedikit, jangan langsung ditenggak banyak saat haus'],
      },
    ],
    safetyTips: [
      'Hati-hati saat mendarat setelah melompat! Beri jarak dengan pemain lain biar kaki nggak saling injak',
      'Disarankan pakai sepatu basket model high-top (krah tinggi) untuk melindungi pergelangan kaki (engkel)'
    ],
    commonMistakes: [
      'Menggiring bola (dribel) terlalu tinggi se dada—bola jadi gampang direbut lawan dan susah dikontrol'
    ],
  },
  ex24: {
    exerciseId: 'ex24',
    steps: [
      {
        title: 'Pemanasan Awal',
        description: 'Lakukan lempar tangkap dan operan (passing) atas pendek-pendek, lalu putar-putar pergelangan tangan dan kaki agar lebih lentur.',
        tips: ['Gunakan sepatu khusus voli yang sesuai dengan jenis lapangan (indoor/outdoor)'],
      },
      {
        title: 'Waktunya Main!',
        description: 'Latihan servis, passing bawah (bump), operan atas (set), dan smes (spike) sesuai posisi. Jangan lupa Selalu teriak "Aku!" atau "Kamu!" biar nggak tabrakan.',
        tips: ['Selalu pasang posisi siap (agak membungkuk rendah) saat menjaga area pertahanan'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan santai keliling lapangan, lalu regangkan otot bahu dan lutut secara perlahan agar besok tidak pegal.',
        tips: ['Untuk pemula, jangan terlalu banyak melakukan smes keras dulu supaya lengan tidak cedera'],
      },
    ],
    safetyTips: [
      'Selalu fokus dan liat posisi teman atau net biar nggak saling tabrakan'
    ],
    commonMistakes: [
      'Berdiri tegak atau bengong saat menunggu bola datang (bikin bola gampang lolos)'
    ],
  },
  ex25: {
    exerciseId: 'ex25',
    steps: [
      {
        title: 'Pemanasan',
        description: 'Mulai dengan juggling (timang bola) atau operan santai bareng teman, lalu lakukan peregangan kaki sambil bergerak supaya otot siap.',
        tips: ['Selalu pakai sepatu bola dan pelindung tulang kering (shin guard)'],
      },
      {
        title: 'Latihan',
        description: 'Main game lapangan kecil (game 3v3 / 5v5) atau latihan giring bola lewati kerucut (cone), diselingi lari cepat jarak pendek.',
        tips: ['Jangan lupa minum air putih di sela-sela istirahat'],
      },
      {
        title: 'Pendinginan',
        description: 'Jalan santai keliling lapangan, lalu regangkan otot paha bagian dalam dan depan agar kaki tidak kaku.',
        tips: ['Kalau ada bagian tubuh yang membentur, segera kompres pakai es'],
      },
    ],
    safetyTips: [
      'Jangan asal tekel keras! Lakukan hanya jika sudah diajari pelatih',
      'Perhatikan kondisi lapangan, hindari area yang berlubang agar tidak terkilir'
    ],
    commonMistakes: ['Memaksakan lari kencang padahal tubuh sudah sangat lelah (bisa bikin cedera)'],
  },
  ex26: {
    exerciseId: 'ex26',
    steps: [
      {
        title: 'Persiapan & pemanasan',
        description: 'Panaskan pergelangan tangan, bahu, dan siku dengan rotasi ringan. Pegang bet dengan grip yang nyaman (shakehand atau penhold) dan lakukan rally pelan bersama lawan atau ke dinding untuk membiasakan ritme bola.',
        tips: ['Posisi siap: kaki selebar bahu, lutut sedikit fleksi', 'Jaga siku tidak terlalu rapat ke tubuh'],
      },
      {
        title: 'Permainan',
        description: 'Fokus pada kontrol bola menggunakan forehand dan backhand dengan ayunan dari siku, bukan bahu. Gunakan kaki untuk berpindah posisi, bukan hanya meraih dengan tangan. Variasikan topspin, backspin, dan flat drive sesuai kemampuan.',
        tips: ['Kembalikan ke posisi siap tengah meja setelah setiap pukulan', 'Pandangan fokus pada bola sejak meninggalkan bet lawan'],
      },
      {
        title: 'Pendinginan',
        description: 'Akhiri sesi dengan rally lambat lalu regangkan pergelangan tangan, lengan bawah, bahu, dan betis.',
        tips: ['Regangkan jari dan telapak tangan untuk mencegah kram', 'Hidrasi dan istirahat antar set'],
      },
    ],
    safetyTips: [
      'Pastikan lantai sekitar meja tidak licin dan bebas hambatan',
      'Hentikan jika terasa nyeri di pergelangan tangan atau siku',
    ],
    commonMistakes: [
      'Memukul hanya menggunakan bahu tanpa rotasi lengan bawah',
      'Tidak kembali ke posisi siap setelah memukul',
      'Terlalu tegang pada genggaman bet sehingga mengurangi kontrol',
    ],
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
