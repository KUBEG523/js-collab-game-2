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
  { id: 7, nazwa: "Wyjście", oswietlony: true, karta: false, bezpiecznik: false }
];

// SEKCJA 0 — GOTOWY SILNIK NAUCZYCIELA
function start() {
gracz.pokoj = 1;
gracz.energia = 15
gracz.posiadakarte = false;
gracz.stanzasilania = false;
gracz.koniecgry = false;
gracz.wygrana = false;

console.log("Ucieczka z Serwerowni v2, Energi starczy ci na " + gracz.energia + "pokoji. Ale może gdzieś jest jej wiecej?");
pomoc();
}

// Sprawdza stan energi gracza
function poziomenergii()
{
  if(gracz.energia == 0)
  {
  gracz.wygrana = false;
  gracz.koniecgry = true;
  console.log("Przegrana, Skończyła ci się energia i to już koniec, zacznij gre od nowa komędą start() ");
  }
}

// Otwierania drzwi wejściowych
function Otworzdrzwi() {
  if(gracz.koniecgry == true)
  {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.")
    return;
  }

if("Wyjście" === pokoje.find(pokoj => pokoj.nazwa === "Wyjście");)
{
  if(gracz.posiadakarte == true && gracz.stanzasilania == true)
  {
    console.log("Otworzyłeś drzwii, to już koniec twojej przygody");
    gracz.koniecgry == true;
    gracz.wygrana == true;
  }
  else
  {
    console.log("Czegoś ci brakuje do otworzenia tych drzwii, jesteś pewien ze wszystko masz?");
    return;
  }
}
else
{
  console.log("Co próbujesz otworzyć??, nie jesteś przy wyjściu");
  return;
}
  
}

// SEKCJA A — INFORMACJE I MAPA
function nazwaPokoju(numer) {

  switch(numer)
  {
    case 1:
      return "Recepcja";
    case 2:
      return "Magazyn";
    case 3:
      return "Serwerownia";
    case 4:
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
  console.log(`Aktualny poziom energii to: ${energia} (${energia / 10 * 100}%)`);
  //Status karty 
  console.log("Czy posiadasz kartę: " + (karta ? "tak" : "nie"));
  //Status zasilania
  console.log("Czy zasilanie działa: " + (zasilanie ? "tak" : "nie"));
  //Sprawdzanie stausy gry 
  console.log("Gra w toku: " + (koniec ? "Status zwycięstwa: " + (wygrana ? "Wygrana :3" : "Przegrana") : "Trwa..."));
  
}
function mapa() {
  for(let i=1; i<=4; i++)
  {
    console.log(`Numer pomieszczenia: ${i}`);
    console.log(nazwaPokoju(i))
    console.log((i === pokoj) ? "<-- Jesteś tutaj" : "");
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
  // TODO B1: zablokuj ruch po koncu gry.
  if(koniec == true)
  {
    console.log("Gra została zakończona, napisz start(), aby rozpocząc jeszcze raz.");
    return;
  }

  // TODO B2: switch kierunku; oblicz kandydat na nowy pokoj.
  let nastepnyPokoj = pokoj;

  switch(kierunek)
  {
    case "lewo":
      {
        nastepnyPokoj -= 1;
        break;
      }
    case "prawo":
      {
        nastepnyPokoj += 1;
        break;
      }
    case "gora", "dol":
    {
      console.log("Możesz się poruszać tylko w lewo i w prawo.");
      break;
    }
    default:
    {
      console.log("Nieznana komenda, spróbuj jeszcze raz");
      break;
    }
  }

  // TODO B3: odrzuc pokoj poza 1..4 i nieznany kierunek bez kosztu.

  if(nastepnyPokoj < 1 || nastepnyPokoj > 4)
  {
    console.log("Napotkałeś na ścianę.");
    nastepnyPokoj = pokoj;
    energia++;
  }

  // TODO B4: zapisz poprawny pokoj, rozejrzyj(), zakonczTure().
  pokoj = nastepnyPokoj;
  rozejrzyj();
  zakonczTure();
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
