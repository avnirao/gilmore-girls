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

type Raw = [
  season: number,
  ep: number,
  title: string,
  description: string,
  scores: Partial<Record<Mood, number>>,
  tags?: string[],
  skipFlags?: SkipTag[],
];

// Baseline mood scores per season, tuned to the general feel of that year.
// Individual episodes override these where we know better.
const SEASON_BASE: Record<number, Record<Mood, number>> = {
  1: { cozy: 8, emotional: 5, drama: 5, chaos: 4, romance: 5, autumn: 6, starsHollow: 9, funny: 7 },
  2: { cozy: 8, emotional: 5, drama: 6, chaos: 5, romance: 6, autumn: 6, starsHollow: 9, funny: 8 },
  3: { cozy: 7, emotional: 6, drama: 6, chaos: 5, romance: 6, autumn: 6, starsHollow: 8, funny: 8 },
  4: { cozy: 6, emotional: 6, drama: 6, chaos: 5, romance: 5, autumn: 5, starsHollow: 7, funny: 7 },
  5: { cozy: 6, emotional: 6, drama: 7, chaos: 5, romance: 6, autumn: 5, starsHollow: 6, funny: 7 },
  6: { cozy: 6, emotional: 7, drama: 7, chaos: 5, romance: 5, autumn: 5, starsHollow: 6, funny: 6 },
  7: { cozy: 6, emotional: 7, drama: 6, chaos: 5, romance: 5, autumn: 5, starsHollow: 6, funny: 6 },
};

