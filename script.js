// AI-generated code starts here
// Student prompt was: Refactor script.js to extract helper functions and merge DOMContentLoaded blocks
// This refactored script organizes code into reusable functions for better maintainability.

// ============================================
// HELPER FUNCTIONS (extracted from repeated code)
// ============================================

// Helper: Get the court wrapper and its <img> element
function getCourtElements() {
  var wrapper = document.querySelector('.court-image');
  if (!wrapper) return { wrapper: null, img: null };
  var img = wrapper.querySelector('img');
  return { wrapper: wrapper, img: img };
}

// Helper: Check if a button is a "rules" button (no image, just text)
function isRuleButton(btn) {
  return btn.classList.contains('foulrules') ||
         btn.classList.contains('techrules') ||
         btn.classList.contains('positionrules') ||
         btn.classList.contains('miscrules');
}

// Helper: Activate a button and deactivate all others
function activateButton(btn) {
  var allButtons = document.querySelectorAll('.court-left button');
  // Remove 'active' class from all buttons
  for (var i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove('active');
  }
  // Add 'active' class to the clicked button
  btn.classList.add('active');
}

// Helper: Make the title bounce once
function applyTitleBounce() {
  var title = document.querySelector('h1');
  if (title) {
    title.classList.remove('bounce-once');
    title.offsetHeight; // force reflow to restart animation
    title.classList.add('bounce-once');
    setTimeout(function() {
      title.classList.remove('bounce-once');
    }, 1400); // matches CSS animation duration
  }
}

// Helper: Show only the description text (for rule buttons with no image)
function showDescriptionOnly(desc) {
  var caption = document.querySelector('.court-caption');
  if (caption) {
    caption.textContent = desc || '';
  }
  var parts = getCourtElements();
  if (parts.wrapper) {
    parts.wrapper.classList.remove('show');
  }
  var descBox = document.querySelector('.court-desc');
  if (descBox) {
    descBox.style.display = 'block';
  }
}

// Helper: Show the court image with description
function showImageMode(file, desc) {
  var parts = getCourtElements();
  if (!parts.wrapper) return;

  var descBox = document.querySelector('.court-desc');
  if (descBox) {
    descBox.style.display = 'block';
    try {
      descBox.style.animation = 'none';
      descBox.offsetHeight; // force reflow
      descBox.style.animation = '';
    } catch (e) { /* non-fatal */ }
  }

  if (parts.img && file) {
    try {
      parts.img.style.animation = 'none';
      parts.img.offsetHeight;
      parts.img.style.animation = '';
    } catch (e) { /* non-fatal */ }
    parts.img.src = file;
    parts.img.alt = desc || 'Court diagram';
  }

  var caption = document.querySelector('.court-caption');
  if (caption) {
    caption.textContent = desc || '';
  }
  parts.wrapper.classList.add('show');
}

// Helper: Hide the court image
function hideCourt() {
  var parts = getCourtElements();
  if (!parts.wrapper) return;
  parts.wrapper.classList.remove('show');
}

// Helper: Add a close button to the court image
function ensureCloseButton() {
  var parts = getCourtElements();
  var wrapper = parts.wrapper;
  if (!wrapper) return;
  if (wrapper.querySelector('.court-close')) return; // already exists

  var btn = document.createElement('button');
  btn.className = 'court-close';
  btn.type = 'button';
  btn.innerText = 'Close';
  btn.addEventListener('click', function (ev) {
    ev.stopPropagation();
    hideCourt();
  });
  btn.addEventListener('keydown', function (ev) {
    if (ev.key === 'Enter' || ev.key === ' ') {
      ev.preventDefault();
      hideCourt();
    }
  });
  wrapper.appendChild(btn);
}

