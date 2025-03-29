const techniques = [
  // Healing Techniques - Target Cure
  {
    name: "RES",
    type: "healing",
    tpCost: 3,
    target: "individual",
    description: "Restores HP based on the user's MTL score. Very useful early in the game, as it saves using MONOMATEs. Can be used anywhere. Only works on organic life.",
    users: ["Chaz", "Hahn", "Rika", "Raja", "Kyra", "Tech User"]
  },
  {
    name: "GIRES",
    type: "healing",
    tpCost: 6,
    target: "individual",
    description: "A more powerful target curative Tech, helpful later in the game. Restores HP based on the user's MTL score. Can be used anywhere. Only works on organic life.",
    users: ["Chaz", "Hahn", "Rika", "Raja", "Kyra", "SoldrFiend", "TechMaster"]
  },
  {
    name: "NARES",
    type: "healing",
    tpCost: 9,
    target: "individual",
    description: "The most potent of the group, it proves invaluable near the end. Restores HP based on the user's MTL score. Can be used anywhere. Only works on organic life.",
    users: ["Chaz", "Hahn", "Rika", "Raja", "Kyra"]
  },
  
  // Healing Techniques - Group Cure
  {
    name: "SAR",
    type: "healing",
    tpCost: 12,
    target: "group",
    description: "A very important Technique in some of the earlier boss battles. Restores HP to all, based on the user's MTL score. Can be used anywhere. Only works on organic life.",
    users: ["Rika", "Raja", "TechMaster"]
  },
  {
    name: "GISAR",
    type: "healing",
    tpCost: 24,
    target: "group",
    description: "An expensive Technique, it should only be used when necessary. Restores HP to all, based on the user's MTL score. Can be used anywhere. Only works on organic life.",
    users: ["Rika", "Raja", "Dark Witch", "Radhin"]
  },
  {
    name: "NASAR",
    type: "healing",
    tpCost: 36,
    target: "group",
    description: "The most powerful heal-all Tech. Essential in later boss battles. Restores HP to all, based on the user's MTL score. Can be used anywhere. Only works on organic life.",
    users: ["Rika", "Raja"]
  },
  
  // Healing Techniques - Status Cure
  {
    name: "ANTI",
    type: "healing",
    tpCost: 2,
    target: "individual",
    description: "A very helpful Tech throughout the game, especially when there is little space to carry ANTIDOTEs. It completely cures Poison. Can be used anywhere.",
    users: ["Chaz", "Hahn", "Raja", "Kyra"]
  },
  {
    name: "RIMPA",
    type: "healing",
    tpCost: 8,
    target: "individual",
    description: "A rarely used but specifically-functioned Technique, it may come in handy when least expected. It completely removes Paralysis. Can be used anywhere.",
    users: ["Chaz", "Hahn", "Raja", "Kyra"]
  },
  {
    name: "AROWS",
    type: "healing",
    tpCost: 9,
    target: "group",
    description: "Exceptionally valuable considering it has no item counter-part, this is very useful later in the game. It awakens all characters. Can only be used in battle.",
    users: ["Rune", "Raja"]
  },
  
  // Healing Techniques - Revival
  {
    name: "REVER",
    type: "healing",
    tpCost: 12,
    target: "individual",
    description: "When MOON-DEWs are hard to come by, this Tech is very useful early in the game. It revives a character and restores 1/4 maximum HP. Can be used anywhere. Only works on organic life.",
    users: ["Chaz", "Rune", "Raja"]
  },
  {
    name: "REGEN",
    type: "healing",
    tpCost: 36,
    target: "individual",
    description: "Unique to Raja, this valuable Technique revives a character and restores all HP, and also removes all status effects. Can be used anywhere. Only works on organic life.",
    users: ["Raja"]
  },
  
  // Attack Techniques - Fire
  {
    name: "FOI",
    type: "attack",
    tpCost: 3,
    target: "individual",
    description: "A weak fire-based Technique that causes a small flame to erupt on the enemy. Effective against most monsters in a cold climate. Can only be used in battle.",
    users: ["Alys", "Rune", "Kyra", "Juza", "Tech User", "TechMaster"]
  },
  {
    name: "GIFOI",
    type: "attack",
    tpCost: 6,
    target: "individual",
    description: "The second fire Technique, this throws three small fireballs at the enemy. Effective against most monsters in a cold climate. Can only be used in battle.",
    users: ["Alys", "Rune", "Kyra", "Dark Witch", "Le-Faw-Gan"]
  },
  {
    name: "NAFOI",
    type: "attack",
    tpCost: 9,
    target: "individual",
    description: "Most powerful of the group, this Technique creates a pillar of fire on the enemy. Effective against most monsters in a cold climate. Can only be used in battle.",
    users: ["Alys", "Rune", "Kyra"]
  },
  
  // Attack Techniques - Water
  {
    name: "WAT",
    type: "attack",
    tpCost: 4,
    target: "individual",
    description: "The weakest water Tech, this creates a shard of piercing cold on the enemy. Effective against most monsters in a hot climate. Can only be used in battle.",
    users: ["Hahn", "Rune", "Elmelew", "Hewgilla", "Juza", "Tech User", "TechMaster"]
  },
  {
    name: "GIWAT",
    type: "attack",
    tpCost: 7,
    target: "individual",
    description: "Stronger than earlier version, this Technique fires three balls of ice at the enemy. Effective against most monsters in a hot climate. Can only be used in battle.",
    users: ["Hahn", "Rune", "Dark Witch", "D-Elm-Lars", "FrostSaber", "Tech-Plant", "Xe-A-Thoul"]
  },
  {
    name: "NAWAT",
    type: "attack",
    tpCost: 10,
    target: "individual",
    description: "The strongest water Technique, it causes a number of shards of ice to impale an enemy. Effective against most monsters in hot climate. Can only be used in battle.",
    users: ["Hahn", "Rune"]
  },
  
  // Attack Techniques - Energy
  {
    name: "TSU",
    type: "attack",
    tpCost: 6,
    target: "individual",
    description: "An energy-based Technique, Chaz fires a high-intensity light beam at the enemy. Can only be used in battle.",
    users: ["Chaz"]
  },
  {
    name: "GITHU",
    type: "attack",
    tpCost: 12,
    target: "individual",
    description: "Far more intense than the first energy Tech, Chaz unleashes a wide light beam at the enemy. Can only be used in battle.",
    users: ["Chaz"]
  },
  {
    name: "NATHU",
    type: "attack",
    tpCost: 16,
    target: "individual",
    description: "The most powerful energy Technique, Chaz unleashes a super-intense, wide light beam at the enemy. Can only be used in battle.",
    users: ["Chaz"]
  },
  {
    name: "MEGID",
    type: "attack",
    tpCost: 30,
    target: "individual",
    description: "This Technique, the most powerful of them all, transforms feelings of anger into a destructive wave of energy. Chaz must acquire this energy-based Tech from Anger Tower. Can only be used in battle.",
    users: ["Chaz", "Re-Faze", "Profound Darkness (3)"]
  },
  
  // Attack Techniques - Force
  {
    name: "ZAN",
    type: "attack",
    tpCost: 8,
    target: "group",
    description: "A fairly weak force Technique that creates a small whirlwind around each enemy. Can only be used in battle.",
    users: ["Chaz", "Alys", "Hahn", "Juza", "TechMaster"]
  },
  {
    name: "GIZAN",
    type: "attack",
    tpCost: 12,
    target: "group",
    description: "The second of the force Techs, is causes two large typhoons to swirl around all the enemies. Can only be used in battle.",
    users: ["Chaz", "Alys", "Hahn", "Dark Witch", "D-Elm-Lars", "Gi-Le-Farg", "Le-Faw-Gan", "Tech-Plant", "Xe-A-Thoul"]
  },
  {
    name: "NAZAN",
    type: "attack",
    tpCost: 16,
    target: "group",
    description: "Of the force Tech group, this is the strongest. It generates a huge tornado on all enemies. Can only be used in battle.",
    users: ["Chaz", "Alys", "Hahn"]
  },
  
  // Attack Techniques - Gravity
  {
    name: "GRA",
    type: "attack",
    tpCost: 10,
    target: "group",
    description: "The first gravity-based Tech, this inflicts rapid but small pockets of gravity on each enemy. Can only be used in battle.",
    users: ["Rune", "Kyra", "DimensWorm", "OuterBeast"]
  },
  {
    name: "GIGRA",
    type: "attack",
    tpCost: 15,
    target: "group",
    description: "A stronger gravity Tech, it inflicts slower but more intense areas on each enemy. Can only be used in battle.",
    users: ["Rune", "Kyra", "OuterBeast"]
  },
  {
    name: "NAGRA",
    type: "attack",
    tpCost: 19,
    target: "group",
    description: "Greatest of the gravity Techs, slow but extreme pockets of gravity contort each enemy. Can only be used in battle.",
    users: ["Rune", "Kyra"]
  },
  
  // Attack Techniques - Death
  {
    name: "VOL",
    type: "attack",
    tpCost: 8,
    target: "individual",
    description: "This Tech allows Hahn to generate a field of energy that may shut down an enemy's nervous system. If successful, it is destroyed. Can only be used in battle. Only works against organic beings.",
    users: ["Hahn", "BloodSaber", "Greneris", "SoldrFiend"]
  },
  {
    name: "SAVOL",
    type: "attack",
    tpCost: 16,
    target: "group",
    description: "Hahn's second instant-death Tech, and far more powerful, this has exactly the same effect as VOL, but inflicts it upon all enemies. Can only be used in battle. Only works against organic beings.",
    users: ["Hahn"]
  },
  {
    name: "BROSE",
    type: "attack",
    tpCost: 16,
    target: "individual",
    description: "A unique Tech that attempts to split the target's molecules apart. If successful, the enemy is destroyed. Low success rate. Can only be used in battle. Only works against organic beings.",
    users: ["Chaz", "Gryz"]
  },
  
  // Misc Techniques - Assist
  {
    name: "DEBAN",
    type: "misc",
    tpCost: 5,
    target: "group",
    description: "A remarkably useful Technique, it slightly increases the Defence Power of all party members. Can only be used in battle.",
    users: ["Rika", "BloodSaber", "FrostSaber", "Radhin", "ShadowSabr"]
  },
  {
    name: "SHIFT",
    type: "misc",
    tpCost: 7,
    target: "individual",
    description: "Fairly poor for its cost, this Technique slightly increases the Attack Power of one character. Can only be used in battle.",
    users: ["Alys", "Rika", "BloodSaber", "ChaosBrngr", "DarkMaraud", "DeathBearr", "Radhin"]
  },
  {
    name: "SANER",
    type: "misc",
    tpCost: 8,
    target: "group",
    description: "This Technique is exceptionally useful in longer battles, as it increases the Agility of all party members. Can only be used in battle.",
    users: ["Alys", "Rika", "Radhin"]
  },
  
  // Misc Techniques - Hinder
  {
    name: "GELUN",
    type: "misc",
    tpCost: 3,
    target: "group",
    description: "A mostly pointless Technique, this may slightly decrease enemies' Attack Power. It targets all enemies, but its success rate is low. Can only be used in battle.",
    users: ["Hahn", "Greneris"]
  },
  {
    name: "DORAN",
    type: "misc",
    tpCost: 4,
    target: "group",
    description: "Like Gelun, this is not a very useful Technique. It targets all enemies and may lower their Agility. Its success rate is low. Can only be used in battle.",
    users: ["Hahn", "DarkMaraud", "Greneris"]
  },
  {
    name: "SEALS",
    type: "misc",
    tpCost: 9,
    target: "group",
    description: "Very useful against enemies with Techniques, this may remove the ability to use them. It targets all enemies. Can only be used in battle.",
    users: ["Rune", "Raja", "ChaosBrngr", "DeathBearr", "Radhin"]
  },
  {
    name: "RIMIT",
    type: "misc",
    tpCost: 12,
    target: "group",
    description: "A considerably overpriced Technique, it has a chance of inflicting Paralysis on each enemy. Its success rate is low. Can only be used in battle.",
    users: ["Hahn", "Raja", "Greneris", "Tech-Plant"]
  },
  
  // Misc Techniques - Travel
  {
    name: "HINAS",
    type: "misc",
    tpCost: 4,
    target: "group",
    description: "One of the invaluable travel Techniques, this automatically takes the party outside or to the entrance of the dungeon. Can only be used in dungeons.",
    users: ["Chaz", "Rune"]
  },
  {
    name: "RYUKA",
    type: "misc",
    tpCost: 10,
    target: "group",
    description: "An extremely useful Technique, this teleports the party to any town or village they have already visited. Can only be used outside or in a town or village.",
    users: ["Chaz", "Rune"]
  }
];

export default techniques; 