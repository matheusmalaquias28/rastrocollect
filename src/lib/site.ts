// Dados de contato. Itens marcados com [A CONFIRMAR] ainda precisam dos valores oficiais.
export const site = {
  name: "Rastro Collect",
  tagline: "Cards. Coleção. Experiência.",
  description:
    "A Rastro Collect leva o universo TCG para dentro dos shopping centers por meio de uma experiência de compra autônoma, moderna e visualmente atrativa.",
  whatsapp: "5512981118932",
  phone: "(12) 98111-8932",
  whatsappMessage: "Olá, vim através do site da Rastro e gostaria de sabe mais!",
  email: "contato@rastrocollect.com.br", // [A CONFIRMAR]
  instagram: "rastrocollect", // [A CONFIRMAR]
  cnpj: "29.458.311/0001-80",
};

// URL pública do site (usada nas imagens de compartilhamento). Defina NEXT_PUBLIC_SITE_URL quando
// houver domínio próprio; sem ela, usa a URL de produção que a Vercel injeta no build.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : "http://localhost:3000");

export const whatsappUrl = `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(site.whatsappMessage)}`;
export const instagramUrl = `https://instagram.com/${site.instagram}`;

export const nav = [
  { href: "#sobre", label: "Sobre" },
  { href: "#maquina", label: "A máquina" },
  { href: "#produtos", label: "Produtos" },
  { href: "#shopping", label: "Para o shopping" },
  { href: "#operacao", label: "Operação" },
];

export const universes = ["Pokémon", "Disney Lorcana", "Yu-Gi-Oh!", "One Piece", "Magic"];
