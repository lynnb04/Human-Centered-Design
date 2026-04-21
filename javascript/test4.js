// speel geluidje af bij succesvol opsturen
let opgeslagenAntwoorden = [];

const succesGeluid = new Audio("sounds/succes.wav");

function speelSuccesGeluid() {
    succesGeluid.currentTime = 0;
    succesGeluid.play();
}


document.addEventListener("DOMContentLoaded", () => {
    const zoekKnop = document.getElementById("zoek-knop");
    const zoekInput = document.getElementById("zoek-input");
    const zoekresultatenLijst = document.getElementById("zoekresultaten-lijst");

    // haal elementen uit de html (nu hardcoded)
    const zinElementen = document.querySelectorAll(".zin-tekst");
    const zinnen = Array.from(zinElementen).map(el => el.textContent);

    // opslaan
    const opslaanKnoppen = document.querySelectorAll(".opslaan-knop");
    opslaanKnoppen.forEach(knop => {
        knop.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            const antwoordVeld = document.getElementById(`antwoord-${index}`);
            const meldingVeld = document.getElementById(`melding-${index}`);
            const antwoordTekst = antwoordVeld.value.trim();

            if (antwoordTekst !== "") {
                opgeslagenAntwoorden.push({
                    origineleZin: zinnen[index],
                    antwoord: antwoordTekst
                });

                speelSuccesGeluid();
                
                // feedback voor screenreader
                meldingVeld.textContent = "Antwoord succesvol opgeslagen.";
                
                setTimeout(() => {
                    meldingVeld.textContent = "";
                }, 3000);
            } else {
                meldingVeld.textContent = "Antwoord is leeg. Typ eerst een antwoord.";
                setTimeout(() => {
                    meldingVeld.textContent = "";
                }, 3000);
            }
        });
    });

    // zoeken in vragen + antwoorden
    const voerZoekopdrachtUit = () => {
        const query = zoekInput.value.toLowerCase().trim();
        zoekresultatenLijst.innerHTML = "";

        if (query === "") {
            zoekresultatenLijst.innerHTML = "<li>Voer een trefwoord in om te zoeken.</li>";
            return;
        }

        // zoeken in alle vragen (ook niet beantwoordde vragen)
        const resultaten = zinnen.reduce((acc, zin, index) => {
            const opgeslagenAntwoord = opgeslagenAntwoorden
                .filter(item => item.origineleZin === zin)
                .map(item => item.antwoord);

            const vraagMatch = zin.toLowerCase().includes(query);
            const antwoordMatch = opgeslagenAntwoord.some(a => a.toLowerCase().includes(query));

            if (vraagMatch || antwoordMatch) {
                acc.push({ zin, antwoorden: opgeslagenAntwoord });
            }
            return acc;
        }, []);

        if (resultaten.length === 0) {
            zoekresultatenLijst.innerHTML = "<li>Geen resultaten gevonden.</li>";
        } else {
            resultaten.forEach(item => {
                const li = document.createElement("li");
                const antwoordenTekst = item.antwoorden.length > 0
                    ? item.antwoorden.map(a => `<span class="resultaat-antwoord">Antwoord: ${a}</span>`).join("")
                    : `<span class="resultaat-geen-antwoord">Nog geen antwoord opgeslagen.</span>`;
                li.innerHTML = `
                    <span class="resultaat-origineel">Vraag: ${item.zin}</span>
                    ${antwoordenTekst}
                `;
                zoekresultatenLijst.appendChild(li);
            });
        }
    };

    zoekKnop.addEventListener("click", voerZoekopdrachtUit);
    zoekInput.addEventListener("keyup", (e) => {
        if (e.key === "Enter") {
            voerZoekopdrachtUit();
        }
    });
});