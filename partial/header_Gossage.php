<!DOCTYPE html>
<html lang="fr">
    <head>
	<link href="css/global.css" rel="stylesheet" />
		<title>Magix, the copycating</title>
		<script src="js/game.js"></script>
		<script src="js/page.js"></script> 
		<script src="js/card.js"></script>
		<script src="js/alertDiv.js"></script> 
		<script src="js/side.js"></script> 
		<script src="js/cardImageLoader.js"></script> 
		<script src="js/ajax-magix-request.js"></script> 
		<meta charset="utf-8" />
    </head>
    <body>
		<div class="header">
			<div class="navbar" id="navbar">
				<div class="username-section">
					Bonjour, <?= $data["username"] ?> !
				</div>
			<div class="menu">
				<ul>
					<li><a href="index.php">Accueil du site</a></li>
					<li><a href="login.php">Se connecter</a></li>
					<?php
						if ($data["isLoggedIn"]) {
							?>
							<li><a href="blog.php">Guide Strategique</a></li>
							<li><a href="lobby.php">Retour au Lobby</a></li>
							<li><a href="?logout=true">Déconnexion</a></li>
							<?php
						}
					?>
				</ul>
			</div>
			<iframe style="width:700px;height:240px;"
				onload="applyStyles(this)"
				src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["token"]?>" >
			</iframe>
			</div>
		</div>

		<!--<div class="container">>
