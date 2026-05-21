#!/bin/bash

echo "[dev] Démarrage de Spring Boot en mode hot-reload..."
mvn spring-boot:run -Dspring-boot.run.fork=false &

touch /app/.last_compile

echo "[dev] Surveillance des fichiers Java (polling)..."
while true; do
  CHANGED=$(find /app/src/main/java -name "*.java" -newer /app/.last_compile 2>/dev/null)
  if [ -n "$CHANGED" ]; then
    echo "[dev] Changement détecté — recompilation..."
    mvn compile -q && touch /app/.last_compile
    echo "[dev] Recompilation terminée — DevTools redémarre le contexte"
  fi
  sleep 2
done
