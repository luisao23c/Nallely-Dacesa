import { new_empresa, view_empresas,nuevo_empleado_dacesa,view_empleados} from "./script.js";
let json = [];
let cont = 1;
let div_card = null;
let div_card_img = null;
let div_card_title = null;
let div_card_button = null;
let selector = 0;
let container = document.getElementById("container");
let cambio_text = document.getElementById("change");
let table = document.createElement("table");
    table.id="example";
cambio();
async function cambio(){
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
          "https://www.kraftwerk.at/app/uploads/fly-images/962/reference-img-worlds-of-adventure-park-4-1920x9999.jpg"; //key;
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        container.appendChild(div_card);
      }

      conteo2++;
    });
  });
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
        div_card_img.src =
          "https://www.kraftwerk.at/app/uploads/fly-images/962/reference-img-worlds-of-adventure-park-4-1920x9999.jpg"; //key;
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        container.appendChild(div_card);
      }

      conteo++;
    });
  });
}
function click_empresa(e){

    let info = e.getAttribute("data-info");
    info = JSON.parse(info);
    let dataset = [];
    let datos = [];
    info.forEach((element) => {
      Object.keys(element).map(function (key, index) {
        dataset.push(key);
      });

    })
    container.appendChild(table);
    $(document).ready(function () {
      $('#example').DataTable({
        'bSort': false,
          data: dataset,

      });
  });
  
}

async function create_empresa() {
  let empresa = null;
  Swal.fire({
    title: "Nueva Empresa",
    html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre de la empresa">`,
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
      new_empresa(datos_empresas, empresa);
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
      div_card_img.src =
      "https://www.kraftwerk.at/app/uploads/fly-images/962/reference-img-worlds-of-adventure-park-4-1920x9999.jpg"; //key;
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

async function create_empleado(){
  Swal.fire({
    title: "Nuevo Empleado",
    html: `<input type="text" id="empleado" class="swal2-input" placeholder="Nombre del empleado">`,
    confirmButtonText: "Registrar",
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let empleado = Swal.getPopup().querySelector("#empleado").value;
      if (!empleado) {
        Swal.showValidationMessage(`Por favor Ingresa un nombre `);
      } else {
        nuevo_empleado_dacesa(empleado);
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
      div_card_img.src =
      "https://www.kraftwerk.at/app/uploads/fly-images/962/reference-img-worlds-of-adventure-park-4-1920x9999.jpg"; //key;
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
