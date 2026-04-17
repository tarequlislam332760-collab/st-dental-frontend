import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
  .use(initReactI18next)
  .init({
    resources: {
      EN: {
        translation: {
          "home": "Home",
          "about": "About Us",
          "services": "Services",
          "pricing": "Pricing",
          "blog": "Blog",
          "contact": "Contact",
          "book_now": "Get Appointment",
          "treatment": "Treatment",
          "dental": "Dental Care",
          "skin": "Skin Care"
        }
      },
      BN: {
        translation: {
          "home": "হোম",
          "about": "সম্পর্কে",
          "services": "সেবা",
          "pricing": "মূল্য তালিকা",
          "blog": "ব্লগ",
          "contact": "যোগাযোগ",
          "book_now": "অ্যাপয়েন্টমেন্ট নিন",
          "treatment": "ট্রিটমেন্ট",
          "dental": "ডেন্টাল কেয়ার",
          "skin": "স্কিন কেয়ার"
        }
      },
      AR: {
        translation: {
          "home": "الصفحة الرئيسية",
          "about": "حول",
          "services": "خدمات",
          "pricing": "التسعير",
          "blog": "مدونة",
          "contact": "اتصال",
          "book_now": "حجز موعد",
          "treatment": "علاج",
          "dental": "عناية بالأسنان",
          "skin": "العناية بالبشرة"
        }
      },
      HI: {
        translation: {
          "home": "होम",
          "about": "हमारे बारे में",
          "services": "सेवाएं",
          "pricing": "कीमतें",
          "blog": "ब्लॉग",
          "contact": "संपर्क",
          "book_now": "अपॉइंटमेंट लें",
          "treatment": "उपचार",
          "dental": "दंत चिकित्सा",
          "skin": "त्वचा की देखभाल"
        }
      },
      ES: { translation: { "home": "Inicio", "about": "Nosotros", "services": "Servicios", "pricing": "Precios", "blog": "Blog", "contact": "Contacto", "book_now": "Reservar", "treatment": "Tratamiento", "dental": "Cuidado Dental", "skin": "Cuidado Piel" } },
      FR: { translation: { "home": "Accueil", "about": "À propos", "services": "Services", "pricing": "Tarifs", "blog": "Blog", "contact": "Contact", "book_now": "Réserver", "treatment": "Traitement", "dental": "Soin Dentaire", "skin": "Soin Peau" } },
      DE: { translation: { "home": "Startseite", "about": "Über uns", "services": "Dienste", "pricing": "Preise", "blog": "Blog", "contact": "Kontakt", "book_now": "Buchen", "treatment": "Behandlung", "dental": "Zahnpflege", "skin": "Hautpflege" } },
      ZH: { translation: { "home": "首页", "about": "关于我们", "services": "服务", "pricing": "定价", "blog": "博客", "contact": "联系我们", "book_now": "现在预订", "treatment": "治疗", "dental": "牙科护理", "skin": "皮肤护理" } },
      RU: { translation: { "home": "Главная", "about": "О нас", "services": "Услуги", "pricing": "Цены", "blog": "Блог", "contact": "Контакт", "book_now": "Забронировать", "treatment": "Лечение", "dental": "Уход за зубами", "skin": "Уход за кожей" } },
      TR: { translation: { "home": "Anasayfa", "about": "Hakkımızda", "services": "Hizmetler", "pricing": "Fiyatlar", "blog": "Blog", "contact": "İletişim", "book_now": "Randevu Al", "treatment": "Tedavi", "dental": "Diş Bakımı", "skin": "Cilt Bakımı" } }
    },
    lng: "EN", 
    fallbackLng: "EN",
    interpolation: { escapeValue: false }
  });

export default i18n;