export type Mood =
  | "cozy"
  | "emotional"
  | "drama"
  | "chaos"
  | "romance"
  | "autumn"
  | "starsHollow"
  | "funny";

export type SkipTag =
  | "relationship-drama"
  | "sad-rory"
  | "christopher"
  | "too-much-paris"
  | "low-stars-hollow"
  | "very-emotional"
  | "logan"
  | "jess"
  | "dean";

export interface Episode {
  id: string;
  season: number;
  episode: number;
  title: string;
  description: string;
  scores: Record<Mood, number>; // 0-10
  tags: string[];
  characters: string[];
  locations: string[];
  skipFlags: SkipTag[];
}

// Fan-written, spoiler-light descriptions. Not scraped.
export const episodes: Episode[] = [
  {
    id: "s1e1",
    season: 1,
    episode: 1,
    title: "Pilot",
    description:
      "Meet a mother and daughter who talk faster than they walk, in a town where everyone knows your coffee order.",
    scores: { cozy: 8, emotional: 5, drama: 6, chaos: 3, romance: 6, autumn: 6, starsHollow: 10, funny: 8 },
    tags: ["Introductions", "Diner", "New School", "Small Town"],
    characters: ["Lorelai", "Rory", "Luke", "Emily", "Richard"],
    locations: ["Luke's Diner", "Stars Hollow", "Chilton"],
    skipFlags: [],
  },
  {
    id: "s1e8",
    season: 1,
    episode: 8,
    title: "Love & War & Snow",
    description:
      "The first snow blankets Stars Hollow and everyone gets a little dreamy — including Lorelai, who's suddenly snowed in.",
    scores: { cozy: 10, emotional: 4, drama: 4, chaos: 3, romance: 8, autumn: 7, starsHollow: 10, funny: 7 },
    tags: ["Snowy", "Diner", "Small Town Comfort", "First Snow"],
    characters: ["Lorelai", "Rory", "Luke", "Max"],
    locations: ["Stars Hollow Square", "Luke's Diner"],
    skipFlags: [],
  },
  {
    id: "s1e10",
    season: 1,
    episode: 10,
    title: "Forgiveness and Stuff",
    description:
      "A quiet hospital night forces a reluctant family to sit still long enough to actually look at each other.",
    scores: { cozy: 5, emotional: 9, drama: 7, chaos: 3, romance: 4, autumn: 5, starsHollow: 4, funny: 4 },
    tags: ["Family", "Hospital", "Tender"],
    characters: ["Lorelai", "Emily", "Richard", "Rory"],
    locations: ["Hartford", "Hospital"],
    skipFlags: ["very-emotional"],
  },
  {
    id: "s1e13",
    season: 1,
    episode: 13,
    title: "Concert Interruptus",
    description:
      "A girls' night out at a concert turns into a chaperoning adventure through the city.",
    scores: { cozy: 6, emotional: 3, drama: 5, chaos: 7, romance: 5, autumn: 3, starsHollow: 5, funny: 9 },
    tags: ["Road Trip", "Friendship", "Music"],
    characters: ["Lorelai", "Rory", "Paris", "Madeline", "Louise"],
    locations: ["New York"],
    skipFlags: [],
  },
  {
    id: "s2e5",
    season: 2,
    episode: 5,
    title: "Nick & Nora / Sid & Nancy",
    description:
      "A new arrival in town shakes up the diner regulars and puts a familiar mug in an unfamiliar mood.",
    scores: { cozy: 7, emotional: 4, drama: 7, chaos: 6, romance: 6, autumn: 6, starsHollow: 9, funny: 8 },
    tags: ["New Face", "Diner", "Small Town Gossip"],
    characters: ["Lorelai", "Rory", "Luke", "Jess"],
    locations: ["Luke's Diner", "Stars Hollow"],
    skipFlags: ["jess"],
  },
  {
    id: "s2e10",
    season: 2,
    episode: 10,
    title: "The Bracebridge Dinner",
    description:
      "A snowed-in banquet at the inn becomes an all-town costume feast with sleigh rides and secret candlelight.",
    scores: { cozy: 10, emotional: 5, drama: 5, chaos: 5, romance: 6, autumn: 8, starsHollow: 10, funny: 8 },
    tags: ["Snowy", "Inn", "Banquet", "Costumes", "Sleigh Ride"],
    characters: ["Lorelai", "Rory", "Sookie", "Luke", "Emily", "Richard"],
    locations: ["Independence Inn", "Stars Hollow"],
    skipFlags: [],
  },
  {
    id: "s2e13",
    season: 2,
    episode: 13,
    title: "A-Tisket, A-Tasket",
    description:
      "The annual basket auction turns picnic baskets into public declarations, and nobody's bidding is subtle.",
    scores: { cozy: 8, emotional: 4, drama: 6, chaos: 6, romance: 9, autumn: 6, starsHollow: 10, funny: 8 },
    tags: ["Town Event", "Auction", "Picnic", "Crushes"],
    characters: ["Lorelai", "Rory", "Luke", "Jess", "Dean"],
    locations: ["Stars Hollow Square"],
    skipFlags: ["relationship-drama"],
  },
  {
    id: "s2e22",
    season: 2,
    episode: 22,
    title: "I Can't Get Started",
    description:
      "A big weekend of vows and choices arrives, and everyone gets exactly what they weren't quite ready for.",
    scores: { cozy: 4, emotional: 9, drama: 10, chaos: 7, romance: 8, autumn: 4, starsHollow: 6, funny: 4 },
    tags: ["Wedding", "Big Choice", "Cliffhanger"],
    characters: ["Lorelai", "Rory", "Sookie", "Christopher"],
    locations: ["Stars Hollow"],
    skipFlags: ["very-emotional", "relationship-drama", "christopher"],
  },
  {
    id: "s3e2",
    season: 3,
    episode: 2,
    title: "Haunted Leg",
    description:
      "Lorelai finds herself flirted with in unexpected places and Rory tries to survive Paris's new regime.",
    scores: { cozy: 6, emotional: 3, drama: 5, chaos: 5, romance: 5, autumn: 5, starsHollow: 7, funny: 9 },
    tags: ["Diner", "Chilton", "Banter"],
    characters: ["Lorelai", "Rory", "Paris", "Luke"],
    locations: ["Stars Hollow", "Chilton"],
    skipFlags: ["too-much-paris"],
  },
  {
    id: "s3e7",
    season: 3,
    episode: 7,
    title: "They Shoot Gilmores, Don't They?",
    description:
      "A charity dance marathon turns the town gym into a slow-motion battlefield of exhaustion and glitter.",
    scores: { cozy: 6, emotional: 8, drama: 9, chaos: 7, romance: 7, autumn: 7, starsHollow: 10, funny: 8 },
    tags: ["Town Event", "Dance Marathon", "Iconic"],
    characters: ["Lorelai", "Rory", "Dean", "Jess", "Kirk"],
    locations: ["Stars Hollow Gym"],
    skipFlags: ["relationship-drama"],
  },
  {
    id: "s3e10",
    season: 3,
    episode: 10,
    title: "That'll Do, Pig",
    description:
      "Grandparents' night out, a pageant, and a very political pig make for a strangely perfect evening.",
    scores: { cozy: 7, emotional: 4, drama: 5, chaos: 6, romance: 4, autumn: 6, starsHollow: 9, funny: 9 },
    tags: ["Town Event", "Emily & Richard", "Pig"],
    characters: ["Lorelai", "Rory", "Emily", "Richard", "Kirk"],
    locations: ["Stars Hollow", "Hartford"],
    skipFlags: [],
  },
  {
    id: "s3e17",
    season: 3,
    episode: 17,
    title: "A Tale of Poes and Fire",
    description:
      "A themed weekend at the inn goes sideways in the most Stars Hollow way possible.",
    scores: { cozy: 8, emotional: 5, drama: 6, chaos: 9, romance: 5, autumn: 6, starsHollow: 10, funny: 9 },
    tags: ["Inn", "Convention", "Chaos"],
    characters: ["Lorelai", "Sookie", "Michel", "Rory", "Jackson"],
    locations: ["Independence Inn"],
    skipFlags: [],
  },
  {
    id: "s3e22",
    season: 3,
    episode: 22,
    title: "Those Are Strings, Pinocchio",
    description:
      "A graduation, a speech, and the sound of a chapter quietly closing on a familiar street.",
    scores: { cozy: 6, emotional: 10, drama: 5, chaos: 3, romance: 4, autumn: 4, starsHollow: 9, funny: 5 },
    tags: ["Graduation", "Tearjerker", "Milestone"],
    characters: ["Lorelai", "Rory", "Emily", "Richard", "Luke"],
    locations: ["Chilton", "Stars Hollow"],
    skipFlags: ["very-emotional"],
  },
  {
    id: "s4e8",
    season: 4,
    episode: 8,
    title: "Die, Jerk",
    description:
      "A first review goes to print, opinions have consequences, and one town's baker is not amused.",
    scores: { cozy: 6, emotional: 4, drama: 7, chaos: 6, romance: 3, autumn: 6, starsHollow: 8, funny: 9 },
    tags: ["Yale", "Newspaper", "Ballet"],
    characters: ["Rory", "Paris", "Lorelai"],
    locations: ["Yale", "Stars Hollow"],
    skipFlags: ["too-much-paris"],
  },
  {
    id: "s4e11",
    season: 4,
    episode: 11,
    title: "In the Clamor and the Clangor",
    description:
      "A ringing church bell won't quit, and Lorelai has a very overdue conversation with her mother.",
    scores: { cozy: 7, emotional: 7, drama: 6, chaos: 5, romance: 3, autumn: 6, starsHollow: 9, funny: 7 },
    tags: ["Town Bell", "Mother-Daughter", "Reconciliation"],
    characters: ["Lorelai", "Emily", "Rory", "Luke"],
    locations: ["Stars Hollow", "Hartford"],
    skipFlags: [],
  },
  {
    id: "s4e22",
    season: 4,
    episode: 22,
    title: "Raincoats and Recipes",
    description:
      "The inn's test run brings the whole town under one roof — and a long-simmering question finally boils over.",
    scores: { cozy: 8, emotional: 6, drama: 8, chaos: 6, romance: 10, autumn: 5, starsHollow: 10, funny: 7 },
    tags: ["Inn Opening", "Big Moment", "Romance"],
    characters: ["Lorelai", "Rory", "Luke", "Sookie", "Emily", "Richard"],
    locations: ["Dragonfly Inn"],
    skipFlags: ["relationship-drama"],
  },
  {
    id: "s5e7",
    season: 5,
    episode: 7,
    title: "You Jump, I Jump, Jack",
    description:
      "A secret society whisks Rory into a candlelit night of umbrellas, tuxedos, and questionable life choices.",
    scores: { cozy: 5, emotional: 4, drama: 6, chaos: 8, romance: 8, autumn: 7, starsHollow: 3, funny: 8 },
    tags: ["Yale", "Life & Death Brigade", "Umbrellas"],
    characters: ["Rory", "Logan", "Lorelai", "Luke"],
    locations: ["Yale", "Countryside"],
    skipFlags: ["logan", "low-stars-hollow"],
  },
  {
    id: "s5e13",
    season: 5,
    episode: 13,
    title: "Wedding Bell Blues",
    description:
      "A vow renewal in a champagne tent turns into the most Gilmore family evening of them all.",
    scores: { cozy: 5, emotional: 8, drama: 10, chaos: 7, romance: 7, autumn: 4, starsHollow: 4, funny: 6 },
    tags: ["Wedding", "Hartford", "Family"],
    characters: ["Emily", "Richard", "Lorelai", "Rory", "Christopher", "Logan"],
    locations: ["Gilmore House"],
    skipFlags: ["christopher", "relationship-drama", "very-emotional", "low-stars-hollow"],
  },
  {
    id: "s6e8",
    season: 6,
    episode: 8,
    title: "Let Me Hear Your Balalaikas Ringing Out",
    description:
      "A big return, an awkward welcome, and a long walk toward something like forgiveness.",
    scores: { cozy: 6, emotional: 9, drama: 7, chaos: 4, romance: 6, autumn: 6, starsHollow: 8, funny: 5 },
    tags: ["Reunion", "Coming Home", "Tender"],
    characters: ["Lorelai", "Rory", "Luke", "Lane"],
    locations: ["Stars Hollow"],
    skipFlags: ["sad-rory"],
  },
  {
    id: "s6e10",
    season: 6,
    episode: 10,
    title: "He's Slippin' 'Em Bread… Dig?",
    description:
      "Kirk stages an experimental film, the band scrambles for a drummer, and things at the diner get complicated.",
    scores: { cozy: 7, emotional: 4, drama: 5, chaos: 8, romance: 4, autumn: 6, starsHollow: 10, funny: 10 },
    tags: ["Kirk Movie", "Band", "Small Town"],
    characters: ["Kirk", "Lane", "Zach", "Lorelai", "Luke"],
    locations: ["Stars Hollow"],
    skipFlags: [],
  },
  {
    id: "s7e10",
    season: 7,
    episode: 10,
    title: "Merry Fisticuffs",
    description:
      "A holiday party gets a punch it didn't RSVP for, and everyone else pretends not to notice.",
    scores: { cozy: 7, emotional: 5, drama: 8, chaos: 7, romance: 5, autumn: 5, starsHollow: 6, funny: 7 },
    tags: ["Christmas", "Party", "Punch"],
    characters: ["Lorelai", "Rory", "Christopher", "Logan"],
    locations: ["Hartford"],
    skipFlags: ["christopher", "logan"],
  },
  {
    id: "s7e22",
    season: 7,
    episode: 22,
    title: "Bon Voyage",
    description:
      "A town says goodbye the only way it knows how: umbrellas up, tents pitched, and coffee poured all night.",
    scores: { cozy: 9, emotional: 10, drama: 4, chaos: 4, romance: 6, autumn: 6, starsHollow: 10, funny: 6 },
    tags: ["Finale", "Farewell", "Whole Town"],
    characters: ["Lorelai", "Rory", "Luke", "Sookie", "Everyone"],
    locations: ["Stars Hollow Square"],
    skipFlags: ["very-emotional"],
  },
];

