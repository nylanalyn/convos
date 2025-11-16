const avatarIcons = [
  'fas fa-anchor',
  'fas fa-atom',
  'fas fa-award',
  'fas fa-balance-scale',
  'fas fa-baseball-ball',
  'fas fa-basketball-ball',
  'fas fa-bicycle',
  'fas fa-bolt',
  'fas fa-book-reader',
  'fas fa-candy-cane',
  'fas fa-carrot',
  'fas fa-cat',
  'fas fa-chess-knight',
  'fas fa-child',
  'fas fa-coffee',
  'fas fa-cookie-bite',
  'fas fa-crow',
  'fas fa-dice',
  'fas fa-dog',
  'fas fa-dove',
  'fas fa-feather',
  'fas fa-fish',
  'fas fa-gem',
  'fas fa-ghost',
  'fas fa-hard-hat',
  'fas fa-hat-cowboy',
  'fas fa-hat-wizard',
  'fas fa-hiking',
  'fas fa-horse-head',
  'fas fa-horse',
  'fas fa-id-badge',
  'fas fa-igloo',
  'fas fa-mask',
  'fas fa-meteor',
  'fas fa-paint-brush',
  'fas fa-paw',
  'fas fa-pepper-hot',
  'fas fa-pizza-slice',
  'fas fa-portrait',
  'fas fa-puzzle-piece',
  'fas fa-rainbow',
  'fas fa-robot',
  'fas fa-rocket',
  'fas fa-running',
  'fas fa-seedling',
  'fas fa-skating',
  'fas fa-skiing',
  'fas fa-smile',
  'fas fa-snowboarding',
  'fas fa-snowflake',
  'fas fa-snowman',
  'fas fa-swimmer',
  'fas fa-umbrella',
  'fas fa-user-astronaut',
  'fas fa-user-graduate',
  'fas fa-user-ninja',
  'fas fa-user-secret',
  'fas fa-walking',
  'fas fa-yin-yang',
];

const AVATAR_COUNT = avatarIcons.length;

export function avatarIndexFromKey(str = '') {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
    hash = hash & hash;
  }

  hash = Math.abs(hash);
  return hash % AVATAR_COUNT;
}

export function normalizeAvatarId(id) {
  if (!Number.isInteger(id)) return undefined;
  const normalized = ((id % AVATAR_COUNT) + AVATAR_COUNT) % AVATAR_COUNT;
  return normalized;
}

export function avatarClassFromId(id) {
  const normalized = normalizeAvatarId(id);
  return avatarIcons[typeof normalized === 'number' ? normalized : 0];
}

export function avatarClassForKey(str, avatarId) {
  const normalized = normalizeAvatarId(avatarId);
  const index = typeof normalized === 'number' ? normalized : avatarIndexFromKey(str);
  return avatarIcons[index];
}

export function avatarOptions() {
  return avatarIcons.map((className, id) => ({className, id}));
}

export {avatarIcons};
