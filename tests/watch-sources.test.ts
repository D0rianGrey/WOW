import { describe, expect, it } from 'vitest';

import { extractArticles, isRelevant } from '../scripts/watch-sources.mjs';

// Shape of the JSON the WoW news page embeds in its HTML, trimmed to the fields the watcher reads.
const html = `
<script>window.__WOW_UI__ = {"news":[
{"uid":"blt1","title":"Watch the World of Warcraft Live Q&amp;A Now","summary":"Members of the WoW Forever development teams answer community questions.","publish":1789664460000,"default_url":"https://worldofwarcraft.com/en-us/news/24302544"},
{"uid":"blt2","title":"Corruption Calls with the Abyssal Crown Collection","summary":"A new in-game shop collection.","publish":1789245660000,"default_url":"https://worldofwarcraft.com/en-us/news/24276747"},
{"uid":"blt3","title":"Carve a New Path with World of Warcraft: Forever","summary":"The announcement.","publish":1789242300000,"default_url":"https://worldofwarcraft.com/en-us/news/24302093"}
]}</script>`;

describe('source watch', () => {
  const articles = extractArticles(html);

  it('reads id, title, summary, url and date from the embedded JSON, newest first', () => {
    expect(articles.map((article) => article.id)).toEqual(['24302544', '24276747', '24302093']);
    expect(articles[0]).toMatchObject({
      title: 'Watch the World of Warcraft Live Q&A Now',
      url: 'https://worldofwarcraft.blizzard.com/en-us/news/24302544',
      publishedAt: '2026-09-17'
    });
    expect(articles[0].summary).toContain('Forever development teams');
  });

  it('keeps articles that can carry Forever facts and drops unrelated shop news', () => {
    expect(articles.filter(isRelevant).map((article) => article.id)).toEqual(['24302544', '24302093']);
  });

  it('returns nothing rather than throwing when the page format changes', () => {
    expect(extractArticles('<html><body>no data here</body></html>')).toEqual([]);
  });
});
