<!-- https://github.com/othneildrew/Best-README-Template
*** To avoid retyping too much info. Do a search and replace for the following:
*** github_username, repo_name, twitter_handle, email, project_title, project_description
-->

<!-- PROJECT SHIELDS -->
<!--
*** I'm using markdown "reference style" links for readability.
*** Reference links are enclosed in brackets [ ] instead of parentheses ( ).
*** See the bottom of this document for the declaration of the reference variables
*** for contributors-url, forks-url, etc. This is an optional, concise syntax you may use.
*** https://www.markdownguide.org/basic-syntax/#reference-style-links
-->
<!--[![Contributors][contributors-shield]][contributors-url]
[![Forks][forks-shield]][forks-url]
[![Stargazers][stars-shield]][stars-url]
[![Issues][issues-shield]][issues-url]
[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]-->

<!-- PROJECT LOGO -->
<br />
<div style="text-align:center">
   <a href="https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung">
      <img src="images/logo.png" alt="Logo" width="105" height="125">
   </a>
   <h3>FakturaAutomata</h3>
      Mit nur wenigen Clicks zu Ihrer gesamten Rechnungsübersicht
      <br />
      <a href="https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung"><strong>Projekt erkunden</strong></a>
      <br />
      <br />
      Adele Bastyte | Tim Fischer | Isabelle Karal | Sebastian Kloppert | Leonard Thomas 
   </p>
   </p>
</div>

<br/>
<br/>

<!-- TABLE OF CONTENTS -->
<details open="open">
  <summary><h2 style="display: inline-block">Tabellenverzeichnis</h2></summary>
  <ol>
    <li>
      <a href="#über-das-projekt">Über das Projekt</a>
      <ul>
      <li><a href="#kurzbeschreibung-und-nutzen">Kurzbeschreibung und Nutzen</a></li>
        <li><a href="#tools-und-frameworks">Tools und Frameworks</a></li>
      </ul>
    </li>
    <li>
      <a href="#aufsetzen-auf-einem-hostserver">Aufsetzen auf einem Hostserver</a>
      <ul>
        <li><a href="#voraussetzungen-server">Voraussetzungen Server</a></li>
        <li><a href="#remote-deployment-und-start">Remote Deployment und Start</a></li>
      </ul>
    </li>
    <li>
      <a href="#einstieg-als-neues-entwicklungsmitglied">Einstieg als neues Entwicklungsmitglied</a>
      <ul>
        <li><a href="#voraussetzungen-lokal">Voraussetzungen lokal</a></li>
        <li><a href="#installation">Installation</a></li>
        <li><a href="#branching">Branching</a></li>
      </ul>
    </li>
    <li><a href="#benutzung-von-fakturaautomata">Benutzung von FakturaAutomata</a></li>
    <li><a href="#lizenz">Lizenz</a></li>
    <li><a href="#kontakt">Kontakt</a></li>
    <li><a href="#links">Links</a></li>
    <!-- <li><a href="#roadmap">Roadmap</a></li> -->
    <!-- <li><a href="#contributing">Contributing</a></li> -->
    <!-- <li><a href="#acknowledgements">Acknowledgements</a></li> -->
  </ol>
</details>

<br/>
<br/>

<!-- ABOUT THE PROJECT -->

## Über das Projekt

Dieses Projekt entstand im Rahmen des Moduls "Projekt" im Bachelor-Studiengang Medieninformatik im Sommersemester 2021 an der Beuth Hochschule für Technik Berlin durch die am Anfang aufgezählten Teammitglieder.

