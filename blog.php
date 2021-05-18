<?php
	require_once("action/BlogueAction.php");

	$action = new BlogueAction();
	$data = $action->execute();
	$data['poster'] = "";
	require_once("partial/header.php");
	if ($data['isLoggedIn'] == true){
		$data['poster'] == $_SESSION["username"];
	}
	else{
		$data['poster'] == "Invité";
	}

?>



	<h1>Guide stratégique du Jeu Magix</h1>
	
		

	<p>Bienvenue !</p>
	<textarea id="blogue-text" rows="4" cols="50">
 		Entrez un commentaire
  	</textarea>


<?php
	require_once("partial/footer.php");
