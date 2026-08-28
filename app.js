// ==========================================
// FIND THE IMPOSTER — Game Logic
// Apple iOS Liquid Glass Edition
// ==========================================

// ==========================================
// WORD BANK
// ==========================================
const WORD_BANK = {
  food: [
    'Pizza', 'Sushi', 'Tacos', 'Burger', 'Pasta', 'Pancakes', 'Ice Cream',
    'Chocolate', 'Coffee', 'Avocado', 'Steak', 'Fries', 'Donut', 'Croissant',
    'Ramen', 'Curry', 'Nachos', 'Milkshake', 'Popcorn', 'Pretzel',
    'Cheesecake', 'Lobster', 'Waffles', 'Smoothie', 'Kebab', 'Pho',
    'Dumpling', 'Tiramisu', 'Burrito', 'Mochi'
  ],
  movies: [
    'Titanic', 'Avatar', 'Inception', 'Jaws', 'Rocky', 'Frozen',
    'Batman', 'Shrek', 'Joker', 'Gladiator', 'Alien', 'Parasite',
    'Aladdin', 'Tenet', 'Interstellar', 'Matrix', 'Ghostbusters',
    'Jumanji', 'Deadpool', 'Bambi', 'Mulan', 'Braveheart', 'Grease',
    'Scarface', 'Coco', 'Moana', 'Ratatouille', 'Twilight', 'Barbie', 'Oppenheimer'
  ],
  places: [
    'Beach', 'Airport', 'Hospital', 'Library', 'Casino', 'Stadium',
    'Mall', 'Gym', 'Church', 'Zoo', 'Museum', 'Restaurant', 'Park',
    'School', 'Prison', 'Hotel', 'Farm', 'Submarine', 'Spaceship',
    'Nightclub', 'Cemetery', 'Circus', 'Bakery', 'Volcano', 'Jungle',
    'Aquarium', 'Theater', 'Lighthouse', 'Treehouse', 'Rooftop'
  ],
  games: [
    'Minecraft', 'Fortnite', 'GTA', 'Mario', 'Zelda', 'Pokemon',
    'Tetris', 'Roblox', 'Valorant', 'Overwatch', 'Halo', 'Doom',
    'Skyrim', 'Elden Ring', 'Apex', 'FIFA', 'Call of Duty', 'Sims',
    'Fallout', 'Portal', 'Undertale', 'Cuphead', 'Sonic', 'Pac-Man',
    'Kirby', 'Destiny', 'Cyberpunk', 'Among Us', 'Fall Guys', 'Rocket League'
  ],
  animals: [
    'Lion', 'Penguin', 'Dolphin', 'Eagle', 'Snake', 'Elephant',
    'Panda', 'Shark', 'Octopus', 'Giraffe', 'Koala', 'Wolf',
    'Tiger', 'Owl', 'Flamingo', 'Chameleon', 'Gorilla', 'Jellyfish',
    'Peacock', 'Hedgehog', 'Kangaroo', 'Crocodile', 'Parrot', 'Sloth',
    'Cheetah', 'Bat', 'Seahorse', 'Raccoon', 'Mantis', 'Axolotl'
  ],
  occupations: [
    'Doctor', 'Astronaut', 'Detective', 'Chef', 'Firefighter', 'Pilot',
    'Surgeon', 'Plumber', 'Spy', 'Pirate', 'Ninja', 'Lifeguard',
    'Mechanic', 'DJ', 'Barista', 'Dentist', 'Lawyer', 'Soldier',
    'Clown', 'Magician', 'Butcher', 'Electrician', 'Farmer', 'Boxer',
    'Dancer', 'Scientist', 'Architect', 'Singer', 'Referee', 'Cowboy'
  ],
  spicy: [
    'Sneaky Link', 'OnlyFans', 'Morning After Pill', 'Walk of Shame',
    'Threesome', 'Body Count', 'Netflix and Chill', 'Sugar Mommy',
    'Freaky Friday', 'Sexting', 'Drunk Texting', 'Side Piece',
    'Lap Dance', 'Mile High Club', 'Fake Moaning', 'Friendzone',
    'Caught in 4K', 'Stripper Pole', 'Late Night Uber', 'Skinny Dipping',
    'Body Shots', 'Tinder Hookup', 'Glory Hole', 'Spanking',
    'Sugar Daddy', 'Handcuffs', 'Horny Jail', 'Edibles',
    'Blindfold', 'Hickey', 'Dirty Talk', 'Roleplay',
    'One Night Stand', 'Shower Sex', 'Friends with Benefits', 'Gold Digger',
    'Strip Poker', 'French Kiss', 'Down Bad', 'Red Flag',
    'Love Bite', 'Naughty Maid', 'Spin the Bottle', 'Stalker Ex',
    'Late Night Facetime', 'Ghosting', 'Cuddle Buddy', 'Whipped Cream',
    'Hot Tub Party', 'Booty Call', 'Truth or Dare', 'Twerking'
  ]
};

