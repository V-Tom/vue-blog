import marked from './marked.base'
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

//h2 文章标题 ##
//h3 文章子标题 level 1 ###
//h4 文章子标题 level 2 ####
export default marked
