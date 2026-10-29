//OBIEKTY

// obiekt gracza
var gracz = {
  pokoj: 1,
  energia: 20,
  posiadakarte: false,
  posiadabezpiecznik: false,
  stanzasilania: false,
  koniecgry: false,
  wygrana: false,
};

//obiekt pokoju
const pokoje = [
  {
    id: 1,
    nazwa: "Wejście",
    oswietlony: true,
    karta: false,
    bezpiecznik: false,
  },
  {
    id: 2,
    nazwa: "Ochrona",
    oswietlony: false,
    karta: false,
    bezpiecznik: false,
    Dodatkowaenergia: true,
  },
  {
    id: 3,
    nazwa: "Sekretariat",
    oswietlony: true,
    karta: true,
    bezpiecznik: false,
  },
  {
    id: 4,
    nazwa: "Serwerownia",
    oswietlony: true,
    karta: false,
    bezpiecznik: false,
  },
  {
    id: 5,
    nazwa: "Magazyn",
    oswietlony: true,
    karta: false,
    bezpiecznik: true,
  },
  {
    id: 6,
    nazwa: "Korytarz",
    oswietlony: false,
    karta: false,
    bezpiecznik: false,
  },
  {
    id: 7,
    nazwa: "Wyjście",
    oswietlony: true,
    karta: false,
    bezpiecznik: false,
  },
];

//OBIKETY - END

//CORE

// Funkcja start rozpoczyne gre, ustawia wartosci domyslne gry i ustawia
function start() {
  gracz.pokoj = 1;
  gracz.energia = 20;
  gracz.posiadakarte = false;
  gracz.posiadabezpiecznik = false;
  gracz.stanzasilania = false;
  gracz.koniecgry = false;
  gracz.wygrana = false;

  //ustawienia domyslne dla pokoji
  for (const pokoj of pokoje) {
    pokoj.karta = pokoj.id === 3;
    pokoj.bezpiecznik = pokoj.id === 5;
    pokoj.oswietlony = pokoj.id !== 2 && pokoj.id !== 6;

    if (pokoj.id === 2) {
      pokoj.Dodatkowaenergia = true;
    }
  }

  console.log("Ucieczka z Serwerowni v2. Początkowa energia: " + gracz.energia + "." );
  console.log("Uzyj mapa() zeby dowiedziec sie gdzie jestes")
  pomoc();
}

// Sprawdza stan energi gracza i blokuje gre jezeli stan energi jest na 0
function poziomenergii() {
  if (gracz.koniecgry) {
    return;
  }

  if (gracz.energia <= 0) {
    gracz.energia = 0;
    gracz.wygrana = false;
    gracz.koniecgry = true;
    console.log(
      "Przegrana, Skończyła ci się energia i to już koniec, zacznij gre od nowa komędą start() ");
  }
}


// wyswietla mape gry z znacznikiem lokalizacji
function mapa() {
  if (gracz.koniecgry) {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową");
    return;
  }

  console.log("[   ] [Sek] [   ] [Wyj]");
  console.log("[Wej] [Och] [Mag] [kor]");
  console.log("[   ] [Ser] [   ] [   ]");

  console.log("Mapa pokojów:");
  const znacznik = " <- jestes tutaj";

  for (const p of pokoje) {
    if (p.id === gracz.pokoj) {
      console.log(p.id + ". " + p.nazwa + znacznik);
    } else {
      console.log(p.id + ". " + p.nazwa);
    }
  }
}

function status() {
  const pokoj = pokoje.find((p) => p.id === gracz.pokoj);
  const nazwa = pokoj.nazwa;

  console.log("Status gry:");
  console.log("Aktualny pokój: " + gracz.pokoj + " " + nazwa);
  console.log("Aktualna energia: " + gracz.energia);

  console.log("Czy posiadasz kartę: " + (gracz.posiadakarte ? "tak" : "nie"));
  console.log("Czy posiadasz bezpiecznik: " + (gracz.posiadabezpiecznik ? "tak" : "nie"));
  console.log("Czy zasilanie działa: " + (gracz.stanzasilania ? "tak" : "nie"));

  if (gracz.koniecgry) {
    console.log("Stan gry: " + (gracz.wygrana ? "Wygrana :3" : "Przegrana"));
  } else {
    console.log("Stan gry: Trwa...");
  }
}


function pomoc() {
  console.log("start() - rozpoczyna grę od nowa i resetuje wszystkie postępy :3");
  console.log('idz("kierunek") - przenosi cię do sąsiedniego pokoju. Kierunki: "lewo", "prawo", "gora", "dol". Każdy ruch kosztuje energię.' );
  console.log("zbierz() - podnosi przedmiot (kartę, bezpiecznik lub baterię) leżący w pokoju.");
  console.log("przywrocZasilanie() - wkłada bezpiecznik i włącza prąd. Działa tylko w serwerowni.");
  console.log("Otworzdrzwi() - otwiera drzwi wyjściowe. Potrzebujesz karty i działającego zasilania, musisz stać w pokoju Wyjście; Wszystkie warunki musza zostac spełnione (karta + zasilanie).");
  console.log("rozejrzyj() - opisuje aktualny pokój i widoczne przedmioty.");
  console.log("mapa() - pokazuje listę pokoi i miejsce, w którym jesteś.");
  console.log("status() - pokazuje energię, posiadane przedmioty, stan zasilania i stan gry.");
  console.log("UWAGA: gdy energia spadnie do 0, przegrywasz.");
}
