import { new_empresa, view_empresas,nuevo_empleado_dacesa,view_empleados} from "./script.js";
let tablaDatos =null;
let json = [];
let cont = 1;
let div_card = null;
let div_card_img = null;
let div_card_title = null;
let div_card_button = null;
let selector = 0;
let container = document.getElementById("container");
let cambio_text = document.getElementById("change");
let img_preview = null;
let div_load = document.getElementById("load");

async function mostrar(){
  var archivo = document.getElementById("file").files[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo );
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
      img_preview = reader.result;
    }
  }
}
cambio();
async function cambio(){
  div_load.style.visibility = "visible";
  div_load.style.marginTop = "10rem";
  div_load.style.marginLeft="35rem";

  document.getElementById("espacio").style.marginTop = "0rem";
  selector ++;
  if(selector ==2){
    selector = 0;
  }
  if(selector ==0){
    container.innerHTML = "";
    cambio_text.textContent = "Ver Empresas";
    cambio_text.style.fontWeight = "bold";
    cambio_text.style.color = "#023";

    refresh_empledos_view();
  }
  if(selector ==1){
    container.innerHTML = "";
    cambio_text.textContent = "Ver Empleados";
    cambio_text.style.color = "blue";

    cambio_text.style.fontWeight = "bold";

    refresh_empresas_view();
  }
 
}

cambio_text.addEventListener("click", (event) => {cambio();})

let nueva_empresa = document.getElementById("create_empresa");
nueva_empresa.addEventListener("click", (event) => {
  create_empresa();
});
let nuevo_empleado = document.getElementById("create_empleado");
nuevo_empleado.addEventListener("click", (event) => {
  create_empleado();
});
 async function refresh_empledos_view() {
  container.innerHTML = "";
  let empleados = await view_empleados();
  empleados.forEach((element) => {
    let conteo2 = 0;
    
    div_card = document.createElement("div");
    div_card.classList.add("card");
    div_card.style.width = "15rem";
    div_card.style.marginLeft = "2.3rem";
    div_card.style.marginTop = "1.5rem";

    div_card_img = document.createElement("img");
    div_card_img.classList.add("card-img-top");
    div_card_title = document.createElement("h5");
    div_card_title.style.fontSize = "18px";
    div_card_title.classList.add("card-title");
    div_card_title.classList.add("text-center");
    div_card_button = document.createElement("a");
    div_card_button.classList.add("btn");
    div_card_button.classList.add("btn-primary");
    Object.keys(element).map(function (key,value) {

      if (conteo2 === 0) {
        div_card_title.textContent = element[key];
      }
      if (conteo2 === 1) {
        div_card_img.src =
        element[key];
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        container.appendChild(div_card);
      }

      conteo2++;
    });
  });
  div_load.style.visibility = "hidden";
  div_load.style.width = "0px";
  div_load.style.height = "0px";
  div_load.style.marginTop = "0rem";

}








export async function refresh_empresas_view() {
  
  container.innerHTML = "";
  let empresas = await view_empresas();
  empresas.forEach((element) => {
  
    let id_empresas =0;
    let conteo = 0;
    div_card = document.createElement("div");
    div_card.classList.add("card");
    div_card.style.width = "15rem";
    div_card.style.marginLeft = "2.3rem";
    div_card.style.marginTop = "1.5rem";

    div_card_img = document.createElement("img");
    div_card_img.classList.add("card-img-top");
    div_card_title = document.createElement("h5");
    div_card_title.style.fontSize = "18px";
    div_card_title.classList.add("card-title");
    div_card_title.classList.add("text-center");
    div_card_button = document.createElement("a");
    div_card_button.classList.add("btn");
    div_card_button.classList.add("btn-primary");
    Object.keys(element).map(function (key, index) {

      if (conteo === 0) {
        div_card_title.textContent = key;
        div_card_button.setAttribute("data-info",JSON.stringify( element[key]));
        div_card_button.onclick = function () {click_empresa(this)}
        
      
      }
      if (conteo === 1) {
        div_card_img.src =element[key];
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        container.appendChild(div_card);
      }

      conteo++;
    });
  });
  div_load.style.visibility = "hidden";
  div_load.style.width = "0px";
  div_load.style.height = "0px";
  div_load.style.marginTop = "0rem";

}
let div_inputs2 = document.createElement("div");
let input_file2 = document.createElement("input");
input_file2.type = "file";
input_file2.id = "file";
input_file2.accept = "image/*";
input_file2.classList.add("form-control");
input_file2.onchange = function(){
  mostrar()
}
let br2 = document.createElement("br");
let img2 = document.createElement("img");
img2.id = "img";

let input_text2 = document.createElement("input");
input_text2.type = "text";
input_text2.id = "name";
input_text2.classList.add("swal2-input");
input_text2.placeholder = "Nombre della empresa";
div_inputs2.appendChild(input_file2);
div_inputs2.appendChild(br2);
div_inputs2.appendChild(img2);
div_inputs2.appendChild(br2);
div_inputs2.appendChild(input_text2);

async function create_empresa() {
  let empresa = null;
  Swal.fire({
    title: "Nueva Empresa",
    html: div_inputs2,
    confirmButtonText: "Continuar",
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      empresa = Swal.getPopup().querySelector("#name").value;
      if (!empresa) {
        Swal.showValidationMessage(`Por favor Ingresa un nombre a la empresa`);
      } else {
        create_inputs(empresa);
      }
    },
  }).then((result) => {});
}
let div = document.createElement("div");
let input = document.createElement("input");
input.disabled = true;
input.id = "campos-input0";
input.type = "text";
input.style.marginTop = ".5rem";