// ==========================================
// CATEGORIES CONFIG
// ==========================================
const CATEGORIES = [
  { key: 'food',        emoji: '🍕', name: 'Food & Drinks' },
  { key: 'movies',      emoji: '🎬', name: 'Movies' },
  { key: 'places',      emoji: '🏖️', name: 'Places' },
  { key: 'games',       emoji: '🎮', name: 'Video Games' },
  { key: 'animals',     emoji: '🐾', name: 'Animals' },
  { key: 'occupations', emoji: '👨‍🚀', name: 'Occupations' },
  { key: 'spicy',       emoji: '🔞', name: '18+ Spicy' },
  { key: 'custom',      emoji: '✏️',  name: 'Custom' },
];

// Timer presets (seconds)
const TIMER_PRESETS = [
  { label: '30s',  value: 30 },
  { label: '1 min', value: 60 },
  { label: '2 min', value: 120 },
  { label: '3 min', value: 180 },
  { label: '5 min', value: 300 },
];

// ==========================================
// GAME STATE
// ==========================================
const game = {
  playerCount: 4,
  imposterCount: 1,
  selectedCategory: null,
  currentWord: null,
  imposterIndices: [],
  currentPlayerIndex: 0,
  playerNames: [],
  customWords: [],
  useCustomNames: false,
  timerDuration: 120,
  timerRemaining: 120,
  timerInterval: null,
  timerRunning: false,
  cardRevealed: false,
};

// ==========================================
// APPLE HAPTICS & SOUND SYSTEM (Web Audio API)
// ==========================================
let audioCtx = null;

function playHaptic(type = 'click') {
  // Mobile vibration
  if (navigator.vibrate) {
    if (type === 'heavy') navigator.vibrate([15, 30, 15]);
    else if (type === 'reveal') navigator.vibrate([12, 40, 20]);
    else if (type === 'flip') navigator.vibrate(12);
    else navigator.vibrate(8);
  }

  // Synthesized Apple Taptic Audio
  try {
    if (!audioCtx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (AudioContext) audioCtx = new AudioContext();
    }
    if (audioCtx && audioCtx.state === 'suspended') {
      audioCtx.resume();
    }
    if (audioCtx) {
      const now = audioCtx.currentTime;
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.connect(gain);
      gain.connect(audioCtx.destination);

      if (type === 'reveal') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(320, now);
        osc.frequency.exponentialRampToValueAtTime(740, now + 0.12);
        gain.gain.setValueAtTime(0.12, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.14);
        osc.start(now);
        osc.stop(now + 0.15);
      } else if (type === 'flip') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(260, now);
        osc.frequency.exponentialRampToValueAtTime(140, now + 0.08);
        gain.gain.setValueAtTime(0.10, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
        osc.start(now);
        osc.stop(now + 0.09);
      } else {
        // Crisp pop/click
        osc.type = 'sine';
        osc.frequency.setValueAtTime(900, now);
        osc.frequency.exponentialRampToValueAtTime(450, now + 0.035);
        gain.gain.setValueAtTime(0.07, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.04);
        osc.start(now);
        osc.stop(now + 0.04);
      }
    }
  } catch (e) { /* ignore audio failure */ }
}

// ==========================================
// 3D LIQUID GLASS CARD TILT INTERACTION
// ==========================================
function initCardTilt() {
  const container = document.querySelector('.card-container');
  const card = document.getElementById('game-card');
  if (!container || !card) return;

  function handleMove(clientX, clientY) {
    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    
    if (x < 0 || x > rect.width || y < 0 || y > rect.height) return;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -10;
    const rotateY = ((x - centerX) / centerX) * 10;

    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  }

  function handleReset() {
    card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  }

  container.addEventListener('mousemove', (e) => handleMove(e.clientX, e.clientY));
  container.addEventListener('mouseleave', handleReset);
  container.addEventListener('touchmove', (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  }, { passive: true });
  container.addEventListener('touchend', handleReset);
}

