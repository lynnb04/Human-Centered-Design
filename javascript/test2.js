// test 2
const buttons = document.querySelectorAll("#zinnen button");
    const belangrijkLijst = document.getElementById("belangrijk");

    buttons.forEach(btn => {
        btn.addEventListener("click", () => {
            const isSelected = btn.getAttribute("aria-pressed") === "true";
            const nieuweStatus = !isSelected;

            btn.setAttribute("aria-pressed", nieuweStatus);

            const tekst = btn.textContent;

            // check of al bestaat
            const bestaande = [...belangrijkLijst.children]
                .find(item => item.textContent === tekst);

            if (nieuweStatus) {
                if (!bestaande) {
                    const li = document.createElement("li");
                    li.textContent = tekst;
                    belangrijkLijst.appendChild(li);
                }
            } else {
                if (bestaande) {
                    bestaande.remove();
                }
            }
        });
    });