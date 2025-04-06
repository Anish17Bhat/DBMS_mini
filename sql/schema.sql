-- Create database
CREATE DATABASE IF NOT EXISTS vacation_booking;
USE vacation_booking;


DROP TABLE IF EXISTS booking_review;
DROP TABLE IF EXISTS review;
DROP TABLE IF EXISTS booking;
DROP TABLE IF EXISTS property;
DROP TABLE IF EXISTS users;


-- Users Table
CREATE TABLE IF NOT EXISTS users (
  user_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100),
  email VARCHAR(100) UNIQUE NOT NULL,
  phone VARCHAR(20),
  password VARCHAR(255) NOT NULL,
  role ENUM('guest', 'host') NOT NULL
);

-- Property Table
CREATE TABLE IF NOT EXISTS property (
  property_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,  -- Refers to host
  title VARCHAR(255),
  description TEXT,
  location VARCHAR(255),
  price DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
);

-- Booking Table
CREATE TABLE IF NOT EXISTS booking (
  booking_id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,  -- Refers to guest
  property_id INT NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  total_amt DECIMAL(10,2),
  FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
  FOREIGN KEY (property_id) REFERENCES property(property_id) ON DELETE CASCADE
);

-- Review Table
CREATE TABLE IF NOT EXISTS review (
  review_id INT AUTO_INCREMENT PRIMARY KEY,
  rating INT CHECK (rating BETWEEN 1 AND 5),
  comment TEXT
);

-- Booking_Review Table
CREATE TABLE IF NOT EXISTS booking_review (
  booking_id INT NOT NULL,
  review_id INT NOT NULL,
  date DATE NOT NULL,
  PRIMARY KEY (booking_id, review_id),
  FOREIGN KEY (booking_id) REFERENCES booking(booking_id) ON DELETE CASCADE,
  FOREIGN KEY (review_id) REFERENCES review(review_id) ON DELETE CASCADE
);
