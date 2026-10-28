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
console.log("skibid");
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

  console.log(
    "Ucieczka z Serwerowni v2. Początkowa energia: " + gracz.energia + ".",
  );
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
      "Przegrana, Skończyła ci się energia i to już koniec, zacznij gre od nowa komędą start() ",
    );
  }
}

//CORE - END

//INTERAKCJE

// Otwierania drzwi wejściowych
function Otworzdrzwi() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.",
    );
    return;
  }

  if (gracz.pokoj === 7) {
    if (gracz.posiadakarte && gracz.stanzasilania) {
      console.log("Otworzyłeś drzwii, to już koniec twojej przygody");
      gracz.koniecgry = true;
      gracz.wygrana = true;
    } else {
      console.log(
        "Czegoś ci brakuje do otworzenia tych drzwii, jesteś pewien ze wszystko masz?",
      );
      return;
    }
  } else {
    console.log("Co próbujesz otworzyć??, nie jesteś przy wyjściu");
    return;
  }
}

//funckaj ktora pozwala graczowi zbierac przedmioty z pokoji i zabezpicza przez panownym zebraniem :3

function zbierz() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową",
    );
    return;
  }

  // sprawdza obecny pokoj
  const pokoj = pokoje.find((p) => p.id === gracz.pokoj);

  //  czy przxedmiot zostal zebrany w obecnym pokoju
  if (!pokoj.oswietlony) {
    console.log("Jest zbyt ciemno aby zebrac przedmioty");
    return;
  }
  let zebrano = false;

  // czy pokoj ma karte
  if (pokoj.karta) {
    gracz.posiadakarte = true;

    for (const p of pokoje) {
      p.karta = false;
    }

    console.log("Zebrano kartę.");
    zebrano = true;
  }

  //czy pokoj ma bezpieczik
  if (pokoj.bezpiecznik) {
    gracz.posiadabezpiecznik = true;

    for (const p of pokoje) {
      p.bezpiecznik = false;
    }

    console.log("Zebrano bezpiecznik.");
    zebrano = true;
  }

  // czy pokoj ma dodatkowa energie
  if (pokoj.id === 2 && pokoj.Dodatkowaenergia) {
    if (!pokoj.oswietlony) {
      console.log("Najpierw musisz włączyć światło, żeby zebrać energię");
      return;
    }

    gracz.energia += 10;

    for (const p of pokoje) {
      p.Dodatkowaenergia = false;
    }

    console.log("Zebrano 10 jednostek energii. Masz teraz: " + gracz.energia);
    zebrano = true;
  }

  if (!zebrano) {
    console.log("W tym pokoju nie ma");
  }
}
// reset zasilania w budynku
function przywrocZasilanie() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową",
    );
    return;
  }

  if (gracz.pokoj == 4) {
    if (gracz.stanzasilania) {
      console.log("Zasilanie już działa");
      return;
    }

    if (!gracz.posiadabezpiecznik) {
      console.log("Nie masz bezpiecznika");
      return;
    }
  } else {
    console.log("Zasilanie możesz przywrócić tylko w serwerowni");
    return;
  }

  gracz.posiadabezpiecznik = false;
  gracz.stanzasilania = true;

  for (const pokoj of pokoje) {
    pokoj.oswietlony = true;
  }

  console.log(
    "Zasilanie przywrócone. Wszystkie pokoje są oświetlone i drzwi mają energie.",
  );
}

// INTERAKCJE - END

//KOMUNIKATY

// wyswietla mape gry z znacznikiem lokalizacji
function mapa() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.",
    );
    return;
  }

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
  console.log(
    "Czy posiadasz bezpiecznik: " + (gracz.posiadabezpiecznik ? "tak" : "nie"),
  );
  console.log("Czy zasilanie działa: " + (gracz.stanzasilania ? "tak" : "nie"));

  if (gracz.koniecgry) {
    console.log("Stan gry: " + (gracz.wygrana ? "Wygrana :3" : "Przegrana"));
  } else {
    console.log("Stan gry: Trwa...");
  }
}

