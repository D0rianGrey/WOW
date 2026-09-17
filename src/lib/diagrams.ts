import { route } from './routes';

export interface Diagram {
  src: string;
  alt: string;
  caption: string;
}

// Original explanatory diagrams; the caption repeats the diagram's content as text.
export const dossierDiagrams: Record<string, Diagram> = {
  'arthas-menethil': {
    src: route('diagrams/arthas-path.svg'),
    alt: 'Схема пути Arthas от Lordaeron до Frozen Throne',
    caption: 'Путь Arthas: Stratholme и Lordaeron → Northrend и Frostmourne → возвращение в Lordaeron и убийство Terenas → Quel’Thalas и Sunwell → Dalaran и призыв Archimonde → Frozen Throne, где Arthas становится Lich King.'
  }
};

export const factionDiagram: Diagram = {
  src: route('diagrams/faction-relations.svg'),
  alt: 'Схема отношений фракций в первый год',
  caption: 'Первый год: Alliance (humans, dwarves, gnomes, night elves) и Horde (orcs, tauren, trolls, undead) держат шаткое перемирие. Forsaken входят в Horde по расчёту и враждуют со Scourge Lich King. Scarlet Crusade воюет с нежитью. Burning Legion разбит на Mount Hyjal.'
};
