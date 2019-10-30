#!/bin/bash

source ./.locale

VERSION=$(<VERSION)

if [ ! -d "dev" ]; then
  mkdir dist
fi
rm -R dist/*

cp src/index.html dist/index.html
cp src/favicon.ico dist/favicon.ico

echo " /*       _________________________________________" > "banner.txt"
printf ' \_______| %19s%-20s |_______\n' `echo $repo | cut -c 1-$((${#repo}/2))` `echo $repo | cut -c $((${#repo}/2+1))-${#repo}` >> "banner.txt"
echo "  \      |       roman.marlovits@gmail.com         |      /" >> "banner.txt"
echo "   \     |     copyright $(date '+%Y') Roman Marlovits      |     /" >> "banner.txt"
echo "    \    |           $(date '+%Y-%m-%d') $(date '+%H:%I:%S')           |    /" >> "banner.txt"
echo "    /    |             version: $(printf "%-19s" $VERSION)|    \\" >> "banner.txt"
echo "   /     |_________________________________________|     \\" >> "banner.txt"
echo "  /________)                                     (________\\" >> "banner.txt"
echo "*/" >> "banner.txt"
echo "/*" >> "banner.txt"
echo "npm packages:" >> "banner.txt"
echo "<% _.each(pkg.dependencies, function(version, package) { %>- <%= package %>: <%= version %>" >> "banner.txt"
echo "<% }) %>*/" >> "banner.txt"
echo "/*" >> "banner.txt"
echo "browserlist:" >> "banner.txt"
echo "<% _.each(pkg.browserslist, function(browser) { %>- <%= browser %>" >> "banner.txt"
echo "<% }) %>*/" >> "banner.txt"
echo "" >> "banner.txt"

npm run build
rm banner.txt
