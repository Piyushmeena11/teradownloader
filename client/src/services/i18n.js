// Internationalization service
const translations = {
  en: {
    nav: {
      home: 'Home',
      features: 'Features',
      about: 'About'
    },
    hero: {
      title: 'Download Terabox Files Instantly',
      subtitle: 'No login required. Fast, secure, and completely free.',
      cta: 'Start Downloading'
    },
    features: {
      title: 'Powerful Features',
      fast: 'Lightning Fast',
      private: '100% Private',
      everywhere: 'Works Everywhere',
      batch: 'Batch Downloads',
      history: 'Download History',
      preview: 'File Preview'
    },
    cta: {
      title: 'Ready to Get Started?',
      subtitle: 'Join thousands of users downloading files from Terabox',
      button: 'Start Free Download'
    }
  },
  es: {
    nav: {
      home: 'Inicio',
      features: 'Características',
      about: 'Acerca de'
    },
    hero: {
      title: 'Descarga Archivos de Terabox al Instante',
      subtitle: 'No se requiere inicio de sesión. Rápido, seguro y completamente gratis.',
      cta: 'Comenzar Descarga'
    },
    features: {
      title: 'Características Poderosas',
      fast: 'Súper Rápido',
      private: '100% Privado',
      everywhere: 'Funciona en Todas Partes',
      batch: 'Descargas por Lotes',
      history: 'Historial de Descargas',
      preview: 'Vista Previa'
    },
    cta: {
      title: '¿Listo para Empezar?',
      subtitle: 'Únete a miles de usuarios descargando archivos de Terabox',
      button: 'Comenzar Descarga Gratis'
    }
  },
  fr: {
    nav: {
      home: 'Accueil',
      features: 'Fonctionnalités',
      about: 'À propos'
    },
    hero: {
      title: 'Téléchargez des Fichiers Terabox Instantanément',
      subtitle: 'Aucune connexion requise. Rapide, sécurisé et entièrement gratuit.',
      cta: 'Commencer le Téléchargement'
    },
    features: {
      title: 'Fonctionnalités Puissantes',
      fast: 'Ultra Rapide',
      private: '100% Privé',
      everywhere: 'Fonctionne Partout',
      batch: 'Téléchargements par Lots',
      history: 'Historique',
      preview: 'Aperçu'
    },
    cta: {
      title: 'Prêt à Commencer?',
      subtitle: 'Rejoignez des milliers d\'utilisateurs téléchargeant des fichiers depuis Terabox',
      button: 'Commencer le Téléchargement Gratuit'
    }
  },
  hi: {
    nav: {
      home: 'होम',
      features: 'विशेषताएं',
      about: 'के बारे में'
    },
    hero: {
      title: 'तुरंत Terabox फाइलें डाउनलोड करें',
      subtitle: 'लॉगिन की आवश्यकता नहीं। तेज़, सुरक्षित और पूरी तरह से मुफ्त।',
      cta: 'डाउनलोड शुरू करें'
    },
    features: {
      title: 'शक्तिशाली विशेषताएं',
      fast: 'बिजली की तरह तेज़',
      private: '100% निजी',
      everywhere: 'हर जगह काम करता है',
      batch: 'बैच डाउनलोड',
      history: 'डाउनलोड इतिहास',
      preview: 'फ़ाइल पूर्वावलोकन'
    },
    cta: {
      title: 'शुरू करने के लिए तैयार?',
      subtitle: 'Terabox से फाइलें डाउनलोड करने वाले हजारों उपयोगकर्ताओं में शामिल हों',
      button: 'मुफ्त डाउनलोड शुरू करें'
    }
  },
  ar: {
    nav: {
      home: 'الرئيسية',
      features: 'الميزات',
      about: 'حول'
    },
    hero: {
      title: 'قم بتنزيل ملفات Terabox على الفور',
      subtitle: 'لا حاجة لتسجيل الدخول. سريع وآمن ومجاني تمامًا.',
      cta: 'ابدأ التنزيل'
    },
    features: {
      title: 'ميزات قوية',
      fast: 'سريع جدًا',
      private: '100% خاص',
      everywhere: 'يعمل في كل مكان',
      batch: 'تنزيلات مجمعة',
      history: 'سجل التنزيلات',
      preview: 'معاينة الملف'
    },
    cta: {
      title: 'هل أنت مستعد للبدء؟',
      subtitle: 'انضم إلى آلاف المستخدمين الذين يقومون بتنزيل الملفات من Terabox',
      button: 'ابدأ التنزيل المجاني'
    }
  },
  zh: {
    nav: {
      home: '首页',
      features: '功能',
      about: '关于'
    },
    hero: {
      title: '立即下载 Terabox 文件',
      subtitle: '无需登录。快速、安全且完全免费。',
      cta: '开始下载'
    },
    features: {
      title: '强大功能',
      fast: '闪电般快速',
      private: '100% 私密',
      everywhere: '随处可用',
      batch: '批量下载',
      history: '下载历史',
      preview: '文件预览'
    },
    cta: {
      title: '准备开始了吗？',
      subtitle: '加入数千名从 Terabox 下载文件的用户',
      button: '开始免费下载'
    }
  },
  ja: {
    nav: {
      home: 'ホーム',
      features: '機能',
      about: 'について'
    },
    hero: {
      title: 'Teraboxファイルを即座にダウンロード',
      subtitle: 'ログイン不要。高速、安全、完全無料。',
      cta: 'ダウンロード開始'
    },
    features: {
      title: '強力な機能',
      fast: '超高速',
      private: '100%プライベート',
      everywhere: 'どこでも動作',
      batch: '一括ダウンロード',
      history: 'ダウンロード履歴',
      preview: 'ファイルプレビュー'
    },
    cta: {
      title: '始める準備はできましたか？',
      subtitle: 'Teraboxからファイルをダウンロードする何千人ものユーザーに参加',
      button: '無料ダウンロード開始'
    }
  },
  pt: {
    nav: {
      home: 'Início',
      features: 'Recursos',
      about: 'Sobre'
    },
    hero: {
      title: 'Baixe Arquivos do Terabox Instantaneamente',
      subtitle: 'Sem necessidade de login. Rápido, seguro e totalmente gratuito.',
      cta: 'Começar Download'
    },
    features: {
      title: 'Recursos Poderosos',
      fast: 'Ultra Rápido',
      private: '100% Privado',
      everywhere: 'Funciona em Qualquer Lugar',
      batch: 'Downloads em Lote',
      history: 'Histórico de Downloads',
      preview: 'Visualização de Arquivo'
    },
    cta: {
      title: 'Pronto para Começar?',
      subtitle: 'Junte-se a milhares de usuários baixando arquivos do Terabox',
      button: 'Começar Download Gratuito'
    }
  },
  de: {
    nav: {
      home: 'Startseite',
      features: 'Funktionen',
      about: 'Über uns'
    },
    hero: {
      title: 'Terabox-Dateien Sofort Herunterladen',
      subtitle: 'Keine Anmeldung erforderlich. Schnell, sicher und völlig kostenlos.',
      cta: 'Download Starten'
    },
    features: {
      title: 'Leistungsstarke Funktionen',
      fast: 'Blitzschnell',
      private: '100% Privat',
      everywhere: 'Funktioniert Überall',
      batch: 'Stapel-Downloads',
      history: 'Download-Verlauf',
      preview: 'Dateivorschau'
    },
    cta: {
      title: 'Bereit zum Starten?',
      subtitle: 'Schließen Sie sich Tausenden von Benutzern an, die Dateien von Terabox herunterladen',
      button: 'Kostenlosen Download Starten'
    }
  },
  ru: {
    nav: {
      home: 'Главная',
      features: 'Функции',
      about: 'О нас'
    },
    hero: {
      title: 'Скачайте Файлы Terabox Мгновенно',
      subtitle: 'Без регистрации. Быстро, безопасно и полностью бесплатно.',
      cta: 'Начать Загрузку'
    },
    features: {
      title: 'Мощные Функции',
      fast: 'Молниеносно Быстро',
      private: '100% Приватно',
      everywhere: 'Работает Везде',
      batch: 'Пакетная Загрузка',
      history: 'История Загрузок',
      preview: 'Просмотр Файлов'
    },
    cta: {
      title: 'Готовы Начать?',
      subtitle: 'Присоединяйтесь к тысячам пользователей, загружающих файлы с Terabox',
      button: 'Начать Бесплатную Загрузку'
    }
  }
};

let currentLanguage = 'en';
let languageChangeCallbacks = [];

export function setLanguage(lang) {
  if (translations[lang]) {
    currentLanguage = lang;
    localStorage.setItem('language', lang);
    // Notify all listeners
    languageChangeCallbacks.forEach(cb => cb(lang));
  }
}

export function getLanguage() {
  const saved = localStorage.getItem('language');
  return saved && translations[saved] ? saved : currentLanguage;
}

export function onLanguageChange(callback) {
  languageChangeCallbacks.push(callback);
  return () => {
    languageChangeCallbacks = languageChangeCallbacks.filter(cb => cb !== callback);
  };
}

export function t(key) {
  const lang = getLanguage();
  const keys = key.split('.');
  let value = translations[lang];
  
  for (const k of keys) {
    value = value?.[k];
  }
  
  return value || key;
}

export const availableLanguages = Object.keys(translations);

export const languageNames = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  hi: 'हिन्दी',
  ar: 'العربية',
  zh: '中文',
  ja: '日本語',
  pt: 'Português',
  de: 'Deutsch',
  ru: 'Русский'
};

