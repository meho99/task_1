// ---------- animacja banera ----------

let actualImage = 1;

// -- przejście do następnego obrazka --

var nextImage = ()=>{
    console.log('u')
    showImage(actualImage+ 1)
}

// -- pokazanie właściwego obrazka oraz zakrycie reszty

showImage = (x) => {
    let images = document.getElementsByClassName('sliders');

    if (x > images.length)
        actualImage = 1;

    else if (x < 1)
        actualImage = images.length;
    else
      actualImage= x;

    for(let i= 0; i< images.length; i++) // zakrycie pozostałych obrazków
    {
        images[i].style.display= 'none';
    }

    images[actualImage - 1].style.display = 'block'; // wyświetlenie obrazka
   
    console.log(actualImage-1)

}

// -- po załadowaniu strony --

window.addEventListener('DOMContentLoaded', (event) => {
    showImage(actualImage)

    setInterval(()=>{
        nextImage()
    },2500)
});