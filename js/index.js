let json = [];
let cont = 0;
create_empresa();
async function create_empresa(){
    Swal.fire({
        title: 'Nueva Empresa',
        html: `<input type="text" id="name" class="swal2-input" placeholder="Nombre de la empresa">`,
        confirmButtonText: 'Continuar',
        focusConfirm: false,
        preConfirm: () => {
          const empresa = Swal.getPopup().querySelector('#name').value
          if (!empresa) {
            Swal.showValidationMessage(`Por favor Ingresa un nombre a la empresa`)
          }
          save_empresas(empresa);
        }
      }).then((result) => {
        create_inputs();
      })
}

async function create_inputs(){
    Swal.fire({
        title: 'Que Campos solicitaras?',
        confirmButtonText: 'Registrar',
        html: `<button class="btn btn-info" id="agregar" onclick='new_inputs()'>Nuevo Campo</button>`,
        focusConfirm: false,
        preConfirm: () => {
            for (let i = 0; i < cont; i++) {
                let input = Swal.getPopup().querySelector('#campos-input'+ i).value
                if (!input) {
                  Swal.showValidationMessage(`Por favor llene todos los campos`)
                }
              }
           
          }
      })
}
async function new_inputs(){
    
    let div = document.getElementById("swal2-html-container");
     let input = document.createElement("input");
     input.type = "text";
     input.id = "campos-input" + cont;
     input.required;
     input.classList.add("form-control");
     input.style.marginTop = ".5rem";
     div.appendChild(input);
     cont ++;
}
async function save_empresas(empresa){
json.push({empresa: empresa});
console.log(JSON.stringify(json));
}