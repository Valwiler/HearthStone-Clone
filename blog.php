<?php
	require_once("action/BlogueAction.php");

	$action = new BlogueAction();
	$data = $action->execute();
	$results = $data['result'];
	$comments = $results['comments'];
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

	<?php
		 for($i = 0 ; $i <  count($comments) ; $i ++ ){
			$temp = $comments[$i];
	?>
		<div class ="post-div" <?= 'id="'.$temp['PostID'].'"' ;?> onclick="" >  
			<h1><?= $temp['Postdate'];?> -------- <?=  $temp['Username'] ;?></h1> <br> 
			<p><?= $temp['Comment'] ;?>  </p>
		 </div>	
		<br>	
		 <?php
		}
	?>
	
	

		<br>
		<br>
		<form action="blog.php" method="post">	
	<textarea id="blogue-text" name="blogue-text" rows="4" cols="50">
 		Entrez un commentaire
  	</textarea>
	<br>
	
<?php
	if ($data['isLoggedIn'] == true){
		?>
		<input type="submit" value="delete" name="delete" />
		<input type="submit" value="post" name="post" />
		<?php

	}
?>
	<input type="submit" value="reply" name="reply" />
	</form>
<?php

	require_once("partial/footer.php");
