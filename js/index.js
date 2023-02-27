import {
  new_empresa,
  view_empresas,
  nuevo_empleado_dacesa,
  view_empleados,
  add_empleado_empresa,
  new_campo_empresa as create_campo_empresa,
  update_campo_empresa as rename_campo_empresa,
  delete_campo_empresa as remove_campo_empresa,
  update_user_empresa,
  delete_user_empresa,
} from "./script.js";
let total = 0;
let empleado_empresas = [];

let titulos = [];
let tablaDatos = null;
let json = [];
let cont = 2;
let div_card = null;
let div_card_img = null;
let div_card_title = null;
let div_card_button = null;
let selector = 0;
let container = document.getElementById("container");
let cambio_text = document.getElementById("change");
let img_preview = null;
let div_load = document.getElementById("load");
let archivo = null;
let foto_empresa = null;
let empresa_tabla = null;
async function mostrar() {
   archivo = document.getElementById("file").files[0];
   foto_empresa = $("#file").prop("files")[0];
  var reader = new FileReader();
  if (file) {
    reader.readAsDataURL(archivo);
    reader.onloadend = function () {
      document.getElementById("img").src = reader.result;
      img_preview = reader.result;
  
    };
  }
}
cambio();
async function cambio() {
  if (tablaDatos != null) {
  }
  div_load.style.visibility = "visible";
  div_load.style.marginTop = "10rem";
  div_load.style.marginLeft = "35rem";

  document.getElementById("espacio").style.marginTop = "0rem";
  selector++;
  if (selector == 2) {
    selector = 0;
  }
  if (selector == 0) {
    container.innerHTML = "";
    cambio_text.textContent = "Ver Empresas";
    cambio_text.style.fontWeight = "bold";
    cambio_text.style.color = "#023";

    refresh_empledos_view();
  }
  if (selector == 1) {
    container.innerHTML = "";
    cambio_text.textContent = "Ver Empleados";
    cambio_text.style.color = "blue";

    cambio_text.style.fontWeight = "bold";

    refresh_empresas_view();
  }
}

