WITH RECURSIVE cte AS
(
  SELECT employeeID, name, 1 as LEVEL, department, role, concat(name, " ", surname) as PATH FROM employees WHERE managerID IS NULL
  UNION ALL
  SELECT c.employeeID, c.name, cte.LEVEL + 1 as LEVEL, c.department, c.role, concat(cte.PATH, " -> ",c.name, " ", c.surname) FROM employees c JOIN cte
  ON cte.employeeID=c.managerID 
)
SELECT name, level, department, role, PATH FROM cte order by department, level asc;