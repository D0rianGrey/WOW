import { route } from './routes';

export interface Illustration {
  src: string;
  srcSmall: string;
  width: number;
  height: number;
  alt: string;
}

// Original AI illustrations, never presented as Blizzard art.
// Files live in public/images/chapters/ as <slug>.webp (1600×900) and <slug>-960.webp.
function chapterImage(slug: string, alt: string): Illustration {
  return {
    src: route(`images/chapters/${slug}.webp`),
    srcSmall: route(`images/chapters/${slug}-960.webp`),
    width: 1600,
    height: 900,
    alt
  };
}

export const chapterIllustrations: Record<string, Illustration> = {
  'azeroth-before-civilization': chapterImage(
    'azeroth-before-civilization',
    'Первозданный континент на рассвете: горы, леса и сияющая река; в скале — исполинские врата хранилища со звёздным узором, над облаками летят драконы, в ущелье под землёй шевелятся тёмные щупальца.'
  ),
  'war-of-the-ancients': chapterImage(
    'war-of-the-ancients',
    'Светящееся озеро Well of Eternity под воронкой зелёной магии; на берегах — шпили города Highborne, на склоне — войско с тёмными знамёнами.'
  ),
  'kingdoms-and-peoples': chapterImage(
    'kingdoms-and-peoples',
    'Панорама северных земель: серая каменная цитадель людей на плато, вдали золотые шпили эльфийского города среди леса, в снежных горах — врата подгорного королевства с огнём кузниц.'
  ),
  'orcs-and-humans': chapterImage(
    'orcs-and-humans',
    'Исполинские каменные врата с зелёным разломом посреди багрового болота; из них выходит колонна воинов со знамёнами и тянется к лесистым горам и замку вдали.'
  ),
  'second-war': chapterImage(
    'second-war',
    'Долина под дождём, заставленная лагерями за деревянными частоколами со сторожевыми вышками; на холме — мрачная крепость, на горизонте дымится вулканическая твердыня.'
  ),
  'thrall-and-new-horde': chapterImage(
    'thrall-and-new-horde',
    'Потрёпанные корабли с тёмными парусами идут по штормовому морю к красным скалам и саванне; на берегу строят укрепление из заострённых брёвен, с гребня наблюдают рогатые великаны.'
  ),
  'arthas-and-lordaeron': chapterImage(
    'arthas-and-lordaeron',
    'Горящий город со шпилями на речной равнине в закатном свете, над крышами стелется зелёный туман; на дороге брошенная телега, вдали скачет конный отряд.'
  ),
  'third-war-to-forever': chapterImage(
    'third-war-to-forever',
    'Огромное Мировое древо на вершине горы над морем облаков на рассвете; склоны в дымящихся руинах после битвы, на хребтах стоят войска, в небе вдали парят острова.'
  )
};

export const illustrationCredit = 'Оригинальная ИИ-иллюстрация, не официальный арт Blizzard.';
