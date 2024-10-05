// Get the paragraph element
const text = document.getElementById('text');

// Add event listeners to each group of radio buttons
document.querySelectorAll('input[type="radio"]').forEach(radio => {
    radio.addEventListener('change', applyStyles);
});

// Function to apply styles dynamically
function applyStyles() {
    // Font Family
    const fontFamily = document.querySelector('input[name="fontFamily"]:checked').value;
    text.style.fontFamily = fontFamily;

    // Text Align
    const textAlign = document.querySelector('input[name="textAlign"]:checked').value;
    text.style.textAlign = textAlign;

    // Line Height
    const lineHeight = document.querySelector('input[name="lineHeight"]:checked').value;
    text.style.lineHeight = lineHeight;

    // Letter Spacing
    const letterSpacing = document.querySelector('input[name="letterSpacing"]:checked').value;
    text.style.letterSpacing = letterSpacing;

    // Text Indent
    const textIndent = document.querySelector('input[name="textIndent"]:checked').value;
    text.style.textIndent = textIndent;

    // Text Transform
    const textTransform = document.querySelector('input[name="textTransform"]:checked').value;
    text.style.textTransform = textTransform;

    // Text Decoration
    const textDecoration = document.querySelector('input[name="textDecoration"]:checked').value;
    text.style.textDecoration = textDecoration;

    // Text Border
    const textBorder = document.querySelector('input[name="textBorder"]:checked').value;
    text.style.borderStyle = textBorder;

    // Border Color
    const borderColor = document.querySelector('input[name="borderColor"]:checked').value;
    text.style.borderColor = borderColor;
}
