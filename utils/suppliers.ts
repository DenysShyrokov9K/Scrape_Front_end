interface Supliers {
  manufacturers: string[];
  distributers: string[];
}

const manufacturers: string[] = [
  "Omron",
  "Onsemi",
  "TE",
  "Molex",
  "3M Company",
  "Texas Instruments",
  "Murata Manufacturing Co",
  "Newark Electronics Corporation",
  "Festo",
  "Fair Rite",
  "TDK",
  "Microchip",
  // "Murata",
  // "Littelfusse",
  // "Mmm",
  // "We-online",
  // "Yago",
  // "Eaton",
  "Yageo",
  "Leespring",
  "Maxim Integrated",
  "Wago",
  "Phoenix",
  "Allegro",
  "Vishay Intertechnology",
  "Panduit",
  "Alpha Wire",
  "Analog Devices"
];

const distributers: string[] = [
  "Mouser Electronics",
  "Arrow",
  // "Anixter",
  "Digikey",
  // "Ttiinc",
  // "Maxim",
  "Future Electronics",
  // "Heilind Electronics",
  // "Alliedelec",
  // "Newark",
  // "Farnell",
  "Rs-components",
  // "Sager",
  // "Rshughes",
  "Allied Electronics",
  "R-S Hughes (currently unavailable)",
  "Sager(currently unavailable)",
];

const suppliersList: Supliers = {
  manufacturers,
  distributers,
};
export default suppliersList;
