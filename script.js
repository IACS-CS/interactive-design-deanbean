
// AI-generated code starts here
// Simplified, beginner-friendly script to make on-page text open the court image.
// Uses simple DOM APIs: querySelector, querySelectorAll, addEventListener, classList.

// Note for students: use `querySelectorAll(selector)` to pick the text items
// you want to make clickable. We then add click and keyboard handlers to each.

// Small helper: return the court wrapper and its <img> element.
function getCourtElements() {
	var wrapper = document.querySelector('.court-image');
	if (!wrapper) return { wrapper: null, img: null };
	var img = wrapper.querySelector('img');
	return { wrapper: wrapper, img: img };
}

// Show the court. Optionally set a new image source and alt text first.
function showCourt(src, alt) {
	var parts = getCourtElements();
	if (!parts.wrapper) return;
	if (parts.img && src) {
		parts.img.src = src;
	}
	if (parts.img && typeof alt === 'string') {
		parts.img.alt = alt;
	}
	parts.wrapper.classList.add('show');
}

// Hide the court.
function hideCourt() {
	var parts = getCourtElements();
	if (!parts.wrapper) return;
	parts.wrapper.classList.remove('show');
}

// Add a simple Close button inside the court so keyboard users can close it.
function ensureCloseButton() {
	var parts = getCourtElements();
	var wrapper = parts.wrapper;
	if (!wrapper) return;
	// If we've already added the button, do nothing.
	if (wrapper.querySelector('.court-close')) return;
	var btn = document.createElement('button');
	btn.className = 'court-close';
	btn.type = 'button';
	btn.innerText = 'Close';
	btn.addEventListener('click', function (ev) {
		ev.stopPropagation();
		hideCourt();
	});
	// Make sure it is keyboard accessible
	btn.addEventListener('keydown', function (ev) {
		if (ev.key === 'Enter' || ev.key === ' ') {
			ev.preventDefault();
			hideCourt();
		}
	});
	wrapper.appendChild(btn);
}

// Attach handlers to specific text elements instead of listening globally.
// This is simpler for beginners to understand and avoids catching unrelated clicks.
document.addEventListener('DOMContentLoaded', function () {
	var parts = getCourtElements();

	// If there's no court on the page, stop now.
	if (!parts.wrapper || !parts.img) return;

	// Ensure the close button exists so users can hide the court.
	ensureCloseButton();

	// Choose which text elements should act like buttons.
	// You can change this selector to be more specific if you like.
	var selector = 'h1,h2,h3,h4,h5,h6,p,li,span';
	var nodes = document.querySelectorAll(selector);

	for (var i = 0; i < nodes.length; i++) {
		var el = nodes[i];
		// Skip anything inside the court itself.
		if (el.closest && el.closest('.court-image')) continue;
		// Skip empty text nodes or elements with no visible text.
		var text = (el.innerText || '').trim();
		if (!text) continue;

		// If element is not a link, make it keyboard-focusable and announce as a button.
		if (el.tagName.toLowerCase() !== 'a') {
			el.setAttribute('role', 'button');
			el.setAttribute('tabindex', '0');
		}

		// Click handler: show court. If the element has a position class, show that position's diagram.
		el.addEventListener('click', function (ev) {
			var target = ev.currentTarget;
			// If the element has a `data-court` attribute, use that filename.
			var data = target.getAttribute('data-court');
			if (data) {
				showCourt(data, target.getAttribute('data-alt') || 'Court diagram');
			} else if (target.classList && target.classList.contains('pg')) {
				showCourt('basketballcourtPG.png', 'Point Guard court diagram');
			} else if (target.classList && target.classList.contains('sg')) {
				showCourt('basketballcourtSG.png', 'Shooting Guard court diagram');
			} else if (target.classList && target.classList.contains('sf')) {
				showCourt('basketballcourtSF.png', 'Small Forward court diagram');
			} else if (target.classList && target.classList.contains('pf')) {
				showCourt('basketballcourtPF.png', 'Power Forward court diagram');
			} else if (target.classList && target.classList.contains('c')) {
				showCourt('basketballcourtC.png', 'Center court diagram');
			} else {
				// default image
				showCourt('basketballcourt.png', 'Basketball court diagram showing court lines and markings');
			}
			// After showing, move focus to the close button so keyboard users can close.
			var cb = parts.wrapper.querySelector('.court-close');
			if (cb) cb.focus();
		});

		// Keyboard activation: Enter or Space acts like a click.
		el.addEventListener('keydown', function (ev) {
			if (ev.key === 'Enter' || ev.key === ' ') {
				ev.preventDefault();
				ev.currentTarget.click();
			}
		});
	}

	// Global keyboard: Escape hides the court.
	document.addEventListener('keydown', function (ev) {
		if (ev.key === 'Escape') hideCourt();
	});
});






