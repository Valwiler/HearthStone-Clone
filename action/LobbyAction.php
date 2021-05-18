<?php
	require_once("action/CommonAction.php");

	class LobbyAction extends CommonAction {

		


		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_AUTHENTIFIED);
		}

		protected function executeAction() {
			$_success = ["JOINED_PVP","CREATED_PVP","JOINED_TRAINING"];
			$hasConnectionErrors = [] ; 
			$data['token'] = $_SESSION['key'];
			$_SESSION['currentPage'] = "Lobby";
			if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {

				if(isset($_POST['practice'])){
					self::pratice($data['token']);
				}
				elseif (isset($_POST['play'])){				
					self::play($data['token']);
				}
				elseif (isset($_POST['disconnect'])){	
					self::Deconnect($data['token']);
				}
				else{
					echo "Pas de bouton detecte";
				}
			}
			else{
				$data['message'];
			}

			//header('Location: lobby.php');
			return $data;	

		}

		public function pratice($key){			
			$data = [];
			$data['key'] = $key;
			$data["type"] = "TRAINING";
			$result = parent::callAPI("games/auto-match", $data,"STANDARD" );
			header('Location: game.php');		
			exit;
			
		}
		public function play($key){
			
			$data = [];
			$data['key'] = $key;
			$data["type"] = "PVP";
			$result = parent::callAPI("games/auto-match", $data,"STANDARD" );
			if($_success.includes($result)){
				header('Location: game.php');		
				exit;
			}
		}
		public function Deconnect($key){
			$data = [];
			$data['key'] = $key; 
			$result = parent::callAPI("signout", $data);
			echo $result;
			session_destroy();
			header('Location: login.php');
			exit;

		}
	}