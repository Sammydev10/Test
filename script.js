document.getElementById("score1-home").addEventListener("input", updateSUPLPick);
            document.getElementById("score1-away").addEventListener("input", updateSUPLPick);
            document.getElementById("score2-home").addEventListener("input", updateSUPLPick);
            document.getElementById("score2-away").addEventListener("input", updateSUPLPick);

            document.getElementById("predictionForm").addEventListener("submit", handleSubmit);
        });

        function generateRandomId() {
            return "T" + Math.floor(100000 + Math.random() * 900000);
        }

        function updateSUPLPick() {
            const home1 = parseInt(document.getElementById("score1-home").value) || 0;
            const away1 = parseInt(document.getElementById("score1-away").value) || 0;
            const supl1 = home1 > away1 ? "1" : home1 === away1 ? "X" : "2";
            document.getElementById("supl-output1").textContent = supl1;

            const home2 = parseInt(document.getElementById("score2-home").value) || 0;
            const away2 = parseInt(document.getElementById("score2-away").value) || 0;
            const supl2 = home2 > away2 ? "1" : home2 === away2 ? "X" : "2";
            document.getElementById("supl-output2").textContent = supl2;
        }

        function handleSubmit(event) {
            event.preventDefault();

            const username = document.getElementById("username").value;
            const email = document.getElementById("email").value;
            const ticket1 = document.getElementById("ticketId").textContent;
            const ticket2 = document.getElementById("ticketId2").textContent;
            const supl1 = document.getElementById("supl-output1").textContent;
            const supl2 = document.getElementById("supl-output2").textContent;

            const result = Username: ${username}\nEmail: ${email}\nTicket 1: ${ticket1} - SUPL Pick: ${supl1}\nTicket 2: ${ticket2} - SUPL Pick: ${supl2};
            alert(result);

            // Send data to Google Sheets
            const formData = new FormData();
            formData.append("Username", username);
            formData.append("Email", email);
            formData.append("Ticket 1", ticket1);
            formData.append("SUPL Pick 1", supl1);
            formData.append("Ticket 2", ticket2);
            formData.append("SUPL Pick 2", supl2);

            fetch("https://script.google.com/macros/s/AKfycbxRcCT_D6yrqdslhbTgAgVyYJHfsdnUTGSC9M15wV01vzy05IlAlXd4-JW98UScMM84/exec", {
                method: "POST",
                body: formData
            }).then(response => response.text()).then(data => console.log(data));
        }
        function fetchPredictions() {
            fetch("https://script.google.com/macros/s/AKfycbxRcCT_D6yrqdslhbTgAgVyYJHfsdnUTGSC9M15wV01vzy05IlAlXd4-JW98UScMM84/exec")
                .then(response => response.json())
                .then(data => {
                    const tableBody = document.getElementById("tableBody");
                    tableBody.innerHTML = "";

                    data.forEach(row => {
                        let tr = document.createElement("tr");
                        tr.innerHTML = `<td>${row.username}</td><td>${row.supl1}</td><td>${row.supl2}</td>`;
                        tableBody.appendChild(tr);
                    });
                })
                .catch(error => console.error("Error fetching data:", error));
        }

        fetchPredictions(); // Load data on page load
    </script>
</body>
</html>
