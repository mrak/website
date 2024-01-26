#!/bin/sh

for md in $(find src/markdown -type f); do
    target="${md%md}html"
    target="public/html${target#src/markdown}"
    ./build/markdown.mjs < "$md" > "$target"
done

sass src/sass/styles.scss public/css/styles.css