[![FakturaAutomata Screen Shot][product-screenshot]](https://fakturaautomata.de)

### Kurzbeschreibung und Nutzen

FakturaAutomata ist eine Anwendung zur automatisierten Zusammenstellung von Rechnungen im ZUGFeRD-Format in einer simplen Übersicht, die es dem Nutzer ermöglicht, trotz der mitunter im Verlauf eines Projektes auftretenden großen Anzahl dieser, stets einen detaillierten und dennoch leicht zu überblickenden Bericht über dessen Kosten, sowie eventuell auftretende Fehler bei der Preiskalkulation einzelner Posten innerhalb dieses Projektes zu erhalten.
<br/>
Hierzu wird dem Nutzer ein Webinterface bereitgestellt, welches ihm einen Überblick über seine laufenden Projekte, sowie alle bereits eingelesenen Rechnungen dieser ermöglicht. Weiterhin lassen sich hier neue Rechnungen im ZUGFeRD-Format einlesen, deren Daten daraufhin persistent im Datenbestand der Anwendung gespeichert werden. Dieser kann vom Nutzer bei Bedarf nachträglich bearbeitet und in das Tabellenkalkulationsprogramm Microsoft Excel überführt werden, wobei eine tabellarische Übersicht der zum Projekt gehörigen Rechnungen erzeugt wird, welche eine detaillierte Auflistung der Kosten des ausgewählten Projektes beinhaltet, sowie den Nutzer auf eventuell vorliegende Ungereimtheiten bzw. Differenzen zwischen vereinbarten und tatsächlichen Preisen aufmerksam macht und es ihm so ermöglicht, diese aufzuklären und unnötige Kosten einzusparen.
<br/>
Neben der Möglichkeit zur Einsparung, die aufgrund von fehlerhaften Preisangaben entstehen, bietet FakturaAutomata durch die Zuteilung von Rechnungen zu Projekten auch eine simple Möglichkeit zur zentralen Organisation des unternehmensinternen Rechnungswesens. Weiterhin spart der Nutzer wertvolle Arbeitsstunden, die sonst zur manuellen Eingabe der einzelnen Rechnungen und Rechnungsposten in eine etwaige Übersicht notwendig wären und minimiert das Risiko von menschlichen Übertragungsfehlern.

### Tools und Frameworks

#### Host-/Webserver:

- [DigitalOcean](https://www.digitalocean.com/)
- [Ubuntu](https://ubuntu.com/)
- [Nginx](https://www.nginx.com/)
- [Let's Encrypt](https://letsencrypt.org/)

#### Backend:

- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html)

#### Frontend/UI:

- [React](https://reactjs.org/)
- [Bootstrap](https://getbootstrap.com)

#### Datenbank:

- [MongoDB](https://www.mongodb.com/)

#### Sonstige:

- [VS Code](https://code.visualstudio.com/)
- [Git](https://git-scm.com/)
- [SourceTree](https://www.sourcetreeapp.com/)
- [Maven](https://maven.apache.org/)
- [Adobe Illustrator](https://www.adobe.com/de/products/illustrator.html)

<br/>
<br/>
<br/>

<!-- DEPLOYMENT ON SERVER -->

## Aufsetzen auf einem Hostserver

Um die Webanwendung auf einem Hostserver zu installieren und zu starten, müssen zuerst bestimmte Voraussetzungen erfüllt sein. Zur detaillierten Durchführung werden wir die Tutorials von DigitalOcean am Beispiel von Ubuntu 20.04 hinterlegen, die wir in der gleichen Reihenfolge für unseren aktuellen Hostserver abgearbeitet haben.

### Voraussetzungen Server

- Ein Hostserver steht zur Verfügung (hier Ubuntu 20.04 von DigitalOcean)
- Eine Domäne für die Anwendung steht zur Verfügung (hier fakturaautomata.de) und die NS-Records der Domäne verweisen auf die Nameserver des Hostservers: https://www.digitalocean.com/community/tutorials/how-to-point-to-digitalocean-nameservers-from-common-domain-registrars
- Die DNS-Records des Hostservers zeigen über die Domäne auf die öffentliche IP-Adresse des Hostservers: https://docs.digitalocean.com/products/networking/dns/quickstart/
- Die grundlegende Server-Einrichtung wurde abgeschlossen: https://www.digitalocean.com/community/tutorials/initial-server-setup-with-ubuntu-20-04
- Nginx wurde als Webserver installiert: https://www.digitalocean.com/community/tutorials/how-to-install-nginx-on-ubuntu-20-04
- Nginx wurde mit einem SSL-Zertifikat über Let's Encrypt gesichert: https://www.digitalocean.com/community/tutorials/how-to-secure-nginx-with-let-s-encrypt-on-ubuntu-20-04
- Java 11 wurde installiert und die Umgebungsvariablen wurden gesetzt https://www.digitalocean.com/community/tutorials/how-to-install-java-with-apt-on-ubuntu-20-04
- MongoDB wurde installiert und dessen Service gestartet: https://www.digitalocean.com/community/tutorials/how-to-install-mongodb-on-ubuntu-20-04
- MongoDB wurde passwortgeschützt: https://www.digitalocean.com/community/tutorials/how-to-secure-mongodb-on-ubuntu-20-04
- Git wurde installiert und eingerichtet mit einem Account, der Zugriff auf das [Repository](https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung.git) hat: https://www.digitalocean.com/community/tutorials/how-to-install-git-on-ubuntu-20-04

### Remote Deployment und Start

1. Über SSH auf die öffentliche IP-Adresse des Hostservers mit einem sudo-User und dem angelegten Passwort zugreifen. In unserem Fall erhalten Sie das Passwort direkt von uns und die Verbindung erfolgt so:
   ```sh
   ssh root@104.248.250.80
   ```
2. Nach erfolgreicher Passworteingabe, im /srv/ Verzeichnis das Repository klonen:
   ```sh
   cd /srv/
   git clone https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung.git
   ```
3. Installation von Node.js inkl. npm durch Befolgung von [Schritt 1 des DigitalOcean Tutorials](https://www.digitalocean.com/community/tutorials/how-to-set-up-a-node-js-application-for-production-on-ubuntu-20-04).
4. Beim gleichen DigitalOcean Tutorial Schritt 4 befolgen, aber den Server Teil der Datei /etc/nginx/sites-available/fakturaautomata.de wie folgt aufbauen:

   ```sh
   server {
        server_name fakturaautomata.de www.fakturaautomata.de;

        location / {
                proxy_pass http://localhost:8080;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }
   ```

5. Installation von PM2 zum Starten und Verwalten von Prozessen im Hintergrund:
   ```sh
   sudo npm install pm2@latest -g
   ```
6. Das Skript npm_installs_and_run_test.sh aufrufen, welches nach der Installation der NPM Pakete von Backend und Frontend den Frontend Build erstellt und dann die Applikation im Test Modus startet:
   ```sh
   /srv/projekt-rechnungspruefung/npm_installs_and_run_test.sh
   ```
7. Falls die Benutzung der Webapplikation unter der angegebenen Domäne im Test fehlerfrei läuft und im Produktionsmodus gestartet werden soll, kann der Testmodus gestoppt werden und der Produktionsmodus gestartet und im Hintergrund verwaltet werden:
   ```sh
   pm2 stop test
   cd /srv/projekt-rechnungspruefung/backend
   pm2 start "npm run prod" --name "production"
   pm2 startup
   pm2 save
   ```
8. Wenn neue Updates gepusht wurden, kann während einer designierten Down-Zeit das update_and_restart_prod.sh Skript aufgerufen werden um die Produktion auf den neusten Stand zu bringen und neu zu starten:
   ```sh
   /srv/projekt-rechnungspruefung/update_and_restart_prod.sh
   ```

<br/>
<br/>

<!-- GETTING STARTED -->

## Einstieg als neues Entwicklungsmitglied

### Voraussetzungen lokal

Um mit der allgemeinen Entwicklung am Projekt beginnen zu können, müssen auf Seite des eigenen Rechners folgende Mindestvoraussetzungen erfüllt sein:

- Windows-, Linux- oder Mac-Rechner
- [Git](https://git-scm.com/downloads) ist installiert (wir empfehlen zusätzlich [SourceTree](https://www.sourcetreeapp.com/) um bei Problemen besser unterstützen zu können, da unser ganzes Team diese GUI benutzt)
- [Node.js](https://nodejs.org/en/download/) v14.17.3 ist zusammen mit [npm](https://docs.npmjs.com/downloading-and-installing-node-js-and-npm) installiert
- [MongoDB](https://www.mongodb.com/) ist installiert und die Datenbank ist nicht passwortgeschützt

Zusätzlich müssen für eine vollständige fehlerfreie Benutzung der Webanwendung weitere Voraussetzungen erfüllt sein:

- aktuelle Version eines gängigen Browsers ist installiert (kein Internet Explorer!)
- [JDK 11](https://www.oracle.com/java/technologies/javase-jdk11-downloads.html) ist installiert und die [Java Umgebungsvariablen sind konfiguriert](https://java.com/en/download/help/path.html), damit .jar Dateien über Kommandozeilenbefehle ausgeführt werden können

### Installation

Falls die Mindestvoraussetzungen erfüllt sind, kann die Installation beginnen.

1. Repository klonen
   ```sh
   git clone https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung.git
   ```
2. Vom Projektverzeichnis aus in den Backend-Ordner wechseln und NPM packages installieren
   ```sh
   cd ./backed
   npm install
   ```
3. Von dort aus eine Ebene hoch und in den Frontend-Ordner wechseln und NPM packages installieren
   ```sh
   cd ../frontend
   npm install
   ```

### Start localhost

Zum Starten der Anwendung auf dem localhost müssen nun folgende Schritte durchgeführt werden:

1. Vom Projektverzeichnis aus in den Backend-Ordner wechseln und das Backend starten
   ```sh
   cd ./backend
   npm start
   ```
2. Ein zweites Terminal öffnen und vom Projektverzeichnis aus in den Frontend-Ordner wechseln und auch dieses starten
   ```sh
   cd ./frontend
   npm start
   ```
   Falls sich nicht automatisch ein Browser-Fenster mit der Applikation öffnet, kann im Browser http://localhost:3000 aufgerufen werden und man landet auf der Login-Seite.

### Start remote

Zum Starten der Anwendung auf dem Server im Testmodus müssen (soweit das <a href="#aufsetzen-auf-einem-hostserver">Deployment</a> bereits erfolgt ist) folgende Schritte durchgeführt werden:

1. Darauf achten, dass Backend und Frontend auf dem eigenen Rechner gestoppt sind
2. Über SSH mit dem Server verbinden (das Passwort erhalten Sie von uns)
   ```sh
   ssh root@104.248.250.80
   ```
3. Falls der Server bereits auf aktuellem Stand ist, kann der Testmodus direkt gestartet werden:
   ```sh
   pm2 start test
   ```
   Ansonsten pullen und dann das Skript zum Updaten der NPM Pakete, des Frontend Builds und des Test-Starts aufrufen:
   ```sh
   git pull
   /srv/projekt-rechnungspruefung/npm_installs_and_run_test.sh
   ```

<br/>

### Branching

Zur Versionierung führen wir im Team folgende ab Abschluss des Uni-Projektes geltende neue Git-Struktur:

- Neue Features werden vom Development branch abgezweigt und wenn sie fertig sind in Development gemerged
- Solange Development nicht fehlerfrei funktioniert, wird er nicht in master gemerged
- Erst wenn Development in master gemerged wird, landet eine Story-Karte zu der ein fertiger Feature branch gehört im Trello-Board in der Spalte "Done"

<br/>
<br/>

<!-- USAGE EXAMPLES -->

## Benutzung von FakturaAutomata

Dies ist eine Benutzeranleitung für einen kompletten Programmdurchlauf mittels der man einen guten Einblick in die Funktionalitäten von [FakturaAutomata](https://fakturaautomata.de) bekommt. Für einen Testdurchlauf bitten wir uns Bescheid zu geben, damit wir die Test-Datenbank und das Passwort zurücksetzen können und den Test-Server starten.

1. Aufrufen der Webseite https://www.fakturaautomata.de/.
2. Einloggen durch Eingabe des initialen Passwortes „FakturaAuto“.
3. Im anschließenden Dialog neues Passwort mit Mindestlänge von 8 Zeichen setzen und bestätigen.
4. Auf der nun sichtbaren und leeren Übersicht aller Projekte den Button „Rechnung hinzufügen“ im oberen Teil des Bildschirms betätigen.
5. Es öffnet sich ein Dialog des Dateisystems welcher um die Auswahl der einzulesenden Datei bittet. Die vom Kunden zur Verfügung gestellten Rechnungen befinden sich, ausgehend vom Wurzelverzeichnis des Projektes, unter dem Pfad „./backend/zugferd/“. Hier kann eine beliebige PDF-Datei ausgewählt und deren Auswahl bestätigt werden.
6. Das sich anschließend öffnende Formular zeigt alle bereits automatisch eingelesenen Daten der aktuellen Rechnung in den dafür vorgesehenen bearbeitbaren Feldern. Um die Rechnung abzuspeichern, muss vom Nutzer ein Projektname eingegeben werden, welchem diese zugeordnet werden soll. Weiterhin können hier auch Angebotspreise ergänzt werden, um eine Differenzerkennung zwischen Angebot und Rechnung in der Projektübersicht zu ermöglichen. Ist das passiert kann der Einlesevorgang durch Betätigen des „Rechnung bestätigen“ Buttons abgeschlossen werden.
7. Sie befinden sich nun im Unterordner für Rechnungen des eben durch Eingabe des Projektnamens erstellten Projektes, in dem alle bisher in dieses Projekt eingelesenen Rechnungen angezeigt werden, sowie erneut bearbeitet und gelöscht werden können.
8. Um weitere Rechnungen zum ausgewählten Projekt hinzuzufügen, wird erneut der dafür vorgesehene Button im oberen Teil des Bildschirms betätigt und anschließend die Schritte 5 und 6 wiederholt.
9. Durch einen Klick auf den Projektnamen im Breadcrumbs-Menü im linken oberen Teil des Bildschirms wird die Gesamtübersicht des Projektes geladen, in welcher, durch Betätigen des entsprechenden Buttons im oberen Teil des Bildschirms die Projektübersicht im Excel-Format generiert werden kann, welche anschließend automatisch heruntergeladen wird und durch einen Klick auf die heruntergeladene Datei geöffnet werden kann. Weiterhin wird die generierte Datei im Unterordner für Excel-Dateien des zugehörigen Projektes abgespeichert, in dem sie per Klick erneut manuell heruntergeladen werden kann.
10. Ausloggen durch Betätigen des „Anwendung schließen“ Buttons.

<br/>

Zusätzlich dazu finden Sie im [Projektverzeichnis](https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung) in der Datei "Final_delivery.pdf" einen Walkthrough inkl. Screenshots der verschiedenen Ansichten unserer Webanwendung.

<!--_For more examples, please refer to the [Documentation](https://example.com)_-->

<!-- ROADMAP
## Roadmap

See the [open issues](https://gitlab.beuth-hochschule.de/s78206/projekt-rechnungspruefung/issues) for a list of proposed features (and known issues).-->

<!-- CONTRIBUTING
## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request -->

<br/>
<br/>

<!-- LICENSE -->

## Lizenz

_TBD bevor öffentlich zugänglich wird._

<!-- See `LICENSE` for more information. -->

<br/>
<br/>

## Links

- Trello Task-Board: [https://trello.com/b/XQJPP1W6/main](https://trello.com/b/XQJPP1W6/main)

<!-- ACKNOWLEDGEMENTS
## Acknowledgements

* []()
* []()
* []()
-->

<!-- MARKDOWN LINKS & IMAGES -->

[product-screenshot]: ./images/login_screenshot.PNG

<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links
[contributors-shield]: https://img.shields.io/github/contributors/github_username/repo.svg?style=for-the-badge
[contributors-url]: https://github.com/github_username/repo/graphs/contributors
[forks-shield]: https://img.shields.io/github/forks/github_username/repo.svg?style=for-the-badge
[forks-url]: https://github.com/github_username/repo/network/members
[stars-shield]: https://img.shields.io/github/stars/github_username/repo.svg?style=for-the-badge
[stars-url]: https://github.com/github_username/repo/stargazers
[issues-shield]: https://img.shields.io/github/issues/github_username/repo.svg?style=for-the-badge
[issues-url]: https://github.com/github_username/repo/issues
[license-shield]: https://img.shields.io/github/license/github_username/repo.svg?style=for-the-badge
[license-url]: https://github.com/github_username/repo/blob/master/LICENSE.txt
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://linkedin.com/in/github_username-->
