#!/bin/sh

for html in $(find src/html -type f); do
    target="public${html#src}"
    mkdir -p $(dirname $target)
    cp "$html" "$target"
done

for md in $(find src/markdown -type f); do
    target="${md%md}html"
    target="public/html${target#src/markdown}"
    mkdir -p $(dirname $target)
    echo '<!--#include file="/html/header.html" -->' > "$target"
    ./build/markdown.mjs < "$md" >> "$target"
    echo '<!--#include file="/html/footer.html" -->' >> "$target"
done

sass src/sass/styles.scss public/css/styles.css
