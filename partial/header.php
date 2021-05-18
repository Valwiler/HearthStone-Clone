<!DOCTYPE html>
<html lang="fr">
    <head>
	<link href="css/global.css" rel="stylesheet" />
		<title>Magix, the copycating</title>
		<?php
			if($_SESSION['currentPage'] === "Login"){
				?>
				<script src="js/Login.js"></script>  
				<script src="js/particules.js"></script>
				<?php
				}
			elseif($_SESSION['currentPage'] === "Lobby"){
				?>
				<script src="js/Lobby.js"></script>  

			<?php
			}
			else{		
			?>
			 	
			<?php
			}	
			?>
		<meta charset="utf-8" />
    </head>
    <body>
		<div class="header">
				<div class="site-title-section">
					<h2>Magix, the copycating</h2>
				</div>
				<div class="username-section">
					Bonjour, <?= $data["username"] ?> !
				</div>
				<div class="clear"></div>

				<div class="menu">
					<ul>
						<li><a href="index.php">Accueil du site</a></li>
						<li><a href="login.php">Se connecter</a></li>
						<li><a href="blog.php">Guide Stratégique</a></li>
						<?php
							if ($data["isLoggedIn"]) {
								?>
								<li><a href="profile.php">Mon profil</a></li>
								<li><a href="?logout=true">Déconnexion</a></li>
								<?php
							}
						?>
					</ul>
				</div>
			</div>

		<div class="container">
