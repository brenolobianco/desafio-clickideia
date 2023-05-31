# desafio-clickideia BACKEND

### Como rodar a aplicação via docker:
1. Certifique ter o docker instalado na maquina
2. configure o .env corretamente, seguindo o .env exampple
3. rode docker compose up para subir os containers
4. Ao subir os container, as migrations ja sao feitas para o banco, juntamente com o seeder de usuario

### Como rodar a aplicação localmente:
1. run shell: composer install(instalar composer)
2. crie um novo Schema MySql
3. crie o arquivo .env(copie o .env.example)
4. configure suas variaveris do banco de dados no .env
5. run : php artisan migrate
6. run : php artisan db:seed
7. run : php artisan serve
## Observaçoes:

- Tive alguns problemas ao configurar o jwt, onde acabei perdendo mt tempo e se persistisse n conseguiria entregar o teste a tempo, nunca usei este metodo. Entao optei por utilizar o sanctum, do qual estou mais habituado. Criei  um seeder que popula as credencias de usuario no banco.

- A api pode apresentar certa lentidao ao rodar com o docker