# ART4All
Ecommerce for selling drawings. Made with python using the django framework and typescript using the react framework (+ Tailwind). Mysql was used for the database and images were stored on Cloudinary.

## --- Modèle Conceptuel des Données ---
![alt text](https://res.cloudinary.com/dafiqfkwf/image/upload/v1718973588/Capture_d_%C3%A9cran_2024-06-21_143908_powmrj.png)

## --- Modèle Logique des Données ---
![alt text](https://res.cloudinary.com/dafiqfkwf/image/upload/v1719234803/Capture_d_%C3%A9cran_2024-06-24_151312_nxpji4.png)

INSTRUCTIONS
1) Install VSCode
2) Git clone this repository
3) Download Docker Desktop and install Docker extension on VSCode
4) Run: docker-compose up -d --build => manage containers on Docker Desktop
5) To insert initial values in the DB, run: docker exec -i app_db mysql -u admin -padminpass app < {path}/init_data.sql
