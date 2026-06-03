#!/bin/bash

OUTPUT="project_context.md"

> "$OUTPUT"

if [ -f "AGENTS.md" ]; then
    echo -e "\n\n# AGENTS.md\n\n" >> "$OUTPUT"
    cat "AGENTS.md" >> "$OUTPUT"
fi

find . -type f \
    \( \
        -name "*.tsx" \
        -o -name "*.ts" \
        -o -name "*.js" \
        -o -name "*.jsx" \
        -o -name "*.json" \
        -o -name "*.sh" \
    \) \
    -not -path "./dist/*" \
    -not -path "./node_modules/*" \
    -not -path "./public/*" \
    -not -path "./deploy/*" \
    -not -path "./src/components/tourism/data/*" \
    -not -path "./.git/*" \
    -not -name "AGENTS.md" \
    -not -name "package-lock.json" \
    -exec sh -c 'printf "\n\n# %s\n\n" "$1"; cat "$1"' _ {} \; \
>> "$OUTPUT"
