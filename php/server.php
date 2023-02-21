<?php
header('Content-Type: application/json; charset=utf-8');
include_once("./methods.php");


   $POST = json_decode(file_get_contents("php://input"), true);
    
   if(isset ($POST["option"])){
      saveuser($POST["nombre"]);
   }
   if(isset ($POST["option2"])){
      savempresa($POST["empresa"]);
      savecamposmpresas($POST);
}
if(isset ($POST["option3"])){
   getempresas();
}