export const MOODS: { key: Mood | "surprise"; label: string; emoji: string }[] = [
  { key: "cozy", label: "Cozy", emoji: "☕" },
  { key: "emotional", label: "Emotional", emoji: "😭" },
  { key: "drama", label: "Drama", emoji: "💅" },
  { key: "chaos", label: "Chaos", emoji: "😈" },
  { key: "autumn", label: "Autumn", emoji: "🍂" },
  { key: "romance", label: "Romance", emoji: "💕" },
  { key: "starsHollow", label: "Stars Hollow", emoji: "🏡" },
  { key: "funny", label: "Funny", emoji: "😂" },
  { key: "surprise", label: "Surprise Me", emoji: "🎲" },
];

export const SKIP_OPTIONS: { key: SkipTag; label: string }[] = [
  { key: "relationship-drama", label: "Relationship drama" },
  { key: "sad-rory", label: "Sad Rory" },
  { key: "christopher", label: "Christopher" },
  { key: "too-much-paris", label: "Too much Paris" },
  { key: "low-stars-hollow", label: "Low Stars Hollow vibes" },
  { key: "very-emotional", label: "Very emotional episodes" },
  { key: "logan", label: "Logan" },
  { key: "jess", label: "Jess" },
  { key: "dean", label: "Dean" },
];
