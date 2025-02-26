import { app } from "./app";
import { env } from "./env";

// Deve ser possivel criar um usuario
// Deve ser possivel identificar o usuario entre as requisicões
// Deve ser possivel registrar um refeição feita com as seguintes informações
/**
 *  Nome
 *  Descrição
 *  Data e hora
 *  Esta dentro ou não da dieta
 * 
 * 
 * Deve ser possivel editar uma refeição
 * Deve ser possivel deletar uma refeição
  Deve ser possivel visualizar uma unica refeição
  Deve ser possivel recuperar as metricas de um usuario
    - Quantidade total de refeições registradas
    - Quantidade total de refeições dentro da dieta
    - Quantidade total de refeições fora da dieta
    - Melhor sequencia de refeições dentro da dieta

  O usuario so pode visualizar, editar e apagar as refeições o qual ele criou

*/

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on port: ${env.PORT}`);
  })
  .catch((error) => {
    console.log("Error:", error);
  });
