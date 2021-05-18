<?php
	require_once("action/LobbyAction.php");

	// phpx = construit le squelette de la vue

	$action = new LobbyAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>
	<h1>Bienvenu au Lobby osti</h1>

	<p>Veux-tu jouer une tite game caliss ?</p>
	
	<div class="lobby-form-frame">
		<form action="lobby.php" method="post">
		<?php
				if (isset($data["msg"]) && $data["msg"] !== "" ) {
					?>
					<div class="error-div"><strong>Message : <?= $data["msg"] ?></div>
					<?php
				}
			?>
			<div class="form-input">
				<input type="submit" value="practice" name="practice" />
			</div>
			<div class="form-separator"></div>
			
			<div class="form-input">
				<input type="submit" value="play" name="play" />
			</div>
			
			<div class="form-separator"></div>
			<div class="form-separator"></div>
		
			<div class="form-input">
				<input type="submit" value="disconnect" name="disconnect" />
			</div>						
		</form> 
		
</div>
<iframe style="width:700px;height:240px;"
		onload="applyStyles(this)"
		src="https://magix.apps-de-cours.com/server/#/chat/<?= $data["token"]?>" >
</iframe>


<?php
	require_once("partial/footer.php");
