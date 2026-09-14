// ─── Types ───────────────────────────────────────────────────────────────────

export interface ProjectData {
  id: string
  index: number
  icon: string
  title: string
  subtitle: string
  description: string
  tech: string[]
  accent: string
  glowClass: 'glow-violet' | 'glow-blue' | 'glow-green'
  category: 'school' | 'personal'
  year: string
}

// ─── Projets Scolaires ───────────────────────────────────────────────────────
// Note: présentés dans l'ordre chronologique de progression

export const schoolProjects: ProjectData[] = [
  {
    id: 'tpgs1',
    index: 0,
    icon: '📄',
    title: 'Première Page Web',
    subtitle: 'HTML & Bootstrap — Initiation',
    description: 'Mon tout premier TP web. Une page simple avec des titres, un menu et un formulaire. Le code est basique, quelques balises mal fermées, mais c\'est là que tout a commencé.',
    tech: ['HTML', 'Bootstrap'],
    accent: '#7B61FF',
    glowClass: 'glow-violet',
    category: 'school',
    year: '2024',
  },
  {
    id: 'tp3-iframe',
    index: 1,
    icon: '🗂️',
    title: 'Site Multi-Pages à Iframes',
    subtitle: 'Navigation par iframes — Structure HTML',
    description: 'Un site de présentation avec un sommaire latéral fixe et une zone de contenu en iframe. Pas le plus élégant techniquement, mais j\'ai compris la navigation multi-pages.',
    tech: ['HTML', 'CSS', 'Iframes'],
    accent: '#0A84FF',
    glowClass: 'glow-blue',
    category: 'school',
    year: '2024',
  },
  {
    id: 'tp6-form',
    index: 2,
    icon: '📬',
    title: 'Formulaire de Contact CSS',
    subtitle: 'Mise en forme et validation HTML',
    description: 'Formulaire avec champs Nom, Email, Téléphone et Message. Premier vrai travail de mise en page CSS : centrage, couleurs, hover. Le rendu était propre pour l\'époque.',
    tech: ['HTML', 'CSS'],
    accent: '#30D158',
    glowClass: 'glow-green',
    category: 'school',
    year: '2024',
  },
  {
    id: 'tp11-js',
    index: 3,
    icon: '⚙️',
    title: 'Initiation JavaScript',
    subtitle: 'Fonctions, conditions, DOM',
    description: 'Premiers scripts JS : calculer une moyenne, tester un âge, changer une couleur au clic. Simple, mais c\'est le moment où la logique de programmation a commencé à faire sens.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    accent: '#FF9F0A',
    glowClass: 'glow-violet',
    category: 'school',
    year: '2024',
  },
  {
    id: 'php-reservations',
    index: 4,
    icon: '🚌',
    title: 'Gestion de Réservations',
    subtitle: 'PHP & MySQL — CRUD voitures / chauffeurs',
    description: 'Application web pour gérer des réservations de cars touristiques. Menu de navigation, affichage depuis une base SQL, requêtes PHP. Premier vrai projet backend fonctionnel.',
    tech: ['PHP', 'MySQL', 'HTML', 'CSS'],
    accent: '#FF375F',
    glowClass: 'glow-green',
    category: 'school',
    year: '2025',
  },
  {
    id: 'centre-formation',
    index: 5,
    icon: '🎓',
    title: 'Plateforme Centre de Formation',
    subtitle: 'App multi-rôles PHP/MySQL — Admin / Enseignant / Étudiant',
    description: 'Système de gestion complet avec authentification, trois niveaux d\'accès distincts, gestion des modules, étudiants et enseignants. Architecture MVC partielle, CSS responsive. Le projet le plus ambitieux du BTS.',
    tech: ['PHP', 'MySQL', 'CSS', 'Sessions', 'RBAC'],
    accent: '#64D2FF',
    glowClass: 'glow-blue',
    category: 'school',
    year: '2025',
  },
  {
    id: 'windows-server-lab',
    index: 6,
    icon: '🖥️',
    title: 'Lab Windows Server',
    subtitle: 'Active Directory, DNS, DHCP Failover, GPO — PowerShell',
    description: 'Déploiement automatisé d\'une infrastructure réseau complète sur 3 serveurs Windows. Scripts PowerShell pour le routage NAT, Active Directory, DHCP avec basculement et stratégies de groupe. Le projet infra qui m\'a vraiment mis en confiance.',
    tech: ['Windows Server', 'PowerShell', 'Active Directory', 'DNS', 'DHCP'],
    accent: '#30D158',
    glowClass: 'glow-green',
    category: 'school',
    year: '2025',
  },
]

// ─── Projets Personnels ───────────────────────────────────────────────────────

export const personalProjects: ProjectData[] = [
  {
    id: 'upside-down',
    index: 0,
    icon: '🌀',
    title: 'Portfolio "The Upside Down"',
    subtitle: 'Stranger Things — HTML/CSS/JS vanilla',
    description: 'Mon premier vrai portfolio perso. Ambiance Stranger Things, effets sonores (Kate Bush, thème de la série), portal animé en CSS. Code JS maison sans framework. Beaucoup de `getElementById` et de `addEventListener`, mais ça marche.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Web Audio API'],
    accent: '#FF375F',
    glowClass: 'glow-violet',
    category: 'personal',
    year: '2024',
  },
  {
    id: 'disney-cast',
    index: 1,
    icon: '✨',
    title: 'Portfolio Disney Cast Member',
    subtitle: 'Candidature interactive — Vidéo, Canvas, Particules',
    description: 'Portfolio de candidature pour Disney avec intro vidéo plein écran, particules magiques sur Canvas, glassmorphism et mood manager. Un des projets perso les plus aboutis côté UI/UX.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Canvas API', 'Video API'],
    accent: '#FFD60A',
    glowClass: 'glow-blue',
    category: 'personal',
    year: '2025',
  },
  {
    id: 'dbz-portfolio',
    index: 2,
    icon: '🐉',
    title: 'DBZ Portfolio',
    subtitle: 'Super Sparking Zero — Canvas aura, Scouter HUD',
    description: 'Portfolio thème Dragon Ball Z avec scouter HUD dynamique, aura Canvas animée et fond vidéo combat. Chaque section a son propre "power level". Le genre de projet qui donne envie de continuer.',
    tech: ['HTML', 'CSS', 'JavaScript', 'Canvas API'],
    accent: '#FF9F0A',
    glowClass: 'glow-green',
    category: 'personal',
    year: '2025',
  },
  {
    id: 'omega-os',
    index: 3,
    icon: '🤖',
    title: 'OMEGA OS',
    subtitle: 'Spatial Launcher — Electron, Three.js, MediaPipe',
    description: 'Simulation d\'un OS spatial contrôlable à la main via la webcam. Hand tracking MediaPipe, rendu 3D Three.js, app desktop avec Electron. Un projet ambitieux pour explorer les interfaces du futur.',
    tech: ['Electron', 'Three.js', 'MediaPipe', 'JavaScript', 'CSS'],
    accent: '#7B61FF',
    glowClass: 'glow-violet',
    category: 'personal',
    year: '2025',
  },
]

