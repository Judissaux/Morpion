// Déclaration des variables 
let tab;
let choixJeuJ1J2 = document.querySelector('#choixJ1J2');  
let choixJeuJ1O= document.querySelector('#choixJ1O');    
let div = document.querySelectorAll(".case");
let grille = ["0","0","0","0","0","0","0","0","0"];
let playerOne = "X";
let playerTwo = "O";
let playerTurn = playerOne;
let jeu = 0;
let coups = document.querySelector(".coup");
let coup = 0;
let score1 = 0;
let score2 = 0;
let scoreMatchNul = 0;
let conditionVictoire = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
let partieActu = 1;
let nbrparties = 0;
document.querySelector(".valider").addEventListener("click", demarrageJeu);
let test = 0;

// Function du début de partie

function demarrageJeu() {
var buttons = document.querySelectorAll('input[name="nbrDeParties"]:checked');
for (var button of buttons) {
    nbrparties = Number(button.value);
    
 }
document.querySelector(".debut").style.display = "none";
document.querySelector(".morpion").style.display = "flex";
document.querySelector(".nbrDeParties").textContent = nbrparties}

//Fonction pour jouer J1J2

function jouerCase (e){
let idCase = e.target.id;
if(grille[idCase] !=0){return}
if(jeu===0 && choixJeuJ1J2.checked){
e.target.innerText = playerTurn; 

    if(playerTurn=== playerOne){
    playerTurn=playerTwo;
    grille[idCase] = "1";
    coup++
    document.querySelector(".symbole").innerText = "O"
    coups.innerHTML = coup;
    win();
    draw();
    }else if(playerTurn===playerTwo){
    playerTurn =playerOne;
    grille[idCase] = "2";
    document.querySelector(".symbole").innerText = " X"
    coup++;
    coups.innerHTML = coup;
    win();
    draw();
    }
endGame();
}
else if(jeu===0 && choixJeuJ1O.checked){
    e.target.innerText = playerTurn; 
    if(playerTurn === playerOne){
    playerTurn=playerTwo;
    grille[idCase] = "1";
    coup++;
    coups.innerHTML = coup;
    if(coup<9 && playerTurn === playerTwo)
    {
        ordi();              
    }
    win();
    draw();
    }
    endGame();
    } 
}


div.forEach(di => di.addEventListener("click" , jouerCase));    

function ordi(){
    let j=0;
    let table= [];
    for(let u=0;u<9;u++){
        if(grille[u]== 0){
            table[j]=u;
            j++;
        }
    }
    let nbr = table[Math.floor(Math.random()*table.length)];
    document.getElementById(nbr).innerText = playerTwo;
    grille[nbr] = "2";
    coup++;
    coups.innerHTML = coup;
    playerTurn=playerOne;
}


//Fonction pour savoir si il y a un gagnant     

