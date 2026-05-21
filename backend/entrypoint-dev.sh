#!/bin/bash

echo "[dev] Démarrage de Spring Boot en mode hot-reload..."
mvn spring-boot:run -Dspring-boot.run.fork=false &

echo "[dev] Surveillance des fichiers Java..."
while true; do
  inotifywait -r -e modify,create,delete,moved_to /app/src/main/java -q
  echo "[dev] Changement détecté — recompilation..."
  mvn compile -q
  echo "[dev] Recompilation terminée — DevTools va redémarrer le contexte"
done
