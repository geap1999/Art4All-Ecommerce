INSERT INTO users (firstname, lastname, email, username, password, address, admin, created_at, updated_at) VALUES 
('Kentucky', 'Chicken', 'ken@gmail.com', 'Kami', '$2a$12$hDf5TN0GCsjo/KPTAz1AUuev7551qpH4CyJiOEJ45.TnOiEA0X3jK', 'Sky', TRUE, NOW(), NOW()),
('John', 'Doe', 'john@gmail.com', 'johndoe', '$2a$12$DGIFpjxsQ272fRX26LV7iOzRsaF4UOFzXAu8jVjozGy8lfH95wM8m', 'Paris', FALSE, NOW(), NOW()),
('Jane', 'Doe', 'jane@gmail.com', 'janedoe', '$2a$12$QDzrBfmYcsSMg/Tyx//DreGgJ0h3Hw2RqJuuNOYyGEhv4.dwHa6z.', 'Paris', FALSE, NOW(), NOW());

INSERT INTO products (name, description, image, price, created_at, updated_at) VALUES
('Luffy vs Naruto', 'Drawing of Luffy vs Naruto', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718005538/openart-image_pYUBSOTk_1715708490112_raw_uofyun.png', 20, NOW(), NOW()),
('Luffy vs Goku', 'Drawing of Luffy vs Goku', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718005539/openart-image_OchpNo1__1715708551199_raw_hiqzp9.png', 23, NOW(), NOW()),
('SSJ3 Goku', 'Drawing of SSJ3 Goku', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718005539/openart-image_K7eGsRmf_1715708606929_raw_gluwho.png', 24, NOW(), NOW()),
('Totoro', 'Drawing of Totoro', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1717763304/openart-image_4YAkinoa_1715708681215_raw_gjei6q.png', 30, NOW(), NOW()),
('Anime boy', 'Drawing of an anime boy', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718192838/openart-image_EV_m2GJC_1718192767036_raw_cdlrfq.png', 3, NOW(), NOW()),
('Anime girl vs titan', 'Drawing of aot', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718193206/openart-image_2_bVf7vK_1718192927005_raw_ndrtpn.png', 3, NOW(), NOW()),
('Cyberpunk girl #1', 'Drawing of a girl in cyberpunk setting #1', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718193207/output_1742049655_0_ader2u.jpg', 24, NOW(), NOW()),
('Cyberpunk girl #2', 'Drawing of a girl in cyberpunk setting #2', 'https://res.cloudinary.com/dafiqfkwf/image/upload/v1718193207/output_1742049655_1_bj9ebr.jpg', 30, NOW(), NOW());


INSERT INTO orders (user_id, valid, quantity, total_price, status, created_at, updated_at) VALUES 
(1, FALSE, 0, 0, 'Cart', NOW(), NOW()),
(2, True, 1, 20, 'To be expedited', NOW(), NOW()),
(2, FALSE, 0, 0, 'Cart', NOW(), NOW()),
(3, TRUE, 2, 43, 'To be expedited', NOW(), NOW()),
(3, FALSE, 0, 0, 'Cart', NOW(), NOW());

INSERT INTO order_products (order_id, product_id, quantity) VALUES 
(2, 1, 1),
(4, 1, 1),
(4, 2, 1);
