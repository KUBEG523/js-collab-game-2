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

  
  switch(pokoj)
  {
    case 1:
      console.log("Rozgladasz sie po lekko zakurzonym pomieszczeniu, nie jest ono brudne ale widać że ktoś dawno nie odkurzał")
      if(!karta)
      {
        console.log("Na zakurzonym biurku leży karta dostępu, ciekawe co ona otwiera");
      }
      else
      {
        console.log("Już wziełeś tę karte, chyba pamiętasz?");
      }
      break;

    case 2:
      console.log("Rozglądasz sie po magazynie, Widzisz dużo półek, regałów i lużno porozrzucanych rzeczy, oraz kable rj-45")
      if(!bezpiecznik && !zasilanie)
      {
        console.log("Dostrzegasz lużno leżący bezpiecznik, może on być pomocy do przywrócenia zasilania");
      }
      else if(bezpiecznik && !zasilanie)
      {
        console.log("Już wziełeś ten bezpiecznik, przydało by się włączyć zasilanie");
      }
      else if(zasilanie)
      {
        console.log("W tym magazynie chyba nie ma już nic ciekawego, po co tu wogóle wszedłem?");
      }
      break;

    case 3:
      console.log("Rozglądasz sie po serwerownu, Skąd szkoła miała tyle pieniędzy na tyle serwerów, są tu rzędy serwerów a na końcu pomieszczenia skrzynka zasilająca")
      if(!bezpiecznik && !zasilanie)
      {
        console.log("Zasilanie nie działa, przydał by ci się bezpiecznik do naprawienia zasilania");
      }
      else if(bezpiecznik && !zasilanie)
      {
        console.log("Zasilanie nie działa, na szczęście masz już bezpiecznik, nic tylko go wstadzić i włączyć zasilanie");
      }
      else if(zasilanie)
      {
        console.log("Zasilanie działa, Trzeba wyjść wkońcu z tej serwerowni");
      }
      break;

    case 4:
      console.log("Wyjście z serwerowni, Duze stalowe drzwi zamykane na kartę, nic ich siłą nie ruszy");
      if(!karta && !zasilanie)
      {
        console.log("Nie da się otworzyć drzwi bez karty i zasilania, nic ich bez nich nie ruszy")
      }
      else if(karta && !zasilanie)
      {
        console.log("Mam kartę, ale brak zasilania, wypadało by je włączyć");
      }
      else if(!karta && zasilanie)
      {
        console.log("Zasilanie już działa, ale bez karty nie otworze tych drzwii");
      }
      else if(karta && zasilanie)
      {
        console.log("Mam już wszystko żeby, Wolność już tak blisko");
      }
      break;

    default:
      console.log("Nie wiem jak to zrobiłeś ale jesteś w backroomsach")
      break;
    }
  }



// KONIEC SEKCJI A — INFORMACJE I MAPA


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
      energia++;
    }
    else
    {
      nastepnyPokoj++;
    }
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
      energia++;
    }
    else
    {
      nastepnyPokoj--;
    }
  }
  else if(kierunek == "gora")
  {
    if(pokoj == 2 || pokoj == 6)
    {
      nastepnyPokoj++;
    }
    else if(pokoj == 4)
    {
      nastepnyPokoj-=2;
    }
    else
    {
      console.log("Napotkałeś na ścianę");
      energia++;
    }
  }
  else if(kierunek == "dol")
  {
    if(pokoj == 2)
    {
      nastepnyPokoj += 2;
    }
    else if(pokoj == 3)
    {
      nastepnyPokoj--;
    }
    else
    {
      console.log("Napotkałeś na ścianę");
      energia++;
    }
  }
  else
  {
      console.log("Nieznana komenda, spróbuj jeszcze raz");
  }

  if(nastepnyPokoj != pokoj)
  {
      rozejrzyj();
  }
  pokoj = nastepnyPokoj;
  energia--
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