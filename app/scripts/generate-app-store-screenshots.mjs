import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');
const assetsDir = path.join(rootDir, 'release', 'app-store-assets');
const sourceDir = path.join(assetsDir, '.source');
const htmlPath = path.join(sourceDir, 'screenshot.html');
const deviceProfiles = [
  {
    deviceClass: 'iphone',
    height: 896,
    key: 'iphone-65',
    label: 'iPhone 6.5"',
    scale: 3,
    width: 414,
  },
  {
    deviceClass: 'ipad',
    height: 1366,
    key: 'ipad-13',
    label: 'iPad 13"',
    scale: 2,
    width: 1024,
  },
];

const loraRegular = pathToFileURL(
  path.join(rootDir, 'node_modules', '@expo-google-fonts', 'lora', '400Regular', 'Lora_400Regular.ttf')
).href;
const loraMedium = pathToFileURL(
  path.join(rootDir, 'node_modules', '@expo-google-fonts', 'lora', '500Medium', 'Lora_500Medium.ttf')
).href;
const loraSemiBold = pathToFileURL(
  path.join(rootDir, 'node_modules', '@expo-google-fonts', 'lora', '600SemiBold', 'Lora_600SemiBold.ttf')
).href;
const loraBold = pathToFileURL(
  path.join(rootDir, 'node_modules', '@expo-google-fonts', 'lora', '700Bold', 'Lora_700Bold.ttf')
).href;
const logoUrl = pathToFileURL(path.join(rootDir, 'assets', 'images', 'via-la-maschera-logo-header-light.png')).href;

const slides = [
  {
    file: '01-domanda-quotidiana.png',
    tone: 'light',
    accent: '#523071',
    eyebrow: 'Rituale quotidiano',
    title: 'Una domanda al giorno',
    subtitle: 'Rispondi senza fretta, poi sigilla ciò che hai trovato.',
    screen: 'home',
  },
  {
    file: '02-risposta-sigillata.png',
    tone: 'dark',
    accent: '#F5C26B',
    eyebrow: 'Distanza gentile',
    title: 'La risposta aspetta',
    subtitle: 'Ritrovala dopo un tempo di silenzio, quando puoi leggerla con occhi nuovi.',
    screen: 'sealed',
  },
  {
    file: '03-archivio-personale.png',
    tone: 'teal',
    accent: '#176B5A',
    eyebrow: 'Archivio privato',
    title: 'Le tue tracce restano tue',
    subtitle: 'Domande, risposte e riflessioni ordinate in uno spazio personale.',
    screen: 'archive',
  },
  {
    file: '04-percorsi-emotivi.png',
    tone: 'blue',
    accent: '#315E9C',
    eyebrow: 'Percorsi emotivi',
    title: 'Osserva le maschere che attraversi',
    subtitle: 'Ogni domanda appartiene a un percorso: controllo, bisogno, desiderio, appartenenza.',
    screen: 'paths',
  },
  {
    file: '05-lingue-tema.png',
    tone: 'light',
    accent: '#B4234F',
    eyebrow: 'Accessibile e leggibile',
    title: 'Cinque lingue, due atmosfere',
    subtitle: 'Italiano, inglese, ucraino, russo e spagnolo. Tema chiaro o scuro.',
    screen: 'profile',
  },
  {
    file: '06-condivisione-protetta.png',
    tone: 'darkTeal',
    accent: '#8AE0C3',
    eyebrow: 'Consenso prima di tutto',
    title: 'Condividi solo se vuoi',
    subtitle: 'Le altre risposte si aprono solo dopo la tua, mostrando soltanto le iniziali.',
    screen: 'shared',
  },
];

function findChrome() {
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return process.env.CHROME_PATH;
  }

  const candidates = [
    path.join(process.env.ProgramFiles ?? '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env['ProgramFiles(x86)'] ?? '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.LOCALAPPDATA ?? '', 'Google', 'Chrome', 'Application', 'chrome.exe'),
    path.join(process.env.ProgramFiles ?? '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
    path.join(process.env['ProgramFiles(x86)'] ?? '', 'Microsoft', 'Edge', 'Application', 'msedge.exe'),
  ];

  const chrome = candidates.find((candidate) => candidate && fs.existsSync(candidate));

  if (!chrome) {
    throw new Error('Chrome or Edge was not found. Set CHROME_PATH to the browser executable.');
  }

  return chrome;
}

function readPngSize(filePath) {
  const buffer = fs.readFileSync(filePath);

  if (buffer.toString('ascii', 1, 4) !== 'PNG') {
    throw new Error(`${filePath} is not a PNG file.`);
  }

  return {
    width: buffer.readUInt32BE(16),
    height: buffer.readUInt32BE(20),
  };
}