// ==========================================
// UTILITIES
// ==========================================
function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function getPlayerName(index) {
  if (game.useCustomNames && game.playerNames[index]) {
    return game.playerNames[index];
  }
  return `Player ${index + 1}`;
}

// ==========================================
// THEME MANAGEMENT
// ==========================================
function initTheme() {
  const savedTheme = localStorage.getItem('imposter_theme') || 'dark';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeColor(savedTheme);

  document.getElementById('btn-theme-toggle').addEventListener('click', () => {
    playHaptic('click');
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('imposter_theme', next);
    updateThemeColor(next);
  });
}

function updateThemeColor(theme) {
  const meta = document.querySelector('meta[name="theme-color"]');
  if (meta) {
    meta.content = theme === 'dark' ? '#050508' : '#eef1f6';
  }
}

// ==========================================
// TOAST NOTIFICATIONS
// ==========================================
let toastTimeout;
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  clearTimeout(toastTimeout);
  toast.textContent = message;
  toast.classList.add('show');
  toastTimeout = setTimeout(() => toast.classList.remove('show'), 2500);
}

// ==========================================
// SCREEN MANAGEMENT
// ==========================================
function showScreen(screenId) {
  document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
  const target = document.getElementById(screenId);
  if (target) {
    requestAnimationFrame(() => target.classList.add('active'));
  }
}

// ==========================================
// LOCAL STORAGE
// ==========================================
function saveCustomWords() {
  try {
    localStorage.setItem('imposter_custom_words', JSON.stringify(game.customWords));
  } catch (e) { /* ignore */ }
}

function loadCustomWords() {
  try {
    const saved = localStorage.getItem('imposter_custom_words');
    if (saved) {
      game.customWords = JSON.parse(saved);
    }
  } catch (e) { /* ignore */ }
}

function saveSettings() {
  try {
    localStorage.setItem('imposter_settings', JSON.stringify({
      playerCount: game.playerCount,
      imposterCount: game.imposterCount,
      selectedCategory: game.selectedCategory,
      timerDuration: game.timerDuration,
    }));
  } catch (e) { /* ignore */ }
}

function loadSettings() {
  try {
    const saved = localStorage.getItem('imposter_settings');
    if (saved) {
      const s = JSON.parse(saved);
      game.playerCount = s.playerCount || 4;
      game.imposterCount = s.imposterCount || 1;
      game.selectedCategory = s.selectedCategory || null;
      game.timerDuration = s.timerDuration || 120;
    }
  } catch (e) { /* ignore */ }
}

// ==========================================
// HOME SCREEN
// ==========================================
function initHome() {
  document.getElementById('btn-start-game').addEventListener('click', () => {
    playHaptic('click');
    initSetup();
    showScreen('screen-setup');
  });

  document.getElementById('btn-how-to-play').addEventListener('click', () => {
    playHaptic('click');
    showScreen('screen-howto');
  });
}

// ==========================================
// HOW TO PLAY SCREEN
// ==========================================
function initHowToPlay() {
  document.getElementById('btn-back-howto').addEventListener('click', () => {
    playHaptic('click');
    showScreen('screen-home');
  });

  document.getElementById('btn-got-it').addEventListener('click', () => {
    playHaptic('click');
    showScreen('screen-home');
  });
}

// ==========================================
// SETUP SCREEN
// ==========================================
function initSetup() {
  updateCounterDisplays();
  renderCategories();
  renderTimerPicker();
  renderPlayerNames();
  updateCustomWordsSection();
}

function renderTimerPicker() {
  const container = document.getElementById('timer-picker');
  container.innerHTML = '';

  TIMER_PRESETS.forEach(preset => {
    const btn = document.createElement('button');
    btn.className = 'timer-option' + (game.timerDuration === preset.value ? ' selected' : '');
    btn.textContent = preset.label;
    btn.addEventListener('click', () => {
      playHaptic('click');
      game.timerDuration = preset.value;
      game.timerRemaining = preset.value;
      renderTimerPicker();
    });
    container.appendChild(btn);
  });
}

