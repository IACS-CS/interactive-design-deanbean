
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
function showCourt(src, alt, desc) {
	var parts = getCourtElements();
	if (!parts.wrapper) return;
	if (parts.img && src) {
		parts.img.src = src;
	}
	if (parts.img && typeof alt === 'string') {
		parts.img.alt = alt;
	}
	// Update caption/description under the image if present (caption now lives outside the image wrapper)
	var caption = document.querySelector('.court-caption');
	if (caption) {
		caption.textContent = desc || '';
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
// Attach handlers to the real menu buttons and left-column buttons only.
document.addEventListener('DOMContentLoaded', function () {
	var parts = getCourtElements();
	if (!parts.wrapper) return;

	// Preload helper: load images into memory so clicks show instantly.
	function preloadImages(list) {
		for (var j = 0; j < list.length; j++) {
			try {
				var im = new Image();
				im.src = list[j];
			} catch (err) {
				console.warn('Preload failed for', list[j], err);
			}
		}
	}

	// Build list of images to preload: start with common files and add any data-court values found on buttons.
	var preloadList = [
		'basketballcourt.png',
		'basketballcourtPG.png',
		'basketballcourtSG.png',
		'basketballcourtSF.png',
		'basketballcourtPF.png',
		'basketballcourtC.png',
		'offensivebasketballcourt.png',
		// defensive file has an existing typo in repo; include both names so load succeeds regardless
		'defensivebasketballcourt.png',
		'defensivebaketballcourt.png'
	];
	// Add any data-court attributes from buttons to the preload list
	var btnsForPre = document.querySelectorAll('button.menu-btn, .court-left button');
	for (var bi = 0; bi < btnsForPre.length; bi++) {
		var v = btnsForPre[bi].getAttribute('data-court');
		if (v && preloadList.indexOf(v) === -1) preloadList.push(v);
	}
	preloadImages(preloadList);

	// Ensure a single <img> exists inside the wrapper for swapping sources.
	if (!parts.img) {
		var created = document.createElement('img');
		created.alt = 'Basketball court diagram';
		parts.wrapper.appendChild(created);
		parts = getCourtElements();
	}

	// Add basic onerror fallback so a mistyped filename won't leave the user confused.
	if (parts.img) {
		parts.img.addEventListener('error', function () {
			var src = parts.img.getAttribute('src') || '';
			// Try the known typo filename for defensive image if the correct name was used.
			if (src.indexOf('defensivebasketballcourt.png') !== -1) {
				parts.img.src = 'defensivebaketballcourt.png';
			} else {
				console.warn('Image failed to load:', src);
			}
		});
	}

	ensureCloseButton();

	// Select the explicit menu buttons and any left-column buttons (we added these in HTML).
	var buttons = document.querySelectorAll('button.menu-btn, .court-left button');

	for (var i = 0; i < buttons.length; i++) {
		(function (btn) {
			btn.addEventListener('click', function (ev) {
				ev.preventDefault();
				// Use data-court when present (preferred).
				var file = btn.getAttribute('data-court');
				var alt = btn.getAttribute('data-alt') || btn.innerText || 'Court diagram';

				// description: prefer explicit data-desc, otherwise supply a short text per button class
				var desc = btn.getAttribute('data-desc') || '';

				// Fallback mapping by class name if no data-court provided.
				if (!file) {
					if (btn.classList.contains('pg')) {
						file = 'basketballcourtPG.png';
						if (!desc) desc = 'Point Guard (PG) typically handles the ball, directs the offense, and creates scoring opportunities.';
					} else if (btn.classList.contains('sg')) {
						file = 'basketballcourtSG.png';
						if (!desc) desc = 'Shooting Guard (SG) is usually a strong shooter and secondary ball-handler.';
					} else if (btn.classList.contains('sf')) {
						file = 'basketballcourtSF.png';
						if (!desc) desc = 'Small Forward (SF) is versatile — can score, defend, and rebound.';
					} else if (btn.classList.contains('pf')) {
						file = 'basketballcourtPF.png';
						if (!desc) desc = 'Power Forward (PF) plays near the basket, rebounds, and defends the paint.';
					} else if (btn.classList.contains('c')) {
						file = 'basketballcourtC.png';
						if (!desc) desc = 'Center (C) anchors the defense, blocks shots, and scores near the rim.';
					} else if (btn.classList.contains('offensivecourt')) {
						file = 'offensivebasketballcourt.png';
						if (!desc) desc = 'Offensive court highlights areas used for scoring, including the three-point line and the paint.';
					} else if (btn.classList.contains('defensivecourt')) {
						file = 'defensivebasketballcourt.png';
						if (!desc) desc = 'Defensive court focuses on positioning and areas to prevent the opponent from scoring.';
					} else {
						file = 'basketballcourt.png';
					}
				}

				showCourt(file, alt, desc);
				var cb = parts.wrapper.querySelector('.court-close');
				if (cb) cb.focus();
			});

			// Buttons already handle keyboard (Enter/Space), but keep a handler in case of non-button elements.
			btn.addEventListener('keydown', function (ev) {
				if (ev.key === 'Enter' || ev.key === ' ') {
					ev.preventDefault();
					btn.click();
				}
			});
		})(buttons[i]);
	}

	// Allow Escape to hide the court.
	document.addEventListener('keydown', function (ev) {
		if (ev.key === 'Escape') hideCourt();
	});
});