const RAW: Raw[] = [
  // ── Season 1 ────────────────────────────────────────────────────────────────
  [1, 1, "Pilot", "meet a mother and daughter who talk faster than they walk, in a town where everyone knows your coffee order.", { cozy: 9, drama: 6, romance: 6, funny: 8, starsHollow: 10 }, ["introductions", "diner", "new school"]],
  [1, 2, "The Lorelais' First Day at Chilton", "first uniforms, first bells, and one very memorable outfit choice on the way out the door.", { cozy: 6, drama: 6, funny: 8, starsHollow: 6 }, ["chilton", "first day"]],
  [1, 3, "Kill Me Now", "a golf outing with grandpa turns into a surprise afternoon of shared silences and small revelations.", { cozy: 6, emotional: 6, funny: 7 }, ["family", "hartford"]],
  [1, 4, "The Deer Hunters", "a bad grade sends lorelai storming chilton and rory into a brand new kind of crisis.", { cozy: 6, drama: 6, funny: 8 }, ["chilton", "mother-daughter"]],
  [1, 5, "Cinnamon's Wake", "the whole town shows up to mourn a cat, and a new teacher shows up to complicate lorelai's schedule.", { cozy: 9, funny: 8, starsHollow: 10 }, ["town gathering", "max"]],
  [1, 6, "Rory's Birthday Parties", "two very different parties for the same girl on the same weekend — one with pizza, one with pearls.", { cozy: 7, drama: 6, funny: 8 }, ["birthday", "family"]],
  [1, 7, "Kiss and Tell", "first kisses spread through town gossip faster than lorelai can order coffee.", { cozy: 7, romance: 7, funny: 8, starsHollow: 9 }, ["dean", "market"], ["dean"]],
  [1, 8, "Love and War and Snow", "the first snow blankets stars hollow and everyone gets a little dreamy — including lorelai, who's suddenly snowed in.", { cozy: 10, romance: 8, funny: 7, starsHollow: 10, autumn: 7 }, ["snowy", "first snow", "max"]],
  [1, 9, "Rory's Dance", "a chilton formal, a very long night, and a doorway confrontation nobody will forget.", { cozy: 5, drama: 8, emotional: 7, romance: 7 }, ["dance", "chilton"], ["relationship-drama"]],
  [1, 10, "Forgiveness and Stuff", "a quiet hospital night forces a reluctant family to sit still long enough to actually look at each other.", { cozy: 5, emotional: 9, drama: 7 }, ["family", "hospital"], ["very-emotional"]],
  [1, 11, "Paris Is Burning", "a chilton headline sends paris into orbit and lorelai into an awkward parent-teacher meeting.", { drama: 6, funny: 8 }, ["chilton", "paris"], ["too-much-paris"]],
  [1, 12, "Double Date", "sookie, jackson, and a friend of a friend try to make a foursome work over dinner.", { cozy: 7, romance: 6, funny: 8 }, ["sookie", "date night"]],
  [1, 13, "Concert Interruptus", "a girls' night out at a concert turns into a chaperoning adventure through the city.", { chaos: 7, funny: 9, romance: 5 }, ["road trip", "friendship"]],
  [1, 14, "That Damn Donna Reed", "rory tries on a 1950s wife for one night and lorelai learns dean has strong opinions.", { cozy: 7, funny: 9, romance: 6 }, ["dean", "small town"], ["dean"]],
  [1, 15, "Christopher Returns", "rory's dad drops by hartford and lorelai's parents remember exactly why they never approved.", { drama: 8, emotional: 7 }, ["christopher", "family"], ["christopher", "relationship-drama"]],
  [1, 16, "Star-Crossed Lovers and Other Strangers", "the annual founders' festival puts everyone in a matchmaking mood, or a breakup one.", { cozy: 7, romance: 7, starsHollow: 10, funny: 7 }, ["festival", "town event"], ["relationship-drama"]],
  [1, 17, "The Breakup, Part 2", "a movie night, a mall trip, and a very determined attempt to feel fine.", { emotional: 7, funny: 7 }, ["friendship", "girls night"], ["relationship-drama"]],
  [1, 18, "The Third Lorelai", "trix arrives from london with opinions on everything and a trust fund to unlock.", { drama: 7, funny: 9 }, ["trix", "family"]],
  [1, 19, "Emily in Wonderland", "emily finally sees the potting shed and the inn she's been hearing about for years.", { cozy: 7, emotional: 6, funny: 7 }, ["independence inn", "emily"]],
  [1, 20, "P.S. I Lo...", "a big letter, a lot of hesitation, and one very careful walk to the mailbox.", { emotional: 7, romance: 7 }, ["dean", "big feelings"], ["relationship-drama", "dean"]],
  [1, 21, "Love, Daisies and Troubadours", "a season-ending flurry of second chances, big questions, and a very sudden yes.", { cozy: 7, romance: 9, emotional: 6, starsHollow: 9 }, ["finale", "max", "big moment"]],

  // ── Season 2 ────────────────────────────────────────────────────────────────
  [2, 1, "Sadie, Sadie", "an engagement, a stack of gifts, and the slow realization that yes was the easy part.", { emotional: 6, drama: 6, romance: 7 }, ["engagement", "max"]],
  [2, 2, "Hammers and Veils", "wedding planning collides with rory's chilton life in exactly the way you'd expect.", { drama: 6, funny: 7 }, ["wedding planning", "chilton"]],
  [2, 3, "Red Light on the Wedding Night", "cold feet, hot coffee, and a very late-night drive south.", { emotional: 7, drama: 7 }, ["max", "big choice"], ["very-emotional", "relationship-drama"]],
  [2, 4, "The Road Trip to Harvard", "a spontaneous inn-hopping getaway and a lot of overdue mother-daughter talking.", { cozy: 8, emotional: 7, funny: 8, autumn: 6 }, ["road trip", "b&b"]],
  [2, 5, "Nick & Nora / Sid & Nancy", "a new arrival in town shakes up the diner regulars and puts a familiar mug in an unfamiliar mood.", { cozy: 7, drama: 7, funny: 8, starsHollow: 9 }, ["jess arrives", "diner"], ["jess"]],
  [2, 6, "Presenting Lorelai Gilmore", "rory's debutante ball comes with a white dress, a waltz, and a lot of gilmore politics.", { drama: 7, romance: 6, funny: 7 }, ["debutante", "hartford"]],
  [2, 7, "Like Mother, Like Daughter", "an emily-styled makeover and a very awkward chilton mother-daughter fashion show.", { drama: 6, funny: 9 }, ["chilton", "emily"]],
  [2, 8, "The Ins and Outs of Inns", "lorelai and sookie tour a listing that might just be the inn of their dreams.", { cozy: 8, starsHollow: 8, funny: 7 }, ["dragonfly", "sookie"]],
  [2, 9, "Run Away, Little Boy", "rory carries a very reluctant romeo through a chilton production of shakespeare.", { drama: 6, funny: 9 }, ["chilton", "play"]],
  [2, 10, "The Bracebridge Dinner", "a snowed-in banquet at the inn becomes an all-town costume feast with sleigh rides and secret candlelight.", { cozy: 10, romance: 6, autumn: 8, starsHollow: 10, funny: 8 }, ["snowy", "inn", "banquet"]],
  [2, 11, "Secrets and Loans", "termites at the crap shack force lorelai to ask her mother for something she'd rather not.", { emotional: 6, drama: 6, funny: 7 }, ["family", "money"]],
  [2, 12, "Richard in Stars Hollow", "newly-retired richard visits the inn and reorganizes everything in sight.", { cozy: 7, funny: 9, starsHollow: 9 }, ["richard", "inn"]],
  [2, 13, "A-Tisket, A-Tasket", "the annual basket auction turns picnic baskets into public declarations, and nobody's bidding is subtle.", { cozy: 8, romance: 9, starsHollow: 10, funny: 8 }, ["town event", "auction"], ["relationship-drama"]],
  [2, 14, "It Should've Been Lorelai", "christopher visits with a new girlfriend and old feelings show up uninvited.", { emotional: 7, drama: 7 }, ["christopher"], ["christopher", "relationship-drama"]],
  [2, 15, "Lost and Found", "a lost bracelet, a new apartment, and jess quietly making himself at home.", { emotional: 6, drama: 6 }, ["dean", "jess"], ["relationship-drama"]],
  [2, 16, "There's the Rub", "emily hijacks lorelai's spa weekend and rory throws a very small dinner party.", { cozy: 7, drama: 6, funny: 8 }, ["spa", "mother-daughter"]],
  [2, 17, "Dead Uncles and Vegetables", "luke plans a funeral, lorelai runs the diner, and taylor picks a fight with sookie.", { cozy: 7, funny: 9, starsHollow: 10 }, ["diner", "town chaos"]],
  [2, 18, "Back in the Saddle Again", "richard's new consulting venture needs a partner and a client with a mothball collection.", { drama: 5, funny: 8 }, ["richard", "business"]],
  [2, 19, "Teach Me Tonight", "an after-hours tutoring session ends with a very loud car and a night that changes everything.", { drama: 9, emotional: 8, chaos: 7 }, ["jess", "big moment"], ["very-emotional", "jess"]],
  [2, 20, "Help Wanted", "lorelai pitches in at her dad's new office and finds a version of him she hasn't met before.", { emotional: 7, funny: 6 }, ["richard", "father-daughter"]],
  [2, 21, "Lorelai's Graduation Day", "rory ditches school for a mystery day trip and lorelai walks the stage without her.", { emotional: 8, drama: 6 }, ["graduation", "milestone"], ["very-emotional"]],
  [2, 22, "I Can't Get Started", "a big weekend of vows and choices arrives, and everyone gets exactly what they weren't quite ready for.", { emotional: 9, drama: 10, chaos: 7, romance: 8 }, ["wedding", "cliffhanger"], ["very-emotional", "relationship-drama", "christopher"]],

  // ── Season 3 ────────────────────────────────────────────────────────────────
  [3, 1, "Those Lazy-Hazy-Crazy Days", "end of summer at the inn, at the diner, at the lake — the whole town in soft focus.", { cozy: 10, starsHollow: 10, funny: 7, romance: 6 }, ["summer", "town"]],
  [3, 2, "Haunted Leg", "lorelai finds herself flirted with in unexpected places and rory tries to survive paris's new regime.", { funny: 9, drama: 5, starsHollow: 7 }, ["diner", "banter"], ["too-much-paris"]],
  [3, 3, "Application Anxiety", "the harvard brochure comes out and every gilmore reacts in exactly the wrong direction.", { drama: 6, funny: 7 }, ["yale/harvard", "college"]],
  [3, 4, "One's Got Class and the Other One Dyes", "lorelai teaches a class at chilton and rory tries a new hair color she immediately regrets.", { funny: 8, cozy: 6 }, ["chilton", "makeover"]],
  [3, 5, "Eight O'Clock at the Oasis", "lorelai starts dating a very nice guy and rory tries to figure out if she's actually done with dean.", { romance: 6, funny: 7 }, ["date night"], ["relationship-drama"]],
  [3, 6, "Take the Deviled Eggs...", "jess gets a car, sookie plans a shower, and lorelai keys the wrong vehicle out of principle.", { chaos: 7, funny: 9 }, ["baby shower", "chaos"], ["jess"]],
  [3, 7, "They Shoot Gilmores, Don't They?", "a charity dance marathon turns the town gym into a slow-motion battlefield of exhaustion and glitter.", { emotional: 8, drama: 9, chaos: 7, romance: 7, starsHollow: 10, funny: 8, autumn: 7 }, ["town event", "dance marathon", "iconic"], ["relationship-drama"]],
  [3, 8, "Let the Games Begin", "a yale campus tour with the whole family goes about as well as any gilmore field trip can.", { drama: 6, funny: 8, emotional: 6 }, ["yale", "family"]],
  [3, 9, "A Deep-Fried Korean Thanksgiving", "four thanksgiving dinners in one night, and none of them are optional.", { cozy: 9, chaos: 7, funny: 9, autumn: 9, starsHollow: 9 }, ["thanksgiving", "holiday"]],
  [3, 10, "That'll Do, Pig", "grandparents' night out, a pageant, and a very political pig make for a strangely perfect evening.", { cozy: 7, funny: 9, starsHollow: 9 }, ["town event", "emily and richard"]],
  [3, 11, "I Solemnly Swear", "a lawsuit lands on emily's doorstep and lorelai is called to give a deposition she'd rather skip.", { drama: 7, emotional: 6 }, ["emily", "hartford"]],
  [3, 12, "Lorelai Out of Water", "luke tries to teach lorelai to fly-fish and rory dodges a very persistent boy at yale.", { cozy: 7, romance: 5, funny: 8 }, ["luke", "yale"]],
  [3, 13, "Dear Emily and Richard", "flashbacks and present-day family news together retell how the gilmore girls came to be.", { emotional: 9, drama: 7 }, ["flashback", "family"], ["very-emotional"]],
  [3, 14, "Swan Song", "rory's face meets a swan and jess's eye meets a fist. no one has a good week.", { drama: 6, funny: 7 }, ["jess"], ["jess", "relationship-drama"]],
  [3, 15, "Face-Off", "rory goes to a chilton hockey game and finally decides what she wants.", { emotional: 6, drama: 7, romance: 7 }, ["dean", "jess"], ["relationship-drama"]],
  [3, 16, "The Big One", "a debate, a speech, a shocking pregnancy announcement — a lot of big for one week.", { drama: 8, emotional: 7 }, ["chilton", "sookie"]],
  [3, 17, "A Tale of Poes and Fire", "a themed weekend at the inn goes sideways in the most stars hollow way possible.", { cozy: 8, chaos: 9, funny: 9, starsHollow: 10 }, ["inn", "convention", "chaos"]],
  [3, 18, "Happy Birthday, Baby", "lorelai's birthday brings a surprise gift from richard that changes a long-running argument.", { emotional: 7, cozy: 6 }, ["birthday", "family"]],
  [3, 19, "Keg! Max!", "a house party at kyle's ends in the loudest fight the town has seen in a while.", { chaos: 8, drama: 7, emotional: 7 }, ["party", "dean", "jess"], ["relationship-drama"]],
  [3, 20, "Say Goodnight, Gracie", "a sudden goodbye at the diner and a quiet one at a bus station on the same day.", { emotional: 8, drama: 6 }, ["jess", "farewell"], ["very-emotional", "jess"]],
  [3, 21, "Here Comes the Son", "a west coast detour follows one gilmore-adjacent boy trying to find a fresh start.", { emotional: 6, drama: 5 }, ["jess", "california"], ["jess", "low-stars-hollow"]],
  [3, 22, "Those Are Strings, Pinocchio", "a graduation, a speech, and the sound of a chapter quietly closing on a familiar street.", { emotional: 10, starsHollow: 9 }, ["graduation", "tearjerker"], ["very-emotional"]],

  // ── Season 4 ────────────────────────────────────────────────────────────────
  [4, 1, "Ballrooms and Biscotti", "a europe trip ends abruptly and a very rushed move-in kicks off yale week.", { emotional: 6, chaos: 6, funny: 7 }, ["yale", "move-in"]],
  [4, 2, "The Lorelais' First Day at Yale", "first dorm, first roommates, first middle-of-the-night phone call home.", { emotional: 8, cozy: 6 }, ["yale", "first day"]],
  [4, 3, "The Hobbit, the Sofa and Digger Stiles", "an antique sofa refuses to fit and a new business partner shows up for richard.", { funny: 7, drama: 5 }, ["richard", "sofa"]],
  [4, 4, "Chicken or Beef?", "the dragonfly inn hires and fires a chef in one very long day.", { cozy: 7, funny: 8, starsHollow: 8 }, ["inn", "sookie"]],
  [4, 5, "The Fundamental Things Apply", "lorelai on a real date and rory on a very not-real one, both remembering how to do this.", { romance: 6, funny: 7 }, ["date night"]],
  [4, 6, "An Affair to Remember", "emily throws a party for richard's new business and calls in a lot of favors.", { drama: 6, funny: 7 }, ["emily", "party"]],
  [4, 7, "The Festival of Living Art", "the town restages famous paintings and taylor makes everyone hold very still.", { cozy: 8, chaos: 6, starsHollow: 10, funny: 9 }, ["town event", "tableau"]],
  [4, 8, "Die, Jerk", "a first review goes to print, opinions have consequences, and one town's baker is not amused.", { drama: 7, funny: 9, starsHollow: 8 }, ["yale", "newspaper"], ["too-much-paris"]],
  [4, 9, "Ted Koppel's Big Night Out", "rory hosts paris and terrence for a very small, very awkward dinner party.", { drama: 6, funny: 8 }, ["yale", "paris"], ["too-much-paris"]],
  [4, 10, "The Nanny and the Professor", "sookie interviews nannies, rory helps paris manage her new professor relationship.", { funny: 7, drama: 5 }, ["sookie", "paris"], ["too-much-paris"]],
  [4, 11, "In the Clamor and the Clangor", "a ringing church bell won't quit, and lorelai has a very overdue conversation with her mother.", { cozy: 7, emotional: 7, starsHollow: 9, funny: 7 }, ["town bell", "reconciliation"]],
  [4, 12, "A Family Matter", "jess quietly comes back to town and luke's world quietly rearranges itself.", { emotional: 7, drama: 6 }, ["jess", "luke"], ["jess"]],
  [4, 13, "Nag Hammadi Is Where They Found the Gnostic Gospels", "a stars hollow crime spree, a yale essay crisis, and a very awkward run-in.", { drama: 6, funny: 8 }, ["dean", "jess"], ["relationship-drama"]],
  [4, 14, "The Incredible Sinking Lorelais", "money, mid-terms and a full inn all pile up in the same very long week.", { emotional: 7, drama: 6 }, ["inn", "yale"]],
  [4, 15, "Scene in a Mall", "an emily-lorelai retail therapy afternoon, calmer and funnier than anyone expected.", { cozy: 7, funny: 8 }, ["emily", "mother-daughter"]],
  [4, 16, "The Reigning Lorelai", "a family emergency in london reshuffles who's in charge of what.", { emotional: 7, drama: 6 }, ["family", "trix"]],
  [4, 17, "Girls in Bikinis, Boys Doin' the Twist", "spring break, a very unwise beach house, and a phone call that surprises rory.", { chaos: 6, funny: 7 }, ["spring break", "yale"]],
  [4, 18, "Tick, Tick, Tick, Boom!", "the taylor-vs-jason feud spills onto the town square and dinner gets uncomfortable.", { drama: 6, funny: 7 }, ["taylor", "town"]],
  [4, 19, "Afterboom", "a magazine deadline sends the gilmore girls into weekend-long lockdown mode.", { cozy: 6, drama: 6 }, ["yale", "family"]],
  [4, 20, "Luke Can See Her Face", "luke rents a self-help tape and finally hears what it's been trying to tell him.", { emotional: 6, romance: 8, funny: 8, starsHollow: 8 }, ["luke", "revelation"]],
  [4, 21, "Last Week Fights, This Week Tights", "sookie's wedding weekend and a lot of unfinished conversations packed into one afternoon.", { emotional: 7, drama: 7, romance: 7 }, ["sookie", "wedding"], ["relationship-drama"]],
  [4, 22, "Raincoats and Recipes", "the inn's test run brings the whole town under one roof — and a long-simmering question finally boils over.", { cozy: 8, drama: 8, romance: 10, starsHollow: 10 }, ["inn opening", "big moment"], ["relationship-drama"]],

  // ── Season 5 ────────────────────────────────────────────────────────────────
  [5, 1, "Say Goodbye to Daisy Miller", "post-kiss reality check for lorelai and a europe recap for everyone else.", { romance: 7, emotional: 6 }, ["luke", "lorelai"]],
  [5, 2, "A Messenger, Nothing More", "the girls try to talk about it. they don't talk about it. they eat instead.", { funny: 7, romance: 6 }, ["luke", "avoidance"]],
  [5, 3, "Written in the Stars", "a first date so overdue it comes with an audience and half the town watching.", { cozy: 8, romance: 9, starsHollow: 9, funny: 7 }, ["first date", "luke"]],
  [5, 4, "Tippecanoe and Taylor, Too", "an unlikely candidate challenges taylor and stars hollow finds itself with an actual election.", { funny: 9, starsHollow: 10 }, ["town election"]],
  [5, 5, "We Got Us a Pippi Virgin", "an all-night pippi longstocking marathon and a poorly-timed reappearance in stars hollow.", { cozy: 7, funny: 7 }, ["movie night", "dean"], ["dean", "relationship-drama"]],
  [5, 6, "Norman Mailer, I'm Pregnant!", "the dragonfly's soft opening gets crashed by writers, cameras, and jason.", { drama: 6, funny: 8, starsHollow: 7 }, ["inn", "dragonfly"]],
  [5, 7, "You Jump, I Jump, Jack", "a secret society whisks rory into a candlelit night of umbrellas, tuxedos, and questionable life choices.", { chaos: 8, romance: 8, funny: 8, autumn: 7 }, ["yale", "life and death brigade"], ["logan", "low-stars-hollow"]],
  [5, 8, "The Party's Over", "emily throws rory a party stocked entirely with eligible bachelors and one very unhappy dean.", { drama: 7, romance: 6 }, ["emily", "dean"], ["dean", "relationship-drama"]],
  [5, 9, "Emily Says Hello", "newly-single emily starts dating and everyone else tries not to have a feeling about it.", { drama: 6, funny: 7, emotional: 6 }, ["emily"]],
  [5, 10, "But Not as Cute as Pushkin", "yale opens its doors to prospective students and lorelai plays reluctant tour guide.", { cozy: 6, funny: 8 }, ["yale", "family"]],
  [5, 11, "Women of Questionable Morals", "a costumed reenactment in the town square, and luke building a very meaningful ice rink.", { cozy: 9, romance: 8, starsHollow: 10, autumn: 6, funny: 8 }, ["snowy", "ice rink", "town event"]],
  [5, 12, "Come Home", "lorelai steps into the middle of her parents' separation with a stack of takeout menus.", { emotional: 8, drama: 7 }, ["emily", "richard"], ["very-emotional"]],
  [5, 13, "Wedding Bell Blues", "a vow renewal in a champagne tent turns into the most gilmore family evening of them all.", { emotional: 8, drama: 10, chaos: 7 }, ["wedding", "hartford"], ["christopher", "relationship-drama", "very-emotional", "low-stars-hollow"]],
  [5, 14, "Say Something", "morning-after silence, and a family breaking down about what happened at the party.", { emotional: 9, drama: 8 }, ["luke", "fight"], ["relationship-drama", "very-emotional"]],
  [5, 15, "Jews and Chinese Food", "an epic chilton drama production, an unexpected reunion, and a very stars hollow evening.", { funny: 8, starsHollow: 9 }, ["chilton", "play"]],
  [5, 16, "So...Good Talk", "friday night dinner without richard, and lorelai and emily forced to be a table of two.", { emotional: 7, drama: 6 }, ["emily", "friday night dinner"]],
  [5, 17, "Pulp Friction", "logan sends rory a message with an audience of one and rory picks a lane.", { romance: 7, drama: 6 }, ["logan", "yale"], ["logan"]],
  [5, 18, "To Live and Let Diorama", "the town buys a historical house and immediately starts fighting over the exhibits.", { cozy: 7, funny: 8, starsHollow: 10 }, ["town museum"]],
  [5, 19, "But I'm a Gilmore!", "rory meets logan's parents and hears a version of her future she doesn't recognize.", { emotional: 7, drama: 8 }, ["logan", "huntzbergers"], ["logan", "sad-rory"]],
  [5, 20, "How Many Kropogs to Cape Cod?", "richard tries to mentor a very unimpressed yale freshman named logan.", { funny: 7, drama: 5 }, ["richard", "logan"], ["logan"]],
  [5, 21, "Blame Booze and Melville", "a stolen yacht, a courtroom, and the moment rory decides to walk away from all of it.", { emotional: 8, drama: 9, chaos: 7 }, ["yacht", "logan", "yale"], ["logan", "sad-rory", "very-emotional"]],
  [5, 22, "A House Is Not a Home", "a night in jail, a dinner at the elder gilmores, and one very quiet drive to the diner.", { emotional: 10, drama: 8 }, ["finale", "cliffhanger"], ["very-emotional", "sad-rory"]],

  // ── Season 6 ────────────────────────────────────────────────────────────────
  [6, 1, "New and Improved Lorelai", "a spontaneous proposal in the middle of the night — and radio silence from another gilmore.", { emotional: 7, romance: 7, drama: 7 }, ["engagement", "luke"], ["sad-rory"]],
  [6, 2, "Fight Face", "lorelai visits rory at the poolhouse and remembers exactly why she left hartford at sixteen.", { drama: 7, emotional: 7 }, ["hartford", "estrangement"], ["sad-rory"]],
  [6, 3, "The UnGraduate", "rory's community service, taylor's ideas, and a very slow reconciliation begins.", { drama: 5, funny: 6 }, ["community service", "logan"], ["logan", "sad-rory"]],
  [6, 4, "Always a Godmother, Never a God", "sookie's baby gets a christening and rory attends her first stars hollow event in months.", { emotional: 6, cozy: 6 }, ["sookie", "family"], ["sad-rory"]],
  [6, 5, "We've Got Magic to Do", "emily drafts lorelai for a dar event and rory throws logan a birthday party.", { drama: 6, funny: 7 }, ["emily", "logan"], ["logan"]],
  [6, 6, "Welcome to the Doll House", "the family sits down for a very small, very tense friday night dinner.", { drama: 6, emotional: 6 }, ["friday night dinner"]],
  [6, 7, "Twenty-One is the Loneliest Number", "rory's 21st birthday with the elder gilmores, and a quieter one with lorelai across town.", { emotional: 8, drama: 5 }, ["birthday", "milestone"], ["very-emotional"]],
  [6, 8, "Let Me Hear Your Balalaikas Ringing Out", "a big return, an awkward welcome, and a long walk toward something like forgiveness.", { emotional: 9, cozy: 6, starsHollow: 8 }, ["reunion", "coming home"], ["sad-rory"]],
  [6, 9, "The Prodigal Daughter Returns", "the potting shed gets its resident back and stars hollow starts to look like itself again.", { emotional: 8, cozy: 7, starsHollow: 9 }, ["coming home", "mother-daughter"]],
  [6, 10, "He's Slippin' 'Em Bread… Dig?", "kirk stages an experimental film, the band scrambles for a drummer, and things at the diner get complicated.", { cozy: 7, chaos: 8, funny: 10, starsHollow: 10 }, ["kirk movie", "band"]],
  [6, 11, "The Perfect Dress", "engagement dress shopping, a mystery daughter in the paper, and a very off day for luke.", { emotional: 6, drama: 7, romance: 6 }, ["luke", "engagement"]],
  [6, 12, "Just Like Gwen and Gavin", "luke tries to figure out what a daughter needs and lorelai tries not to have any opinions.", { emotional: 7, drama: 6 }, ["luke", "april"], ["relationship-drama"]],
  [6, 13, "Friday Night's Alright for Fighting", "a marathon four-course friday night dinner turns into an actual family conversation.", { drama: 7, funny: 8, emotional: 7 }, ["friday night dinner", "family"]],
  [6, 14, "You've Been Gilmored", "logan meets the elder gilmores for a very formal dinner and passes with distinction.", { funny: 7, romance: 6 }, ["logan", "friday night dinner"], ["logan"]],
  [6, 15, "A Vineyard Valentine", "a couples' weekend on martha's vineyard for two very different couples.", { cozy: 7, romance: 7 }, ["valentine", "getaway"], ["logan"]],
  [6, 16, "Bridesmaids Revisited", "a wedding weekend brings out old friends and one very drunk speech.", { emotional: 7, drama: 8, chaos: 6 }, ["wedding", "logan"], ["logan", "relationship-drama"]],
  [6, 17, "I'm OK, You're OK", "a dinner with april's mom that lorelai desperately wants to be over with.", { emotional: 7, drama: 7 }, ["luke", "april"], ["relationship-drama"]],
  [6, 18, "The Real Paul Anka", "rory and lorelai take a book tour road trip to philadelphia with an unexpected detour.", { emotional: 6, funny: 7 }, ["jess", "road trip"], ["jess"]],
  [6, 19, "I Get a Sidekick Out of You", "lane's shotgun wedding brings out sequins, a korean tea ceremony, and a lot of feelings.", { cozy: 7, emotional: 7, starsHollow: 10, funny: 7 }, ["lane", "wedding"]],
  [6, 20, "Super Cool Party People", "luke throws april a birthday party and lorelai finally shows up to help.", { emotional: 7, cozy: 6, funny: 7 }, ["luke", "april"]],
  [6, 21, "Driving Miss Gilmore", "emily's eye surgery puts lorelai in the driver's seat for a very long afternoon.", { emotional: 7, funny: 8 }, ["emily", "mother-daughter"]],
  [6, 22, "Partings", "an ultimatum, a launch party, and one very bad decision at exactly the wrong moment.", { emotional: 9, drama: 10, chaos: 6 }, ["finale", "cliffhanger"], ["very-emotional", "relationship-drama", "christopher"]],

  // ── Season 7 ────────────────────────────────────────────────────────────────
  [7, 1, "The Long Morrow", "the morning after a very bad night, and the beginning of a very quiet season.", { emotional: 9, drama: 7 }, ["luke", "christopher"], ["very-emotional", "relationship-drama", "christopher"]],
  [7, 2, "That's What You Get, Folks, for Makin' Whoopee", "lorelai tries to move on and luke tries to figure out what to say when he sees her.", { emotional: 7, drama: 6 }, ["luke", "lorelai"], ["relationship-drama"]],
  [7, 3, "Lorelai's First Cotillion", "emily calls lorelai in to help chaperone a cotillion of very small debutantes.", { funny: 7, emotional: 6 }, ["emily", "cotillion"]],
  [7, 4, "'S Wonderful, 'S Marvelous", "a spontaneous new york getaway with christopher and a lot to talk around.", { romance: 6, drama: 6 }, ["christopher", "new york"], ["christopher"]],
  [7, 5, "The Great Stink", "a smell no one can locate takes over stars hollow for a very long week.", { funny: 8, chaos: 6, starsHollow: 10 }, ["town chaos"]],
  [7, 6, "Go, Bulldogs!", "yale parents' weekend, a very small game of touch football, and a lot of small talk.", { funny: 6, drama: 5 }, ["yale", "parents weekend"], ["logan"]],
  [7, 7, "French Twist", "a paris weekend, a spontaneous ceremony, and a call home no one expected.", { romance: 8, emotional: 7, drama: 7 }, ["christopher", "paris"], ["christopher", "relationship-drama"]],
  [7, 8, "Introducing Lorelai Planetarium", "a family dinner to tell rory the news that everyone's been dreading.", { emotional: 8, drama: 7 }, ["family", "big news"], ["very-emotional", "christopher"]],
  [7, 9, "Knit, People, Knit!", "stars hollow holds a knit-a-thon in the town square and rory covers it for the paper.", { cozy: 9, starsHollow: 10, funny: 7, autumn: 6 }, ["town event", "knitting"]],
  [7, 10, "Merry Fisticuffs", "a holiday party gets a punch it didn't rsvp for, and everyone else pretends not to notice.", { drama: 7, chaos: 7, funny: 6 }, ["christmas", "party"], ["christopher", "logan"]],
  [7, 11, "Santa's Secret Stuff", "a delayed christmas at the crap shack, quiet and small and finally just the two of them.", { cozy: 10, emotional: 7, autumn: 6, starsHollow: 9 }, ["christmas", "mother-daughter"]],
  [7, 12, "To Whom It May Concern", "letters of recommendation, a big divorce meeting, and a very careful lunch with luke.", { emotional: 7, drama: 6 }, ["yale", "luke"]],
  [7, 13, "I'd Rather Be in Philadelphia", "a family emergency lands richard in the hospital and everyone in one waiting room.", { emotional: 10, drama: 8 }, ["richard", "hospital"], ["very-emotional"]],
  [7, 14, "Farewell, My Pet", "the town holds a pet funeral for michel's dog and a lot of humans quietly grieve too.", { cozy: 6, emotional: 7, funny: 6, starsHollow: 9 }, ["michel", "town event"]],
  [7, 15, "I Am Kayak, Hear Me Roar", "sookie panics about the inn, rory tackles a new writing job, and lorelai plays go-between.", { funny: 7, cozy: 6 }, ["sookie", "inn"]],
  [7, 16, "Will You Be My Lorelai Gilmore?", "a small ceremony in the front yard and a much bigger conversation on the porch.", { emotional: 7, romance: 6 }, ["april", "family"]],
  [7, 17, "Gilmore Girls Only", "an all-gilmore-women weekend at a spa reshuffles three generations of feelings.", { cozy: 7, emotional: 8, funny: 7 }, ["emily", "spa"]],
  [7, 18, "Hay Bale Maze", "kirk builds a hay bale maze in the town square and rory writes an article about small towns.", { cozy: 8, funny: 8, starsHollow: 10, autumn: 8 }, ["town event", "kirk"]],
  [7, 19, "It's Just Like Riding a Bike", "a job offer arrives in rory's inbox that would take her a lot further than yale.", { emotional: 7, drama: 6 }, ["rory", "career"]],
  [7, 20, "Lorelai? Lorelai?", "a karaoke bar, one very brave song, and a doorstep at the end of the night.", { emotional: 8, romance: 8, funny: 7 }, ["luke", "karaoke"]],
  [7, 21, "Unto the Breach", "yale graduation, cap and gown photos, and a proposal in the parking lot after.", { emotional: 9, romance: 7 }, ["graduation", "logan"], ["logan", "very-emotional"]],
  [7, 22, "Bon Voyage", "a town says goodbye the only way it knows how: umbrellas up, tents pitched, and coffee poured all night.", { cozy: 9, emotional: 10, starsHollow: 10, autumn: 6 }, ["finale", "farewell", "whole town"], ["very-emotional"]],
];

