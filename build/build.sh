#!/bin/sh

COPYRIGHT_YEAR="$(date +%Y)"

for html in $(find src/html -type f); do
    target="public${html#src}"
    mkdir -p $(dirname $target)
    cp "$html" "$target"
done

for md in $(find src/markdown -type f); do
    target="${md%md}html"
    target="public/html${target#src/markdown}"
    mkdir -p $(dirname $target)
    cat src/html/header.html > "$target"
    ./build/markdown.mjs < "$md" >> "$target"
    cat src/html/footer.html >> "$target"
    sed -i -e 's/@COPYRIGHT@/'${COPYRIGHT_YEAR}'/g' "$target"
done

sass src/sass/styles.scss public/css/styles.css
