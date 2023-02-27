export async function new_empresa(form_data){
   $.ajax({
      type: 'POST',
      url:"http://localhost/php/server.php",
      dataType: 'json',
      contentType:false,
      processData:false,
      data:form_data,
   });

}
export async function nuevo_empleado_dacesa(array){
   $.ajax({
      type: 'POST',
      url:"http://localhost/php/server.php",
      dataType: 'json',
      contentType:false,
      processData:false,
      data:array,
   });
   

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