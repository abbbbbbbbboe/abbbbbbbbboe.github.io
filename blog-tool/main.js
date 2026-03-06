// スプレットシートからcsvを書き出して、そのデータから要素を作成
// まずcsvを配列として扱うにはどうしたら良いか。
// 次に要素ごとに順番に指定の


const input = document.getElementById("csvFile");

input.addEventListener('change', function (event) {
    const file = event.target.files[0];
    console.log(file);

    const reader = new FileReader();

    reader.onload = function (event) {
        const csvText = event.target.result;
        const lines = csvText
            .split(/\r?\n/)
            .filter(line => line.trim() !== '');


        const header = lines[0];
        const rows = lines.slice(1);

        const result = rows.map((row) => {
            const cols = row.split(",");

            const tag = cols[0];
            const text = cols[1];
            const className = cols[2];

            const obj = {
                type: tag,
                text: text,
            };

            if (className && className.trim() !== "") {
                obj.class = className
                .split("|")
                .map(c => c.trim())
                .filter(c => c !== "");
            }

          

            let line = `{type:"${obj.type}", text:\`${obj.text}\`,`;
            if (obj.class) {
                line += ` class: [${obj.class.map(c => `"${c}"`).join(",")}]`
            }

            line += "},";

            return line;
            
            


            // if (className && className.trim() !== "") {
            //     return `{type:"${tag}", text:\`${text}\`, class: "${className}"},`;
            // } else {
            //     return `{type:"${tag}", text:\`${text}\`,`;
            // }

        
        });

        

        const mainElements = document.querySelector('main');
        const copyButtonElement = document.getElementById('copyButton');

        // const output = result.join("\n");
        result.forEach(value => {
            const pElement = document.createElement('p');
            pElement.textContent = value;
            mainElements.appendChild(pElement);


        });

        copyButtonElement.addEventListener('click', () => {
            const pElements = mainElements.querySelectorAll('p');

            const copyText = Array.from(pElements)
                .map(p => p.textContent)
                .join('\n');

            navigator.clipboard.writeText(copyText).then(() => {
                console.log('colied!')
            });
        });


    };

    reader.readAsText(file);


});

