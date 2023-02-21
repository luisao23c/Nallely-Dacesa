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
        }).then(function(res){
           console.log(res);
        }).then(function(data){
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
       return response.json().then((data) => {
           console.log(data);
           
           return data;
       }).catch((err) => {
       }) 
   });

  }