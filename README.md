# The Hangman  Game - var CodePack();

## Översikt
##### Den här uppgiften visar en typ av en klassisk spel inom Javascript, vilket är "hänga gubbe" spel med kod temat. D

![img1](img/Screenshot%20(56).png)
##### Kortfattat, fungerar spelet på att gissa hemliga orden innan gubben hängs. Med varje fel kommer gubben bli närmare att bli hängd.


## Layout

#### För veta hur det funkar på sidan, finns det följande steg att visa:

#### 1. Sidan där det visar spelet utan att ha startat nytt. Där visar startknappen (**generteLanguage();**) och figurrutan på visningen.
  ![img2](img/Screenshot%20(49).png)

<br>

#### 2. Sidan där det visar när man trycker på knappen och startar nytt spel. Då visar det gömda bokstäver på visningen som mna bör gissa med hjälp av bokstavsknapparna.
![img3](img/Screenshot%20(50).png)

<br>

#### 3. Spelet visar sin första fel gisnning vilket då visar en ritande figur och en bokstavsknapp bleknar. Ingen bokstavsknapp visas.
![img4](img/Screenshot%20(51).png)

<br>

#### 4. Spelet visar sin första rätt gissnning vilket en bokstav visar beroende på ordningen den  bokstaven ligger. En annan bokstavsknapp bleknar men ingen ny figur visas.
![img5](img/Screenshot%20(52).png)



<br>

#### 5. Bilden visar antal fel gissningar och mer figurer visar ju mer man gissar fel på bokstäverna. Fler blekna bokstäver visas och gömda bokstäver fortsätter vara samma.
#### - Figuren nedan visar en rak pil-liknande form och en ytterliggare blek bokstav (**P**). 
![img5](img/Screenshot%20(53).png)

<br>

#### - Figuren nedan visar en vågrätt pil-liknande form och en ytterliggare blek bokstav (**X**).
![img6](img/Screenshot%20(54).png)

<br>

#### - Figuren nedan visar en små pil som korsar mellan de förra pilarna och en ytterligggare blek bokstav (**Q**).
![img7](img/Screenshot%20(55).png)

<br>

#### 6. Bilden visar en anna rätt gissning på bokstaven (**H**) vilket den dolda bokstavsfältet försvinner och ersätts. Ingen ny figur visas. Rätta bokstavsknappen bleknar.
![img8](img/Screenshot%20(56).png)

<br>

#### 7. Bilden visar en ytterliggare fel gissning på bokstaven (**R**) vilket bokstavsknappen bleknar och rutan visar ny figur vilket är en annan rak pil som hängs från den vågrätta pilen och en cirkel som ska föreställa huvudet som hängs från den nya pilen.  
![img9](img/Screenshot%20(57).png)

<br>

#### 8. Bilden visar en ytterliggare rätt gissning på bokstaven (**T**) vilket ersätter den dolda bokstavsfältet och bokstavsknappen bleknar. Ingen ny figur på rutan visas.
![img10](img/Screenshot%20(58).png)

#### 9. Bilden visar sista fel gissningen på bokstaven (**S**) vilket knappen bleknar och ny figur visas. En ny, rak pil form som ska föreställa kroppen som hängs under huvudet och två spetsiga formiga vinklar som ska föreställa armar och ben. 

#### (OBS! Det ser slarvigt ut men pga svårighet och kodtemat på spelet så går det att låtsas att detta är sista gången på att gissa innan kroppen ställs in ordenligt och gubben dog! )
![img11](img/Screenshot%20(59).png)

<br>

#### 10. Bilden visar resultatet på rutan efter antal fel gissningar på spelet. Rutan försvinner och istället visar en meddelandet om att spelaren har förlorat med röda stora bokstäver som symbol (**ERROR**) och svaret på ordet vilket ligger bredvid **answer** (**HTML**).  Det visar också en knapp (**newGame();**) som startar om spelet vilket leder till första steget i början.
![img12](img/Screenshot%20(60).png)

<br>

#### 11. Bilden visar en annan spel omgång då man har gissat ett fel på bokstaven (**N**) vilket visar den första figuren igen men gissar rätt på alla andra bokstäver vilket de gömda bokstavsfältet visar till slut förutom en fält. Alla gissade bokstavsknapparna bleknar.
![img13](img/Screenshot%20(62).png)

<br>

#### 12. Bilden visar resultatet på rutan efter antal rätt gissningar på spelet. Visningen visar meddelandet om att spelaren har vunnit med gröna bokstäver (**SUCCESS**) och svaret på order som ligger i en parentes bredvid **console.log** (vilket var **JAVASCRIPT**).
![img14](img/Screenshot%20(63).png)


## Mobilversion

#### Bilden nedan visar mhur spelet ser ut i mobilskärm, t.ex en iPhone 12/13 med skärmstorleken 390x844.
![img15](img/Screenshot%20(103).png)