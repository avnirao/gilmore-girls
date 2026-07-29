# Stars Hollow Tonight

Build a polished, cozy web app called Stars Hollow Tonight — a fan-made Gilmore Girls episode recommendation app.

The core idea: users open the app when they want to watch Gilmore Girls but don't know which episode fits their current mood. They choose a vibe, and the app recommends the perfect episode.

CORE USER EXPERIENCE

The landing page should immediately ask:

“What are we feeling tonight?”

Show beautiful interactive mood cards/buttons:

☕ Cozy
😭 Emotional
💅 Drama
😈 Chaos
🍂 Autumn
💕 Romance
🏡 Stars Hollow
😂 Funny
🎲 Surprise Me

Users can select one or multiple moods and then click:

FIND MY EPISODE →

The app should recommend an episode based on the selected moods.

EPISODE RECOMMENDATION CARD

Create a beautiful, editorial-style recommendation card containing:

Season + episode number

Episode title

Short spoiler-free description

3–5 vibe tags

Vibe scores displayed visually

A short explanation of why this episode matches the user's mood

Example:

S1E8 — Love & War & Snow

“Tonight's pick for maximum Stars Hollow coziness.”

☕ Cozy 10/10
🏡 Stars Hollow 10/10
💕 Romance 5/10
😈 Chaos 3/10

Tags:
Snowy Diner Small Town Comfort

Buttons:

WATCH THIS
TRY AGAIN

When the user clicks TRY AGAIN, show another episode that matches their selected mood rather than simply choosing a completely random episode.

SKIP MODE

Add a feature called:

“What are we NOT in the mood for?”

Users can select things they want to avoid, such as:

Relationship drama

Sad Rory

Christopher

Too much Paris

Low Stars Hollow vibes

Very emotional episodes

Specific characters

The recommendation algorithm should filter these episodes out before choosing a recommendation.

RANDOM EPISODE

Include a small but prominent:

🎲 Surprise Me

button that gives the user a genuinely random episode.

Make this feel playful and satisfying with a subtle animation.

EPISODE DATA

For the first version, create a local mock dataset containing Gilmore Girls episodes.

Each episode should have:

season

episode number

title

spoiler-free description

cozy score

emotional score

drama score

chaos score

romance score

autumn score

stars hollow score

funny score

tags

notable characters

notable locations

Start with enough episodes to demonstrate the recommendation system, but structure the data so all 153 episodes can easily be added later.

Do NOT use copyrighted screenshots, official logos, or scraped copyrighted episode descriptions.

RECOMMENDATION ALGORITHM

Do NOT use AI for the initial recommendation system.

Implement a simple weighted recommendation algorithm based on the user's selected moods and the episode's vibe scores.

For example, if the user chooses Cozy + Stars Hollow, episodes with high cozy and stars_hollow scores should rank higher.

If the user chooses multiple moods, combine their scores.

Apply Skip Mode filters before ranking episodes.

Avoid recommending the exact same episode repeatedly during one session unless the user explicitly chooses Random.

Keep the recommendation logic clean and isolated in its own utility/function so it can later be upgraded.

MY GILMORE GIRLS

Create a second page called:

My Gilmore Girls

It should eventually contain:

Favorite episodes

Watchlist

Recently watched

Episodes watched / 153

Progress bar

For the initial version, use local state/local storage rather than authentication or a database.

DESIGN

The app should feel like a cozy Stars Hollow scrapbook, NOT a generic SaaS dashboard.

Visual direction:

warm cream / parchment background

coffee-inspired neutral tones

subtle autumn accents

handwritten-inspired typography paired with a highly readable modern font

subtle stars, leaves, coffee cups, books, and small-town details

rounded cards

paper/scrapbook textures used very subtly

tasteful shadows

soft transitions

delightful micro-interactions

cozy but sophisticated

nostalgic without looking dated

Use generous whitespace and strong typography.

Avoid:

excessive gradients

generic startup dashboard styling

huge logos

clutter

excessive animations

anything that looks like a template

The app should feel like something a Gilmore Girls fan would actually want to bookmark.

ANIMATIONS

Add subtle animations throughout:

mood cards should respond when selected

recommendation card should smoothly transition when TRY AGAIN is clicked

small celebratory animation when an episode is saved

gentle hover effects

smooth page transitions

Keep animations fast and tasteful.

RESPONSIVENESS

Design mobile-first.

The experience should feel especially good on a phone because this is something someone might open while sitting on the couch deciding what to watch.

Also support desktop beautifully.

TECHNICAL REQUIREMENTS

Use:

React

TypeScript

Tailwind CSS

clean reusable components

local episode data for now

localStorage for favorites/watch history

Do NOT add authentication, Supabase, external APIs, or AI yet.

Structure the code cleanly so that Supabase and authentication can be added later.

Before finishing, test the complete flow:

Landing page → select moods → Find My Episode → recommendation → Try Again → save favorite → My Gilmore Girls → Random Episode.

Make the app feel polished and production-quality rather than like a prototype.

Most importantly: prioritize the emotional experience and charm of the product. The goal is for someone to open it and think “wait this is SO cute.”

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ee4f3306-2ecc-4515-ad20-107661baae68).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
