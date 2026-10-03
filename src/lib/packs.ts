export type Pack = { src: string; title: string; w: number; h: number };

// Fotos recortadas (fundo transparente) em public/images/boosters, 900px de altura
export const packs = {
  lorcanaWilds: { src: "/images/boosters/lorcana-wilds-unknown.webp", title: "Disney Lorcana", w: 541, h: 900 },
  lorcanaFirst: { src: "/images/boosters/lorcana-the-first-chapter.webp", title: "Disney Lorcana", w: 518, h: 900 },
  lorcanaInklands: { src: "/images/boosters/lorcana-into-the-inklands.webp", title: "Disney Lorcana", w: 515, h: 900 },
  pokemonEquilibrio: { src: "/images/boosters/pokemon-equilibrio-perfeito.webp", title: "Pokémon", w: 493, h: 900 },
  pokemonFogo: { src: "/images/boosters/pokemon-fogo-fantasmagorico.webp", title: "Pokémon", w: 483, h: 900 },
  pokemonHerois: { src: "/images/boosters/pokemon-herois-excelsos.webp", title: "Pokémon", w: 493, h: 900 },
  pokemonAmigos: { src: "/images/boosters/pokemon-amigos-de-jornada.webp", title: "Pokémon", w: 488, h: 900 },
  yugiohInfinite: { src: "/images/boosters/yugioh-infinite-forbidden.webp", title: "Yu-Gi-Oh!", w: 507, h: 900 },
  yugiohServo: { src: "/images/boosters/yugioh-servo-do-farao.webp", title: "Yu-Gi-Oh!", w: 513, h: 900 },
  yugiohTactical: { src: "/images/boosters/yugioh-tactical-masters.webp", title: "Yu-Gi-Oh!", w: 495, h: 900 },
  magicSuperHeroes: { src: "/images/boosters/magic-super-heroes.webp", title: "Magic", w: 479, h: 900 },
  magicSenhorDosAneis: { src: "/images/boosters/magic-senhor-dos-aneis.webp", title: "Magic", w: 470, h: 900 },
  magicFinalFantasy: { src: "/images/boosters/magic-final-fantasy.webp", title: "Magic", w: 500, h: 900 },
  onePieceOp13: { src: "/images/boosters/onepiece-op13.webp", title: "One Piece", w: 522, h: 900 },
  onePieceOp12: { src: "/images/boosters/onepiece-op12.webp", title: "One Piece", w: 530, h: 900 },
  onePieceOp17: { src: "/images/boosters/onepiece-op17.webp", title: "One Piece", w: 513, h: 900 },
} satisfies Record<string, Pack>;
