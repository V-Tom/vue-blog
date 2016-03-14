var marked = require('./marked.base');
marked.setOptions({
  renderer: new marked.Renderer(),
  gfm: true,
  tables: true,
  breaks: false,
  pedantic: false,
  sanitize: true,
  smartLists: true,
  emoji: true,
  smartypants: false,
  showLineNumber: true,
  langPrefix: 'lang-'
});
module.exports = marked;
