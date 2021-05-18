<?php
	require_once("action/IndexAction.php");

	$action = new IndexAction();
	$data = $action->execute();

	require_once("partial/header.php");
?>

	<h1>Bienvenu sur Magix</h1>

	<p>Hey hey, ça sera pas long si t'es ici, tu devrai être rediriger !</p>
	<p>bienvenu dans l'index </p>

<?php
	require_once("partial/footer.php");
