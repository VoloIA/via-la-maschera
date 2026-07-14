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
    acceptText: 'Accetto i termini e le regole della community prima di condividere.',
    backToProfile: 'Torna al Profilo',
    kicker: 'Community',
    linkText: 'Leggi termini e regole',
    loginAcceptText: 'Accetto i termini e le regole della community prima di accedere.',
    profileTitle: 'Termini e regole community',
    profileText: 'Leggi le regole su condivisione, moderazione e uso del servizio.',
    title: 'Termini e regole community',
    updated: 'Ultimo aggiornamento: 5 maggio 2026',
    intro:
      'La condivisione è sempre facoltativa. Se condividi una risposta, saranno visibili solo le tue iniziali. Queste regole aiutano a mantenere la community sicura e rispettosa.',
    sections: [
      {
        title: 'Uso dell’app',
        body: [
          'L’app è uno strumento di riflessione personale.',
          'Non sostituisce diagnosi, terapia, consulenza medica, consulenza psicologica professionale o interventi di emergenza.',
        ],
      },
      {
        title: 'Condivisione con la community',
        body: [
          'La condivisione è facoltativa e può essere revocata dall’Archivio.',
          'Le altre persone vedono solo le iniziali e solo dopo aver risposto alla stessa domanda.',
          'Non condividere dati personali tuoi o di altre persone, come indirizzi, numeri di telefono o informazioni mediche. Non pubblicare contenuti che vuoi mantenere privati.',
        ],
      },
      {
        title: 'Contenuti non ammessi',
        body: [
          'C’è tolleranza zero verso contenuti offensivi, abusivi o pericolosi.',
          'Non sono ammessi minacce, molestie, odio, contenuti sessuali espliciti, contenuti violenti, illegalità, sfruttamento, bullismo o attacchi verso persone o gruppi.',
          'Non usare la community per identificare, umiliare o prendere di mira qualcuno.',
        ],
      },
      {
        title: 'Moderazione',
        body: [
          'Puoi segnalare qualsiasi risposta condivisa direttamente dall’app.',
          'Puoi bloccare l’autore di una risposta: il contenuto scompare subito dal tuo dispositivo e viene inviato alla moderazione.',
          'Le segnalazioni vengono esaminate entro 24 ore. I contenuti che violano le regole possono essere rimossi e gli utenti responsabili esclusi dalla community.',
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
    profileText: 'Read the rules for sharing, moderation, and use of the service.',
    title: 'Terms and Community Rules',
    updated: 'Last updated: May 5, 2026',
    intro:
      'Sharing is always optional. If you share an answer, only your initials will be visible. These rules help keep the community safe and respectful.',
    sections: [
      {
        title: 'Use of the app',
        body: [
          'The app is a tool for personal reflection.',
          'It does not replace diagnosis, therapy, medical advice, professional psychological support, or emergency services.',
        ],
      },
      {
        title: 'Sharing with the community',
        body: [
          'Sharing is optional and can be revoked from the Archive.',
          'Other people see initials only and only after answering the same question.',
          'Do not share personal data about yourself or others, such as addresses, phone numbers, or medical information. Do not post content you want to keep private.',
        ],
      },
      {
        title: 'Content not allowed',
        body: [
          'There is zero tolerance for objectionable, abusive, or dangerous content.',
          'Threats, harassment, hate, explicit sexual content, violent content, illegality, exploitation, bullying, or attacks against people or groups are not allowed.',
          'Do not use the community to identify, humiliate, or target anyone.',
        ],
      },
      {
        title: 'Moderation',
        body: [
          'You can report any shared answer directly in the app.',
          'You can block the author of an answer. The content disappears from your device immediately and is sent to moderation.',
          'Reports are reviewed within 24 hours. Content that violates these rules may be removed, and responsible users may be removed from the community.',
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
