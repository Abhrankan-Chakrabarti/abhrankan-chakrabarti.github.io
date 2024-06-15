async function loadSample() {
    const selectedSample = document.getElementById('samplePrograms').value;
    if (selectedSample) {
        try {
            const response = await fetch(`samples/${selectedSample}.js`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const sampleCode = await response.text();
            editor.setValue(sampleCode);
        } catch (error) {
            console.error('Error fetching the sample code:', error);
            editor.setValue('Error loading sample code.');
        }
    }
}

function runCode() {
    const code = editor.getValue();
    const outputElement = document.getElementById('output');
    outputElement.textContent = ''; // Clear previous output
    
    // Save the original console.log
    const originalConsoleLog = console.log;

    // Override console.log
    console.log = (...args) => {
        // Convert all arguments to strings and concatenate them
        const output = args.map(arg => typeof arg === 'object' ? JSON.stringify(arg) : String(arg)).join(' ');
        // Display the output in the outputElement and also add a newline for each call
        outputElement.textContent += output + '\n';
    };

    try {
        eval(code);
    } catch (e) {
        outputElement.textContent = 'Error: ' + e.message;
    } finally {
        // Restore the original console.log
        console.log = originalConsoleLog;
    }
}

function save(string, type, file) {
    const text = eval(string);
    const blob = new Blob([text], { type: type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = file;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function loadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            editor.setValue(event.target.result);
        };
        reader.readAsText(file);
    } else {
        alert("No file selected");
    }
}

var editor = CodeMirror.fromTextArea(document.getElementById('codeInput'), {
    lineNumbers: true,
    mode: 'javascript',
    theme: 'base16-light',
});

function toggleEditorTheme() {
    const body = document.body;
    if (body.classList.contains("dark-theme")) {
        editor.setOption('theme', 'base16-dark');
    } else {
        editor.setOption('theme', 'base16-light');
    }
}