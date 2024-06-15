async function loadSample() {
    const selectedSample = document.getElementById("samplePrograms").value;
    const codeInput = document.getElementById("codeInput");
    if (selectedSample) {
        try {
            const response = await fetch(`samples/${selectedSample}.js`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const sampleCode = await response.text();
            codeInput.value = sampleCode;
        } catch (error) {
            console.error("Error fetching the sample code:", error);
            codeInput.value = "Error loading sample code.";
        }
    }
}

function runCode() {
    const code = document.getElementById("codeInput").value;
    const outputElement = document.getElementById("output");
    outputElement.textContent = ""; // Clear previous output

    // Save the original console.log
    const originalConsoleLog = console.log;

    // Override console.log
    console.log = (...args) => {
        // Convert all arguments to strings and concatenate them
        const output = args.map((arg) => (typeof arg === "object" ? JSON.stringify(arg) : String(arg))).join(" ");
        // Display the output in the outputElement and also add a newline for each call
        outputElement.textContent += output + "\n";
    };

    try {
        eval(code);
    } catch (e) {
        outputElement.textContent = "Error: " + e.message;
    } finally {
        // Restore the original console.log
        console.log = originalConsoleLog;
    }
}

function loadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            document.getElementById("codeInput").value = event.target.result;
        };
        reader.readAsText(file);
    } else {
        alert("No file selected");
    }
}
