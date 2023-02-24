<?php
header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Credentials: true');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS');
header("Access-Control-Allow-Headers: X-Requested-With");
header('Content-Type: text/html; charset=utf-8');
header('P3P: CP="IDC DSP COR CURa ADMa OUR IND PHY ONL COM STA"');

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
    $array = array( );
    for ($i = 0;  $i<$cont ;$i++){
     foreach ($empresas[$i] as  $x=>$val){
           if($x===$POST["empresa"]){
            foreach ($POST as $d => $val2) {

                if ($d != "empresa" && $d != "option4" && $d != "imagen") {
                        $myObj->$d = $val2;
               
                }
              

        
        }
        $empresas[$i][$x][] = $myObj;
     }
    } 
}
$archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}  
// aqui me quede devolver
if(isset ($POST["option5"])){
   $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $myObj = new stdClass();
    $cont = count($empresas);
    for ($i = 0;  $i<$cont ;$i++){
     foreach ($empresas[$i] as  $x=>$val){
           if($x===$POST["empresa"]){
         echo  json_encode(["data" =>$empresas[$i][$x] ]);
     }
    } 
}

}
if(isset ($POST["option6"])){

update_empresa_campos($POST);
}
if(isset ($POST["option7"])){

   new_campos_empresa($POST);
}
if(isset ($POST["option8"])){

   delete_campos_empresa($POST);
}
if(isset ($POST["option9"])){

   deleteuser($POST);
}
if(isset ($POST["option10"])){

   updateuser($POST);
}