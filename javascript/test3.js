let opgeslagenAntwoorden = [];

document.addEventListener("DOMContentLoaded", () => {
    const zoekKnop = document.getElementById("zoek-knop");
    const zoekInput = document.getElementById("zoek-input");
    const zoekresultatenLijst = document.getElementById("zoekresultaten-lijst");

    // Haal elementen uit de HTML (nu hardcoded)
    const zinElementen = document.querySelectorAll(".zin-tekst");
    const zinnen = Array.from(zinElementen).map(el => el.textContent);

    // Opslaan logica
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
                
                // Feedback voor screenreader
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

    // Zoek logica
    const voerZoekopdrachtUit = () => {
        const query = zoekInput.value.toLowerCase().trim();
        zoekresultatenLijst.innerHTML = "";

        if (query === "") {
            zoekresultatenLijst.innerHTML = "<li>Voer een trefwoord in om te zoeken.</li>";
            return;
        }

        const resultaten = opgeslagenAntwoorden.filter(item => 
            item.antwoord.toLowerCase().includes(query) || 
            item.origineleZin.toLowerCase().includes(query)
        );

        if (resultaten.length === 0) {
            zoekresultatenLijst.innerHTML = "<li>Geen resultaten gevonden.</li>";
        } else {
            resultaten.forEach(item => {
                const li = document.createElement("li");
                li.innerHTML = `
                    <span class="resultaat-origineel">Op: ${item.origineleZin}</span>
                    <span class="resultaat-antwoord">Antwoord: ${item.antwoord}</span>
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
