const normalize = (string) => {
  return string.normalize().replace(/[‘’]/g,`'`).replace(/[“”]/g,`"`).replace(/[\u200B-\u200D\uFEFF]/g, '').trim();
}

module.exports = {
  formatSongTitle: (title) => {
    return normalize(title).replace(/[- \(]+Remastered[0-9a-z\s]*/, '');//.replace(/\(.*\)/g, '');
  },
  formatArtist: (artist) => {
    return normalize(artist);
  },
  regularExpression: (string) => {
    return new RegExp(string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&', 'i'));
  },
  levenshteinDistance: (str1 = '', str2 = '') => {
    const length = Math.max(str1.length && str2.length)
    const track = Array(str2.length + 1).fill(null).map(() =>
    Array(str1.length + 1).fill(null));
    for (let i = 0; i <= str1.length; i += 1) {
       track[0][i] = i;
    }
    for (let j = 0; j <= str2.length; j += 1) {
       track[j][0] = j;
    }
    for (let j = 1; j <= str2.length; j += 1) {
       for (let i = 1; i <= str1.length; i += 1) {
          const indicator = str1[i - 1] === str2[j - 1] ? 0 : 1;
          track[j][i] = Math.min(
             track[j][i - 1] + 1, // deletion
             track[j - 1][i] + 1, // insertion
             track[j - 1][i - 1] + indicator, // substitution
          );
       }
    }
    return (track[str2.length][str1.length]/Math.max(str2.length, str1.length));
  }
}