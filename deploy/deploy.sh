#!/bin/bash
# deploy.sh – копирует содержимое ./dist в /var/www/sweebe-front на удалённом сервере
# chmod +x deploy/deploy.sh

set -e  # остановка при любой ошибке

SOURCE="./dist/"
REMOTE="home"               # алиас из ~/.ssh/config или просто user@host
REMOTE_PATH="/var/www/higimo.ru"

echo "🚀 Синхронизация $SOURCE → $REMOTE:$REMOTE_PATH"

ssh "$REMOTE" "sudo chown higimo:www-data $REMOTE_PATH"

rsync -avz "$SOURCE" "$REMOTE:$REMOTE_PATH"

ssh -t "$REMOTE" \
    "sudo chown -R higimo:www-data $REMOTE_PATH && \
     sudo find $REMOTE_PATH -type d -exec chmod 755 {} \; && \
     sudo find $REMOTE_PATH -type f -exec chmod 644 {} \;"

echo "✅ Готово! Файлы скопированы, права установлены."