function renderCategories() {
  const grid = document.getElementById('category-grid');
  grid.innerHTML = '';

  CATEGORIES.forEach(cat => {
    const card = document.createElement('div');
    card.className = 'category-card' + (game.selectedCategory === cat.key ? ' selected' : '');
    card.innerHTML = `
      <span class="category-emoji">${cat.emoji}</span>
      <span class="category-name">${cat.name}</span>
      ${cat.key !== 'custom' ? `<span class="word-count-badge">${WORD_BANK[cat.key]?.length || 0} words</span>` : `<span class="word-count-badge">${game.customWords.length} words</span>`}
    `;
    card.addEventListener('click', () => {
      playHaptic('click');
      game.selectedCategory = cat.key;
      renderCategories();
      updateCustomWordsSection();
    });
    grid.appendChild(card);
  });
}

function updateCustomWordsSection() {
  const section = document.getElementById('custom-words-section');
  if (game.selectedCategory === 'custom') {
    section.classList.remove('hidden');
    const textarea = document.getElementById('custom-words-input');
    textarea.value = game.customWords.join('\n');
  } else {
    section.classList.add('hidden');
  }
}

function updateCounterDisplays() {
  document.getElementById('player-count').textContent = game.playerCount;
  document.getElementById('imposter-count').textContent = game.imposterCount;
}

function renderPlayerNames() {
  const section = document.getElementById('player-names-section');
  section.innerHTML = '';

  const grid = document.createElement('div');
  grid.className = 'names-grid';

  for (let i = 0; i < game.playerCount; i++) {
    const row = document.createElement('div');
    row.className = 'name-row';
    row.innerHTML = `
      <span class="name-row-label">${i + 1}.</span>
      <input type="text" class="name-input" placeholder="Player ${i + 1}"
             value="${game.playerNames[i] || ''}" data-index="${i}" maxlength="20">
    `;
    grid.appendChild(row);
  }

  section.appendChild(grid);

  grid.querySelectorAll('.name-input').forEach(input => {
    input.addEventListener('input', (e) => {
      const idx = parseInt(e.target.dataset.index);
      game.playerNames[idx] = e.target.value.trim();
    });
  });
}

function setupScreenHandlers() {
  document.getElementById('btn-back-setup').addEventListener('click', () => {
    playHaptic('click');
    showScreen('screen-home');
  });

  document.getElementById('btn-players-minus').addEventListener('click', () => {
    if (game.playerCount > 3) {
      playHaptic('click');
      game.playerCount--;
      if (game.imposterCount >= game.playerCount - 1) {
        game.imposterCount = Math.max(1, game.playerCount - 2);
      }
      updateCounterDisplays();
      renderPlayerNames();
    }
  });

  document.getElementById('btn-players-plus').addEventListener('click', () => {
    if (game.playerCount < 15) {
      playHaptic('click');
      game.playerCount++;
      updateCounterDisplays();
      renderPlayerNames();
    }
  });

  document.getElementById('btn-imposters-minus').addEventListener('click', () => {
    if (game.imposterCount > 1) {
      playHaptic('click');
      game.imposterCount--;
      updateCounterDisplays();
    }
  });

  document.getElementById('btn-imposters-plus').addEventListener('click', () => {
    if (game.imposterCount < game.playerCount - 2) {
      playHaptic('click');
      game.imposterCount++;
      updateCounterDisplays();
    }
  });

  document.getElementById('btn-toggle-names').addEventListener('click', () => {
    playHaptic('click');
    const section = document.getElementById('player-names-section');
    game.useCustomNames = section.classList.contains('hidden');
    section.classList.toggle('hidden');
    document.getElementById('btn-toggle-names').textContent =
      game.useCustomNames ? 'Hide Player Names' : 'Add Player Names (Optional)';
  });

  document.getElementById('btn-save-custom').addEventListener('click', () => {
    playHaptic('click');
    const textarea = document.getElementById('custom-words-input');
    game.customWords = textarea.value
      .split('\n')
      .map(w => w.trim())
      .filter(w => w.length > 0);
    saveCustomWords();
    renderCategories();
    showToast(`✅ Saved ${game.customWords.length} custom words`);
  });

  document.getElementById('btn-start-round').addEventListener('click', () => {
    playHaptic('heavy');
    if (!game.selectedCategory) {
      showToast('⚠️ Pick a word category first!');
      return;
    }

    const wordList = game.selectedCategory === 'custom' ? game.customWords : WORD_BANK[game.selectedCategory];

    if (!wordList || wordList.length < 1) {
      showToast('⚠️ Not enough words! Add at least 1 word.');
      return;
    }

    if (game.imposterCount >= game.playerCount) {
      showToast('⚠️ Too many imposters!');
      return;
    }

    saveSettings();
    startRound(wordList);
  });
}

