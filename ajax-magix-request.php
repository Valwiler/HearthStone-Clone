<?php
    require_once("action/AjaxRequestAction.php");

    $action = new AjaxRequestAction();
    $data = $action->execute();

    echo json_encode($data["result"]);


?>
