
// This is the main JavaScript file for the Interactive Graphic Design project.

// Show the court by adding the .show class to the wrapper
function showCourt() {
	var el = document.querySelector('.court-image');
	if (!el) return;
	el.classList.add('show');
}

// Hide the court by removing the .show class
function hideCourt() {
	var el = document.querySelector('.court-image');
	if (!el) return;
	el.classList.remove('show');
}

// Add a close button to the court wrapper so users can hide it again
function ensureCloseButton() {
	var wrapper = document.querySelector('.court-image');
	if (!wrapper) return;
	if (wrapper.querySelector('.court-close')) return; // already added
	var btn = document.createElement('button');
	btn.className = 'court-close';
	btn.type = 'button';
	btn.innerText = 'Close';
	btn.addEventListener('click', function (ev) {
		ev.stopPropagation();
		hideCourt();
	});
	wrapper.appendChild(btn);
}

// Click handler: if user clicks any visible textual element, show the court
function handleDocumentClick(e) {
	var t = e.target;
	// Ignore clicks inside the court itself
	if (t.closest && t.closest('.court-image')) return;

	// Only respond to element nodes
	if (t.nodeType !== 1) return;

	// If the element has visible text, show the court
	var txt = (t.innerText || '').trim();
	if (txt.length > 0) {
		showCourt();
		ensureCloseButton();
	}
}



