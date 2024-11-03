# Checklist for test-order-controller

| № | Scenario name                                             | Status |
|---|-----------------------------------------------------------|--------|
| 1 | GET order: returns order with correct order ID            |        |
| 2 | POST order: create order with correct data                |        |
| 3 | GET order: returns 400 status code with icorrect order ID |        |
| 4 | POST order: returns 400 status code with incorrect data   |        |
| 5 | PUT order: update order successfully with correct data    |        |
| 6 | PUT order: returns 400 status code with incorrect data    |        |
| 7 | DELETE order: delete order successfully with correct data |        |
| 8 | DELETE order: returns 400 status code with incorrect data |        |

# Checklist for loan

 № | Scenario name                                             |Status |
|---|-----------------------------------------------------------|-------|
| 1 | POST loan: returns 200 status code with law risk          |       |
| 2 | POST loan: returns 200 status code with medium risk       |       |
| 3 | POST loan: returns 200 status code with high risk         |       |
| 4 | POST loan: returns 200 status code with negative decision |       |
| 5 | POST loan: returns 400 status code with negative debt     |       |