// ==========================================
// GAME LOGIC
// ==========================================
function startRound(wordList) {
  game.currentWord = pickRandom(wordList);

  const indices = Array.from({ length: game.playerCount }, (_, i) => i);
  const shuffled = shuffle(indices);
  game.imposterIndices = shuffled.slice(0, game.imposterCount);

  game.currentPlayerIndex = 0;
  game.cardRevealed = false;

  updateGameScreen();
  showScreen('screen-game');
}

function updateGameScreen() {
  const idx = game.currentPlayerIndex;
  const name = getPlayerName(idx);

  document.getElementById('current-player-name').textContent = `${name}'s Turn`;
  document.getElementById('game-instruction').textContent = 'Tap the card to reveal your role';

  const progress = document.getElementById('player-progress');
  progress.innerHTML = '';
  for (let i = 0; i < game.playerCount; i++) {
    const dot = document.createElement('div');
    dot.className = 'progress-dot';
    if (i < idx) dot.classList.add('done');
    if (i === idx) dot.classList.add('current');
    progress.appendChild(dot);
  }

  const card = document.getElementById('game-card');
  card.classList.remove('flipped');
  card.style.transform = 'rotateX(0deg) rotateY(0deg)';
  game.cardRevealed = false;

  const isImposter = game.imposterIndices.includes(idx);
  const cardBack = document.getElementById('card-back-content');

  if (isImposter) {
    cardBack.className = 'card-back is-imposter';
    cardBack.innerHTML = `
      <span class="card-role-emoji">🕵️</span>
      <span class="card-role-label">You are the</span>
      <span class="card-role-word">IMPOSTER</span>
      <span class="card-role-hint">Figure out the word & blend in!</span>
    `;
  } else {
    cardBack.className = 'card-back';
    cardBack.innerHTML = `
      <span class="card-role-emoji">✨</span>
      <span class="card-role-label">Your word is</span>
      <span class="card-role-word">${game.currentWord}</span>
      <span class="card-role-hint">Don't give it away!</span>
    `;
  }

  const gotItBtn = document.getElementById('btn-got-it-card');
  gotItBtn.classList.add('hidden');
  gotItBtn.textContent = (idx >= game.playerCount - 1) ? '✓ Got it (Start Discussion)' : '✓ Got it (Next Player)';
}

function handleCardTap() {
  const card = document.getElementById('game-card');

  if (!game.cardRevealed) {
    playHaptic('reveal');
    card.classList.add('flipped');
    game.cardRevealed = true;
    document.getElementById('game-instruction').textContent = 'Memorize your role, then tap below';
    document.getElementById('btn-got-it-card').classList.remove('hidden');
  }
}

function handleGotIt() {
  if (!game.cardRevealed) return;

  playHaptic('flip');
  game.currentPlayerIndex++;

  if (game.currentPlayerIndex >= game.playerCount) {
    initDiscussion();
    showScreen('screen-discuss');
  } else {
    updateGameScreen();
  }
}

function gameScreenHandlers() {
  document.getElementById('game-card').addEventListener('click', handleCardTap);
  document.getElementById('btn-got-it-card').addEventListener('click', handleGotIt);
  initCardTilt();
}

// ==========================================
// DISCUSSION SCREEN
// ==========================================
function initDiscussion() {
  game.timerRemaining = game.timerDuration;
  game.timerRunning = false;
  clearInterval(game.timerInterval);
  updateTimerDisplay();

  const timerCircle = document.querySelector('.timer-circle');
  timerCircle.classList.remove('warning', 'danger');

  document.getElementById('btn-timer-toggle').textContent = 'Start Timer';

  // Pick a random non-imposter player to start describing
  const nonImposters = [];
  for (let i = 0; i < game.playerCount; i++) {
    if (!game.imposterIndices.includes(i)) {
      nonImposters.push(i);
    }
  }
  const starterIndex = pickRandom(nonImposters);
  const starterName = getPlayerName(starterIndex);
  document.getElementById('starter-name').textContent = starterName;
}

