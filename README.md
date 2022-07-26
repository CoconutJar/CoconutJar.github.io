# PersonalWebsite

My Resume with a background scene made in THREE.JS


Used to commit dist folder to gh-pages

git branch --delete --force gh-pages
git checkout --orphan gh-pages
git add -f dist
git commit -m "Rebuild GitHub pages"
git filter-branch -f --prune-empty --subdirectory-filter dist && git push -f origin gh-pages && git checkout -