input.classList.add("form-control");
input.value = "Nombre del Personal";
let button = document.createElement("button");
button.classList.add("btn");
button.classList.add("btn-danger");
button.textContent = "Nuevos Campos";
button.addEventListener("click", (e) => {
  new_inputs();
});
div.appendChild(button);
div.appendChild(input);
async function create_inputs(empresa) {
  let datos_empresas = ["false","Nombre del Personal",];
  let pasa = 0;
  Swal.fire({
    title: "Que Campos solicitaras?",
    confirmButtonText: "Registrar",
    html: div,
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      for (let i = 0; i < cont; i++) {
        let input = Swal.getPopup().querySelector("#campos-input" + i).value;
        datos_empresas.push(input);
        pasa =0;
        if (!input) {
          Swal.showValidationMessage(`Por favor llene todos los campos`);
          pasa = 1;
        }else{

          
        }
      }
     
     if (pasa ===0) {
      new_empresa(datos_empresas, empresa,img_preview);
      div_card = document.createElement("div");
      div_card.classList.add("card");
      div_card.style.width = "15rem";
      div_card.style.marginLeft = "2.3rem";
      div_card.style.marginTop = "1.5rem";
  
      div_card_img = document.createElement("img");
      div_card_img.classList.add("card-img-top");
      div_card_title = document.createElement("h5");
      div_card_title.style.fontSize = "18px";
      div_card_title.classList.add("card-title");
      div_card_title.classList.add("text-center");
      div_card_button = document.createElement("a");
      div_card_button.classList.add("btn");
      div_card_button.classList.add("btn-primary");
      div_card_title.textContent = empresa;
      div_card_img.src =img_preview;
    div_card_button.text = "Previsualizar";
    div_card.appendChild(div_card_img);
    div_card.appendChild(div_card_title);
    div_card.appendChild(div_card_button);
    if(selector ===1)
    container.appendChild(div_card);
    cont =1;
     }
    },
  });
}
async function new_inputs() {
  let div = document.getElementById("swal2-html-container");
  let input = document.createElement("input");
  input.type = "text";
  input.id = "campos-input" + cont;
  input.required;
  input.classList.add("form-control");
  input.style.marginTop = ".5rem";
  div.appendChild(input);
  cont++;
}
let div_inputs = document.createElement("div");
let input_file = document.createElement("input");
input_file.type = "file";
input_file.id = "file";
input_file.accept = "image/*";
input_file.classList.add("form-control");
input_file.onchange = function(){
  mostrar()
}
let br = document.createElement("br");
let img = document.createElement("img");
img.id = "img";

let input_text = document.createElement("input");
input_text.type = "text";
input_text.id = "empleado";
input_text.classList.add("swal2-input");
input_text.placeholder = "Nombre del empleado";
div_inputs.appendChild(input_file);
div_inputs.appendChild(br);
div_inputs.appendChild(img);
div_inputs.appendChild(br);
div_inputs.appendChild(input_text);

input_text.placeholder = "Nombre del empleado";
async function create_empleado(){
  Swal.fire({
    title: "Nuevo Empleado",
    html: div_inputs,
    confirmButtonText: "Registrar",
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let empleado = Swal.getPopup().querySelector("#empleado").value;
      if (!empleado) {
        Swal.showValidationMessage(`Por favor Ingresa un nombre `);
      } else {
        nuevo_empleado_dacesa(String(img_preview),empleado);
        div_card = document.createElement("div");
      div_card.classList.add("card");
      div_card.style.width = "15rem";
      div_card.style.marginLeft = "2.3rem";
      div_card.style.marginTop = "1.5rem";
  
      div_card_img = document.createElement("img");
      div_card_img.classList.add("card-img-top");
      div_card_title = document.createElement("h5");
      div_card_title.style.fontSize = "18px";
      div_card_title.classList.add("card-title");
      div_card_title.classList.add("text-center");
      div_card_button = document.createElement("a");
      div_card_button.classList.add("btn");
      div_card_button.classList.add("btn-primary");
      div_card_title.textContent = empleado;
      div_card_img.src =img_preview; //key;
    div_card_button.text = "Previsualizar";
    div_card.appendChild(div_card_img);
    div_card.appendChild(div_card_title);
    div_card.appendChild(div_card_button);
    if(selector ===0)
    container.appendChild(div_card);
      }
    },
  }).then((result) => {});
}
async function click_empresa(e){
  document.getElementById("espacio").style.marginTop = "2rem";
  container.innerHTML = "";
  let info = e.getAttribute("data-info");
  info = JSON.parse(info);
  var dataset = [];
  let datos = [];
  let titulos = [];
  info.forEach((element) => {
    let cont = 0;
    Object.keys(element).map(function (key, index) {
      dataset.push(key);
      let json = { "title": key, "targets": cont }
      titulos.push(json);
      cont ++;
    });

  })
  datos.push(dataset);
  console.log(JSON.stringify(datos));
   datos = [
    { "Nombre del Personal": 43447, "Fecha_inicio": "sin-imagen.jpg", "Caducidad": "APORT","Telefono":980890890 },
    { "Nombre del Personal": 43447, "Fecha_inicio": "NADA", "Caducidad": "NADA","Telefono":980890890 },
]


let columnas = [
    { "data": "Nombre del Personal" },
    { "data": "Fecha_inicio" },
    { "data": "Caducidad" },
    { "data": "Telefono" }
];

   tablaDatos = $('#example').DataTable({
    "pageLength": "25",
    "responsive": true,
    "columns": columnas,
    "columnDefs": titulos,
    "data": datos
});

}