-user
  -idUsuario
  -nombre
  -email
  -password
  -imageurl


-publicacion
  -idPublicacion
  -idUsuario
  -contenido
  -imageUrl
  -fecha

  -create
  -update pero que no pase de 30 min despues de crearse
  -delete
  -getAll
  -getOne

  -otro modulo de feed
  -getFeed: en base a los usuarios que sigues solamente, o sino los mas seguidos
  

-comentarios
  -idcomentario 
  -idPublicacion
  -idUsuario
  -contenido
  -fecha

  -create
  -update pero que no pase de 30 min despues de crearse
  -delete
  -getAll
  -getOne 



-likesPublicaciones
 -idLike
 -idUsuario
 -idPublicacion

 -create
 -delete


 
-likesComentarios
 -idLike
 -idUsuario
 -idComentario

-create
 -delete



-seguidores
  -idFollow
  -idUsuarioAseguir
  -idUsuarioSeguidor
 
  -create
 -delete



-configuracion de privacidad
  cosas de privacidad de usuario

  -create
  -update
  -delete
  -getAll 
  -getOne



  cambiar authadmin por authOwner?

  recuerda actualizar los tests

  hacer paginacion y limit para getAll 

  <!-- si separar en image en la interface  -->