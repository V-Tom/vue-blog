require('shelljs/global');

if (!which('git')) {
  echo('Sorry, this script requires git');
  exit(1);
}

cd('../../../../blogArticle')

//exec('git clone git@github.com:V-Tom/blogArticle.git')

//mkdir('2016-04')

exec('vi README.md')

exec('git status')

pwd()
