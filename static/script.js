document.addEventListener("DOMContentLoaded", function () {
    function processText(action) {
        let text = document.getElementById("inputText").value;
        if (!text.trim()) {
            alert("Please enter some text.");
            return;
        }

        fetch("/process", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: text, action: action })
        })
        .then(response => response.json())
        .then(data => {
            if (data.result) {
                document.getElementById("outputText").value = data.result;
            } else {
                alert("Error: " + data.error);
            }
        })
        .catch(error => console.error("Error:", error));
    }

    document.querySelectorAll(".action-button").forEach(button => {
        button.addEventListener("click", function () {
            processText(this.getAttribute("data-action"));
        });
    });
});
