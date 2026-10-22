
//OBIEKTY

// obiekt gracza
let gracz =
{
  pokoj: 1,
  energia: 15,
  posiadakarte: false,
  posiadabezpiecznik: false,
  stanzasilania: false,
  koniecgry: false,
  wygrana: false,
}

//obiekt pokoju
const pokoje = [
  { id: 1, nazwa: "Wejście", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 2, nazwa: "Ochrona", oswietlony: false, karta: false, bezpiecznik: false, Dodatkowaenergia: true},
  { id: 3, nazwa: "Korytarz", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 4, nazwa: "Serwerownia", oswietlony: true, karta: false, bezpiecznik: false },
  { id: 5, nazwa: "Magazyn", oswietlony: true, karta: false, bezpiecznik: true },
  { id: 6, nazwa: "Sekretariat", oswietlony: false, karta: true, bezpiecznik: false },
  { id: 7, nazwa: "Wyjście", oswietlony: true, karta: false, bezpiecznik: false },
];

//OBIKETY - END

//CORE

// Funkcja start rozpoczyne gre, ustawia wartosci domyslne gry i ustawia
function start()
{
  gracz.pokoj = 1;
  gracz.energia = 15;
  gracz.posiadakarte = false;
  gracz.posiadabezpiecznik = false;
  gracz.stanzasilania = false;
  gracz.koniecgry = false;
  gracz.wygrana = false;

  for (const pokoj of pokoje)
  {
    pokoj.karta = pokoj.id === 6;
    pokoj.bezpiecznik = pokoj.id === 5;
    pokoj.oswietlony = pokoj.id !== 2 && pokoj.id !== 6;

    if (pokoj.id === 2)
    {
      pokoj.Dodatkowaenergia = true;
    }
  }

  console.log("Ucieczka z Serwerowni v2. Początkowa energia: " + gracz.energia + ".");
  pomoc();
}

// Sprawdza stan energi gracza i blokuje gre jezeli stan energi jest na 0
function poziomenergii()
{
  if (gracz.koniecgry)
  {
    return;
  }

  if(gracz.energia <= 0)
  {
  gracz.energia = 0;
  gracz.wygrana = false;
  gracz.koniecgry = true;
  console.log("Przegrana, Skończyła ci się energia i to już koniec, zacznij gre od nowa komędą start() ");
  }
}

//CORE - END

//INTERAKCJE 

// Otwierania drzwi wejściowych
function Otworzdrzwi() {
  if(gracz.koniecgry)
  {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.")
    return;
  }

if (gracz.pokoj === 7)
{
  if(gracz.posiadakarte == true && gracz.stanzasilania == true)
  {
    console.log("Otworzyłeś drzwii, to już koniec twojej przygody");
    gracz.koniecgry = true;
    gracz.wygrana = true;
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

//funckaj ktora pozwala graczowi zbierac przedmioty z pokoji i zabezpicza przez panownym zebraniem :3

function zbierz()
{
   if(gracz.koniecgry)
  {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.")
    return;
  }

  // sprawdza obecny pokoj
  const pokoj = pokoje.find(p => p.id === gracz.pokoj);

  //  czy przxedmiot zostal zebrany w obecnym pokoju
  let zebrano = false;

  if (pokoj.karta)
  {
    gracz.posiadakarte = true;

    for (const p of pokoje)
    {
      p.karta = false;
    }

    console.log("Zebrano kartę.");
    zebrano = true;
  }

  if (pokoj.bezpiecznik)
  {
    gracz.posiadabezpiecznik = true;

    for (const p of pokoje)
    {
      p.bezpiecznik = false;
    }

    console.log("Zebrano bezpiecznik.");
    zebrano = true;
  }

  if (pokoj.id === 2 && pokoj.Dodatkowaenergia)
  {
    if (!pokoj.oswietlony)
    {
      console.log("Najpierw musisz włączyć światło, żeby zebrać energię.");
      return;
    }

    gracz.energia += 5;

    for (const p of pokoje)
    {
      p.Dodatkowaenergia = false;
    }

    console.log("Zebrano 5 jednostek energii. Masz teraz: " + gracz.energia);
    zebrano = true;
  }

  if (!zebrano)
  {
    console.log("W tym pokoju nie ma");
  }
}

function przywrocZasilanie() {
 if(gracz.koniecgry)
  {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.")
    return;
  }

  if (gracz.pokoj == 4) 
  {

  if (gracz.stanzasilania) {
    console.log("Zasilanie już działa");
    return;
  }

  if (!gracz.posiadabezpiecznik) {
    console.log("Nie masz bezpiecznika");
    return;
  }
  }
    else
    {
    console.log("Zasilanie możesz przywrócić tylko w serwerowni");
    return;
  }

  gracz.posiadabezpiecznik = false;
  gracz.stanzasilania = true;

  for (const pokoj of pokoje)
     {
    pokoj.oswietlony = true;
  }

  console.log("Zasilanie przywrócone. Wszystkie pokoje są oświetlone i drzwi mają energie.");
}

// INTERAKCJE - END

//KOMUNIKATY

function mapa()
{
   if(gracz.koniecgry)
  {
    console.log("Gra skończona, nie możesz wchodzić w interakcje z grą, zacznij nową.")
    return;
  }

  console.log("Mapa pokojów:");
  const znacznik =" <- jestes tutaj";

  for (const p of pokoje)
  {
    if(p.id === gracz.pokoj)
    {
    console.log(p.id + ". " + p.nazwa + znacznik);
    }
    else
    {
    console.log(p.id + ". " + p.nazwa);
    }
  }
}

function status()
{
  const pokoj = pokoje.find(p => p.id === gracz.pokoj);
  const nazwa = pokoj.nazwa;

  console.log("Status gry:");
  console.log("Aktualny pokój: " + gracz.pokoj + " " +nazwa);
  console.log("Aktualna energia: " + gracz.energia);

  console.log("Czy posiadasz kartę: "+ (gracz.posiadakarte ? "tak" : "nie"));
  console.log("Czy posiadasz bezpiecznik: "+ (gracz.posiadabezpiecznik ? "tak" : "nie"));
  console.log("Czy zasilanie działa: "+ (gracz.stanzasilania ? "tak" : "nie"));

  if (gracz.koniecgry)
  {
    console.log("Stan gry: "+ (gracz.wygrana ? "Wygrana :3" : "Przegrana"));
  }
  else
  {
    console.log("Stan gry: Trwa...");
  }
}

function pomoc() {
// DO ZROBIENIA PRZEZ JANO
}

//KOMUNIKATY -  END

// sciana oddzialajaca prace reszty od JT UWU :3

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

  // sekcja jano
function znajdzPokoj(id)
{
  return pokoje.find(pokoj => pokoje.id === id);
}


start();