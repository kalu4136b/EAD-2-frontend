const apiUrl = "http://localhost:8080/api/orders";

        // Fetch and display orders
        function fetchOrders() {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    const tableBody = document.getElementById("ordersTable");
                    tableBody.innerHTML = "";
                    data.forEach(order => {
                        let row = `<tr>
                            <td>${order.id}</td>
                            <td>${order.customerName}</td>
                            <td>${order.customerAddress}</td>
                            <td>${order.orderAmount}</td>
                        </tr>`;
                        tableBody.innerHTML += row;
                    });
                })
                .catch(error => console.error("Error fetching orders:", error));
        }

        // Add new order
        document.getElementById("orderForm").addEventListener("submit", function(event) {
            event.preventDefault();

            const newOrder = {
                customerName: document.getElementById("customerName").value,
                customerAddress: document.getElementById("customerAddress").value,
                orderAmount: parseFloat(document.getElementById("orderAmount").value)
            };

            fetch(apiUrl, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newOrder)
            })
            .then(response => response.json())
            .then(() => {
                fetchOrders(); // Refresh orders after adding
                document.getElementById("orderForm").reset();
                alert("Success");
            })
            .catch(error => console.error("Error adding order:", error));
        });

        // Load orders on page load
        fetchOrders();