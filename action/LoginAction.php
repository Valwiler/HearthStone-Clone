<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/UserDAO.php");

	class LoginAction extends CommonAction {
		// phpc / phpx

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$hasConnectionError = false;
			$data = [];
			$_SESSION['currentPage'] = "Login"; 
			if (isset($_POST["username"])) {
				
				$data["username"] = $_POST["username"];
				$data["password"] = $_POST["pwd"];
				
				$result = parent::callAPI("signin", $data);

				if ($result == "INVALID_USERNAME_PASSWORD") {
					$hasConnectionError = true;
					//var_dump($result);
				}
				else {
					// Pour voir les informations retournées : var_dump($result);exit;
					$key = $result->key;
					$_SESSION['username'] = $data['username'];
					$_SESSION['key'] =  $key;
					$_SESSION["visibility"] = CommonAction::$VISIBILITY_AUTHENTIFIED;
					header('Location: lobby.php');
					exit;
				
					}

			}
			if(isset($_POST["username"]) && !isset($_SESSION["username"])) {
				$hasConnectionError = true;
			}
				return compact("hasConnectionError");
			}

			
		}
	
