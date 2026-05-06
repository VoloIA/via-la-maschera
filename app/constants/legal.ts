import type { AppLanguageCode } from '@/constants/localization';

export const supportEmail = 'volodymyr.ilchenko.it@gmail.com';

type LegalSection = {
  body: string[];
  title: string;
};

type LegalContent = {
  backToProfile: string;
  dataDeletion: {
    intro: string;
    kicker: string;
    profileText: string;
    profileTitle: string;
    sections: LegalSection[];
    title: string;
    updated: string;
  };
  privacy: {
    intro: string;
    kicker: string;
    profileText: string;
    profileTitle: string;
    sections: LegalSection[];
    title: string;
    updated: string;
  };
};

export const legalCopy: Record<AppLanguageCode, LegalContent> = {
  it: {
    backToProfile: 'Torna al Profilo',
    privacy: {
      kicker: 'Privacy',
      title: 'Informativa privacy',
      updated: 'Ultimo aggiornamento: 5 maggio 2026',
      profileTitle: 'Informativa privacy',
      profileText: 'Leggi quali dati possono essere trattati e come vengono usati.',
      intro:
        'Via la Maschera è un rituale di riflessione personale. Questa pagina spiega in modo chiaro quali dati possono essere salvati e perché.',
      sections: [
        {
          title: 'Dati che possono essere trattati',
          body: [
            'Risposte scritte, domande associate, date, stato delle risposte, lingua e tema scelti.',
            'Se accedi con Google o Apple, possono essere trattati identificativo utente, nome, email e dati profilo forniti dal servizio di accesso.',
          ],
        },
        {
          title: 'Archivio locale e cloud',
          body: [
            'Senza accesso, le risposte restano sul dispositivo.',
            'Con accesso e Firebase configurato, le risposte possono essere sincronizzate nel tuo spazio cloud personale.',
          ],
        },
        {
          title: 'Stanza condivisa',
          body: [
            'La condivisione è opzionale e revocabile.',
            'Gli altri vedono solo le iniziali e solo dopo aver risposto alla stessa domanda.',
          ],
        },
        {
          title: 'Servizi tecnici',
          body: [
            'L’app può usare Google Sign-In, Sign in with Apple, Firebase Authentication, Cloud Firestore ed Expo per accesso, sincronizzazione, build e infrastruttura.',
          ],
        },
        {
          title: 'Contatti',
          body: [`Per richieste privacy o cancellazione dati scrivi a ${supportEmail}.`],
        },
        {
          title: 'Nota importante',
          body: [
            'L’app non fornisce diagnosi, terapia, consulenza medica o consulenza psicologica professionale.',
          ],
        },
      ],
    },
    dataDeletion: {
      kicker: 'Dati',
      title: 'Cancellazione account e dati',
      updated: 'Ultimo aggiornamento: 5 maggio 2026',
      profileTitle: 'Cancellazione account e dati',
      profileText: 'Scopri come richiedere la cancellazione dell’account e delle risposte cloud.',
      intro:
        'Se usi l’accesso Google o Apple, puoi chiedere la cancellazione dell’account app e dei dati associati.',
      sections: [
        {
          title: 'Come richiedere la cancellazione',
          body: [
            `Invia una richiesta a ${supportEmail} con oggetto “Cancellazione Via la Maschera”.`,
            'Usa l’email collegata al tuo accesso, così possiamo identificare lo spazio corretto.',
          ],
        },
        {
          title: 'Cosa viene eliminato',
          body: [
            'Archivio cloud, risposte personali, risposte condivise, iniziali associate e dati di sincronizzazione.',
            'I dati locali sul dispositivo possono essere rimossi anche cancellando i dati app o disinstallando l’app.',
          ],
        },
        {
          title: 'Cosa può essere conservato',
          body: [
            'Alcune informazioni tecniche minime possono essere conservate solo quando necessario per sicurezza, prevenzione abusi o obblighi legali.',
          ],
        },
      ],
    },
  },
  en: {
    backToProfile: 'Back to Profile',
    privacy: {
      kicker: 'Privacy',
      title: 'Privacy Policy',
      updated: 'Last updated: May 5, 2026',
      profileTitle: 'Privacy Policy',
      profileText: 'Read what data may be processed and how it is used.',
      intro:
        'Via la Maschera is a personal reflection ritual. This page explains clearly what data may be saved and why.',
      sections: [
        {
          title: 'Data that may be processed',
          body: [
            'Written answers, related questions, dates, answer status, chosen language, and theme.',
            'If you sign in with Google or Apple, user ID, name, email, and profile data provided by the sign-in service may be processed.',
          ],
        },
        {
          title: 'Local archive and cloud',
          body: [
            'Without sign-in, answers stay on the device.',
            'With sign-in and Firebase configured, answers may sync to your personal cloud space.',
          ],
        },
        {
          title: 'Shared room',
          body: [
            'Sharing is optional and reversible.',
            'Others see initials only and only after answering the same question.',
          ],
        },
        {
          title: 'Technical services',
          body: [
            'The app may use Google Sign-In, Sign in with Apple, Firebase Authentication, Cloud Firestore, and Expo for sign-in, sync, builds, and infrastructure.',
          ],
        },
        {
          title: 'Contact',
          body: [`For privacy or data deletion requests, write to ${supportEmail}.`],
        },
        {
          title: 'Important note',
          body: [
            'The app does not provide diagnosis, therapy, medical advice, or professional psychological support.',
          ],
        },
      ],
    },
    dataDeletion: {
      kicker: 'Data',
      title: 'Account and Data Deletion',
      updated: 'Last updated: May 5, 2026',
      profileTitle: 'Account and data deletion',
      profileText: 'Learn how to request deletion of your account and cloud answers.',
      intro:
        'If you use Google or Apple sign-in, you can request deletion of your app account and associated data.',
      sections: [
        {
          title: 'How to request deletion',
          body: [
            `Send a request to ${supportEmail} with subject “Via la Maschera deletion”.`,
            'Use the email connected to your sign-in so the correct space can be identified.',
          ],
        },
        {
          title: 'What is deleted',
          body: [
            'Cloud archive, personal answers, shared answers, associated initials, and sync data.',
            'Local device data can also be removed by clearing app data or uninstalling the app.',
          ],
        },
        {
          title: 'What may be retained',
          body: [
            'Minimal technical information may be retained only when needed for security, abuse prevention, or legal obligations.',
          ],
        },
      ],
    },
  },
  uk: {
    backToProfile: 'Назад до профілю',
    privacy: {
      kicker: 'Приватність',
      title: 'Політика приватності',
      updated: 'Останнє оновлення: 5 травня 2026',
      profileTitle: 'Політика приватності',
      profileText: 'Прочитай, які дані можуть оброблятися і як вони використовуються.',
      intro:
        'Via la Maschera — ритуал особистого осмислення. Ця сторінка пояснює, які дані можуть зберігатися і чому.',
      sections: [
        {
          title: 'Дані, які можуть оброблятися',
          body: [
            'Написані відповіді, пов’язані запитання, дати, статус відповідей, вибрана мова і тема.',
            'Якщо ти входиш через Google або Apple, можуть оброблятися ID користувача, ім’я, email та дані профілю від сервісу входу.',
          ],
        },
        {
          title: 'Локальний архів і хмара',
          body: [
            'Без входу відповіді залишаються на пристрої.',
            'З входом і налаштованим Firebase відповіді можуть синхронізуватися у твоєму особистому хмарному просторі.',
          ],
        },
        {
          title: 'Спільна кімната',
          body: [
            'Поширення є необов’язковим і зворотним.',
            'Інші бачать лише ініціали і лише після відповіді на те саме запитання.',
          ],
        },
        {
          title: 'Технічні сервіси',
          body: [
            'Додаток може використовувати Google Sign-In, Sign in with Apple, Firebase Authentication, Cloud Firestore та Expo для входу, синхронізації, збірок і інфраструктури.',
          ],
        },
        {
          title: 'Контакти',
          body: [`Для питань приватності або видалення даних напиши на ${supportEmail}.`],
        },
        {
          title: 'Важлива примітка',
          body: [
            'Додаток не надає діагностику, терапію, медичні поради або професійну психологічну підтримку.',
          ],
        },
      ],
    },
    dataDeletion: {
      kicker: 'Дані',
      title: 'Видалення акаунта і даних',
      updated: 'Останнє оновлення: 5 травня 2026',
      profileTitle: 'Видалення акаунта і даних',
      profileText: 'Дізнайся, як надіслати запит на видалення акаунта і хмарних відповідей.',
      intro:
        'Якщо ти використовуєш вхід Google або Apple, можна надіслати запит на видалення акаунта додатка і пов’язаних даних.',
      sections: [
        {
          title: 'Як надіслати запит',
          body: [
            `Надішли запит на ${supportEmail} з темою “Via la Maschera deletion”.`,
            'Використовуй email, пов’язаний із входом, щоб можна було визначити правильний простір.',
          ],
        },
        {
          title: 'Що видаляється',
          body: [
            'Хмарний архів, особисті відповіді, спільні відповіді, пов’язані ініціали і дані синхронізації.',
            'Локальні дані на пристрої можна також видалити, очистивши дані додатка або видаливши додаток.',
          ],
        },
        {
          title: 'Що може зберігатися',
          body: [
            'Мінімальна технічна інформація може зберігатися лише за потреби безпеки, запобігання зловживанням або юридичних обов’язків.',
          ],
        },
      ],
    },
  },
  ru: {
    backToProfile: 'Назад в профиль',
    privacy: {
      kicker: 'Приватность',
      title: 'Политика приватности',
      updated: 'Последнее обновление: 5 мая 2026',
      profileTitle: 'Политика приватности',
      profileText: 'Прочитай, какие данные могут обрабатываться и как они используются.',
      intro:
        'Via la Maschera — ритуал личного размышления. Эта страница объясняет, какие данные могут сохраняться и зачем.',
      sections: [
        {
          title: 'Данные, которые могут обрабатываться',
          body: [
            'Написанные ответы, связанные вопросы, даты, статус ответов, выбранный язык и тема.',
            'Если ты входишь через Google или Apple, могут обрабатываться ID пользователя, имя, email и данные профиля от сервиса входа.',
          ],
        },
        {
          title: 'Локальный архив и облако',
          body: [
            'Без входа ответы остаются на устройстве.',
            'С входом и настроенным Firebase ответы могут синхронизироваться в твоё личное облачное пространство.',
          ],
        },
        {
          title: 'Общая комната',
          body: [
            'Обмен необязателен и обратим.',
            'Другие видят только инициалы и только после ответа на тот же вопрос.',
          ],
        },
        {
          title: 'Технические сервисы',
          body: [
            'Приложение может использовать Google Sign-In, Sign in with Apple, Firebase Authentication, Cloud Firestore и Expo для входа, синхронизации, сборок и инфраструктуры.',
          ],
        },
        {
          title: 'Контакты',
          body: [`По вопросам приватности или удаления данных напиши на ${supportEmail}.`],
        },
        {
          title: 'Важное примечание',
          body: [
            'Приложение не предоставляет диагностику, терапию, медицинские советы или профессиональную психологическую поддержку.',
          ],
        },
      ],
    },
    dataDeletion: {
      kicker: 'Данные',
      title: 'Удаление аккаунта и данных',
      updated: 'Последнее обновление: 5 мая 2026',
      profileTitle: 'Удаление аккаунта и данных',
      profileText: 'Узнай, как запросить удаление аккаунта и облачных ответов.',
      intro:
        'Если ты используешь вход через Google или Apple, можно запросить удаление аккаунта приложения и связанных данных.',
      sections: [
        {
          title: 'Как запросить удаление',
          body: [
            `Отправь запрос на ${supportEmail} с темой “Via la Maschera deletion”.`,
            'Используй email, связанный со входом, чтобы можно было определить правильное пространство.',
          ],
        },
        {
          title: 'Что удаляется',
          body: [
            'Облачный архив, личные ответы, общие ответы, связанные инициалы и данные синхронизации.',
            'Локальные данные на устройстве можно также удалить, очистив данные приложения или удалив приложение.',
          ],
        },
        {
          title: 'Что может сохраняться',
          body: [
            'Минимальная техническая информация может сохраняться только при необходимости безопасности, предотвращения злоупотреблений или юридических обязательств.',
          ],
        },
      ],
    },
  },
  es: {
    backToProfile: 'Volver al Perfil',
    privacy: {
      kicker: 'Privacidad',
      title: 'Política de privacidad',
      updated: 'Última actualización: 5 de mayo de 2026',
      profileTitle: 'Política de privacidad',
      profileText: 'Lee qué datos pueden tratarse y cómo se usan.',
      intro:
        'Via la Maschera es un ritual de reflexión personal. Esta página explica con claridad qué datos pueden guardarse y por qué.',
      sections: [
        {
          title: 'Datos que pueden tratarse',
          body: [
            'Respuestas escritas, preguntas asociadas, fechas, estado de las respuestas, idioma y tema elegidos.',
            'Si entras con Google o Apple, pueden tratarse ID de usuario, nombre, email y datos de perfil proporcionados por el servicio de acceso.',
          ],
        },
        {
          title: 'Archivo local y cloud',
          body: [
            'Sin acceso, las respuestas quedan en el dispositivo.',
            'Con acceso y Firebase configurado, las respuestas pueden sincronizarse en tu espacio cloud personal.',
          ],
        },
        {
          title: 'Sala compartida',
          body: [
            'Compartir es opcional y reversible.',
            'Los demás ven solo iniciales y solo después de responder a la misma pregunta.',
          ],
        },
        {
          title: 'Servicios técnicos',
          body: [
            'La app puede usar Google Sign-In, Sign in with Apple, Firebase Authentication, Cloud Firestore y Expo para acceso, sincronización, builds e infraestructura.',
          ],
        },
        {
          title: 'Contacto',
          body: [`Para solicitudes de privacidad o eliminación de datos, escribe a ${supportEmail}.`],
        },
        {
          title: 'Nota importante',
          body: [
            'La app no ofrece diagnóstico, terapia, consejo médico ni apoyo psicológico profesional.',
          ],
        },
      ],
    },
    dataDeletion: {
      kicker: 'Datos',
      title: 'Eliminación de cuenta y datos',
      updated: 'Última actualización: 5 de mayo de 2026',
      profileTitle: 'Eliminación de cuenta y datos',
      profileText: 'Descubre cómo solicitar la eliminación de tu cuenta y respuestas cloud.',
      intro:
        'Si usas acceso con Google o Apple, puedes solicitar la eliminación de la cuenta de la app y los datos asociados.',
      sections: [
        {
          title: 'Cómo solicitar la eliminación',
          body: [
            `Envía una solicitud a ${supportEmail} con asunto “Via la Maschera deletion”.`,
            'Usa el email conectado a tu acceso para identificar el espacio correcto.',
          ],
        },
        {
          title: 'Qué se elimina',
          body: [
            'Archivo cloud, respuestas personales, respuestas compartidas, iniciales asociadas y datos de sincronización.',
            'Los datos locales del dispositivo también pueden eliminarse borrando los datos de la app o desinstalándola.',
          ],
        },
        {
          title: 'Qué puede conservarse',
          body: [
            'Puede conservarse información técnica mínima solo cuando sea necesario por seguridad, prevención de abusos u obligaciones legales.',
          ],
        },
      ],
    },
  },
};
