#!/bin/bash
r=`curl -s "http://torrentz.eu/search?f=batman" | grep -Eo '<dl><dt><a href=\"\/[[:alnum:]]*\">.*</a> | <span class=\"[speud]*\">[^<]*</span>' | sed 's!<dl><dt><a href=\"/!!; \
                s!\">!|!; \
                s!<[/]*b>!!g; \
                N;N;N;s!\n<span class=\"[pesud]*\">!|!g; \
                s!</span>!!g; \
                s!</a>!!'`

echo "$r" \
        | head -n "5" \
        | awk -v N=1 \
                -v NU="$numbcolor" \
                -v NA="$namecolor" \
                -v SI="$sizecolor" \
                -v SE="$seedcolor" \
                -v PE="$peercolor" \
                -v NO="$nonecolor" \
                -F '|' \
                '{print NU N ") " NA $2 " " SI $3 " " SE $4 " " PE $5 NO; N++}'
