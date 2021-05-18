<?php
	require_once("action/CommonAction.php");
	require_once("action/DAO/UserDAO.php");

	class BlogueAction extends CommonAction {

		public function __construct() {
			parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
		}

		protected function executeAction() {
			$_SESSION['currentPage'] = "Blogue";

			
			
			if ($_SERVER['REQUEST_METHOD'] == 'POST' ) {

				if(isset($_POST['post'])){
					if(isset($_POST['blogue-text']) && $_POST['blogue-text'] != " "){
					   UserDao::insertPost($_SESSION["username"], $_POST['blogue-text']);
					}
				}
				elseif (isset($_POST['delete'])){				
					self::deletePost();
				}
				elseif (isset($_POST['reply'])){	
					self::Deconnect($data['token']);
				}
				else{
					
				}
			}
			$result['comments'] = UserDao::getComments();

			return compact('result');
		}
	}