function win (){    
for(let i=0 ; i<conditionVictoire.length ; i++){
    if(grille[conditionVictoire[i][0]] == grille[conditionVictoire[i][1]] && grille[conditionVictoire[i][1]] == grille[conditionVictoire[i][2]] && grille[conditionVictoire[i][1]] == 1){    
     document.querySelector(".message").innerHTML = "Joueur 1 gagnant";              
     score1++;
     document.querySelector(".j1").innerText = score1;
     document.getElementById("rejouer").style.display = "block";      
     jeu=1;
     localStorage.setItem("score1", score1);                      
     break;
        
    }else if(grille[conditionVictoire[i][0]] == grille[conditionVictoire[i][1]] && grille[conditionVictoire[i][1]] == grille[conditionVictoire[i][2]] && grille[conditionVictoire[i][1]] == 2){
        document.querySelector(".message").innerHTML = "Joueur 2 gagnant";  
        document.getElementById("rejouer").style.display = "block"; 
        score2++;
        document.querySelector(".j2").innerText = score2; 
        jeu=1;
        localStorage.setItem("score2", score2);          
        break;                
    }}}   

  // Fonction pour reset seulement le morpion

    function reset () {
        grille = ["0","0","0","0","0","0","0","0","0"];
        div.forEach(di => di.innerHTML ="");
        document.querySelector(".message").innerHTML = "";
        playerTurn = playerOne;
        coup=0;
        jeu=0; 
        partieActu++;  
        document.querySelector(".partieActu").innerText = partieActu;
        localStorage.setItem("partie",partieActu);
        document.getElementById("rejouer").style.display = "none";
        coups.innerHTML = ""; 
        document.querySelector(".symbole").innerText = "X"                   
     }
     
    document.getElementById("rejouer").addEventListener("click", reset); 

  // Fonction pour le match nul !!! 

   function draw(){
    if(jeu===0 && coup===9){
        document.querySelector(".message").innerHTML = "Match Nul"; 
        scoreMatchNul++;
        document.querySelector(".matchnul").innerText = scoreMatchNul;
        document.getElementById("rejouer").style.display = "block"; 
        jeu=1;
        localStorage.setItem("ScoreMatchNul", scoreMatchNul);
        
    }}  
   // Fonction pour le verifier si c'est la fin de la partie !!!  
    function endGame(){
        if(score1>score2 && partieActu === nbrparties && score1>=scoreMatchNul && jeu===1){
            document.querySelector(".resultat").innerHTML = "Le jeu est terminé. <br>Le grand gagnant est le JOUEUR 1";
            document.querySelector(".resultat").style.animationPlayState = "running";
            document.querySelector("#newGame").style.display = "block";
            document.querySelector("#rejouer").style.display = "none";
        }else if(score2>score1 && partieActu === nbrparties&& score2>=scoreMatchNul && jeu===1){
            document.querySelector(".resultat").innerHTML = "Le jeu est terminé. <br>Le grand gagnant est le JOUEUR 2";
            document.querySelector(".resultat").style.animationPlayState = "running";
            document.querySelector("#newGame").style.display = "block";
            document.querySelector("#rejouer").style.display = "none";
        }else if(score1===score2 && partieActu === nbrparties && jeu===1 || scoreMatchNul>score1 && partieActu === nbrparties && jeu===1  || scoreMatchNul>score2 && partieActu === nbrparties && jeu===1){
            document.querySelector(".resultat").innerHTML = "Le jeu est terminé. <br> Pas de gagnant!! Dommage!!";
            document.querySelector(".resultat").style.animationPlayState = "running";
            document.querySelector("#newGame").style.display = "block";
            document.querySelector("#rejouer").style.display = "none";
        }}       
    // Fonction de remise à zero de toutes les données !!!
        function remiseAzero() {
            nbrparties=0;
            partieActu=0;
            document.querySelector(".partieActu").innerText = ""; 
            document.querySelector(".morpion").style.display = "none";
            document.querySelector(".debut").style.display = "flex";
            score1=0;
            score2=0;
            scoreMatchNul=0;
            document.querySelector(".matchnul").innerText = scoreMatchNul;
            document.querySelector(".j1").innerText = score1;
            document.querySelector(".j2").innerText = score2;
            reset();
            document.querySelector("#newGame").style.display = "none"
            document.querySelector(".resultat").innerHTML = "";
            document.querySelector("#rejouer").style.display = "block";
            document.querySelector(".resultat").style.animationPlayState = "paused";
            document.getElementById("rejouer").style.display = "none";
            coups.innerHTML="";
            document.querySelector(".symbole").innerText = "X" 
            localStorage.clear();
            

        }
    document.querySelector("#newGame").addEventListener("click",remiseAzero);

    // function recupstat (){
    //     score1 = Number(localStorage.getItem("score1"));
    //     score2 = Number(localStorage.getItem("score2"));
    //     scoreMatchNul = Number(localStorage.getItem("scoreMatchNul"));
    //     partieActu = Number(localStorage.getItem("partie"));
    //     document.querySelector(".partieActu").innerText = partieActu;
    //     document.querySelector(".j1").innerText = score1;
    //     document.querySelector(".j2").innerText = score2; 
        //    document.querySelector(".matchnul").innerText = scoreMatchNul;

    // }

    // document.getElementById("recup").addEventListener("click",recupstat);