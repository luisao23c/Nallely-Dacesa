<?php
function getdata()
{
    $file = file_get_contents("../json/data.json");
    return $file;
}
function saveuser($nombre)
{
    $file = file_get_contents("../json/data.json");
    $users = json_decode($file, true);
    $array = array(
        "nombre" => $nombre,
        "foto_" . $nombre => "..<",

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
        "foto_" . $empresa => "..<",
    );
    array_push($empresas, $array);
    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}
function savecamposmpresas($POST)
{
    $file = file_get_contents("../json/empresas.json");
    $empresas = json_decode($file, true);
    $myObj = new stdClass();

    foreach ($POST as $x => $val) {
        if ($x != "empresa" && $x != "option2") {
            $myObj->$val = null;
        }
    }
    $cont = count($empresas) - 1;
    $empresas[$cont] = array(
        $POST["empresa"] => [
            $myObj
        ],
        "foto_" . $POST["empresa"] => "..<",
    );





    $archive = fopen("../json/empresas.json", "w");
    fwrite($archive, json_encode($empresas));
    fclose($archive);
}

function getusers()
{
}
function getuser()
{
}
function getempresas()
{
    $file = file_get_contents("../json/empresas.json");
    return json_encode(["msg" => "no se puede debido a que ya tiene material o participo de alguna forma"]);
}
function getempresa()
{
}