function buildScores(season: number, override: Partial<Record<Mood, number>>): Record<Mood, number> {
  return { ...SEASON_BASE[season], ...override };
}

export const episodes: Episode[] = RAW.map(([season, ep, title, description, scores, tags = [], skipFlags = []]) => ({
  id: `s${season}e${ep}`,
  season,
  episode: ep,
  title,
  description,
  scores: buildScores(season, scores),
  tags,
  characters: [],
  locations: [],
  skipFlags,
}));

// dev-time sanity check: exactly 153, one per (season, episode)
if (import.meta.env?.DEV) {
  const seen = new Set<string>();
  for (const e of episodes) {
    const key = `s${e.season}e${e.episode}`;
    if (seen.has(key)) console.warn("duplicate episode:", key);
    seen.add(key);
  }
  if (episodes.length !== 153) console.warn("expected 153 episodes, got", episodes.length);
}

export const MOODS: { key: Mood | "surprise"; label: string }[] = [
  { key: "cozy", label: "cozy" },
  { key: "emotional", label: "emotional" },
  { key: "drama", label: "drama" },
  { key: "chaos", label: "chaos" },
  { key: "autumn", label: "autumn" },
  { key: "romance", label: "romance" },
  { key: "starsHollow", label: "stars hollow" },
  { key: "funny", label: "funny" },
  { key: "surprise", label: "surprise me" },
];

export const SKIP_OPTIONS: { key: SkipTag; label: string }[] = [
  { key: "relationship-drama", label: "relationship drama" },
  { key: "sad-rory", label: "sad rory" },
  { key: "christopher", label: "christopher" },
  { key: "too-much-paris", label: "too much paris" },
  { key: "low-stars-hollow", label: "low stars hollow vibes" },
  { key: "very-emotional", label: "very emotional episodes" },
  { key: "logan", label: "logan" },
  { key: "jess", label: "jess" },
  { key: "dean", label: "dean" },
];