function renderScreen(name) {
  if (name === 'home') {
    return `
      <section class="app-screen">
        <div class="hero">
          <img src="${logoUrl}" alt="" />
          <p class="kicker">Domanda del giorno</p>
          <h2>Che cosa stai proteggendo dietro la tua maschera oggi?</h2>
          <div class="chips"><span>Privato</span><span>24 ore</span></div>
        </div>
        <div class="panel ritual">
          <div class="panel-head"><strong>Specchio del giorno</strong><span>Aperta</span></div>
          <p class="path"><i></i> Maschera del controllo</p>
          <div class="textarea">Scrivi qui la tua risposta, con il tempo che merita.</div>
          <div class="share"><b>Condivisione protetta</b><small>Solo con consenso, solo con iniziali.</small></div>
          <button>Sigilla la risposta</button>
        </div>
      </section>`;
  }

  if (name === 'sealed') {
    return `
      <section class="app-screen dark-screen">
        <div class="hero">
          <img src="${logoUrl}" alt="" />
          <p class="kicker">Risposta sigillata</p>
          <h2>Hai lasciato una traccia. Ora può riposare.</h2>
          <div class="chips"><span>Rilettura</span><span>Domani</span></div>
        </div>
        <div class="panel sealed">
          <div class="lock">Lock</div>
          <h3>Si riapre tra 23h</h3>
          <p>La distanza non cancella: rende più nitido quello che hai scritto.</p>
          <div class="reflection">
            <strong>Promemoria</strong>
            <span>Quando torni, leggi con gentilezza. Non devi correggerti, solo ascoltarti.</span>
          </div>
        </div>
      </section>`;
  }

  if (name === 'archive') {
    return `
      <section class="app-screen">
        <div class="hero archive-hero">
          <img src="${logoUrl}" alt="" />
          <p class="kicker">Archivio</p>
          <h2>Ritrova le risposte quando sono pronte.</h2>
        </div>
        <div class="stats">
          <div><b>12</b><span>risposte</span></div>
          <div><b>8</b><span>aperte</span></div>
          <div><b>4</b><span>in attesa</span></div>
        </div>
        <div class="entry"><span>Aperta</span><h3>Che cosa stai evitando di dire?</h3><p>Ho capito che il silenzio, a volte, è una forma di paura.</p></div>
        <div class="entry muted"><span>Sigillata</span><h3>Quale parte di te chiede spazio?</h3><p>Riflessione disponibile tra 6h.</p></div>
      </section>`;
  }

  if (name === 'paths') {
    return `
      <section class="app-screen">
        <div class="hero paths-hero">
          <img src="${logoUrl}" alt="" />
          <p class="kicker">Percorsi</p>
          <h2>Ogni domanda illumina una maschera.</h2>
        </div>
        <div class="path-card selected"><i></i><span>18 domande</span><h3>Controllo</h3><p>Quando hai bisogno di tenere tutto in ordine.</p></div>
        <div class="path-card"><i></i><span>15 domande</span><h3>Bisogno</h3><p>Quello che chiedi senza riuscire a nominarlo.</p></div>
        <div class="questions">
          <strong>Domande da attraversare</strong>
          <p>Che cosa temi accada se lasci andare?</p>
          <p>Dove confondi sicurezza e rigidità?</p>
        </div>
      </section>`;
  }

  if (name === 'profile') {
    return `
      <section class="app-screen profile-screen">
        <div class="hero profile-hero">
          <img src="${logoUrl}" alt="" />
          <p class="kicker">Profilo</p>
          <h2>Leggibile nella lingua e nella luce giusta.</h2>
        </div>
        <div class="panel">
          <h3>Tema</h3>
          <div class="segments"><span class="active">Chiaro</span><span>Scuro</span></div>
        </div>
        <div class="panel">
          <h3>Lingua</h3>
          <div class="langs"><span>Italiano</span><span>English</span><span>Українська</span><span>Русский</span><span>Español</span></div>
        </div>
        <div class="privacy-row"><b>Archivio privato</b><p>Accesso Google e Apple per conservare le risposte nel tuo spazio.</p></div>
      </section>`;
  }

  return `
    <section class="app-screen dark-screen">
      <div class="hero shared-hero">
        <img src="${logoUrl}" alt="" />
        <p class="kicker">Stanza condivisa</p>
        <h2>Prima rispondi. Poi, se vuoi, ascolti gli altri.</h2>
      </div>
      <div class="panel shared">
        <div class="shared-answer"><b>MR</b><p>Mi sono accorta che cercavo approvazione dove avrei voluto presenza.</p><span>Segnala</span></div>
        <div class="shared-answer"><b>AS</b><p>Ho scritto meno, ma ho capito di più.</p><span>Segnala</span></div>
        <div class="consent"><strong>Consenso attivo</strong><small>Visibili solo le iniziali. Ogni risposta può essere segnalata.</small></div>
      </div>
    </section>`;
}

