export function getBadge(level) {
  if (level >= 50)
    return {
      name: "Fitness Legend",
      image: "/badges/legend.png",
    };

  if (level >= 45)
    return {
      name: "Immortal",
      image: "/badges/immortal.png",
    };

  if (level >= 40)
    return {
      name: "Mythic Hero",
      image: "/badges/mythic.png",
    };

  if (level >= 35)
    return {
      name: "Titan",
      image: "/badges/titan.png",
    };

  if (level >= 30)
    return {
      name: "Grandmaster",
      image: "/badges/grandmaster.png",
    };

  if (level >= 25)
    return {
      name: "Master Guardian",
      image: "/badges/master.png",
    };

  if (level >= 20)
    return {
      name: "Diamond Champion",
      image: "/badges/diamond.png",
    };

  if (level >= 15)
    return {
      name: "Platinum Veteran",
      image: "/badges/platinum.png",
    };

  if (level >= 10)
    return {
      name: "Gold Warrior",
      image: "/badges/gold.png",
    };

  if (level >= 5)
    return {
      name: "Silver Adventurer",
      image: "/badges/silver.png",
    };

  return {
    name: "Bronze Adventurer",
    image: "/badges/bronze.png",
  };
}

export function getNextBadgeLevel(level) {
  return Math.ceil((level + 1) / 5) * 5;
}