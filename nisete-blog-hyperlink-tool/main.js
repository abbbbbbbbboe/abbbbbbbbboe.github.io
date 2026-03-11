const input = document.getElementById("csvFile");
const mainElements = document.querySelector('main');
const copyButtonElement = document.querySelector('#copyButton');

copyButtonElement.disabled = true;

input.addEventListener('change', function (event) {
    const file = event.target.files[0];

    copyButtonElement.disabled = false;
    copyButtonElement.textContent = "copy!";

    const reader = new FileReader();

    let line;

    reader.onload = function (event) {
        const csvText = event.target.result;
        const lines = csvText
            .split(/\r?\n/)
            .filter(line => line.trim() !== '');

        const header = lines[0];
        const rows = lines.slice(1);

        const result = rows.map((row) => {
            const cols = row.split(",");
            const word = cols[3]?.trim();
            const link = cols[4]?.trim();
            // console.log(word);


            if (!word) return null;


            line = `{ word: "${word}", href: "${link}" },`;
            return line;


        }).filter(Boolean);
        // console.log(line);


        mainElements.innerHTML = "";

        result.forEach(valu => {
            const pElement = document.createElement('p');
            pElement.textContent = valu;
            mainElements.appendChild(pElement);
        });



    };


    reader.readAsText(file);
});

copyButtonElement.addEventListener('click', () => {
    const pElements = mainElements.querySelectorAll('p');

    const copyText = Array.from(pElements)
        .map(p => p.textContent)
        .join('\n');

    navigator.clipboard.writeText(copyText).then(() => {
        console.log('colied!')
        copyButtonElement.textContent = "copied!";
    });
});

