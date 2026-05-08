import type { AppLanguageCode } from '@/constants/localization';

type CommunityRulesSection = {
  body: string[];
  title: string;
};

type CommunityRulesContent = {
  acceptText: string;
  backToProfile: string;
  intro: string;
  kicker: string;
  linkText: string;
  loginAcceptText: string;
  profileText: string;
  profileTitle: string;
  sections: CommunityRulesSection[];
  title: string;
  updated: string;
};

export const COMMUNITY_TERMS_VERSION = '2026-05-05';

export const communityRulesCopy: Record<AppLanguageCode, CommunityRulesContent> = {
  it: {
    acceptText: 'Accetto i termini e le regole community prima di condividere.',
    backToProfile: 'Torna al Profilo',
    kicker: 'Community',
    linkText: 'Leggi termini e regole',
    loginAcceptText: 'Accetto i termini e le regole community prima di accedere.',
    profileTitle: 'Termini e regole community',
    profileText: 'Condivisione, moderazione, limiti del servizio e responsabilità dell’utente.',
    title: 'Termini e regole community',
    updated: 'Ultimo aggiornamento: 5 maggio 2026',
    intro:
      'Via la Maschera permette di condividere una risposta solo in modo volontario, con iniziali e dopo una scelta esplicita. Queste regole proteggono il tono della stanza condivisa.',
    sections: [
      {
        title: 'Uso dell’app',
        body: [
          'L’app è uno spazio di riflessione personale e intrattenimento introspettivo.',
          'Non sostituisce diagnosi, terapia, consulenza medica, consulenza psicologica professionale o interventi di emergenza.',
        ],
      },
      {
        title: 'Condivisione nella stanza',
        body: [
          'La condivisione è facoltativa e può essere revocata dall’Archivio.',
          'Le altre persone vedono solo le iniziali e solo dopo aver risposto alla stessa domanda.',
          'Non condividere dati personali tuoi o di altre persone, indirizzi, numeri, informazioni mediche o contenuti che non vuoi rendere leggibili ad altri.',
        ],
      },
      {
        title: 'Contenuti non ammessi',
        body: [
          'C’è tolleranza zero verso contenuti offensivi, abusivi o pericolosi.',
          'Non sono ammessi minacce, molestie, odio, contenuti sessuali espliciti, contenuti violenti, illegalità, sfruttamento, bullismo o attacchi verso persone o gruppi.',
          'Non usare la stanza condivisa per identificare, umiliare o prendere di mira qualcuno.',
        ],
      },
      {
        title: 'Moderazione',
        body: [
          'Ogni voce condivisa può essere segnalata dall’app.',
          'Puoi bloccare l’autore di una voce: la voce sparisce subito dal tuo spazio e viene inviata alla moderazione.',
          'Le segnalazioni vengono esaminate entro 24 ore; i contenuti che violano le regole possono essere rimossi e gli utenti responsabili esclusi dalla stanza condivisa.',
          'Per contattare lo sviluppatore: volodymyr.ilchenko.it@gmail.com.',
        ],
      },
    ],
  },
  en: {
    acceptText: 'I accept the terms and community rules before sharing.',
    backToProfile: 'Back to Profile',
    kicker: 'Community',
    linkText: 'Read terms and rules',
    loginAcceptText: 'I accept the terms and community rules before signing in.',
    profileTitle: 'Terms and community rules',
    profileText: 'Sharing, moderation, service limits, and user responsibility.',
    title: 'Terms and Community Rules',
    updated: 'Last updated: May 5, 2026',
    intro:
      'Via la Maschera lets you share an answer only voluntarily, with initials, and after an explicit choice. These rules protect the tone of the shared room.',
    sections: [
      {
        title: 'Use of the app',
        body: [
          'The app is a space for personal reflection and introspective entertainment.',
          'It does not replace diagnosis, therapy, medical advice, professional psychological support, or emergency services.',
        ],
      },
      {
        title: 'Sharing in the room',
        body: [
          'Sharing is optional and can be revoked from the Archive.',
          'Other people see initials only and only after answering the same question.',
          'Do not share personal data about yourself or others, addresses, phone numbers, medical information, or content you do not want others to read.',
        ],
      },
      {
        title: 'Content not allowed',
        body: [
          'There is zero tolerance for objectionable, abusive, or dangerous content.',
          'Threats, harassment, hate, explicit sexual content, violent content, illegality, exploitation, bullying, or attacks against people or groups are not allowed.',
          'Do not use the shared room to identify, humiliate, or target anyone.',
        ],
      },
      {
        title: 'Moderation',
        body: [
          'Every shared voice can be reported in the app.',
          'You can block the author of a voice: the voice disappears from your space immediately and is sent to moderation.',
          'Reports are reviewed within 24 hours; content that violates these rules may be removed and responsible users may be removed from the shared room.',
          'Developer contact: volodymyr.ilchenko.it@gmail.com.',
        ],
      },
    ],
  },
  uk: {
    acceptText: 'Я приймаю умови та правила спільноти перед поширенням.',
    backToProfile: 'Назад до профілю',
    kicker: 'Спільнота',
    linkText: 'Прочитати умови та правила',
    loginAcceptText: 'Я приймаю умови та правила спільноти перед входом.',
    profileTitle: 'Умови та правила спільноти',
    profileText: 'Поширення, модерація, межі сервісу та відповідальність користувача.',
    title: 'Умови та правила спільноти',
    updated: 'Останнє оновлення: 5 травня 2026',
    intro:
      'Via la Maschera дозволяє поширити відповідь лише добровільно, з ініціалами та після явної згоди. Ці правила захищають тон спільної кімнати.',
    sections: [
      {
        title: 'Використання додатка',
        body: [
          'Додаток є простором для особистого осмислення та інтроспективної розваги.',
          'Він не замінює діагностику, терапію, медичні поради, професійну психологічну підтримку або екстрені служби.',
        ],
      },
      {
        title: 'Поширення у кімнаті',
        body: [
          'Поширення є необов’язковим і його можна скасувати в Архіві.',
          'Інші люди бачать лише ініціали і лише після відповіді на те саме запитання.',
          'Не поширюй персональні дані свої або інших людей, адреси, номери, медичну інформацію або зміст, який не хочеш відкривати іншим.',
        ],
      },
      {
        title: 'Заборонений вміст',
        body: [
          'Є нульова толерантність до образливого, агресивного або небезпечного вмісту.',
          'Не допускаються погрози, переслідування, ненависть, відвертий сексуальний вміст, насильство, незаконні дії, експлуатація, булінг або напади на людей чи групи.',
          'Не використовуй спільну кімнату, щоб ідентифікувати, принижувати або переслідувати когось.',
        ],
      },
      {
        title: 'Модерація',
        body: [
          'Кожен спільний голос можна поскаржити в додатку.',
          'Можна заблокувати автора голосу: голос одразу зникає з твого простору й надсилається на модерацію.',
          'Скарги розглядаються протягом 24 годин; вміст, що порушує правила, може бути видалений, а відповідальних користувачів можуть виключити зі спільної кімнати.',
          'Контакт розробника: volodymyr.ilchenko.it@gmail.com.',
        ],
      },
    ],
  },
  ru: {
    acceptText: 'Я принимаю условия и правила сообщества перед публикацией.',
    backToProfile: 'Назад в профиль',
    kicker: 'Сообщество',
    linkText: 'Прочитать условия и правила',
    loginAcceptText: 'Я принимаю условия и правила сообщества перед входом.',
    profileTitle: 'Условия и правила сообщества',
    profileText: 'Публикация, модерация, границы сервиса и ответственность пользователя.',
    title: 'Условия и правила сообщества',
    updated: 'Последнее обновление: 5 мая 2026',
    intro:
      'Via la Maschera позволяет открыть ответ только добровольно, с инициалами и после явного выбора. Эти правила защищают тон общей комнаты.',
    sections: [
      {
        title: 'Использование приложения',
        body: [
          'Приложение является пространством для личного размышления и интроспективного развлечения.',
          'Оно не заменяет диагностику, терапию, медицинские советы, профессиональную психологическую поддержку или экстренные службы.',
        ],
      },
      {
        title: 'Публикация в комнате',
        body: [
          'Публикация необязательна, и ее можно отменить в Архиве.',
          'Другие люди видят только инициалы и только после ответа на тот же вопрос.',
          'Не публикуй персональные данные о себе или других, адреса, номера, медицинскую информацию или контент, который ты не хочешь показывать другим.',
        ],
      },
      {
        title: 'Запрещенный контент',
        body: [
          'Действует нулевая терпимость к оскорбительному, агрессивному или опасному контенту.',
          'Не допускаются угрозы, преследование, ненависть, откровенный сексуальный контент, насилие, незаконные действия, эксплуатация, буллинг или атаки на людей и группы.',
          'Не используй общую комнату, чтобы идентифицировать, унижать или целенаправленно преследовать кого-либо.',
        ],
      },
      {
        title: 'Модерация',
        body: [
          'Каждый общий голос можно пожаловаться в приложении.',
          'Можно заблокировать автора голоса: голос сразу исчезает из твоего пространства и отправляется на модерацию.',
          'Жалобы рассматриваются в течение 24 часов; контент, нарушающий правила, может быть удален, а ответственные пользователи исключены из общей комнаты.',
          'Контакт разработчика: volodymyr.ilchenko.it@gmail.com.',
        ],
      },
    ],
  },
  es: {
    acceptText: 'Acepto los términos y reglas de comunidad antes de compartir.',
    backToProfile: 'Volver al Perfil',
    kicker: 'Comunidad',
    linkText: 'Leer términos y reglas',
    loginAcceptText: 'Acepto los términos y reglas de comunidad antes de acceder.',
    profileTitle: 'Términos y reglas de comunidad',
    profileText: 'Compartir, moderación, límites del servicio y responsabilidad del usuario.',
    title: 'Términos y reglas de comunidad',
    updated: 'Última actualización: 5 de mayo de 2026',
    intro:
      'Via la Maschera permite compartir una respuesta solo de forma voluntaria, con iniciales y después de una elección explícita. Estas reglas protegen el tono de la sala compartida.',
    sections: [
      {
        title: 'Uso de la app',
        body: [
          'La app es un espacio de reflexión personal y entretenimiento introspectivo.',
          'No sustituye diagnóstico, terapia, consejo médico, apoyo psicológico profesional ni servicios de emergencia.',
        ],
      },
      {
        title: 'Compartir en la sala',
        body: [
          'Compartir es opcional y puede revocarse desde el Archivo.',
          'Las demás personas ven solo iniciales y solo después de responder a la misma pregunta.',
          'No compartas datos personales tuyos o de otras personas, direcciones, números, información médica o contenido que no quieras hacer legible para otros.',
        ],
      },
      {
        title: 'Contenido no permitido',
        body: [
          'Hay tolerancia cero hacia contenido ofensivo, abusivo o peligroso.',
          'No se permiten amenazas, acoso, odio, contenido sexual explícito, violencia, ilegalidad, explotación, bullying ni ataques contra personas o grupos.',
          'No uses la sala compartida para identificar, humillar o dirigir ataques hacia alguien.',
        ],
      },
      {
        title: 'Moderación',
        body: [
          'Cada voz compartida puede denunciarse desde la app.',
          'Puedes bloquear al autor de una voz: la voz desaparece de tu espacio inmediatamente y se envía a moderación.',
          'Las denuncias se revisan en un plazo de 24 horas; el contenido que infrinja estas reglas puede eliminarse y los usuarios responsables pueden ser excluidos de la sala compartida.',
          'Contacto del desarrollador: volodymyr.ilchenko.it@gmail.com.',
        ],
      },
    ],
  },
};
