<?php
    require_once("action/CommonAction.php");

    class AjaxAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_PUBLIC);
        }

        protected function executeAction() {
            
            $_SESSION['currentPage'] = "Game";
            $data = [];
            $data['key'] = $_SESSION['key'];
            $result ="";
            $result =  parent::callAPI("games/state", $data);
            
            return compact("result");
        }


    }