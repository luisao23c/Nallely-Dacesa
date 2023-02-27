<?php
function getdata()
{
    $file = file_get_contents("../json/data.json");
    return $file;
}
function saveuser($nombre, $imagen)
{
    if(!file_exists("empleados")){
        mkdir("empleados",0777);
    }
    move_uploaded_file($_FILES["file"]["tmp_name"],"empleados/".$_FILES["file"]["name"]);

    $file = file_get_contents("../json/data.json");
    $users = json_decode($file, true);
    $array = array(
        "nombre" => $nombre,
        "foto" => "../php/empleados/".$_FILES["file"]["name"],

    );
    array_push($users, $array);
    $archive = fopen("../json/data.json", "w");
    fwrite($archive, json_encode($users));
    fclose($archive);
}

function savempresa($empresa)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);

    $array = array(
        $empresa => [],
    );
    array_push($empresas, $array);
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}
function savecamposmpresas($POST)
{ if(!file_exists("empresas")){
    mkdir("empresas",0777);
}
move_uploaded_file($_FILES["file"]["tmp_name"],"empresas/".$_FILES["file"]["name"]);

    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $myObj = new stdClass();
    
    foreach ($POST as $x => $val) {
        if ($x != "empresa" && $x != "option2" && $x != "imagen" && $val != "") {
            $myObj->$val = null;
        }
    }
    $cont = count($empresas) - 1;
    $empresas[$cont] = array(
        $POST["empresa"] => [
            $myObj
        ],
        "foto" => "../php/empresas/".$_FILES["file"]["name"],
    );



    

    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}
function update_empresa_campos($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    //$myObj = new stdClass();
    $cont = count($empresas);
    // foreach ($POST as $x => $val) {
    //   if ($x != "empresa" && $x != "option6" && $x != "imagen") {
    //     $myObj->$val = null;
    //}
    //}
    for ($i = 0; $i < $cont; $i++) {
        foreach ($empresas[$i] as  $x => $val) {
            if ($x === $POST["empresa"]) {
                for ($d = 0; $d < count($empresas[$i][$x]); $d++) {
                    $empresas[$i][$x][$d][$POST["nuevo"]] = $empresas[$i][$x][$d][$POST["campo"]];
                    unset($empresas[$i][$x][$d][$POST["campo"]]);
                }
            }
        }
    }
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}

function delete_campos_empresa($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    //$myObj = new stdClass();
    $cont = count($empresas);
    //foreach ($POST as $x => $val) {
    //  if ($x != "empresa" && $x != "option6" && $x != "imagen") {
    //    $myObj->$val = null;
    //}
    // }
    for ($i = 0; $i < $cont; $i++) {
        foreach ($empresas[$i] as  $x => $val) {
            if ($x === $POST["empresa"]) {
                for ($d = 0; $d < count($empresas[$i][$x]); $d++) {
                    unset($empresas[$i][$x][$d][$POST["campo"]]);
                }
            }
        }
    }
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}
function new_campos_empresa($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $cont = count($empresas);
    for ($i = 0; $i < $cont; $i++) {
        foreach ($empresas[$i] as  $x => $val) {
            if ($x === $POST["empresa"]) {
                for ($d = 0; $d < count($empresas[$i][$x]); $d++) {
                    $empresas[$i][$x][$d][$POST["campo"]] = null;
                }
            }
        }
    }
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}

function getempresas()
{
    $file = file_get_contents("../json/empresas.json");
    return json_encode(["msg" => "no se puede debido a que ya tiene material o participo de alguna forma"]);
}
function deleteuser($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $cont = count($empresas);
    for ($i = 0; $i < $cont; $i++) {
        foreach ($empresas[$i] as  $x => $val) {
            if ($x === $POST["empresa"]) {
                for ($d = 0; $d < count($empresas[$i][$x]); $d++) {
                    if ($empresas[$i][$x][$d]["Nombre del Personal"] == $POST["nombre"]) {
                        unset($empresas[$i][$x][$d]);
                    }
                }
            }
        }
    }
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}
function updateuser($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $myObj = new stdClass();
    $cont = count($empresas);
    for ($i = 0; $i < $cont; $i++) {
        foreach ($empresas[$i] as  $x => $val) {
            if ($x === $POST["empresa"]) {
                for ($d = 0; $d < count($empresas[$i][$x]); $d++) {
                    if ($empresas[$i][$x][$d]["Nombre del Personal"] == $POST["Nombre del Personal"]) {

                        foreach ($POST as $c => $val2) {
                            if ($c != "empresa" && $c != "option10" && $c != "imagen") {

                                $empresas[$i][$x][$d][$c] = $val2;
                                $archive = fopen("../json/empresas.json", "w");
                                fwrite($archive, json_encode($empresas));
                            }
                        }
                       
                    }
                }
            }
        }
    }
    fclose($archive);
}
