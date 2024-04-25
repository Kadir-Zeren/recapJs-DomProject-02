//? Selectors
const ekleBtn = document.getElementById("ekle-btn");
const gelirInput = document.getElementById("gelir-input");
const ekleFormu = document.getElementById("ekle-formu");

//? Sonuc tablosu
const gelirinizTd = document.getElementById("geliriniz");

//? harcama formu
const harcamaFormu = document.getElementById("harcama-formu");
const harcamaAlaniInput = document.getElementById("harcama-alani");
const tarihInput = document.getElementById("tarih");
const miktarInput = document.getElementById("miktar");

//? Haracama Tablosu

const harcamaBody = document.getElementById("harcama-body");

//? Variables
let gelirler = 0;

let harcamaListesi = [];

//? tum harcamalari saklayacak dizi (JSON)

//?Events

//! Formun submit butonuna basildiginda
ekleFormu.addEventListener("submit", (e) => {
  e.preventDefault(); //? reload'u engeller
  gelirler = gelirler + Number(gelirInput.value); //? string eklemiyi engelledik

  //? gelirlerin kalıcı olmasi icin localStorage a kopyaliyoruz
  localStorage.setItem("gelirler", gelirler);

  //? input degerini sifrladik
  ekleFormu.reset();

  hesaplaVeGuncelle();

  //? Degisiklikleri sonuc tablosuna yazan fonks.
});

window.addEventListener("load", () => {
  gelirler = Number(localStorage.getItem("gelirler"));

  harcamaListesi = JSON.parse(localStorage.getItem("harcamalar"));

  console.log(harcamaListesi);

  tarihInput.valueAsDate = new Date();

  hesaplaVeGuncelle();
});

harcamaFormu.addEventListener("submit", (e) => {
  e.preventDefault();

  const yeniHarcama = {
    id: new Date().getTime(),
    tarih: tarihInput.value,
    alan: harcamaAlaniInput.value,
    miktar: miktarInput.value,
  };

  harcamaListesi.push(yeniHarcama);

  localStorage.setItem("harcamalar", JSON.stringify(harcamaListesi));

  harcamayiDomaYaz(yeniHarcama);

  harcamaFormu.reset();
  tarihInput.valueAsDate = new Date();
});

const hesaplaVeGuncelle = () => {
  gelirinizTd.innerText = gelirler;
};

const harcamayiDomaYaz = ({ id, miktar, tarih, alan }) => {
  //   const { id, miktar, tarih, alan } = yeniHarcama;
  harcamaBody.innerHTML += `
<tr>
  <td>${tarih}</td>
  <td>${alan}</td>
  <td>${miktar}</td>
  <td>
    <i id=${id} class="fa-solid fa-trash-can text-danger"></i>
  </td>
</tr>

    
    `;
};
