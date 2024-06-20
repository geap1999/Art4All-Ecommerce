# ART4All
Ecommerce for selling drawings. Made with python using the django framework and typescript using the react framework. Mysql was used for the database.

## --- Modèle Conceptuel des Données ---
![alt text](https://res.cloudinary.com/dafiqfkwf/image/upload/v1718873706/Capture_d_%C3%A9cran_2024-06-20_105446_z3k54u.png)

## --- Modèle Logique des Données ---
![alt text](https://res.cloudinary.com/dafiqfkwf/image/upload/v1718873787/Capture_d_%C3%A9cran_2024-06-20_105624_e2vr2v.png)

INSTRUCTIONS
1) Download Docker Desktop
2) Run: docker-compose up -d --build
3) To insert initial values in the DB, run: docker exec -i app_db mysql -u admin -padminpass app < {path}/init_data.sql