function buildHtml() {
  const slideJson = JSON.stringify(slides);
  const screenJson = JSON.stringify({
    archive: renderScreen('archive'),
    home: renderScreen('home'),
    paths: renderScreen('paths'),
    profile: renderScreen('profile'),
    sealed: renderScreen('sealed'),
    shared: renderScreen('shared'),
  });

  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<style>
@font-face { font-family: Lora; src: url("${loraRegular}"); font-weight: 400; }
@font-face { font-family: Lora; src: url("${loraMedium}"); font-weight: 500; }
@font-face { font-family: Lora; src: url("${loraSemiBold}"); font-weight: 600; }
@font-face { font-family: Lora; src: url("${loraBold}"); font-weight: 700; }
:root {
  --ink: #211827;
  --muted: #6D6474;
  --surface: #FFFFFF;
  --surface-alt: #FCF8FD;
  --border: #E1D7E8;
  --primary: #523071;
  --teal: #176B5A;
  --warm: #A85D16;
}
* { box-sizing: border-box; }
html, body, #root { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #F7F3F8; }
body { font-family: Lora, Georgia, serif; }
.slide { position: fixed; inset: 0; width: 100vw; height: 100vh; overflow: hidden; color: var(--ink); background: #F7F3F8; }
.slide::before { content: ""; position: absolute; inset: 0; background: linear-gradient(155deg, rgba(82,48,113,.14), transparent 42%), linear-gradient(335deg, rgba(23,107,90,.13), transparent 45%); }
.slide.dark, .slide.darkTeal { color: #F8F1FF; background: #100B14; }
.slide.teal { background: #EEF8F2; }
.slide.blue { background: #EEF3FA; }
.slide.dark::before { background: linear-gradient(155deg, rgba(217,184,255,.13), transparent 43%), linear-gradient(335deg, rgba(245,194,107,.12), transparent 45%); }
.slide.darkTeal::before { background: linear-gradient(155deg, rgba(138,224,195,.12), transparent 45%), linear-gradient(335deg, rgba(82,48,113,.24), transparent 44%); }
.story { position: relative; z-index: 1; height: 100%; padding: 54px 27px 28px; display: flex; flex-direction: column; gap: 20px; }
.story-header { min-height: 204px; display: flex; flex-direction: column; justify-content: flex-end; gap: 10px; }
.eyebrow { margin: 0; color: var(--accent); font-weight: 700; font-size: 12px; letter-spacing: 0; text-transform: uppercase; }
.dark .eyebrow, .darkTeal .eyebrow { color: var(--accent); }
h1 { margin: 0; font-size: 38px; line-height: 1.06; letter-spacing: 0; max-width: 350px; }
.subtitle { margin: 0; color: var(--muted); font-size: 16px; line-height: 1.45; max-width: 344px; }
.dark .subtitle, .darkTeal .subtitle { color: #D8CBDF; }
.device { flex: 1; min-height: 0; border: 8px solid #211827; border-radius: 42px; background: #211827; box-shadow: 0 26px 60px rgba(33,24,39,.24); overflow: hidden; }
.dark .device, .darkTeal .device { border-color: #EEE6F6; box-shadow: 0 26px 70px rgba(0,0,0,.34); }
.app-screen { height: 100%; background: #F7F3F8; overflow: hidden; padding-bottom: 20px; }
.dark-screen { background: #100B14; color: #F8F1FF; }
.hero { min-height: 224px; padding: 28px 20px 20px; color: white; background: #1E102C; }
.archive-hero { background: #173B33; }
.paths-hero { background: #263A4F; }
.profile-hero { background: #251433; }
.shared-hero { background: #0B2A23; }
.hero img { width: 48px; height: 48px; padding: 6px; border: 1px solid rgba(255,255,255,.22); border-radius: 8px; background: rgba(255,255,255,.12); }
.hero .kicker { margin: 14px 0 7px; color: #F4E8FF; font-size: 10px; font-weight: 700; text-transform: uppercase; }
.hero h2 { margin: 0; max-width: 292px; font-size: 21px; line-height: 1.18; letter-spacing: 0; overflow-wrap: break-word; }
.chips { display: flex; gap: 6px; margin-top: 13px; }
.chips span, .panel-head span, .entry span, .path-card span { border-radius: 999px; padding: 5px 9px; font-size: 10px; font-weight: 700; background: rgba(255,255,255,.17); }
.panel, .entry, .path-card, .questions, .privacy-row { margin: 12px; padding: 14px; background: #fff; border: 1px solid #E1D7E8; border-radius: 8px; color: #211827; box-shadow: 0 8px 18px rgba(33,24,39,.07); }
.dark-screen .panel { background: #1B1322; border-color: #40304B; color: #F8F1FF; }
.panel-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; font-size: 14px; }
.panel-head span { color: #523071; background: #F0E7F6; }
.path { display: flex; align-items: center; gap: 8px; margin: 12px 0; color: #176B5A; font-size: 13px; font-weight: 600; }
i { display: inline-block; width: 36px; height: 10px; background: currentColor; border-radius: 999px; }
.textarea { min-height: 112px; padding: 12px; border: 1px solid #C9B7D6; border-radius: 8px; color: #6D6474; background: #FCF8FD; font-size: 14px; line-height: 1.45; }
.share, .reflection, .consent { margin-top: 10px; padding: 11px; border-radius: 8px; background: #DFF5EE; color: #176B5A; font-size: 12px; display: grid; gap: 3px; }
button { width: 100%; height: 46px; margin-top: 12px; border: 0; border-radius: 8px; color: white; background: #523071; font: 700 14px Lora; }
.lock { width: 46px; height: 46px; border-radius: 50%; display: grid; place-items: center; background: #FFF2DA; color: #A85D16; font-size: 0; }
.lock::before { content: "●"; font-size: 20px; }
.sealed h3, .panel h3 { margin: 8px 0 6px; font-size: 21px; }
.sealed p, .entry p, .path-card p, .questions p, .privacy-row p { margin: 0; color: #6D6474; font-size: 13px; line-height: 1.45; }
.dark-screen .sealed p, .dark-screen .consent small { color: #D8CBDF; }
.stats { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin: 12px; }
.stats div { padding: 12px 9px; border: 1px solid #E1D7E8; border-radius: 8px; background: #fff; }
.stats b { display: block; color: #523071; font-size: 27px; line-height: 1; }
.stats span { display: block; margin-top: 4px; color: #6D6474; font-size: 10px; font-weight: 700; text-transform: uppercase; }
.entry h3 { margin: 8px 0 6px; font-size: 17px; line-height: 1.22; }
.entry span { color: #176B5A; background: #DFF5EE; }
.entry.muted span { color: #A85D16; background: #FFF2DA; }
.path-card { position: relative; }
.path-card.selected { border-width: 2px; border-color: #315E9C; background: #F8FBFF; }
.path-card i { color: #315E9C; }
.path-card h3 { margin: 10px 0 5px; font-size: 20px; }
.path-card span { float: right; color: #523071; background: #F0E7F6; }
.questions strong { display: block; margin-bottom: 8px; color: #315E9C; font-size: 14px; }
.questions p { padding: 10px; margin-top: 7px; background: #F7F3F8; border-radius: 8px; }
.segments { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.segments span, .langs span { min-height: 38px; display: grid; place-items: center; border: 1px solid #E1D7E8; border-radius: 8px; color: #523071; background: #FCF8FD; font-size: 13px; font-weight: 700; }
.segments .active, .langs span:first-child { color: white; background: #523071; border-color: #523071; }
.langs { display: flex; flex-wrap: wrap; gap: 8px; }
.langs span { padding: 0 10px; }
.profile-screen .hero { min-height: 196px; }
.profile-screen .panel { padding: 12px; }
.profile-screen .panel h3 { margin: 4px 0 9px; font-size: 19px; }
.profile-screen .segments span, .profile-screen .langs span { min-height: 32px; font-size: 11px; }
.profile-screen .privacy-row { padding: 12px; }
.privacy-row b { color: #176B5A; }
.shared-answer { display: grid; grid-template-columns: 40px 1fr; gap: 10px; padding: 11px; border: 1px solid #40304B; border-radius: 8px; background: #25192E; }
.shared-answer + .shared-answer { margin-top: 10px; }
.shared-answer b { width: 34px; height: 34px; display: grid; place-items: center; border-radius: 50%; color: #100B14; background: #8AE0C3; font-size: 12px; }
.shared-answer p { margin: 0; color: #F8F1FF; font-size: 13px; line-height: 1.42; }
.shared-answer span { grid-column: 2; color: #C7B8D0; font-size: 11px; font-weight: 700; }
.format-ipad .story { padding: 92px 96px 72px; gap: 34px; }
.format-ipad .story-header { min-height: 350px; gap: 16px; }
.format-ipad .eyebrow { font-size: 22px; }
.format-ipad h1 { max-width: 780px; font-size: 72px; line-height: 1.05; }
.format-ipad .subtitle { max-width: 790px; font-size: 30px; line-height: 1.4; }
.format-ipad .device { border-width: 10px; border-radius: 36px; max-height: 790px; }
.format-ipad .hero { min-height: 266px; padding: 42px 44px 28px; }
.format-ipad .hero img { width: 58px; height: 58px; }
.format-ipad .hero .kicker { margin-top: 20px; font-size: 15px; }
.format-ipad .hero h2 { max-width: 780px; font-size: 36px; }
.format-ipad .panel, .format-ipad .entry, .format-ipad .path-card, .format-ipad .questions, .format-ipad .privacy-row { margin: 18px; padding: 22px; }
.format-ipad .stats { margin: 18px; gap: 14px; }
.format-ipad .stats div { padding: 20px; }
.format-ipad .stats b { font-size: 42px; }
.format-ipad .stats span, .format-ipad .path-card span, .format-ipad .entry span { font-size: 14px; }
.format-ipad .panel h3, .format-ipad .path-card h3 { font-size: 30px; }
.format-ipad .entry h3 { font-size: 28px; }
.format-ipad .sealed p, .format-ipad .entry p, .format-ipad .path-card p, .format-ipad .questions p, .format-ipad .privacy-row p, .format-ipad .textarea { font-size: 21px; }
.format-ipad .shared-answer { grid-template-columns: 62px 1fr; gap: 18px; padding: 20px; }
.format-ipad .shared-answer b { width: 54px; height: 54px; font-size: 20px; }
.format-ipad .shared-answer p { font-size: 22px; }
.format-ipad .segments span, .format-ipad .langs span { min-height: 54px; font-size: 20px; }
</style>
</head>
<body>
<main id="root"></main>
<script>
const slides = ${slideJson};
const screens = ${screenJson};
const backgrounds = { blue: '#EEF3FA', dark: '#100B14', darkTeal: '#100B14', light: '#F7F3F8', teal: '#EEF8F2' };
const params = new URLSearchParams(location.search);
const slide = slides[Number(params.get('slide') || 0)] || slides[0];
const device = params.get('device') || 'iphone';
document.documentElement.style.setProperty('--accent', slide.accent);
document.documentElement.style.background = backgrounds[slide.tone] || backgrounds.light;
document.body.style.background = backgrounds[slide.tone] || backgrounds.light;
document.getElementById('root').innerHTML = '<section class="slide ' + slide.tone + ' format-' + device + '"><div class="story"><header class="story-header"><p class="eyebrow">' + slide.eyebrow + '</p><h1>' + slide.title + '</h1><p class="subtitle">' + slide.subtitle + '</p></header><div class="device">' + screens[slide.screen] + '</div></div></section>';
</script>
</body>
</html>`;
}

function main() {
  fs.mkdirSync(sourceDir, { recursive: true });
  fs.writeFileSync(htmlPath, buildHtml(), 'utf8');

  const chrome = findChrome();
  const htmlUrl = pathToFileURL(htmlPath).href;

  for (const profile of deviceProfiles) {
    const outputDir = path.join(assetsDir, profile.key);
    const expectedWidth = profile.width * profile.scale;
    const expectedHeight = profile.height * profile.scale;

    fs.mkdirSync(outputDir, { recursive: true });

    for (const [index, slide] of slides.entries()) {
      const outputPath = path.join(outputDir, slide.file);
      const result = spawnSync(chrome, [
        '--headless=new',
        '--disable-gpu',
        '--no-first-run',
        '--no-default-browser-check',
        '--hide-scrollbars',
        '--run-all-compositor-stages-before-draw',
        `--window-size=${profile.width},${profile.height}`,
        `--force-device-scale-factor=${profile.scale}`,
        `--screenshot=${outputPath}`,
        `${htmlUrl}?slide=${index}&device=${profile.deviceClass}`,
      ], { encoding: 'utf8' });

      if (result.status !== 0) {
        throw new Error(result.stderr || result.stdout || `Chrome failed for ${profile.key}/${slide.file}`);
      }

      const size = readPngSize(outputPath);

      if (size.width !== expectedWidth || size.height !== expectedHeight) {
        throw new Error(`${slide.file} is ${size.width}x${size.height}, expected ${expectedWidth}x${expectedHeight}.`);
      }

      console.log(`created ${path.relative(rootDir, outputPath)} (${size.width}x${size.height}, ${profile.label})`);
    }
  }
}

main();
