

INSERT INTO employees (employeeID, name, surname, department, role, managerID, birthdate, salary, companyID, email, isActive, startDate)
VALUES
    -- Sales Department
    (1, 'John','Doe', 'Sales', 'Senior Manager', NULL, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "e0mail@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (2, 'Jane ','Smith', 'Sales', 'Manager', 1,(CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@add0ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year)),
    (3, 'Emily ','Jones', 'Sales', 'Deputy Manager', 2, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "0email@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (4, 'Michael ','Brown', 'Sales', 'Employee', 3, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "emai0l@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (5, 'Alice ','Green', 'Sales', 'Intern', 4, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@ad0d0ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (6, 'Tom ','Gray', 'Sales', 'Employee', 3, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@add0r0ess.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (7, 'Nina ','Patel', 'Sales', 'Intern', 4, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@add0ress0.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),

    -- HR Department
    (8, 'Chris ','White', 'HR', 'Senior Manager', NULL, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "ema11il@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (9, 'Patricia ','Miller', 'HR', 'Manager', 8, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@add1ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (10, 'Robert ','Wilson', 'HR', 'Deputy Manager', 9, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "ema1il@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (11, 'Mary ','Clark', 'HR', 'Employee', 10, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addre1ss.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (12, 'James ','Lewis', 'HR', 'Intern', 11, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addres1s.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (13, 'Sophia ','Roberts', 'HR', 'Employee', 10, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@a1ddress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (14, 'Alex ','Carter', 'HR', 'Intern', 11, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addres1s.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),

    -- IT Department
    (15, 'Linda ','Hall', 'IT', 'Senior Manager', NULL, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "2email@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (16, 'David ','Young', 'IT', 'Manager', 15, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@ad2dress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (17, 'Daniel ','King', 'IT', 'Deputy Manager', 16,(CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "em2ail@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (18, 'Sarah ','Baker', 'IT', 'Employee', 17, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@a2ddress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (19, 'Nancy ','Perez', 'IT', 'Intern', 18, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "e2mail@add2ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (20, 'Kevin ','Diaz', 'IT', 'Employee', 17, (CURRENT_DATE - INTERVAL((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "ema2il@add2ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (21, 'Laura ','Evans', 'IT', 'Intern', 18, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email2@add2ress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),

    -- Marketing Department
    (22, 'Alice ','King', 'Marketing', 'Senior Manager', NULL, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email3@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (23, 'Victor ','Gomez', 'Marketing', 'Manager', 22, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addres3s.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (24, 'Carlos ','Silva', 'Marketing', 'Deputy Manager', 23, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email3@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (25, 'Rebecca ','Lee', 'Marketing', 'Employee', 24, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day), round(RAND() * 300000, 2), 1, "email@addre3ss.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (26, 'Samuel ','Khan', 'Marketing', 'Intern', 25, (CURRENT_DATE - INTERVAL((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addre3ss.c3om", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (27, 'Sandra ','Gomez', 'Marketing', 'Employee', 24, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addre3ss.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (28, 'Ben ','Torres', 'Marketing', 'Intern', 25, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@address.c3om", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),

    -- Finance Department
    (29, 'William ','Turner', 'Finance', 'Senior Manager', NULL, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "4email@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (30, 'Jessica ','Johnson', 'Finance', 'Manager', 29, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@ad4dress.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (31, 'Olivia ','Thomas', 'Finance', 'Deputy Manager', 30, (CURRENT_DATE - INTERVAL((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "emai4l@address.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (32, 'George ','Lopez', 'Finance', 'Employee', 31, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addr4ess.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (33, 'Emma ','Hill', 'Finance', 'Intern', 32, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@address.c4om", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (34, 'Liam ','Scott', 'Finance', 'Employee', 31, (CURRENT_DATE - INTERVAL ((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@addres4s.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day)),
    (35, 'Evelyn ','Walker', 'Finance', 'Intern', 32, (CURRENT_DATE - INTERVAL((FLOOR(RAND() * 30) + 20 )*365)day),round(RAND() * 300000, 2), 1, "email@add4res4s.com", false,(CURRENT_DATE - INTERVAL (FLOOR(RAND() * 10))year - INTERVAL (FLOOR(RAND() * 365))day))




