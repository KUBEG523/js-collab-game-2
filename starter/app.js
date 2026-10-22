// obiekt gracza
let gracz =
{
  pokoj: 1,
  energia: 15,
  posiadakarte: false,
  stanzasilania: false,
  koniecgry: false,
  wygrana: false
}

//obiekt pokoju

const pokoje = [
  { id: 1, nazwa: "Wejście", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 2, nazwa: "Ochrona", oswietlony: false, karta: false, bezpiecznik: false, Dodatkowaenergia: false},
  { id: 3, nazwa: "Korytarz", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 4, nazwa: "Serwerownia", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 5, nazwa: "Magazyn", oswietlony: true, karta: false, bezpiecznik: true },
  { id: 6, nazwa: "Sekretariat", oswietlony: false, karta: true, bezpiecznik: false },
  { id: 7, nazwa: "Wyjście", oswietlony: true, karta: false, bezpiecznik: false },
];

function znajdzPokoj(id)
{
  return pokoje.find(pokoj => pokoje.id === id);
}


// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
  pokoj = 1;
  energia = gracz.energia;
  karta = false;
  bezpiecznik = false;
  zasilanie = false;
  koniec = false;
  wygrana = false;
  console.log("UCIECZKA Z SERWEROWNI. Zasilanie awaryjne wystarczy na 10 tur.");
  pomoc();
  rozejrzyj();
}

function zakonczTure() {
  energia = energia - 1;
  console.log("Pozostala energia: " + energia);
  if (wygrana) {
    console.log("WYGRANA! Drzwi otwarte. Mozesz wrocic do domu.");
  } else if (energia === 0) {
    koniec = true;
    console.log("PRZEGRANA. Zasilanie awaryjne padlo. Wpisz start().");
  }
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {

  switch(numer)
  {
    case 1:
      return "Wejście";
    case 2:
      return "Ochrona";
    case 3:
      return "Korytarz";
    case 4:
      return "Serwerownia";
    case 5:
      return "Magazyn";
    case 6:
      return "Sekretariat";
    case 7:
      return "Wyjście";
    default:
      console.log("Nieznane pomieszczenie");
  }
}

function pomoc() {
  console.log('Dostepne: start(), pomoc(), status(), mapa(), rozejrzyj(), idz("prawo"), idz("lewo"), akcja("karta"), akcja("bezpiecznik"), akcja("napraw"), akcja("wyjdz")');
  console.log('Są cztery pokoje. Każde przemieszczenie się do innego pokoju kosztuje jedną energię');
  console.log('Żeby wyjść z serwerowni musisz odzyskać zasilanie oraz posiadać kartę')
  console.log('Każde próby zabrania karty z recepcji kosztują jedną energię. Nie można zabrać bezpiecznika z recepcji. Naprawa zasilania bez przedmiotu nie działa.')

}
function status() {
  console.log("Status gry:");
  //wypisanie obecnego pokoju
  console.log(`Aktualny pokój to: ${pokoj}: ${nazwaPokoju(pokoj)}`);
  //wypisanie aktualnej energi
  console.log(`Aktualny poziom energii to: ${energia} (${energia / 15 * 100}%)`);
  //Status karty 
  console.log("Czy posiadasz kartę: " + (karta ? "tak" : "nie"));
  //Status zasilania
  console.log("Czy zasilanie działa: " + (zasilanie ? "tak" : "nie"));
  //Sprawdzanie stausy gry 
  console.log("Gra w toku: " + (koniec ? "Status zwycięstwa: " + (wygrana ? "Wygrana :3" : "Przegrana") : "Trwa..."));
  
}
function mapa() {
  for(let i=0; i<7; i++)
  {
    console.log(`Numer pomieszczenia: ${i+1}: ${pokoje[i].nazwa}`);

  }
}
function rozejrzyj() {

  const aktualny_Pokoj = pokoje.find(p => p.id === gracz.pokoj);

  if (!aktualnyPokoj) {
    console.log("Nie znaleziono pokoju.");
    return;
  }

  console.log(`Jesteś w pomieszczeniu: ${aktualnyPokoj.nazwa}`);

  
  if(karta==true)
{
  console.log("Znalazłeś kartę");
}
  if(bazpiecznik==true)
{
  console.log("Znalazłeś bezpiecznik");
}
}

// SEKCJA B — RUCH
function idz(kierunek) {
  let nastepnyPokoj = pokoj;

  if(kierunek == "prawo")
  {
    if(pokoj == 2)
    {
      nastepnyPokoj += 3;
    }
    else if(pokoj == 6 || pokoj == 3 || pokoj == 4)
    {
      console.log("Napotkałeś na ścianę.");
      break;
    }
    nastepnyPokoj++;
  }
  else if (kierunek == "lewo")
  {
    if(pokoj == 4)
    {
      nastepnyPokoj -= 3;
    }
    else if(pokoj == 1 || pokoj == 3 || pokoj == 4)
    {
      console.log("Napotkałeś na ścianę.");
      break;
    }
    nastepnyPokoj--;
  }
  else if(kierunek == "gora")
  {
    if()
  }
  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.

  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  pokoj = nastepnyPokoj;
  rozejrzyj();
  zakonczTure();
  default:
    {
      console.log("Nieznana komenda, spróbuj jeszcze raz");
      break;
    }

    poziomenergii();
  }

  

// SEKCJA C — PRZEDMIOTY I WYGRANA
function akcja(co) {
  // TODO C1: zablokuj akcje po koncu gry.
  if(koniec == true)
  {
    console.log("koniec gry wpisz start() by zagrać ponownie.");
    return;
  }
  // TODO C2: switch: karta / bezpiecznik / napraw / wyjdz.
  switch(co)
    {
    case "karta":
      {
      if (pokoj != 1 || karta) {
        console.log("Tutaj nie ma karty do zabrania.");
        return;
      }
      karta = true;
      console.log("Zabierasz karte.");
      break;
      }

    case "bezpiecznik":
      {
      if (pokoj != 2 || bezpiecznik) {
        console.log("Tutaj nie ma bezpiecznika do zabrania.");
        return;
      }
      bezpiecznik = true;
      console.log("Zabierasz bezpiecznik.");
      break;
      }

      case "napraw":
      {
      if (pokoj != 3 || bezpiecznik == false) {
        console.log("Nie możesz naprawić zasilania.");
        return;
      }
      bezpiecznik = false;
      zasilanie = true;
      console.log("Naprawiłeś/aś zasilanie.");
      break;
      }

      case "wyjdz":
      {

        if (pokoj != 4 || karta != true || zasilanie != true) {
          console.log("Nie możesz wyjść.");
          return;
      }
      wygrana = true;
      koniec = true;
      console.log("wygrałeś/aś.");
        break;
      }
      default:
        {
          console.log("Nie ma takiej akcji.");
        }

    }

  zakonczTure();


}
  

start();