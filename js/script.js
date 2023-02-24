export async function new_empresa(datos,empresa,img_preview){
 let option2 = 1;
 let imagen = img_preview;
 let json = { ...datos,empresa,option2 };
 let array = { ...datos,empresa,imagen,option2 };



   fetch('http://localhost/php/server.php', {
        method: 'POST',
        headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json'
        },
        body: JSON.stringify(array) ,
      }).then(function(res){
         console.log(res);
      }).then(function(data){
        console.log(data);
        view_empresas();
     })
}
export async function nuevo_empleado_dacesa(img_preview,empleado){
  
   let array ={
      option:1,
      nombre:empleado,
      imagen: img_preview
   }
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        }).then((response) => response.json())
        .then((data)=>{
          console.log(data);
       })
  }
  
  
  

export async function view_empresas(){
   return fetch('http://localhost/json/empresas.json')
   .then((response) => { 
       return response.json().then((data) => {
           
           return data;
       }).catch((err) => {
      }) 
   });

  }
  export async function view_empleados(){
   return fetch('http://localhost/json/data.json')
   .then((response) => { 
      console.log(response);
       return response.json().then((data) => {
           return data;
       }).catch((err) => {
       }) 
   });

  }

  export async function add_empleado_empresa(array){
  
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        })
  }

  export async function new_campo_empresa(new_campo,empresa){
   
   let array ={
      option7:1,
      empresa :empresa,
      campo:new_campo,
   }
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        })
  }
  
  export async function update_campo_empresa(after_campo,new_campo,empresa){

   let array ={
      option6:1,
      empresa :empresa,
      campo:after_campo,
      nuevo: new_campo
   }
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
       })
  }
  export async function delete_campo_empresa(delete_campo,empresa){

   let array ={
      option8:1,
      empresa:empresa,
      campo:delete_campo,
   }
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        })
  }
  export async function delete_user_empresa(user,empresa){

   let array ={
      option9:1,
      empresa:empresa,
   nombre:user
         }
     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        })
  }
  export async function update_user_empresa(array){

     fetch('http://localhost/php/server.php', {
          method: 'POST',
          headers: {
           'Accept': 'application/json',
           'Content-Type': 'application/json'
          },
          body: JSON.stringify(array) ,
        })
  }