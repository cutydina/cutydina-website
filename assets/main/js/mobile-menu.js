(function() {
  'use strict';

  document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.cd-mobile-menu-toggle');
    const menuOverlay = document.querySelector('.cd-mobile-menu-overlay');
    const menuLinks = document.querySelectorAll('.cd-mobile-menu-link');
    const body = document.body;

    console.log('Mobile menu script loaded');
    console.log('Menu toggle found:', !!menuToggle);
    console.log('Menu overlay found:', !!menuOverlay);
    console.log('Menu links found:', menuLinks.length);

    if (!menuToggle || !menuOverlay) {
      console.log('Missing required elements, exiting');
      return;
    }

    function toggleMenu() {
      const isOpen = menuToggle.getAttribute('aria-expanded') === 'true';
      console.log('Toggle menu called, current state:', isOpen);
      
      if (isOpen) {
        closeMenu();
      } else {
        openMenu();
      }
    }

    function openMenu() {
      console.log('Opening menu');
      menuToggle.setAttribute('aria-expanded', 'true');
      menuOverlay.setAttribute('aria-hidden', 'false');
      body.classList.add('cd-mobile-menu-open');
      
      // Prevent body scroll when menu is open
      body.style.overflow = 'hidden';
    }

    function closeMenu() {
      console.log('Closing menu');
      menuToggle.setAttribute('aria-expanded', 'false');
      menuOverlay.setAttribute('aria-hidden', 'true');
      body.classList.remove('cd-mobile-menu-open');
      
      // Restore body scroll
      body.style.overflow = '';
    }

    // Toggle menu on button click
    menuToggle.addEventListener('click', function(e) {
      console.log('Hamburger button clicked');
      e.preventDefault();
      toggleMenu();
    });

    // Close menu when clicking on a menu link
    menuLinks.forEach(function(link) {
      link.addEventListener('click', function() {
        closeMenu();
      });
    });

    // Close menu when clicking outside the menu content
    menuOverlay.addEventListener('click', function(e) {
      if (e.target === menuOverlay) {
        closeMenu();
      }
    });

    // Close menu on ESC key
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  });
})();