// Helper: Get the image file path based on button attributes/classes
function getImageFile(btn) {
  var file = btn.getAttribute('data-court');
  if (file) return file; // prefer explicit data-court attribute

  // Fallback: determine file based on class names
  if (btn.classList.contains('pg')) return 'basketballcourtPG.png';
  if (btn.classList.contains('sg')) return 'basketballcourtSG.png';
  if (btn.classList.contains('sf')) return 'basketballcourtSF.png';
  if (btn.classList.contains('pf')) return 'basketballcourtPF.png';
  if (btn.classList.contains('c')) return 'basketballcourtC.png';
  if (btn.classList.contains('offensivecourt')) return 'offensivebasketballcourt.png';
  if (btn.classList.contains('defensivecourt')) return 'defensivebasketballcourt.png';
  return 'basketballcourt.png'; // default
}

// ============================================
// DROPDOWN SETUP (supports hover AND click for mobile)
// ============================================

function setupDropdowns() {
  var menuGroups = document.querySelectorAll('.menu-group');

  for (var i = 0; i < menuGroups.length; i++) {
    (function(group) {
      var toggle = group.querySelector('.dropdown-toggle');
      if (!toggle) return;

      var targetId = toggle.getAttribute('data-target');
      var targetContent = document.getElementById(targetId);
      if (!targetContent) return;

      // HOVER support (for desktop)
      group.addEventListener('mouseover', function () {
        targetContent.classList.add('show');
      });
      group.addEventListener('mouseout', function () {
        targetContent.classList.remove('show');
      });

      // CLICK support (for mobile/touch devices)
      toggle.addEventListener('click', function (ev) {
        ev.preventDefault();
        targetContent.classList.toggle('show');
      });
    })(menuGroups[i]);
  }
}

// ============================================
// BUTTON CLICK HANDLER (unified logic for all buttons)
// ============================================

function handleButtonClick(btn) {
  activateButton(btn); // highlight this button
  applyTitleBounce();  // make the title bounce

  var desc = btn.getAttribute('data-desc') || '';

  // If it's a rule button, show only the description
  if (isRuleButton(btn)) {
    showDescriptionOnly(desc);
    return;
  }

  // Otherwise, show the court image with description
  var file = getImageFile(btn);
  showImageMode(file, desc);

  // Focus the close button for accessibility
  var parts = getCourtElements();
  var closeBtn = parts.wrapper.querySelector('.court-close');
  if (closeBtn) closeBtn.focus();
}

// ============================================
// MAIN INITIALIZATION (single DOMContentLoaded block)
// ============================================

document.addEventListener('DOMContentLoaded', function () {
  var parts = getCourtElements();
  if (!parts.wrapper) return;

  // Ensure image element exists
  if (!parts.img) {
    var created = document.createElement('img');
    created.alt = 'Basketball court diagram';
    parts.wrapper.appendChild(created);
    parts = getCourtElements();
  }

  // Handle image load errors (defensive typo fallback)
  if (parts.img) {
    parts.img.addEventListener('error', function () {
      var src = parts.img.getAttribute('src') || '';
      if (src.indexOf('defensivebasketballcourt.png') !== -1) {
        parts.img.src = 'defensivebaketballcourt.png';
      } else {
        console.warn('Image failed to load:', src);
      }
    });
  }

  ensureCloseButton();
  setupDropdowns();

  // Attach click handlers to all buttons
  var buttons = document.querySelectorAll('button.menu-btn, .court-left button');
  for (var i = 0; i < buttons.length; i++) {
    (function (btn) {
      btn.addEventListener('click', function (ev) {
        ev.preventDefault();
        handleButtonClick(btn);
      });
      btn.addEventListener('keydown', function (ev) {
        if (ev.key === 'Enter' || ev.key === ' ') {
          ev.preventDefault();
          btn.click();
        }
      });
    })(buttons[i]);
  }

  // Allow Escape key to close the court
  document.addEventListener('keydown', function (ev) {
    if (ev.key === 'Escape') hideCourt();
  });
});

// AI-generated code ends here