cambio_text.addEventListener("click", (event) => {
  cambio();
});

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
  if (!empleados) {
  } else {
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
   
      Object.keys(element).map(function (key, value) {
        if (conteo2 === 0) {
          div_card_title.textContent = element[key];
          div_card_button.onclick = function() {
            search_user(element[key])
          }
        }
        if (conteo2 === 1) {
          div_card_img.src = element[key];
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
}
export async function search_user(empleado){
  empleado_empresas =[];
  container.innerHTML ="";
  let buscador = 0;
  let empresas = await view_empresas();
  empresas.forEach((element) => {
    let cont = 0;
    Object.keys(element).map(function (key, index) {
      if(cont == 0){
         element[key].forEach((elements) =>{
          
          if(elements["Nombre del Personal"] == empleado){
            empleado_empresas.push(key);
            

          }
         })
      }
      cont ++;

    })
  });
  let div_row = document.createElement("div");
  div_row.classList.add("row");
  let col_1 = document.createElement("div");
  let col_2 = document.createElement("div");
  col_1.classList.add("col-4");
  col_2.classList.add("col-4");
  div_row.appendChild(col_1);
  div_row.appendChild(col_2);
  container.appendChild(div_row);
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
  
  div_card_title.textContent = empleado;
  div_card_img.src ="";
  div_card.appendChild(div_card_img);
  div_card.appendChild(div_card_title);
  col_1.appendChild(div_card);
  let empleados = await view_empleados();
  empleados.forEach((element) => {
    Object.keys(element).map(function (key, index) {
        if(element[key] == empleado)
         div_card_img.src =element["foto"];


    })
  });
  let ul = document.createElement("ul");
  ul.style.marginTop = "3rem";
  ul.classList.add("list-group");
  let title = document.createElement("il");
  title.textContent = "Cursos tomados";
  title.classList.add("list-group-item");
  title.style.fontSize = "bold";
  title.style.color = "#black";
  ul.appendChild(title);


  
  empleado_empresas.forEach((element )=> {
   let il = document.createElement("il");
   il.classList.add("list-group-item");
   il.textContent = element;
   ul.appendChild(il);
    
  })
  col_2.appendChild(ul);
  cambio_text.textContent = "Ver Empleados";
  cambio_text.style.color = "blue";

  cambio_text.style.fontWeight = "bold";
  selector =1;
}

export async function refresh_empresas_view() {
  container.innerHTML = "";
  let empresas = await view_empresas();
  empresas.forEach((element) => {
    let id_empresas = 0;
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
        div_card_button.setAttribute("data-info", key);
        div_card_button.onclick = function () {
          click_empresa(key);
        };
      }
      if (conteo === 1) {
        div_card_img.src = element[key];
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
let form2 = document.createElement("form");
form2.setAttribute("enctype", "multipart/form-data");
form2.id ="foto";
let div_inputs2 = document.createElement("div");
let input_file2 = document.createElement("input");
input_file2.type = "file";
input_file2.id = "file";
input_file2.accept = "image/*";
input_file2.classList.add("form-control");
input_file2.onchange = function () {
  mostrar();
};
let br2 = document.createElement("br");
let img2 = document.createElement("img");
img2.id = "img";

let input_text2 = document.createElement("input");
input_text2.type = "text";
input_text2.id = "name";
input_text2.classList.add("swal2-input");
input_text2.placeholder = "Nombre della empresa";
form2.appendChild(input_file2);
div_inputs2.appendChild(form2);
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
let date = document.createElement("input");
date.classList.add("form-control");
date.value = "Fecha de Induccion";
date.disabled = true;
date.id = "campos-input1";
date.style.marginTop =".5rem";
button.addEventListener("click", (e) => {
  new_inputs();
});
div.appendChild(button);
div.appendChild(input);
div.appendChild(date);
async function create_inputs(empresa) {
  let datos_empresas = [];
  Swal.fire({
    title: "Que Campos solicitaras?",
    confirmButtonText: "Registrar",
    html: div,
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let pasa = 0;
      for (let i = 0; i < cont; i++) {
        let input = Swal.getPopup().querySelector("#campos-input" + i).value;
        datos_empresas.push(input);
        if (!input) {
          Swal.showValidationMessage(`Por favor llene todos los campos`);
          pasa = 1;
        } else {
        }
      }

      if (pasa === 0) {
         let form_data = new FormData();
         datos_empresas.forEach((element) => {
          form_data.append(element, element);

        });
         form_data.append("file", foto_empresa);
         form_data.append("empresa",empresa);
         form_data.append("option2",1);
        
          new_empresa(form_data);

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
        div_card_button.setAttribute("data-info", empresa);
        div_card_button.onclick = function () {
          click_empresa(empresa);
        };
        div_card_title.textContent = empresa;
        div_card_img.src = img_preview;
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        if (selector === 1) container.appendChild(div_card);
        cont = 1;
        
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
let form = document.createElement("form");
form.setAttribute("enctype", "multipart/form-data");
form.id = "foto";
let div_inputs = document.createElement("div");
let input_file = document.createElement("input");
input_file.type = "file";
input_file.id = "file";
input_file.accept = "image/*";
input_file.classList.add("form-control");
input_file.onchange = function () {
  mostrar();
};
let br = document.createElement("br");
let img = document.createElement("img");
img.id = "img";

let input_text = document.createElement("input");
input_text.type = "text";
input_text.id = "empleado";
input_text.classList.add("swal2-input");
input_text.placeholder = "Nombre del empleado";
form.appendChild(input_file);
div_inputs.appendChild(form);
div_inputs.appendChild(br);
div_inputs.appendChild(img);
div_inputs.appendChild(br);
div_inputs.appendChild(input_text);

input_text.placeholder = "Nombre del empleado";
async function create_empleado() {
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
        let foto_empleado = $("#file").prop("files")[0];
        let form_data = new FormData();
        form_data.append("file", foto_empleado);
        form_data.append("nombre", empleado);
        form_data.append("option",1);
         nuevo_empleado_dacesa(form_data);
       
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
        div_card_img.src = img_preview; //key;
        div_card_button.text = "Previsualizar";
        div_card.appendChild(div_card_img);
        div_card.appendChild(div_card_title);
        div_card.appendChild(div_card_button);
        if (selector === 0) container.appendChild(div_card);
      }
    },
  }).then((result) => {});
}
async function click_empresa(empresa) {
  empresa_tabla = empresa;
  let Nombres = [];
  titulos = [];
  let title  = [];
  let datos = [];
  cambio_text.textContent = "Ver Empresas";
  cambio_text.style.fontWeight = "bold";
  cambio_text.style.color = "#023";
  selector = 0;
  let div_row = document.createElement("div");
  div_row.classList.add("row");
  let col_1 = document.createElement("div");
  let col_2 = document.createElement("div");
  let col_3 = document.createElement("div");
  let col_4 = document.createElement("div");
  let col_5 = document.createElement("div");
  col_1.classList.add("col-2");
  col_2.classList.add("col-2");
  col_3.classList.add("col-2");
  col_4.classList.add("col-2");
  col_5.classList.add("col-2");
  let button_remove = document.createElement("button");
  let button_add = document.createElement("button");
  let button_update = document.createElement("button");
  let button = document.createElement("button");
  let button_reporte = document.createElement("button");
  button_remove.classList.add("btn");
  button_remove.classList.add("btn-danger");
  button_add.classList.add("btn");
  button_add.classList.add("btn-info");
  button_add.onclick = function() {
    new_campo_empresa(empresa);
  }
  button_reporte.textContent = "Generar reporte";
  button_reporte.classList.add("btn");
  button_reporte.classList.add("btn-success");
  button_update.classList.add("btn");
  button_update.classList.add("btn-warning");
  button_reporte.onclick = function() {reporte_empresa()}
  button_remove.textContent = "Eliminar Campo";
  button_add.textContent = "Agregar Campo";
  button_update.textContent = "Actualizar Campo";
  button.textContent= "Agregar";
  button.classList.add("btn");
  button.classList.add("btn-info");
  col_1.appendChild(button_add);
  col_2.appendChild(button_update);
  col_3.appendChild(button_remove);
  col_4.appendChild(button);
  col_5.appendChild(button_reporte);
  div_row.appendChild(col_1);
  div_row.appendChild(col_2);
  div_row.appendChild(col_3);
  div_row.appendChild(col_4);
  div_row.appendChild(col_5);
  div_row.style.marginBottom = "1rem";
  let table = document.createElement("table");
  table.id = "example";
  table.classList.add("display");
  table.style.width = "100%";
  document.getElementById("espacio").style.marginTop = "2rem";
  container.innerHTML = "";
  container.appendChild(div_row);
  container.appendChild(table);
  if (tablaDatos != null) {
    tablaDatos.clear().destroy();
    tablaDatos = null;
  }
  let array = {
    option5: 1,
    empresa: empresa,
  };
  fetch("http://localhost/php/server.php", {
    method: "POST",

    body: JSON.stringify(array),
  }).then((data) => {
    return data.json().then((data) => {
      let columnas = [];
        let cont = 0;
        data.data.forEach((element) => {
          if (cont < 1) {
            let conteo_p = 0;
            Object.keys(element).map(function (key, index) {
              let json = { title: key, targets: conteo_p };
              let json_title = key;
              let json_columnas = { data: key };
              titulos.push(json);
              title.push(json_title);
              columnas.push(json_columnas);
              conteo_p++; 
            });
            let json = { title: "Acciones", targets: conteo_p };
            let json_columnas = {"render": function () {
              return '<button type="button" role="editar" id="ButtonEditar" class="editar edit-modal btn btn-warning botonEditar"><span class="fa fa-edit"></span><span class="hidden-xs"> Editar</span></button> <button type="button" id="ButtonEditar" role="eliminar" class="editar edit-modal btn btn-danger botonEditar"><span class="fa fa-edit"></span><span class="hidden-xs"> Eliminar</span></button>';
          }};
          titulos.push(json);
          columnas.push(json_columnas);
          }
          if(cont>0){
            Nombres.push(element["Nombre del Personal"]);
            datos.push(element);
          }

          cont++;
          total = Nombres.length;

          button.onclick = function() {
            new_campo(title,empresa,Nombres);
          };
        });
        button_update.onclick = function(){
          update_campo_empresa (title,empresa);
        };
        button_remove.onclick = function(){
          delete_campo_empresa(title,empresa);
        };


        tablaDatos = $("#example").DataTable({
          pageLength: "25",
          responsive: true,
          columns: columnas,
          columnDefs: titulos,
          data: datos,
          dom: 'Bfrtip',
          buttons: [
              'copy', 'csv', 'excel', 'pdf'
          ],
          language: {
            "decimal": "",
            "emptyTable": "No hay información",
            "info": "Mostrando _START_ a _END_ de _TOTAL_ Documentos",
            "infoEmpty": "Mostrando 0 to 0 of 0 Documentos",
            "infoFiltered": "(Filtrado de _MAX_ total entradas)",
            "infoPostFix": "",
            "thousands": ",",
            "lengthMenu": "Mostrar _MENU_ Documentos",
            "loadingRecords": "Cargando...",
            "processing": "Procesando...",
            "search": "Buscar:",
            "zeroRecords": "Sin resultados encontrados",
            "paginate": {
                "first": "Primero",
                "last": "Ultimo",
                "next": "Siguiente",
                "previous": "Anterior"
              }
              },
              
          initComplete: function() {
            $(document).on("click", "button[role='editar']", function() {
              let obj ={
                option10:1,
                empresa:empresa,
              };
                let data = tablaDatos.row($(this).parents('tr')).data();
                let div_update = document.createElement('div');
                let cont_id=2;
                let keys =[];
                let cont_rules = 0;
                Object.keys(data).map(function (element, index) {
                  keys.push(element);
                  obj[element] = data[element];
                  if(cont_rules > 1){
                    let p = document.createElement('p');
                    p.textContent = element;
                    p.classList.add('text-center');
                    p.style.marginBottom = ".3rem";
                    let div_input = document.createElement('input');
                    div_input.type = 'text';
                    div_input.value = data[element];
                    div_input.classList.add('form-control');
                    div_input.id = "element"+ cont_id;
                    div_input.style.marginBottom = ".5rem";
                    div_update.appendChild(p);
                    div_update.appendChild(div_input);
                    cont_id++;
                  }
                  cont_rules ++;
                  
              
                });
                 Swal.fire({
                  
                  title: "Actualizar Informacion",
                  confirmButtonText: "Actualizar ",
                  html: div_update,
                  focusConfirm: false,
                  showCloseButton: true,
                  preConfirm: () => {
                    let pasa = 0;
                    for (let i = 2; i < cont_id; i++) {
                      let input = Swal.getPopup().querySelector("#element" + i).value;
                        obj[keys[i]] = input;
                      if (!input) {
                        pasa =1; 
                        Swal.showValidationMessage(`Por favor llene todos los campos`);
                      } else {
                      }
                    }
                    
                    if (pasa == 0) {
                      update_user_empresa(obj);
                      click_empresa(empresa);
                    }
                    
                  },
                });

              
            });
            $(document).on("click", "button[role='eliminar']", function() {
              var data = tablaDatos.row($(this).parents('tr')).data();
              delete_user_empresa(data["Nombre del Personal"],empresa);
              click_empresa(empresa);
          });
        },
        });
      })
      .catch((err) => {});
  });

}




export  async function new_campo(title,empresa,Nombres) {
  let empleados =  await view_empleados();
  let div = document.createElement("div");
 let array_inputs =[];
 let cont = 0;
 let obj = { 
  };
  let diferenciar_input =0;
  title.forEach((element) => {
    if(diferenciar_input == 0){
      let br = document.createElement("br");
      let select = document.createElement("select");
    select.classList.add("form-select");
    let p = document.createElement("p");
    p.classList.add("text-left");
    p.textContent = "Nombre del personal";
    select.id = "id"+ cont;
      empleados.forEach((empleado) => {
        let cont_nombre =0;
        Object.keys(empleado).map(function (key, value) {
          let pasa = 0;
          if(cont_nombre == 0){
            Nombres.forEach((nombre) => {
                if(empleado[key] == nombre){
                  pasa = 1;
                }
            })
         
             if (pasa == 0){
              let option = document.createElement("option");
              option.value = empleado[key];
              option.textContent =empleado[key];
              select.appendChild(option);
            }
            cont_nombre = 1;
          }else{cont_nombre = 0}
         
      })
      });
      div.appendChild(p);
    div.appendChild(select);
    cont ++; 
  }
  else  if(diferenciar_input == 1){
    let br = document.createElement("br");
    let input_date = document.createElement("input");
    let p = document.createElement("p");
    p.classList.add("text-right");
    p.textContent = "Fecha de Induccion";
    input_date.type = "date";
    input_date.style.width = "450px";
    input_date.style.height = "40px";
    input_date.id = "id"+ cont;
    input_date.style.marginBottom ="1.4rem";
    div.appendChild(br);
    div.appendChild(p);
    div.appendChild(input_date);

  cont ++; 
}
    else {
      let br = document.createElement("br");
    let input = document.createElement("input");
    input.type = "text";
    input.classList.add("form-control");
    input.placeholder = "ingresa el "+ element;
    input.id = "id"+ cont;
    cont ++;
    div.appendChild(input);
    div.appendChild(br);
    }
    diferenciar_input ++;
  });
  Swal.fire({
    
    title: "Nuevo empleado que tomara el curso",
    confirmButtonText: "Registrar",
    html: div,
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let pasa = 0;
      for (let i = 0; i < cont; i++) {
        let input = Swal.getPopup().querySelector("#id" + i).value;
          obj[title[i]] = input;
        if (!input) {
          pasa =1; 
          Swal.showValidationMessage(`Por favor llene todos los campos`);
        } else {
        }
      }
      obj["empresa"] = empresa;
      obj["option4"] = 1;
      if (pasa == 0) {
         add_empleado_empresa(obj);
        click_empresa(empresa);
      }
      
    },
  });
}

async function new_campo_empresa (empresa){
  Swal.fire({
    
    title: "Nuevo Campo en la tabla",
    confirmButtonText: "Agregar",
    html: '<input type="text" id="nuevo_campo" class="form-control" placeholder="Ingresa el Nuevo Campo">',
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
        let nuevo_campo = Swal.getPopup().querySelector("#nuevo_campo").value;
        if (!nuevo_campo) {
          Swal.showValidationMessage(`Por favor Ingresa el NuevoCampo`);
        } else {
          create_campo_empresa(nuevo_campo,empresa);
          click_empresa(empresa);
        }
      }
  });
}
async function update_campo_empresa (titulos,empresa){
  let div = document.createElement("div");
  let selected = document.createElement("select");
  selected.id = "campo";
  let cont_campos =0;
   titulos.forEach(titulo => {
    if(cont_campos >1){
      let option = document.createElement("option");
      option.value = titulo;
      option.textContent = titulo;
      selected.appendChild(option);
    }
    cont_campos ++;
   })
  let input = document.createElement("input");
  input.type = "text";
  input.id = "nuevo_campo";
  input.placeholder = "Ingresa el Nuevo Campo";
  input.classList.add("form-control");
  let p = document.createElement("p");
  p.textContent = "Campo a Remplazar";
  selected.classList.add("form-control");
  selected.style.marginBottom = ".5rem";
  div.appendChild(p);
  div.appendChild(selected);
  div.appendChild(input);
  Swal.fire({
    
    title: "Actualizar Campo",
    confirmButtonText: "Agregar",
    html: div,
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let campo = Swal.getPopup().querySelector("#campo").value;
        let nuevo_campo = Swal.getPopup().querySelector("#nuevo_campo").value;
        if (!nuevo_campo || !campo) {
          Swal.showValidationMessage(`Por favor Ingresa el NuevoCampo`);
        } else {
          rename_campo_empresa(campo,nuevo_campo,empresa);
          click_empresa(empresa);
        }
      }
  });
}

async function delete_campo_empresa (titulos,empresa){
  let div = document.createElement("div");
  let selected = document.createElement("select");
  selected.id = "campo";
  let cont_campos =0;
   titulos.forEach(titulo => {
    if(cont_campos >1){
      let option = document.createElement("option");
      option.value = titulo;
      option.textContent = titulo;
      selected.appendChild(option);
    }
    cont_campos ++;
   })

  let p = document.createElement("p");
  p.textContent = "Campo a Eliminar";
  selected.classList.add("form-control");
  selected.style.marginBottom = ".5rem";
  div.appendChild(p);
  div.appendChild(selected);
  Swal.fire({
    
    title: "Campo a Eliminar",
    confirmButtonText: "Eliminar",
    html: div,
    focusConfirm: false,
    showCloseButton: true,
    preConfirm: () => {
      let campo = Swal.getPopup().querySelector("#campo").value;
        if (!campo) {
          Swal.showValidationMessage(`Seleccion un Campo`);
        } else {
          remove_campo_empresa(campo,empresa);
          click_empresa(empresa);
          }
      }
  });
}
 async function reporte_empresa(){
  let array_nombres = [];
  let name = null;
  let activos = $('#example tr').length -1;
  container.innerHTML = "";
  let canvas = document.createElement("canvas");
  let div = document.createElement("div");
  div.style.maxWidth= "400px";
  div.style.maxHeight="400px";
  div.appendChild(canvas);
  container.appendChild(div);
  let inactivos = total - activos;

  
  new Chart(canvas, {
    type: 'bar',
    data: {
      labels: ['Inactivos', 'Activos'],
      datasets: [{
        label:  empresa_tabla,
        data: [inactivos, activos],        
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    }
  });
}