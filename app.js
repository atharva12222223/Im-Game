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
// SMART HINTS & INTEL DICTIONARY
// ==========================================
const WORD_HINTS = {
  // Food & Drinks
  'Pizza': 'Italian oven-baked flatbread with savory toppings',
  'Sushi': 'Japanese specialty prepared with vinegared rice and seafood',
  'Tacos': 'Mexican street food folded inside a crisp or soft tortilla',
  'Burger': 'Grilled patty served inside a round sliced bun',
  'Pasta': 'Classic boiled Italian wheat dough served with sauce',
  'Pancakes': 'Flat golden breakfast cakes stacked with butter and syrup',
  'Ice Cream': 'Chilled sweet dairy treat served in cones or bowls',
  'Chocolate': 'Rich confection made from roasted cacao beans',
  'Coffee': 'Dark brewed morning beverage packed with caffeine',
  'Avocado': 'Creamy green fruit used to make guacamole',
  'Steak': 'High-end cut of beef cooked to your preferred temperature',
  'Fries': 'Crispy deep-fried salted potato batons',
  'Donut': 'Fried sweet dough ring glazed with sugar or sprinkles',
  'Croissant': 'Flaky, buttery French crescent-shaped morning pastry',
  'Ramen': 'Japanese broth bowl with wheat noodles, egg and toppings',
  'Curry': 'Fragrant spiced sauce dish commonly served with warm rice',
  'Nachos': 'Crunchy tortilla chips smothered in melted cheese',
  'Milkshake': 'Thick blended dessert beverage of ice cream and flavor',
  'Popcorn': 'Puffed buttery corn kernels enjoyed at movie theaters',
  'Pretzel': 'Knot-twisted baked pastry sprinkled with coarse salt',
  'Cheesecake': 'Decadent sweet dessert with cream cheese on graham crust',
  'Lobster': 'Luxury ocean crustacean served with melted garlic butter',
  'Waffles': 'Grid-patterned breakfast cakes with crispy pockets for syrup',
  'Smoothie': 'Thick blended fruit, yogurt and ice drink',
  'Kebab': 'Seasoned meat grilled on skewers over open flame',
  'Pho': 'Aromatic Vietnamese noodle soup with rich herbal broth',
  'Dumpling': 'Steamed or fried dough pockets filled with meat or veggies',
  'Tiramisu': 'Espresso-soaked Italian dessert layered with mascarpone',
  'Burrito': 'Large flour tortilla tightly wrapped around hearty fillings',
  'Mochi': 'Soft and chewy sweet Japanese pounded rice dessert',

  // Movies
  'Titanic': 'Doomed luxury ocean liner and tragic romantic drama',
  'Avatar': 'Blue alien civilization on the distant planet Pandora',
  'Inception': 'Master thieves infiltrating dreams within dreams',
  'Jaws': 'Giant killer great white shark terrorizing summer beachgoers',
  'Rocky': 'Underdog Philadelphia boxer fighting for the championship',
  'Frozen': 'Magical ice queen with singing snowman sister',
  'Batman': 'Vigilante Dark Knight protecting the shadows of Gotham',
  'Shrek': 'Green swamp ogre accompanied by a talkative donkey',
  'Joker': 'Iconic clown-faced Gotham villain descending into chaos',
  'Gladiator': 'Betrayed Roman general seeking vengeance in the Colosseum',
  'Alien': 'Deadly extraterrestrial creature stalking a spaceship crew',
  'Parasite': 'Cunning lower-class family infiltrating an elite mansion',
  'Aladdin': 'Charming street thief aided by a magical wish-granting Genie',
  'Tenet': 'Secret agents manipulating the flow of time and entropy',
  'Interstellar': 'Astronauts venturing through a wormhole to save humanity',
  'Matrix': 'Simulated reality where chosen one takes the red pill',
  'Ghostbusters': 'Quirky scientists capturing paranormal spirits in NYC',
  'Jumanji': 'Supernatural board game that brings jungle hazards to life',
  'Deadpool': 'Sarcastic masked mercenary with rapid healing powers',
  'Bambi': 'Young deer discovering life and loss in the deep forest',
  'Mulan': 'Brave young woman disguising herself as a warrior',
  'Braveheart': 'Scottish rebel warrior fighting for freedom against tyranny',
  'Grease': '1950s musical romance featuring leather jackets and cars',
  'Scarface': 'Ruthless immigrant rising to become a powerful drug kingpin',
  'Coco': 'Young musician venturing into the colorful Land of the Dead',
  'Moana': 'Courageous islander sailing across the ocean to restore nature',
  'Ratatouille': 'Talented rat secretly running a high-end French kitchen',
  'Twilight': 'Moody vampire romance set in a foggy Pacific Northwest town',
  'Barbie': 'Fabulous doll venturing into the real world from dreamland',
  'Oppenheimer': 'Theoretical physicist leading the project to build atomic bomb',

  // Places
  'Beach': 'Coastal shore with soft sand and rolling ocean waves',
  'Airport': 'Transit hub with check-in gates, runways and jet airliners',
  'Hospital': 'Medical facility with emergency rooms, doctors and patient beds',
  'Library': 'Quiet sanctuary lined with towering shelves of books',
  'Casino': 'Lively gaming hall with roulette tables and slot machines',
  'Stadium': 'Colossal sports arena filled with roaring spectator crowds',
  'Mall': 'Multi-level indoor complex packed with retail stores',
  'Gym': 'Fitness facility with free weights, benches and cardio machines',
  'Church': 'Historic place of worship with altar, stained glass and pews',
  'Zoo': 'Enclosed biological park showcasing exotic wildlife from around the world',
  'Museum': 'Cultural institution exhibiting ancient artifacts and fine art',
  'Restaurant': 'Dining establishment where chefs prepare and serve meals',
  'Park': 'Public green landscape with pathways, benches and trees',
  'School': 'Educational building filled with classrooms, desks and teachers',
  'Prison': 'High-security correctional facility with locked cells',
  'Hotel': 'Hospitality building providing temporary suites and concierge service',
  'Farm': 'Agricultural estate with crops, red barns and farm animals',
  'Submarine': 'Naval warship engineered to operate deep beneath ocean surface',
  'Spaceship': 'High-tech spacecraft traveling outside Earth atmosphere',
  'Nightclub': 'Evening venue with bass-heavy DJ beats and dance floors',
  'Cemetery': 'Quiet burial ground marked with carved headstones',
  'Circus': 'Traveling tent show with trapeze artists, clowns and acrobats',
  'Bakery': 'Artisan shop with warm ovens baking fresh loaves and pastries',
  'Volcano': 'Geological mountain capable of venting molten lava and ash',
  'Jungle': 'Dense tropical rainforest teeming with lush canopy vegetation',
  'Aquarium': 'Aquatic center with giant glass tanks housing marine species',
  'Theater': 'Performing arts auditorium with velvet stage curtains and rows of seats',
  'Lighthouse': 'Tall seaside tower projecting a beam of light to guide sailors',
  'Treehouse': 'Elevated wooden cabin built within sturdy branches',
  'Rooftop': 'Elevated open-air terrace with panoramic city views',

  // Video Games
  'Minecraft': 'Voxel sandbox where players mine blocks and build anything',
  'Fortnite': 'Cartoonish battle royale famous for building and storm circles',
  'GTA': 'Open-world crime simulator with stolen cars, heists and police chases',
  'Mario': 'Mustachioed plumber jumping on turtles to rescue the princess',
  'Zelda': 'Legendary fantasy adventure featuring Link and the Triforce',
  'Pokemon': 'Catching, training and battling pocket monsters in gyms',
  'Tetris': 'Timeless puzzle game of rotating falling geometric shapes',
  'Roblox': 'Online sandbox platform hosting millions of player-made minigames',
  'Valorant': 'Competitive 5v5 tactical shooter with character powers',
  'Overwatch': 'Team-based hero shooter with payload escorts and ultimates',
  'Halo': 'Sci-fi shooter starring Master Chief combating alien forces',
  'Doom': 'Fast and brutal demon-slaying shooter set in the depths of Hell',
  'Skyrim': 'Open-world fantasy epic where you shout like a Dragonborn',
  'Elden Ring': 'Challenging dark fantasy action RPG across the Lands Between',
  'Apex': 'Squad-based battle royale featuring diverse sci-fi legends',
  'FIFA': 'Premier soccer video game simulation with world cup teams',
  'Call of Duty': 'High-adrenaline military first-person combat franchise',
  'Sims': 'Life management simulation controlling virtual human daily routines',
  'Fallout': 'Nuclear wasteland RPG exploring vaults and mutant ruins',
  'Portal': 'Mind-bending puzzle game testing momentum with a portal device',
  'Undertale': 'Indie RPG where you can befriend every enemy instead of fighting',
  'Cuphead': 'Vintage 1930s hand-drawn animation boss battle challenge',
  'Sonic': 'Blue hedgehog blazing through loop-de-loops at sonic speed',
  'Pac-Man': 'Arcade classic navigating a maze munching dots and running from ghosts',
  'Kirby': 'Cute pink hero who inhales adversaries to copy their skills',
  'Destiny': 'Sci-fi online looter-shooter guarding the Last City on Earth',
  'Cyberpunk': 'Neon-soaked futuristic RPG exploring Night City with bionics',
  'Among Us': 'Social deception game finding who is sabotaging the spaceship',
  'Fall Guys': 'Wacky obstacle course royale with stumbling jellybean runners',
  'Rocket League': 'Fast-paced arena game playing soccer with rocket-boosted cars',

  // Animals
  'Lion': 'The majestic King of Beasts with a regal mane and loud roar',
  'Penguin': 'Flightless tuxedo-colored bird sliding on polar glaciers',
  'Dolphin': 'Playful aquatic mammal renowned for high intelligence and clicks',
  'Eagle': 'Magnificent bird of prey with razor-sharp talons and vision',
  'Snake': 'Flexible limbless reptile that glides and sheds its scaly skin',
  'Elephant': 'Gentle giant of the savannah equipped with long trunk and tusks',
  'Panda': 'Charming black-and-white bear that feeds almost solely on bamboo',
  'Shark': 'Formidable ocean hunter with triangular dorsal fin and sharp teeth',
  'Octopus': 'Clever eight-tentacled sea creature that squirts defensive ink',
  'Giraffe': 'Graceful herbivore with an exceptionally tall spotted neck',
  'Koala': 'Fuzzy Australian tree-climber that munches on eucalyptus leaves',
  'Wolf': 'Canine pack predator communicating with mournful nighttime howls',
  'Tiger': 'Powerful striped apex predator lurking silently in Asian forests',
  'Owl': 'Wise nocturnal hunter capable of rotating its head nearly all the way',
  'Flamingo': 'Vibrant pink wading bird known for balancing on a single slender leg',
  'Chameleon': 'Camouflaging reptile with independent eyes and a sticky tongue',
  'Gorilla': 'Massive and peaceful primate roaming dense mountain slopes',
  'Jellyfish': 'Umbrella-shaped gelatinous sea drifter with trailing stinging tentacles',
  'Peacock': 'Showy male bird displaying an iridescent fan of eye-pattern feathers',
  'Hedgehog': 'Small spiny mammal that curls into a protective prickly ball',
  'Kangaroo': 'Powerful hopping marsupial carrying joeys in its belly pouch',
  'Crocodile': 'Prehistoric armored river predator with immense biting strength',
  'Parrot': 'Brightly plumaged tropical bird capable of mimicking speech',
  'Sloth': 'Tree-dwelling mammal famous for its exceptionally relaxed pace',
  'Cheetah': 'Slender feline built for astonishing short bursts of ground speed',
  'Bat': 'Winged nocturnal mammal navigating the dark using sonic echoes',
  'Seahorse': 'Delicate marine creature with a prehensile tail where males give birth',
  'Raccoon': 'Clever nocturnal mammal sporting a dark bandit face mask',
  'Mantis': 'Camouflaged insect holding front legs in a praying stance',
  'Axolotl': 'Perpetually smiling aquatic salamander with frilly exterior gills',

  // Occupations
  'Doctor': 'Medical practitioner diagnosing illnesses and prescribing remedies',
  'Astronaut': 'Trained space traveler venturing into zero gravity',
  'Detective': 'Investigator analyzing crime scenes to uncover the truth',
  'Chef': 'Master of culinary arts directing a professional restaurant kitchen',
  'Firefighter': 'Emergency responder battling fires and rescuing civilians',
  'Pilot': 'Aviation professional commanding commercial aircraft in flight',
  'Surgeon': 'Specialist doctor performing precision operations inside the body',
  'Plumber': 'Trade expert maintaining water pipes, fixtures and drainage lines',
  'Spy': 'Covert intelligence operative working under alias behind enemy lines',
  'Pirate': 'Outlaw seafarer raiding merchant vessels under the skull flag',
  'Ninja': 'Legendary master of espionage, martial arts and silent stealth',
  'Lifeguard': 'Trained rescue swimmer guarding pool and ocean visitors',
  'Mechanic': 'Technical expert servicing vehicle engines and mechanical systems',
  'DJ': 'Audio artist blending electronic tracks and setting party energy',
  'Barista': 'Espresso artisan crafting specialty coffee drinks with foam art',
  'Dentist': 'Oral health specialist caring for teeth, gums and smiles',
  'Lawyer': 'Legal counselor advocating for clients before the court and jury',
  'Soldier': 'Enlisted service member protecting the nation in tactical operations',
  'Clown': 'Circus entertainer with painted face, oversized outfit and tricks',
  'Magician': 'Illusionist amazing spectators with sleight-of-hand feats',
  'Butcher': 'Artisan processor of fresh cuts of meats for culinary use',
  'Electrician': 'Skilled tradesperson installing electrical power grids and outlets',
  'Farmer': 'Agricultural producer managing farmland, livestock and seasonal harvests',
  'Boxer': 'Combat athlete exchanging jabs and hooks inside the boxing ring',
  'Dancer': 'Movement artist performing expressive choreography to music',
  'Scientist': 'Researcher formulating hypotheses and conducting lab experiments',
  'Architect': 'Creative planner drafting structural blueprints for iconic buildings',
  'Singer': 'Musical performer conveying emotion through melody and vocal range',
  'Referee': 'Neutral official enforcing rules on the sports field with a whistle',
  'Cowboy': 'Horseback cattle herder of the rugged American frontier',

  // 18+ Spicy
  'Sneaky Link': 'A clandestine late-night meetup kept strictly confidential',
  'OnlyFans': 'Subscription service known for exclusive adult creator content',
  'Morning After Pill': 'Emergency contraceptive purchased the morning following passion',
  'Walk of Shame': 'Daylight commute home wearing last night party attire',
  'Threesome': 'Intimate bedroom encounter involving three consenting people',
  'Body Count': 'Provocative party question discussing total number of past partners',
  'Netflix and Chill': 'Seemingly innocent streaming invite with alternative motives',
  'Sugar Mommy': 'Financially generous mature woman pampering her companion',
  'Freaky Friday': 'Uninhibited night of exploring wild desires and kinks',
  'Sexting': 'Exchanging explicit messages and photos over smartphone',
  'Drunk Texting': 'Unfiltered late-night message sent with liquid courage',
  'Side Piece': 'Secret romantic companion kept on the side of a main relationship',
  'Lap Dance': 'Sensual personalized dance performed seated up close in a club',
  'Mile High Club': 'Legendary status achieved by being intimate in airplane lavatory',
  'Fake Moaning': 'Vocal exaggeration to boost a partner confidence in bed',
  'Friendzone': 'Unfortunate realm where romantic feelings are met with just friendship',
  'Caught in 4K': 'Getting caught red-handed with crystal-clear indisputable proof',
  'Stripper Pole': 'Vertical stainless steel apparatus used for exotic club acrobatics',
  'Late Night Uber': 'Rideshare home at 3:30 AM after making questionable party choices',
  'Skinny Dipping': 'Swimming in natural waters completely free of swimwear',
  'Body Shots': 'Consuming alcohol directly off someone bare skin',
  'Tinder Hookup': 'Casual date resulting from an enthusiastic swipe to the right',
  'Glory Hole': 'Secret cutout in a partition designed for anonymous encounters',
  'Spanking': 'Playful physical discipline applied across the backside',
  'Sugar Daddy': 'Wealthy benefactor providing luxury support in exchange for company',
  'Handcuffs': 'Locking wrist restraints repurposed for bedroom thrill-seeking',
  'Horny Jail': 'Metaphorical lockup for individuals being excessively flirtatious',
  'Edibles': 'THC-infused treats that hit with a powerful delayed sensation',
  'Blindfold': 'Sensory deprivation mask that sharpens touch and anticipation',
  'Hickey': 'Passionate suction bruise left on the neck after make-out session',
  'Dirty Talk': 'Whispering seductive, unfiltered phrases in the heat of passion',
  'Roleplay': 'Adopting fantasy personas and costumes to spice up intimacy',
  'One Night Stand': 'Passionate single-night encounter with no expectations of tomorrow',
  'Shower Sex': 'Slippery and surprisingly uncoordinated attempt at aquatic romance',
  'Friends with Benefits': 'Platonic friendship with casual physical privileges included',
  'Gold Digger': 'Person whose romantic interest is driven solely by financial wealth',
  'Strip Poker': 'Card game where bad hands result in removing pieces of clothing',
  'French Kiss': 'Deep romantic kiss involving enthusiastic contact with tongues',
  'Down Bad': 'Suffering from extreme desperation for romantic attention',
  'Red Flag': 'Glaring personality warning sign that demands immediate caution',
  'Love Bite': 'Teeth mark left in moments of intense intimacy',
  'Naughty Maid': 'Popular fantasy costume complete with apron and feather duster',
  'Spin the Bottle': 'Teen party circle game where bottle point dictates who you kiss',
  'Stalker Ex': 'Former flame who secretly checks every story and post you make',
  'Late Night Facetime': 'Midnight video call under dim lighting with hushed voices',
  'Ghosting': 'Abruptly cutting off all communication and disappearing forever',
  'Cuddle Buddy': 'Partner kept strictly for warmth, snuggling and company',
  'Whipped Cream': 'Sweet dessert foam used creatively across human skin',
  'Hot Tub Party': 'Steamy outdoor jacuzzi gathering where clothing is optional',
  'Booty Call': 'Direct midnight message requesting an immediate romantic rendezvous',
  'Truth or Dare': 'Classic party game that unearths dirty confessions and dares',
  'Twerking': 'Energetic dance movement centering on rhythmic hip and glute motion'
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
  selectedCategories: ['food'],
  currentWord: null,
  usedWords: [],
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

function saveUsedWords() {
  try {
    localStorage.setItem('imposter_used_words', JSON.stringify(game.usedWords));
  } catch (e) { /* ignore */ }
}

function loadUsedWords() {
  try {
    const saved = localStorage.getItem('imposter_used_words');
    if (saved) {
      game.usedWords = JSON.parse(saved);
    }
  } catch (e) { /* ignore */ }
}

function saveSettings() {
  try {
    localStorage.setItem('imposter_settings', JSON.stringify({
      playerCount: game.playerCount,
      imposterCount: game.imposterCount,
      selectedCategories: game.selectedCategories,
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
      if (Array.isArray(s.selectedCategories) && s.selectedCategories.length > 0) {
        game.selectedCategories = s.selectedCategories;
      } else if (s.selectedCategory) {
        game.selectedCategories = [s.selectedCategory];
      }
      game.timerDuration = s.timerDuration || 120;
    }
  } catch (e) { /* ignore */ }
}

function getCombinedWordPool() {
  let words = [];
  game.selectedCategories.forEach(cat => {
    if (cat === 'custom') {
      words.push(...game.customWords);
    } else if (WORD_BANK[cat]) {
      words.push(...WORD_BANK[cat]);
    }
  });
  return [...new Set(words)];
}

function getWordCategoryInfo(word) {
  for (const cat of CATEGORIES) {
    if (cat.key !== 'custom' && WORD_BANK[cat.key] && WORD_BANK[cat.key].includes(word)) {
      return cat;
    }
  }
  return { key: 'custom', name: 'Custom Words', emoji: '✏️' };
}

function getWordClue(word) {
  if (WORD_HINTS[word]) {
    return WORD_HINTS[word];
  }
  return `A mystery word with ${word.length} letters`;
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

  const standardCats = CATEGORIES.filter(c => c.key !== 'custom').map(c => c.key);
  const allStandardSelected = standardCats.every(k => game.selectedCategories.includes(k));
  const selectAllBtn = document.getElementById('btn-select-all-cats');
  if (selectAllBtn) {
    selectAllBtn.textContent = allStandardSelected ? 'Deselect All' : 'Select All';
  }

  CATEGORIES.forEach(cat => {
    const isSelected = game.selectedCategories.includes(cat.key);
    const card = document.createElement('div');
    card.className = 'category-card' + (isSelected ? ' selected' : '');
    card.innerHTML = `
      <span class="category-emoji">${cat.emoji}</span>
      <span class="category-name">${cat.name}</span>
      ${cat.key !== 'custom' ? `<span class="word-count-badge">${WORD_BANK[cat.key]?.length || 0} words</span>` : `<span class="word-count-badge">${game.customWords.length} words</span>`}
    `;
    card.addEventListener('click', () => {
      playHaptic('click');
      if (isSelected) {
        if (game.selectedCategories.length === 1) {
          showToast('⚠️ Keep at least 1 category selected!');
          return;
        }
        game.selectedCategories = game.selectedCategories.filter(k => k !== cat.key);
      } else {
        game.selectedCategories.push(cat.key);
      }
      renderCategories();
      updateCustomWordsSection();
    });
    grid.appendChild(card);
  });
}

function updateCustomWordsSection() {
  const section = document.getElementById('custom-words-section');
  if (game.selectedCategories.includes('custom')) {
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
      if (game.imposterCount > Math.min(5, game.playerCount - 2)) {
        game.imposterCount = Math.min(5, Math.max(1, game.playerCount - 2));
      }
      updateCounterDisplays();
      renderPlayerNames();
    }
  });

  document.getElementById('btn-players-plus').addEventListener('click', () => {
    if (game.playerCount < 25) {
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
    if (game.imposterCount < 5 && game.imposterCount < game.playerCount - 2) {
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

  document.getElementById('btn-select-all-cats').addEventListener('click', () => {
    playHaptic('click');
    const standardCats = CATEGORIES.filter(c => c.key !== 'custom').map(c => c.key);
    const allStandardSelected = standardCats.every(k => game.selectedCategories.includes(k));

    if (allStandardSelected) {
      // Reset to first category only
      game.selectedCategories = ['food'];
    } else {
      // Select all standard categories
      game.selectedCategories = [...standardCats];
    }
    renderCategories();
    updateCustomWordsSection();
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
    if (!game.selectedCategories || game.selectedCategories.length === 0) {
      showToast('⚠️ Pick at least 1 category!');
      return;
    }

    const wordList = getCombinedWordPool();

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
  // Filter out previously used words
  let availableWords = wordList.filter(w => !game.usedWords.includes(w));

  // If all words from current categories have been played, reset and recycle pool
  if (availableWords.length === 0) {
    game.usedWords = game.usedWords.filter(w => !wordList.includes(w));
    availableWords = wordList;
  }

  // Pick an unplayed word
  game.currentWord = pickRandom(availableWords);
  game.usedWords.push(game.currentWord);
  saveUsedWords();

  game.currentCategoryInfo = getWordCategoryInfo(game.currentWord);

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
    const catInfo = game.currentCategoryInfo || { name: 'Secret Category', emoji: '🔍' };
    const clue = getWordClue(game.currentWord);
    const wordLen = game.currentWord.length;
    const firstLetter = game.currentWord[0].toUpperCase();

    cardBack.innerHTML = `
      <span class="card-role-emoji">🕵️</span>
      <span class="card-role-label">You are the</span>
      <span class="card-role-word">IMPOSTER</span>
      
      <div class="imposter-clue-card">
        <div class="imposter-clue-header">
          <span class="clue-badge">💡 Secret Intel</span>
          <span class="clue-category">${catInfo.emoji} ${catInfo.name}</span>
        </div>
        <p class="imposter-clue-text">"${clue}"</p>
        <div class="imposter-clue-meta">
          <span class="clue-tag">📏 ${wordLen} letters</span>
          <span class="clue-tag">🔤 Starts with "${firstLetter}"</span>
        </div>
      </div>

      <span class="card-role-hint">Blend in & deduce the secret word!</span>
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

  // Pick any random player to start describing (imposters can also be selected)
  const allPlayers = Array.from({ length: game.playerCount }, (_, i) => i);
  const starterIndex = pickRandom(allPlayers);
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
    const wordList = getCombinedWordPool();
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
  loadUsedWords();
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
