//backgroundimage
const bgInput = document.getElementById("bgimageLoader");



bgInput.addEventListener('change', (e) => {

    // document.querySelectorAll('.traceImageLayer').forEach(el => el.remove());

    let traceImageLayer = document.querySelector('.traceImageLayer');

    if (!traceImageLayer) {
        //イメージを入れる要素を作成
        traceImageLayer = document.createElement("div");
        traceImageLayer.classList.add('traceImageLayer');

        // canvasのサイズの値をsvg要素の属性から取得
        const w = Number(svg.getAttribute('width'));
        const h = Number(svg.getAttribute('height'));
        console.log(w);
        console.log(h);
        traceImageLayer.style.width = w + "px";
        traceImageLayer.style.height = h + "px";
        traceImageLayer.style.opacity = 0.5;
        
        canvasElement.appendChild(traceImageLayer);
    }

    const bgimageFile = e.target.files[0];

    if (!bgimageFile) return;

    const reader = new FileReader();

    reader.onload = (event) => {
        traceImageLayer.style.backgroundImage = `url(${event.target.result})`;
        // traceImageLayer.style.opacity = 0.5;
    }
    reader.readAsDataURL(bgimageFile);


})

const traceImageDeleatButton = document.querySelector('.traceImageDeleatButton');
traceImageDeleatButton.addEventListener('click', () => {
    const traceImageLayer = document.querySelector('.traceImageLayer');
    if (traceImageLayer) {
        traceImageLayer.remove();
        document.getElementById('bgimageLoader').value ='';
        
    }
    
})


const traceImageOpacity = document.querySelector('#imageOpacity')
if (traceImageOpacity) {
    traceImageOpacity.addEventListener('input', (e) => {
        let traceImageOpacityValue = Number(e.target.value);
        const traceImageLayer = document.querySelector('.traceImageLayer');

        if (traceImageLayer) {
            traceImageLayer.style.opacity = traceImageOpacityValue / 100;
        }

    })
}