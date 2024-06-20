/* DROP DATABASE IF EXISTS app;
CREATE DATABASE IF NOT EXISTS app;
USE app;

-- Table structure for table `users`

CREATE TABLE `users` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(20) NOT NULL,
    `lastname` VARCHAR(20) NOT NULL,
    `email` VARCHAR(100) NOT NULL,
    `username` VARCHAR(20) NOT NULL,
    `password` TEXT NOT NULL,
    `address` TEXT,
    `admin` BOOLEAN NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO users (firstname, lastname, email, username, password, address, admin) VALUES 
('Kentucky', 'Chicken', 'ken@gmail.com', 'Kami', '$2a$12$hDf5TN0GCsjo/KPTAz1AUuev7551qpH4CyJiOEJ45.TnOiEA0X3jK', 'Sky', TRUE),
('John', 'Doe', 'john@gmail.com', 'johndoe', '$2a$12$DGIFpjxsQ272fRX26LV7iOzRsaF4UOFzXAu8jVjozGy8lfH95wM8m', 'Paris', FALSE),
('Jane', 'Doe', 'jane@gmail.com', 'janedoe', '$2a$12$QDzrBfmYcsSMg/Tyx//DreGgJ0h3Hw2RqJuuNOYyGEhv4.dwHa6z.', 'Paris', FALSE);


-- Table structure for table `products`

CREATE TABLE `products` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `name` VARCHAR(70) NOT NULL,
    `description` TEXT NOT NULL,
    `image` TEXT NOT NULL,
    `price` INT(11) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id)
);

INSERT INTO products (name, description, image, price) VALUES
('Luffy vs Naruto', 'Drawing of Luffy vs Naruto', 'https://image.noelshack.com/fichiers/2024/20/2/1715708767-openart-image-pyubsotk-1715708490112-raw.png', 20),
('Luffy vs Goku', 'Drawing of Luffy vs Goku', 'https://image.noelshack.com/fichiers/2024/20/2/1715708774-openart-image-ochpno1-1715708551199-raw.jpg', 23),
('SSJ3 Goku', 'Drawing of SSJ3 Goku', 'https://image.noelshack.com/fichiers/2024/20/2/1715708780-openart-image-k7egsrmf-1715708606929-raw.jpg', 24),
('Totoro', 'Drawing of Totoro', 'https://image.noelshack.com/fichiers/2024/20/2/1715708788-openart-image-4yakinoa-1715708681215-raw.jpg', 30);


-- Table structure for table `cart`

CREATE TABLE `cart` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NULL, 
    `valid` BOOLEAN,
    `quantity` INT(11) NOT NULL,
    `total_price` INT(11) NOT NULL,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`)
);

INSERT INTO cart (user_id, valid, quantity, total_price) VALUES 
(1, FALSE, 0, 0),
(2, True, 1, 20),
(2, FALSE, 0, 0),
(3, TRUE, 2, 43),
(3, FALSE, 0, 0);

-- Table structure for table `cart_products`

CREATE TABLE `cart_products` (
    `cart_id` INT(11), 
    `product_id` INT(11),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (cart_id, product_id),
    FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`),
    FOREIGN KEY (`product_id`) REFERENCES `products`(`id`)
);

INSERT INTO cart_products (cart_id, product_id) VALUES 
(2, 1),
(4, 1),
(4, 2);

-- Table structure for table `orders`

CREATE TABLE `orders` (
    `id` INT(11) NOT NULL AUTO_INCREMENT,
    `user_id` INT(11) NULL, 
    `cart_id` INT(11),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    FOREIGN KEY (`user_id`) REFERENCES `users`(`id`),
    FOREIGN KEY (`cart_id`) REFERENCES `cart`(`id`)
);

INSERT INTO orders (user_id, cart_id) VALUES 
(2, 2),
(3, 4); */
