#!/bin/bash
# копирует содержимое ./dist на сервер
# chmod +x deploy/deploy.sh

set -e

SOURCE="./dist/"
REMOTE="home"
REMOTE_PATH="/var/www/higimo.ru"

echo "Синхронизирую исходники"

ssh "$REMOTE" "sudo chown higimo:www-data $REMOTE_PATH"

rsync -avz \
	--partial \
	--bwlimit=10000 \
	--block-size=8192 \
	"$SOURCE" "$REMOTE:$REMOTE_PATH"

ssh -t "$REMOTE" \
    "sudo chown -R higimo:www-data $REMOTE_PATH && \
     sudo find $REMOTE_PATH -type d -exec chmod 755 {} \; && \
     sudo find $REMOTE_PATH -type f -exec chmod 644 {} \;"

echo "✅ Готово! Файлы скопированы, права установлены."