function rozejrzyj(nowyPokoj = gracz.pokoj) {
  const aktualny_Pokoj = pokoje.find((p) => p.id === nowyPokoj);

  console.log(`Jesteś w pomieszczeniu: ${aktualny_Pokoj.nazwa}`);

  if (aktualny_Pokoj.karta) {
    console.log("Znalazłeś kartę");
  }

  if (aktualny_Pokoj.bezpiecznik) {
    console.log("Znalazłeś bezpiecznik");
  }

  if (aktualny_Pokoj.Dodatkowaenergia) {
    if (aktualny_Pokoj.oswietlony) {
      console.log("Znalazleś pakiet energii");
    } else {
      console.log("znalazles cos, ale musisz oswietlic ten pokoj");
    }
  }
}

function pomoc() {
  console.log("start() - rozpoczyna grę od nowa i resetuje wszystkie postępy.");
  console.log(
    'idz("kierunek") - przenosi cię do sąsiedniego pokoju. Kierunki: "lewo", "prawo", "gora", "dol". Każdy ruch kosztuje energię.',
  );
  console.log(
    "zbierz() - podnosi przedmiot (kartę, bezpiecznik lub baterię) leżący w pokoju.",
  );
  console.log(
    "przywrocZasilanie() - wkłada bezpiecznik i włącza prąd. Działa tylko w serwerowni.",
  );
  console.log(
    "Otworzdrzwi() - otwiera drzwi wyjściowe. Potrzebujesz karty i działającego zasilania, musisz stać w pokoju Wyjście; Wszystkie warunki musza zostac spełnione (karta + zasilanie).",
  );
  console.log("rozejrzyj() - opisuje aktualny pokój i widoczne przedmioty.");
  console.log("mapa() - pokazuje listę pokoi i miejsce, w którym jesteś.");
  console.log(
    "status() - pokazuje energię, posiadane przedmioty, stan zasilania i stan gry.",
  );
  console.log("UWAGA: gdy energia spadnie do 0, przegrywasz.");
}

//KOMUNIKATY -  END

// sciana oddzialajaca prace reszty od JT UWU :3

// RUCH

function idz(kierunek) {
  if (gracz.koniecgry) {
    console.log("Gra skończona. Użyj start().");
    return;
  }

  let nastepnyPokoj = gracz.pokoj;

  if (!["prawo", "lewo", "gora", "dol"].includes(kierunek)) {
    console.log("Nieznany kierunek.");
    return;
  }

  if (kierunek === "prawo") {
    if (gracz.pokoj === 2) {
      nastepnyPokoj += 3;
    } else if (![3, 4, 6].includes(gracz.pokoj)) {
      nastepnyPokoj++;
    }
  } else if (kierunek === "lewo") {
    if (gracz.pokoj === 4) {
      nastepnyPokoj -= 3;
    } else if (![1, 3, 4].includes(gracz.pokoj)) {
      nastepnyPokoj--;
    }
  } else if (kierunek === "gora") {
    if (gracz.pokoj === 2 || gracz.pokoj === 6) {
      nastepnyPokoj++;
    } else if (gracz.pokoj === 4) {
      nastepnyPokoj -= 2;
    }
  } else if (kierunek === "dol") {
    if (gracz.pokoj === 2) {
      nastepnyPokoj += 2;
    } else if (gracz.pokoj === 3) {
      nastepnyPokoj--;
    }
  }

  if (
    nastepnyPokoj === gracz.pokoj ||
    !pokoje.some((p) => p.id === nastepnyPokoj)
  ) {
    console.log("Napotkałeś ścianę.");
    return;
  }

  gracz.pokoj = nastepnyPokoj;
  gracz.energia--;

  poziomenergii();

  if (!gracz.koniecgry) {
    rozejrzyj();
  }
}

// RUCH - END

start();
