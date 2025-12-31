// app/i18n.ts
export type Lang = 'en' | 'tr';

export const I18N = {
  en: {
    nav: {
      about: 'About Us',
      founder: 'Founder',
      consultancy: 'Consultancy',
      works: 'Selected Works',
      contact: 'Contact',
    },
    hero: {
      line1: 'Unlock the Power of',
      line2: 'Football Intelligence',
      desc:
        'DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game.',
      cta: 'Learn More',
      ctaAria: 'Learn more about our services',
    },
    founder: {
      title: 'Meet the Founder',
      role: 'Data Scientist',
      p1:
        'Dogan holds a BSc in Electrical and Electronics Engineering and an MSc in Computer Science from the University of Zurich with a major in Data Science and a minor in Banking and Finance. His work bridges data science and football strategy, combining academic rigor with practical impact.',
      p2:
        'He has utilized FIFA and UEFA data, accessed under agreement and with their courtesy, in advanced football analytics initiatives, developing projects such as an open-source implementation of FIFA’s Enhanced Football Intelligence framework, player workload analysis, technical metric automation, tactical inference models, and dynamic match reporting. These efforts utilized tracking data, event data, competition data, as well as OPTA and Transfermarkt datasets to generate strategic insights and improve performance evaluation workflows. Prior to founding DPformance, he worked as an Artificial Intelligence Engineer, developing intelligent systems that merge human understanding with machine insight.',
    },
    consultancy: {
      title: 'Consultancy',
      intro1:
        'We deliver tailored data solutions and football analytics to enhance performance, scouting, and tactical understanding for clubs, analysts, and organizations.',
      intro2:
        'Our work draws on a wide range of data types — including tracking data, event data, and competition data — and is shaped by the specific structures, technologies, and objectives of each client.',
      servicesLead: 'Some of our services include:',
      cards: {
        gather: {
          title: 'Data Gathering & Integration',
          desc:
            'Gather, preprocess, and maintain datasets, including assistance with selecting suppliers that best fit specific needs, ensuring smooth integration and readiness for analysis.',
        },
        tactical: {
          title: 'Tactical & Performance Intelligence',
          desc:
            'Comprehensive evaluations of team and player performance using advanced metrics and multi-source data integration.',
        },
        scouting: {
          title: 'Scouting & Recruitment Support',
          desc:
            'Data-informed profiling and benchmarking to assist clubs and agencies in making informed recruitment decisions.',
        },
        dashboards: {
          title: 'Custom Dashboards & Reporting',
          desc:
            'Interactive dashboards and automated reports tailored to your operational needs, powered by integrated data pipelines.',
        },
        rnd: {
          title: 'Research & Development',
          desc:
            'Development of state-of-the-art approaches aimed at improving football analysis through advanced techniques and innovative methodologies.',
        },
        coach: {
          title: 'Coach Identification & Evaluation',
          desc:
            'Analytical profiling and assessment of coaching staff to support recruitment, development, and strategic alignment within football organizations.',
        },
      },
    },
    scoutwise: {
      badge: 'New • AI Powered Scouting & Recruitment Intelligence',
      title: 'Your intelligent football scouting companion',
      desc: {
        beforeLeagues:
          'ScoutWise is our AI-powered scouting assistant that turns your ideas, filters and data into clear, football-first insights — spanning',
        leaguesHighlight: '113 leagues worldwide',
        afterLeagues:
          ' and ',
        playersHighlight: '52,000+ players',
        afterPlayers:
          ', powered by ',
        statsHighlight: '75+ stats',
        afterStats:
          '. Define your',
        strategyHighlight: 'team strategy & scouting philosophy',
        afterStrategy:
          ', then chat to explore, compare and shortlist players who genuinely fit your game model.',
      },
      features: {
        strategy: {
          title: 'Strategy-aware search',
          text: 'Start with an optional strategy screen so every suggestion aligns with your tactical approach.',
        },
        cards: {
          title: 'Player cards',
          text: 'Name, gender, nationality, team, age, height, weight and 0–100 Potential score in one place.',
        },
        radar: {
          title: 'Metric visualizations that matter',
          text: 'Goalkeeping, Shooting, Passing, Defending, Contribution & Impact, and Errors & Discipline plots for each player.',
        },
        reports: {
          title: 'Pro scouting reports',
          text: 'Generate in-depth reports and portfolio overviews for your tracked players.',
        },
      },
      cta: 'Explore ScoutWise.ai',
    },
    contact: {
      title: 'Get In Touch',
      subtitle: 'Reach out to discuss how DPformance can assist your team.',
      form: {
        name: 'Name',
        email: 'E-mail',
        phone: 'Phone',
        message: 'Message',
        namePh: 'Your full name',
        emailPh: 'E-mail',
        phonePh: 'Phone Number',
        msgPh: 'Your message here...',
        send: 'Send Message',
        sending: 'Sending...',
        success: "Thank you for contacting us! We'll get back to you soon.",
        error: 'Something went wrong. Please try again.',
      },
    },
    footer: {
      rights: 'All rights reserved.',
      backTop: 'Back to top',
    },
    langToggle: {
      tr: 'TR',
      en: 'EN',
      aria: 'Switch language',
    },
    meta: {
      title: 'Unlock the Power of Football Intelligence | DPformance',
      desc:
        'DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game. Founded by Dogan Parlak, MSc in Computer Science and expert in football data science.',
      ogDesc:
        'DPformance is a data-driven consultancy providing advanced football analytics and insights to support smarter understanding, communication, and strategy across the game.',
      twitterDesc:
        'DPformance is a data-driven consultancy providing advanced football analytics and insights.',
    },
    works: {
      badge: 'Previous Works',
      title: 'Selected Work',
      subtitle:
        'A collection of UEFA & FIFA projects, academic research, and independent analytical work.',
      tabs: {
        uefa: 'UEFA',
        fifa: 'FIFA',
        academic: 'Academy R&D',
        independent: 'Independent',
      },
      empty: {
        default: 'No items yet.',
        independent: 'Add independent projects when ready.',
      },
      readMore: 'Read more',
      viewPdf: 'View PDF',
      more: 'more',
      openMedia: 'Open media {n}',
      lightbox: {
        close: 'Close gallery',
        prev: 'Previous',
        next: 'Next',
        thumb: 'Thumbnail {n}',
      },
      items: {
        uefa: {
          workload: {
            title: 'Player Workload Analysis – UEFA Intelligence Center',
            p1: 'Integrated Transfermarkt, OPTA, and UEFA’s FAME data to analyze multi-season player workload...',
          },
          tech: {
            title: 'Technical Metric Implementation – UEFA Performance Analysis Department',
            p1: 'Developed methodologies and automated core performance metrics from UEFA tracking and event data...',
          },
        },
        fifa: {
          efi: {
            title: 'An Open-Source Implementation of FIFA’s Enhanced Football Intelligence',
            p1: 'Open-source implementation of FIFA’s E.F.I. metrics...',
          },
        },
        academic: {
          shapeGraphs: {
            title: 'Shape Graphs and Tactical Inference',
            p1: 'Introduced shape graphs to capture formations frame-by-frame...',
          },
          clustering: {
            title: 'Clustering Passing Patterns',
            p1: 'Clustering passing patterns by building spatial networks...',
          },
        },
        independent: {
          cornerKicks: {
            title: 'Corner Kick Strategy Identification',
            p1: 'Analyzed corner kicks to identify patterns, strategies, and player movements...',
          },
        },
      },
    },
  },

  tr: {
    nav: {
      about: 'Hakkımızda',
      founder: 'Kurucu',
      consultancy: 'Danışmanlık',
      works: 'Seçilmiş İşler',
      contact: 'İletişim',
    },
    hero: {
      line1: 'Futbol',
      line2: 'Verisinin Gücünü Açığa Çıkarın',
      desc:
        'DPformance; futbol analitiği ve ileri veri içgörüleriyle, oyunu daha iyi anlama, anlatma ve strateji üretme süreçlerini güçlendiren veri odaklı bir danışmanlık firmasıdır.',
      cta: 'Detayları Gör',
      ctaAria: 'Hizmetlerimiz hakkında daha fazla bilgi edinin',
    },
    founder: {
      title: 'Kurucu ile Tanışın',
      role: 'Veri Bilimci',
      p1:
        'Dogan, Elektrik-Elektronik Mühendisliği lisansına ve Zürih Üniversitesi’nden (University of Zurich) Veri Bilimi odaklı Bilgisayar Bilimleri yüksek lisansına sahiptir; Bankacılık ve Finans alanında da yan dal yapmıştır. Çalışmaları, akademik titizlik ile pratik etkiyi birleştirerek veri bilimi ile futbol stratejisi arasında köprü kurar.',
      p2:
        'FIFA ve UEFA verilerini, ilgili kurumlarla yapılan anlaşma ve izinler kapsamında kullanarak ileri futbol analitiği çalışmaları yürütmüştür. FIFA’nın Enhanced Football Intelligence çerçevesinin açık kaynak uygulaması, oyuncu yük analizi, teknik metrik otomasyonu, taktik çıkarım modelleri ve dinamik maç raporlama gibi projeler geliştirmiştir. Bu çalışmalar; takip (tracking), olay (event) ve organizasyon (competition) verilerinin yanı sıra OPTA ve Transfermarkt veri setlerini kullanarak stratejik içgörüler üretmiş ve performans değerlendirme iş akışlarını iyileştirmiştir. DPformance’ı kurmadan önce Yapay Zekâ Mühendisi olarak, insan anlayışını makine içgörüsüyle birleştiren sistemler geliştirmiştir.',
    },
    consultancy: {
      title: 'Danışmanlık',
      intro1:
        'Kulüpler, analistler ve kurumlar için performans, scouting ve taktik anlayışı geliştiren, ihtiyaca özel veri çözümleri ve futbol analitiği sunuyoruz.',
      intro2:
        'Çalışmalarımız; takip (tracking), olay (event) ve organizasyon (competition) verileri dahil birçok veri türüne dayanır ve her müşterinin hedefleri, yapısı ve teknolojilerine göre şekillenir.',
      servicesLead: 'Sunduğumuz hizmetlerden bazıları:',
      cards: {
        gather: {
          title: 'Veri Toplama & Entegrasyon',
          desc:
            'Veri setlerini toplama, ön işleme ve sürdürülebilir şekilde yönetme; ihtiyaçlara uygun tedarikçi seçimi ve analiz için sorunsuz entegrasyon desteği.',
        },
        tactical: {
          title: 'Taktik & Performans Zekâsı',
          desc:
            'Gelişmiş metrikler ve çok kaynaklı veri entegrasyonu ile takım ve oyuncu performansının kapsamlı değerlendirilmesi.',
        },
        scouting: {
          title: 'Scouting & Transfer Desteği',
          desc:
            'Transfer kararlarını desteklemek için veri temelli profil çıkarımı ve karşılaştırmalı benchmark analizleri.',
        },
        dashboards: {
          title: 'Özel Panolar & Raporlama',
          desc:
            'Entegre veri hatlarıyla desteklenen, operasyonel ihtiyaçlarınıza göre tasarlanmış interaktif panolar ve otomatik raporlar.',
        },
        rnd: {
          title: 'Ar-Ge',
          desc:
            'İleri teknikler ve yenilikçi yöntemlerle futbol analizini geliştirmeye yönelik güncel yaklaşımların geliştirilmesi.',
        },
        coach: {
          title: 'Antrenör Bulma & Değerlendirme',
          desc:
            'Futbol organizasyonlarında oyuncu keşfi, gelişim ve stratejik uyumu desteklemek için teknik ekip analitiği ve değerlendirme.',
        },
      },
    },
    scoutwise: {
      badge: 'Yeni • Yapay Zekâ Destekli Oyuncu Keşfi & Transfer Analitiği',
      title: 'Akıllı Oyuncu Keşfi Mentörün',
      desc: {
        beforeLeagues:
          'ScoutWise; fikirlerinizi ve tercihlerinizi futbol odaklı, net değerlendirmelere dönüştüren veri tabanlı, yapay zekâ destekli bir oyuncu keşfi asistanıdır. Dünya genelinde ',
        leaguesHighlight: '113+ lig',
        afterLeagues: ' ve ',
        playersHighlight: '55.000+ oyuncuyu',
        afterPlayers: ' kapsar — ',
        statsHighlight: '75+ istatistik',
        afterStats:
          ' ile karar süreçlerinizi destekler.',
        strategyHighlight: 'Takım stratejinizi ve scouting felsefeniz',
        afterStrategy:
          ' esas alınarak; ScoutWise ile sohbet ederken oyun modelinize uyan oyuncuları keşfetmenize, karşılaştırmanıza ve portföyünüzü oluşturmanıza yardımcı olur.',
      },
      features: {
        strategy: {
          title: 'Strateji uyumlu arama',
          text: 'İsteğe bağlı strateji ekranı ile ScoutWise tüm önerilerini taktik yaklaşımınıza uygun yapar.',
        },
        cards: {
          title: 'Oyuncu kartları',
          text: 'İsim, cinsiyet, ülke, takım, pozisyon, yaş, boy, kilo ve 0–100 Potansiyel puanı tek ekranda.',
        },
        radar: {
          title: 'Önemli radar grafikleri',
          text: 'Kalecilik, Şut, Pas, Savunma, Katkı & Etki ve Hata & Disiplin grafikleri, her oyuncunun son bir yılki performansına göre oluşturulur.',
        },
        reports: {
          title: 'Profesyonel scouting raporları',
          text: 'Pro abonelik farkı ile takip ettiğiniz oyuncular için detaylı scouting raporları üretin.',
        },
      },
      cta: 'ScoutWise.ai’ı keşfet',
    },
    contact: {
      title: 'İletişime Geçin',
      subtitle: 'DPformance’ın ekibinize nasıl katkı sağlayabileceğini konuşalım.',
      form: {
        name: 'İsim',
        email: 'E-posta',
        phone: 'Telefon',
        message: 'Mesaj',
        namePh: 'İsminiz',
        emailPh: 'E-posta',
        phonePh: 'Telefon numarası',
        msgPh: 'Mesajınız...',
        send: 'Gönder',
        sending: 'Gönderiliyor...',
        success: 'Mesajınız için teşekkürler! En kısa sürede dönüş yapacağız.',
        error: 'Bir hata oluştu. Lütfen tekrar deneyin.',
      },
    },
    footer: {
      rights: 'Tüm hakları saklıdır.',
      backTop: 'Yukarı çık',
    },
    langToggle: {
      tr: 'TR',
      en: 'EN',
      aria: 'Dili değiştir',
    },
    meta: {
      title: 'Futbol Zekâsının Gücünü Açığa Çıkarın | DPformance',
      desc:
        'DPformance; futbol analitiği ve ileri veri içgörüleriyle, oyunu daha iyi anlama, anlatma ve strateji üretme süreçlerini güçlendiren veri odaklı bir danışmanlıktır. Kurucusu Dogan Parlak, Bilgisayar Bilimleri (MSc) ve futbol veri bilimi uzmanıdır.',
      ogDesc:
        'DPformance; futbol analitiği ve ileri veri içgörüleriyle, oyunu daha iyi anlama, anlatma ve strateji üretme süreçlerini güçlendiren veri odaklı bir danışmanlıktır.',
      twitterDesc:
        'DPformance; futbol analitiği ve ileri veri içgörüleri sunan veri odaklı bir danışmanlıktır.',
    },
    works: {
      badge: 'Önceki Çalışmalar',
      title: 'Seçilmiş Çalışmalar',
      subtitle: 'UEFA & FIFA projeleri, akademik araştırmalar ve bağımsız analiz çalışmalarından bir seçki.',
      tabs: {
        uefa: 'UEFA',
        fifa: 'FIFA',
        academic: 'Akademi Ar-Ge',
        independent: 'Bağımsız',
      },
      empty: {
        default: 'Henüz içerik yok.',
        independent: 'Hazır olduğunuzda bağımsız projeleri ekleyin.',
      },
      readMore: 'Detaylar',
      viewPdf: 'PDF Görüntüle',
      more: 'daha',
      openMedia: '{n}. medyayı aç',
      lightbox: {
        close: 'Galeriyi kapat',
        prev: 'Önceki',
        next: 'Sonraki',
        thumb: '{n}. küçük görsel',
      },
      items: {
        uefa: {
          workload: {
            title: 'Oyuncu İş Yükü Analizi – UEFA Intelligence Center',
            p1: 'Transfermarkt, OPTA ve UEFA FAME verilerini entegre ederek çok sezonlu oyuncu iş yükünü analiz etti...',
          },
          tech: {
            title: 'Metrik Otomatizasyonu – UEFA Performans Analiz Departmanı',
            p1: 'UEFA tracking ve event verilerinden performans metriklerini otomatikleştiren yöntemler geliştirdi...',
          },
        },
        fifa: {
          efi: {
            title: 'FIFA Enhanced Football Intelligence için Açık Kaynak Oluşturma',
            p1: 'FIFA’nın E.F.I. metriklerinin açık kaynak haline getirdi...',
          },
        },
        academic: {
          shapeGraphs: {
            title: 'Shape Graphs ve Taktik Çıkarım',
            p1: 'Formasyonları görüntü bazında sınıflandırmak için shape graphs yaklaşımını sundu...',
          },
          clustering: {
            title: 'Pas Örüntülerini Kümeleme',
            p1: 'Mekânsal ağlar oluşturarak pas örüntülerini kümeledi...',
          },
        },
        independent: {
          cornerKicks: {
            title: 'Korner Stratejisi Tanımlama',
            p1: 'Kornerleri analiz ederek örüntüler, stratejiler ve oyuncu hareketlerini belirledi...',
          },
        },
      },
    },
  },
} as const;

export const DEFAULT_LANG: Lang = 'en';
export const LANG_STORAGE_KEY = 'dp_lang';

export function isLang(x: unknown): x is Lang {
  return x === 'en' || x === 'tr';
}

export function getStrings(lang: Lang) {
  return I18N[lang];
}
