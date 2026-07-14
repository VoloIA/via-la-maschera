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
        'Via la Maschera è un’app di riflessione personale. Questa pagina spiega quali dati possono essere salvati, come vengono usati e perché.',
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
            'Se non accedi, le risposte restano su questo dispositivo.',
            'Se accedi, le risposte possono essere sincronizzate nel tuo archivio online privato.',
          ],
        },
        {
          title: 'Condivisione con la community',
          body: [
            'La condivisione è opzionale e revocabile.',
            'Le altre persone vedono solo le tue iniziali e possono leggere la risposta soltanto dopo aver risposto alla stessa domanda.',
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
          body: [
            `Per domande sulla privacy, scrivi a ${supportEmail}. Per eliminare l’account, apri la pagina Cancellazione account e dati nell’app.`,
          ],
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
      updated: 'Ultimo aggiornamento: 8 giugno 2026',
      profileTitle: 'Cancellazione account e dati',
      profileText: 'Elimina dall’app l’account, le risposte cloud e i dati associati.',
      intro:
        'Se accedi con Google o Apple, puoi eliminare dall’app il tuo account e i dati associati, senza inviare email o contattare l’assistenza.',
      sections: [
        {
          title: 'Come cancellare account e dati',
          body: [
            'Accedi dal Profilo, apri questa pagina e usa il pulsante Elimina account e dati.',
            'Per evitare eliminazioni accidentali, l’app chiede una conferma prima di completare l’operazione.',
          ],
        },
        {
          title: 'Cosa viene eliminato',
          body: [
            'Account app, archivio cloud, risposte personali, risposte condivise, iniziali associate e dati di sincronizzazione.',
            'Le risposte locali salvate su questo dispositivo vengono rimosse durante la cancellazione.',
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
        'Via la Maschera is a personal reflection app. This page explains what data may be saved, how it is used, and why.',
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
            'If you do not sign in, your answers remain on this device.',
            'If you sign in, your answers may sync to your private online archive.',
          ],
        },
        {
          title: 'Sharing with the community',
          body: [
            'Sharing is optional and reversible.',
            'Other people see only your initials and can read the answer only after answering the same question.',
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
          body: [
            `For privacy questions, write to ${supportEmail}. To delete your account, open the Account and Data Deletion page in the app.`,
          ],
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
      updated: 'Last updated: June 8, 2026',
      profileTitle: 'Account and data deletion',
      profileText: 'Delete your account, cloud answers, and associated data from inside the app.',
      intro:
        'If you sign in with Google or Apple, you can delete your account and associated data from inside the app without sending an email or contacting support.',
      sections: [
        {
          title: 'How to delete account and data',
          body: [
            'Sign in from Profile, open this page, and use the Delete account and data button.',
            'To prevent accidental deletion, the app asks for confirmation before completing the operation.',
          ],
        },
        {
          title: 'What is deleted',
          body: [
            'App account, cloud archive, personal answers, shared answers, associated initials, and sync data.',
            'Local answers saved on this device are removed during account deletion.',
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
          body: [
            `Для питань приватності напиши на ${supportEmail}. Видалення акаунта запускається зі сторінки Видалення акаунта і даних у додатку.`,
          ],
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
      updated: 'Останнє оновлення: 8 червня 2026',
      profileTitle: 'Видалення акаунта і даних',
      profileText: 'Видали акаунт, хмарні відповіді та пов’язані дані з додатка.',
      intro:
        'Якщо ти використовуєш вхід Google або Apple, можна видалити акаунт додатка і пов’язані дані всередині додатка без email або звернення до підтримки.',
      sections: [
        {
          title: 'Як видалити акаунт і дані',
          body: [
            'Увійди з Профілю, відкрий цю сторінку і скористайся кнопкою Видалити акаунт і дані.',
            'Щоб уникнути випадкового видалення, додаток просить підтвердження перед завершенням операції.',
          ],
        },
        {
          title: 'Що видаляється',
          body: [
            'Акаунт додатка, хмарний архів, особисті відповіді, спільні відповіді, пов’язані ініціали і дані синхронізації.',
            'Локальні відповіді на цьому пристрої видаляються під час видалення акаунта.',
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
          body: [
            `По вопросам приватности напиши на ${supportEmail}. Удаление аккаунта запускается со страницы Удаление аккаунта и данных внутри приложения.`,
          ],
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
      updated: 'Последнее обновление: 8 июня 2026',
      profileTitle: 'Удаление аккаунта и данных',
      profileText: 'Удали аккаунт, облачные ответы и связанные данные из приложения.',
      intro:
        'Если ты используешь вход через Google или Apple, можно удалить аккаунт приложения и связанные данные внутри приложения без email или обращения в поддержку.',
      sections: [
        {
          title: 'Как удалить аккаунт и данные',
          body: [
            'Войди из Профиля, открой эту страницу и используй кнопку Удалить аккаунт и данные.',
            'Чтобы избежать случайного удаления, приложение просит подтверждение перед завершением операции.',
          ],
        },
        {
          title: 'Что удаляется',
          body: [
            'Аккаунт приложения, облачный архив, личные ответы, общие ответы, связанные инициалы и данные синхронизации.',
            'Локальные ответы на этом устройстве удаляются во время удаления аккаунта.',
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
          body: [
            `Para solicitudes de privacidad, escribe a ${supportEmail}. La eliminación de cuenta empieza desde la página Eliminación de cuenta y datos dentro de la app.`,
          ],
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
      updated: 'Última actualización: 8 de junio de 2026',
      profileTitle: 'Eliminación de cuenta y datos',
      profileText: 'Elimina desde la app tu cuenta, respuestas cloud y datos asociados.',
      intro:
        'Si usas acceso con Google o Apple, puedes eliminar desde la app la cuenta y los datos asociados sin enviar email ni contactar soporte.',
      sections: [
        {
          title: 'Cómo eliminar cuenta y datos',
          body: [
            'Entra desde Perfil, abre esta página y usa el botón Eliminar cuenta y datos.',
            'Para evitar eliminaciones accidentales, la app pide confirmación antes de completar la operación.',
          ],
        },
        {
          title: 'Qué se elimina',
          body: [
            'Cuenta de la app, archivo cloud, respuestas personales, respuestas compartidas, iniciales asociadas y datos de sincronización.',
            'Las respuestas locales guardadas en este dispositivo se eliminan durante la eliminación de cuenta.',
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