function updateTimerDisplay() {
  const mins = Math.floor(game.timerRemaining / 60);
  const secs = game.timerRemaining % 60;
  document.getElementById('timer-display').textContent =
    `${mins}:${secs.toString().padStart(2, '0')}`;
}

function toggleTimer() {
  playHaptic('click');
  if (game.timerRunning) {
    clearInterval(game.timerInterval);
    game.timerRunning = false;
    document.getElementById('btn-timer-toggle').textContent = 'Resume';
  } else {
    game.timerRunning = true;
    document.getElementById('btn-timer-toggle').textContent = 'Pause';

    game.timerInterval = setInterval(() => {
      game.timerRemaining--;

      if (game.timerRemaining <= 0) {
        game.timerRemaining = 0;
        clearInterval(game.timerInterval);
        game.timerRunning = false;
        document.getElementById('btn-timer-toggle').textContent = 'Start Timer';
        playHaptic('heavy');
        showToast('⏰ Time\'s up!');
      }

      updateTimerDisplay();

      const timerCircle = document.querySelector('.timer-circle');
      const pct = game.timerRemaining / game.timerDuration;
      timerCircle.classList.remove('warning', 'danger');
      if (pct <= 0.15) timerCircle.classList.add('danger');
      else if (pct <= 0.35) timerCircle.classList.add('warning');
    }, 1000);
  }
}

function resetTimer() {
  playHaptic('click');
  clearInterval(game.timerInterval);
  game.timerRunning = false;
  game.timerRemaining = game.timerDuration;
  updateTimerDisplay();
  document.getElementById('btn-timer-toggle').textContent = 'Start Timer';
  const timerCircle = document.querySelector('.timer-circle');
  timerCircle.classList.remove('warning', 'danger');
}

function discussionHandlers() {
  document.getElementById('btn-timer-toggle').addEventListener('click', toggleTimer);
  document.getElementById('btn-timer-reset').addEventListener('click', resetTimer);
  document.getElementById('btn-reveal-imposter').addEventListener('click', () => {
    playHaptic('heavy');
    clearInterval(game.timerInterval);
    showResults();
    showScreen('screen-results');
  });
}

// ==========================================
// RESULTS SCREEN
// ==========================================
function showResults() {
  const revealEl = document.getElementById('imposter-reveal');
  const imposterNames = game.imposterIndices.map(i => getPlayerName(i));

  revealEl.innerHTML = `
    <div class="imposter-reveal-card">
      <div class="imposter-emoji">🕵️</div>
      ${imposterNames.map(n => `<div class="imposter-name">${n}</div>`).join('')}
    </div>
  `;

  document.getElementById('word-reveal').textContent = game.currentWord;
  setTimeout(createConfetti, 300);
}

function createConfetti() {
  const container = document.getElementById('confetti-container');
  container.innerHTML = '';

  const colors = ['#bf5af2', '#ff375f', '#64d2ff', '#30d158', '#ffd60a', '#ff453a'];

  for (let i = 0; i < 60; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = Math.random() * 100 + '%';
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = (Math.random() * 1.5) + 's';
    piece.style.animationDuration = (Math.random() * 2 + 2.5) + 's';
    piece.style.width = (Math.random() * 6 + 5) + 'px';
    piece.style.height = (Math.random() * 10 + 8) + 'px';
    piece.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
    container.appendChild(piece);
  }

  setTimeout(() => { container.innerHTML = ''; }, 5000);
}

function resultsHandlers() {
  document.getElementById('btn-play-again').addEventListener('click', () => {
    playHaptic('heavy');
    const wordList = game.selectedCategory === 'custom' ? game.customWords : WORD_BANK[game.selectedCategory];
    startRound(wordList);
  });

  document.getElementById('btn-new-game').addEventListener('click', () => {
    playHaptic('click');
    initSetup();
    showScreen('screen-setup');
  });
}

// ==========================================
// PWA SERVICE WORKER REGISTRATION
// ==========================================
function registerSW() {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('sw.js').catch(() => {
      // SW registration failed silently
    });
  }
}

// ==========================================
// INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  loadSettings();
  loadCustomWords();
  registerSW();
  initTheme();

  initHome();
  initHowToPlay();
  setupScreenHandlers();
  gameScreenHandlers();
  discussionHandlers();
  resultsHandlers();

  showScreen('screen-home');
});
