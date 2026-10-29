

//CORE - END

//INTERAKCJE

// Otwierania drzwi wejściowych
function Otworzdrzwi() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową");
    return;
  }

  if (gracz.pokoj === 7) {
    if (gracz.posiadakarte && gracz.stanzasilania) {
      console.log("Otworzyłeś drzwii, to już koniec twojej przygody");
      gracz.koniecgry = true;
      gracz.wygrana = true;
    } else {
      console.log("Czegoś ci brakuje do otworzenia tych drzwii, jesteś pewien ze wszystko masz?");
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
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową");
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
  else
  {
    gracz.energia--;
  }
}
// reset zasilania w budynku
function przywrocZasilanie() {
  if (gracz.koniecgry) {
    console.log(
      "Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową");
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
    "Zasilanie przywrócone. Wszystkie pokoje są oświetlone i drzwi mają energie");
}

// INTERAKCJE - END

//KOMUNIKATY


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

//KOMUNIKATY -  END

// sciana oddzialajaca prace reszty od JT UWU :3

// RUCH

function idz(kierunek) {
  if (gracz.koniecgry) {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową");
    return;
  }

  let nastepnyPokoj = gracz.pokoj;

  if (!["prawo", "lewo", "gora", "dol"].includes(kierunek)) {
    console.log("Nieznany kierunek");
    return;
  }

  if (kierunek === "prawo") {
    if (gracz.pokoj === 2) {
      nastepnyPokoj += 3;
    } else if (![3, 4, 6].includes(gracz.pokoj)) {
      nastepnyPokoj++;
    }
  } else if (kierunek === "lewo") {
    if (gracz.pokoj === 5) {
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


// :3 
// RUCH - END

start();
