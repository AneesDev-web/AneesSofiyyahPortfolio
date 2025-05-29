// Timeline buttons toggling content with fade in/out
    const eduButtons = document.querySelectorAll('#education .timeline-buttons button');
    const eduContents = document.querySelectorAll('#education .timeline-content');

    const expButtons = document.querySelectorAll('#experience .timeline-buttons button');
    const expContents = document.querySelectorAll('#experience .timeline-content');

    function setupTimeline(buttons, contents) {
      buttons.forEach(button => {
        button.addEventListener('click', () => {
          // If the clicked button is active, toggle the content visibility
          if (button.classList.contains('active')) {
            const targetId = button.dataset.target;
            const targetContent = document.getElementById(targetId);
            if (targetContent.classList.contains('show')) {
              targetContent.classList.remove('show');
            } else {
              targetContent.classList.add('show');
            }
          } else {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove('active'));
            // Hide all contents
            contents.forEach(c => c.classList.remove('show'));
            // Activate clicked button and show related content
            button.classList.add('active');
            const targetId = button.dataset.target;
            const targetContent = document.getElementById(targetId);
            targetContent.classList.add('show');
            // Scroll to content smoothly
            targetContent.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
        });
      });
    }

    setupTimeline(eduButtons, eduContents);
    setupTimeline(expButtons, expContents);

    const skillButtons = document.querySelectorAll('.skills-buttons button');
  const skillContents = document.querySelectorAll('.skills-content');

  skillButtons.forEach(button => {
    button.addEventListener('click', () => {
      const target = button.dataset.skill;

      // Toggle active button
      skillButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      // Show/hide skill sections
      skillContents.forEach(content => {
        if (content.id === target) {
          content.classList.add('show');
        } else {
          content.classList.remove('show');
        }
      });
    });
  });

   document.addEventListener("DOMContentLoaded", () => {
      const widget = document.getElementById("hireMeWidget");
      const button = document.getElementById("hireMeButton");
      const popup = document.getElementById("contactPopup");

      let isDragging = false, offsetX = 0, offsetY = 0;

      // Toggle popup
      button.addEventListener("click", (e) => {
        e.stopPropagation();
        popup.classList.toggle("active");
        popup.setAttribute("aria-hidden", !popup.classList.contains("active"));
      });

      // Close popup if clicked outside
      document.addEventListener("click", (e) => {
        if (!widget.contains(e.target)) {
          popup.classList.remove("active");
          popup.setAttribute("aria-hidden", "true");
        }
      });

      // Drag (mouse + touch)
      const startDrag = (x, y) => {
        isDragging = true;
        offsetX = x - widget.offsetLeft;
        offsetY = y - widget.offsetTop;
      };

      const onDrag = (x, y) => {
        if (isDragging) {
          widget.style.left = `${x - offsetX}px`;
          widget.style.top = `${y - offsetY}px`;
        }
      };

      // Mouse
      widget.addEventListener("mousedown", (e) => startDrag(e.clientX, e.clientY));
      document.addEventListener("mousemove", (e) => onDrag(e.clientX, e.clientY));
      document.addEventListener("mouseup", () => isDragging = false);

      // Touch
      widget.addEventListener("touchstart", (e) => {
        const touch = e.touches[0];
        startDrag(touch.clientX, touch.clientY);
      });
      document.addEventListener("touchmove", (e) => {
        const touch = e.touches[0];
        onDrag(touch.clientX, touch.clientY);
      });
      document.addEventListener("touchend", () => isDragging = false);
    });
