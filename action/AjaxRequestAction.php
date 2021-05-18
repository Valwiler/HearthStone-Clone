<?php
    require_once("action/CommonAction.php");

    class AjaxRequestAction extends CommonAction {

        public function __construct() {
            parent::__construct(CommonAction::$VISIBILITY_AUTHENTIFIED);
        }

        protected function executeAction() {
            $result ="";
            $action = "";
            $param = [];
            $key = $_SESSION['key'];
            // var_dump($_POST['uid']);
            if(isset($_POST)){
                $action = $_POST['actionName'];
                $uid = $_POST['uid'];
                $TargetUid = $_POST['targetuid'];
                
                switch($action){
                     case "HeroPower" : $result = self::send_request($key, "HERO_POWER", null, null);break;
                     case "EndOfTurn": $result = self::send_request($key, "END_TURN", null , null);break;
                     case "Attack": $result = self::send_request($key, "ATTACK" , $uid, $TargetUid);break;
                     case "Play": $result = self::send_request($key, "PLAY" , $uid , null);break;
                    }
            }
            
            return compact("result");
        }

       private function send_request($key, $action, $uid, $targetUID){
            $result = "";
            $data = [] ;
            $data['key'] = $key;
            $data['type'] = $action;
        
            if(isset($uid) && ($uid !== null  && $uid !== "null")){
                $data['uid'] = $uid;
                if(isset($targetUID) && ($targetUID !== null && $TargetUID !== "null")){
                    $data['targetuid'] = $targetUID;
                }
            }
            $result = parent::callAPI("games/action", $data );
            
            return $result;

       }
         
    }