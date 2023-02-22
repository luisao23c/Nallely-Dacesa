<?php
header('Content-Type: application/json; charset=utf-8');
include_once("./methods.php");


   $POST = json_decode(file_get_contents("php://input"), true);
    
   if(isset ($POST["option"])){
      saveuser($POST["nombre"],$POST["imagen"]);
   }
   if(isset ($POST["option2"])){
      savempresa($POST["empresa"]);
      savecamposmpresas($POST);
}
if(isset ($POST["option3"])){
   getempresas();
}
if(isset ($POST["option4"])){
   $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $myObj = new stdClass();
    $cont = count($empresas);
    for ($i = 0;  $i<$cont ;$i++){
     foreach ($empresas[$i] as  $x=>$val){
           if($x===$POST["empresa"]){
            foreach ($POST as $d => $val2) {

                if ($d != "empresa" && $d != "option4" && $d != "imagen") {
                  $empresas[$i][$x][] = array(
                        $d=> $val2
                    );
                }
        
        
        }
     }
    } 
}
$archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}