INSERT INTO departments (name)
VALUES 
('Management'),
('Sales'),
('Warehouse'),
('Human Resources'),
('Quality Control'),
('Office Management'),
('Accounting');

INSERT INTO roles (title, salary, department_id)
VALUES
('Regional Manager', 150000, 1),
('Sales Rep', 69000, 2),
('Warehouse Worker', 48500, 3),
('HR Rep', 75500, 4),
('Receptionist', 47000, 6),
('Accountant', 92000, 7);

INSERT INTO employees (first_name, last_name, role_id) 
VALUES
('Kevin', 'Scott', 1),
('Jamie', 'Delphine', 2),
('Carl', 'Senator', 3),
('Tyler', 'Christiansen', 3),
('Jeff', 'Barkley', 5),
('Sally', 'Pepperdine', 6);


-- UPDATE `employee_db`.`employees` SET `manager_id` = '1' WHERE (`id` > '1');