import type { ListItem } from "@/components/content";

const phantasyStarThumb = require("./assets/ps1.png");
const pokemonCrystalThumb = require("./assets/pokemoncrystal.png");
const chronoTriggerThumb = require("./assets/chronotrigger.png");

export const GAMES_THINKING_ABOUT: ListItem[] = [
  {
    id: "phantasy-star",
    title: "Phantasy Star",
    initials: "PS",
    thumbnail: phantasyStarThumb,
    description:
      "It's absolutely wild that a game this ambitious was released in the United States 7 months before Dragon Warrior and TWO YEARS before Final Fantasy. I should tell you to go grab the Sega Ages remake, with the FM synth soundtrack and super-vital dungeon breadcrumbs, but the SMS Power retranslation romhack blows open the paltry character limits and has LOWERCASE. You'd be shocked what a difference it makes.",
    links: [
      { title: "Walkthrough", url: "https://gamefaqs.gamespot.com/sms/588116-phantasy-star/faqs/53307" },
      { title: "Retranslation romhack", url: "https://www.romhacking.net/translations/1069/" },
    ],
  },
  {
    id: "pokemon-crystal",
    title: "Pokémon Crystal",
    initials: "PC",
    thumbnail: pokemonCrystalThumb,
    description:
      "My son keeps bugging me to play a Pokemon game. I seriously have never made it more than a few hours into any of them. I really like the Game Boy Color aesthetic, so here we are with Crystal. I'm clueless about types so I'm getting my but almost-kicked quite a bit.",
    links: [
      
    ],
  },
  {
    id: "chrono-trigger",
    title: "Chrono Trigger",
    initials: "CT",
    thumbnail: chronoTriggerThumb,
    description:
      "I was struggling to pick another game to play. A colleage noted that he played Chrono Trigger about once a year. It was a good reminder that there are far worse things to do than play a 10/10 game over and over again, especially one with new game+ and dozens of endings.",
    links: [
      
    ],
  },
];
