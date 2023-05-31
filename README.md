#  BACKEND

### Como rodar a aplicação via docker:
1. Certifique ter o docker instalado na maquina
2. configure o .env corretamente, seguindo o .env exampple
3. run: 'docker compose up' (para subir os containers) 
4. Ao subir os containers, as migrations ja sao feitas para o banco, juntamente com o seeder de usuario

### Como rodar a aplicação localmente:
1. run shell: composer install(instalar composer)
2. crie um novo Schema MySql
3. crie o arquivo .env(copie o .env.example)
4. configure suas variaveris do banco de dados no .env
5. run : php artisan migrate
6. run : php artisan db:seed
7. run : php artisan serve
## Observaçoes:

- Tive alguns problemas ao configurar o jwt, onde acabei perdendo muito tempo e se persistisse não conseguiria entregar o teste a tempo, nunca usei este metodo. Entao optei por utilizar o sanctum, do qual estou mais habituado. Criei  um seeder que popula as credencias de usuario no banco.

# FRONTEND

### Como rodar a aplicação via docker:
1. Certifique ter o docker instalado na maquina
3. rode docker compose up para subir os containers
4. certifique que o backend esteja funcional

### Como rodar a aplicação localmente:
1. instale as dependencias do projeto: npm install
2. inicie o servidor: npm start
3.  certifique que o backend esteja funcional


