async function convertMarkdown() {
    const markdown = document.getElementById("markdown").value;
    const convertBtn = document.getElementById("convert-btn");
    const outputDiv = document.getElementById("output");

    if (!markdown.trim()) {
        outputDiv.innerHTML = "";
        convertBtn.style.display = "block"; // Show button if input is cleared
        return;
    }

    const response = await fetch("http://localhost:5000/convert", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ markdown })
    });

    const data = await response.json();
    outputDiv.innerHTML = data.html;

    // Hide Convert button after conversion
    convertBtn.style.display = "none";
}

// Copy HTML to Clipboard
function copyHTML() {
    const outputHtml = document.getElementById("output").innerHTML;
    if (!outputHtml) return alert("No HTML to copy!");

    navigator.clipboard.writeText(outputHtml)
        .then(() => alert("HTML copied to clipboard!"))
        .catch(err => alert("Failed to copy: " + err));
}

// Download HTML as a file
function downloadHTML() {
    const outputHtml = document.getElementById("output").innerHTML;
    if (!outputHtml) return alert("No HTML to download!");

    const blob = new Blob([outputHtml], { type: "text/html" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "converted.html";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
}

// Attach event listeners after DOM is loaded
document.getElementById("convert-btn").addEventListener("click", convertMarkdown);
document.getElementById("copy-btn").addEventListener("click", copyHTML);
document.getElementById("download-btn").addEventListener("click", downloadHTML);