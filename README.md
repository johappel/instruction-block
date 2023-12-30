# Content Instruktionen - Gutenberg Blocks

Dieses WordPress-Plugin fügt einen Gutenberg-Block für Instruktionen hinzu. Es ermöglicht Benutzern, spezifische Frageblöcke in ihren Beiträgen und Seiten zu verwenden, die zur geleiteten Contenterstellung dienen.

## Funktionen

- Stellt einen weiteren Gutenberg-Block bereit, der Aus einem Instruktionsbereich für Fragen und Hilfestellungen und einem darunterliegenden Eingabebereich zur verfügung
- Redakteure können zwischen Instruktionen wählen und den Eingabebereich individualisieren.
- Autoren können aus einer Liste von vordefinierten Instruktionen auswählen.
- Jeder Instruktion-Block kann con Autoren individuell im Editor angepasst werden.

## Installation

1. Laden Sie das Plugin in das Verzeichnis `/wp-content/plugins/` Ihrer WordPress-Installation hoch.
2. Aktivieren Sie das Plugin über das Menü "Plugins" in WordPress.

## Entwicklung

Dieses Plugin verwendet moderne JavaScript- und PHP-Technologien und erfordert daher einige Schritte für die Einrichtung der Entwicklungs- und Build-Umgebung.

### Voraussetzungen

- [Node.js](https://nodejs.org/)
- [Composer](https://getcomposer.org/)

### Einrichtung

Um mit der Entwicklung zu beginnen, führen Sie die folgenden Schritte aus:

1. Klonen Sie das Plugin-Repository auf Ihren lokalen Server.
2. Wechseln Sie in das Verzeichnis des Plugins und führen Sie `npm install` aus, um die Node-Abhängigkeiten zu installieren.
3. Führen Sie `composer install` aus, um die PHP-Abhängigkeiten zu installieren.
4. Führen Sie `composer dump-autoload` aus, um den Composer-Autoloader zu aktualisieren.

### Build-Prozess

- Führen Sie `npm run build` aus, um die JavaScript- und CSS-Dateien für die Produktion zu kompilieren.
- Für die kontinuierliche Entwicklung können Sie `npm start` verwenden, um das automatische Neukompilieren bei Dateiänderungen zu aktivieren.

## Hinweise für Entwickler

- Stellen Sie sicher, dass Sie nach dem Hinzufügen oder Ändern von PHP-Klassen den Befehl `composer dump-autoload` ausführen, um den Autoloader zu aktualisieren.
- Verwenden Sie die bereitgestellten npm-Skripte, um die JavaScript- und CSS-Dateien effizient zu verwalten.

## Lizenz

Dieses Plugin steht unter der GNU General Public License v2.0 oder einer späteren Version.
