    <!-- • Rafraichissement de l’état de la partie (AJAX) -->
    <!-- • Dans une partie, pouvoir terminer son tour (AJAX) -->
    <!-- • Dans une partie, pouvoir jouer des cartes de sa main (AJAX) -->
    <!-- • Dans une partie, pouvoir attaquer une carte de l’adversaire (AJAX) -->
    <!-- • Dans une partie, pouvoir attaquer l’adversaire (AJAX) -->
    <!-- • Dans une partie, pouvoir faire le pouvoir du héros (AJAX) -->
    <!-- • Lors d’une partie, afficher au minimum les informations suivantes : -->
            <!-- ◦ La vie du joueur -->
            <!-- ◦ La vie de son adversaire -->
            <!-- ◦ Les cartes dans la main du joueur -->
            <!-- ◦ Les cartes jouées de l’adversaire -->
            <!-- ◦ Les cartes jouées du joueur -->
            <!-- ◦ Un effet sur les cartes/boutons actuellement jouables par le joueur -->
            <!-- ◦ Un effet visuel sur les cartes « taunt » et « stealth » (glow, image, etc.) -->
    <!--  -->
        <!-- • Chat bien intégré au jeu (lobby et partie).  -->
    <!-- Note : Afin de ne pas prendre trop de place dans la partie, le chat pourrait être caché/affiché via un bouton (ou autre) -->
        <!-- • Une carte affichée doit avoir au minimum une image, son coût, son attaque, sa vie et sa mécanique. -->
        <!-- • Avec le temps, il pourrait y avoir de nouvelles cartes ajoutées au jeu. Afin d’éviter que votre jeu plante, il s’agit de prévoir une carte « générique » pour les nouvelles cartes à venir. -->
        <!-- • Lorsqu’une partie se termine, faire afficher le résultat (victoire/défaite) -->
        <!-- • Lorsque l’usager clique sur une carte dans la partie, faire afficher à l’écran une erreur, le cas échéant -->
<?php
    require_once("action/CommonAction.php");

    class GameAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {

            
        }
    }