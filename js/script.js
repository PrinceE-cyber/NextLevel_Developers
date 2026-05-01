/**
 * Dev Learning Hub — script.js
 *
 * This file handles three interactive behaviours:
 *  1. Mobile navigation toggle (open / close the menu)
 *  2. Lesson accordion (expand / collapse each lesson card)
 *  3. Smooth scrolling + closing the mobile menu on nav link click
 *
 * The code is kept minimal, readable, and beginner-friendly.
 * Every section is commented so you can understand and edit it.
 */


/* ============================================================
   1. MOBILE NAVIGATION TOGGLE
   ============================================================
   When the user taps the hamburger button (☰) on mobile,
   we show or hide the mobile nav menu.
   We also update aria-expanded for accessibility (screen readers).
   ============================================================ */

// Grab the elements we need
const navToggle  = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');

// Listen for a click on the hamburger button
navToggle.addEventListener('click', function () {

  // Check the current state: is the menu open?
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

  if (isOpen) {
    // Menu is open → close it
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  } else {
    // Menu is closed → open it
    navToggle.setAttribute('aria-expanded', 'true');
    mobileMenu.hidden = false;
  }

});


/* ============================================================
   2. LESSON ACCORDION (EXPAND / COLLAPSE)
   ============================================================
   Each lesson card has a <button class="lesson-toggle">.
   When clicked, we show or hide the matching lesson body.
   ============================================================ */

// Select ALL lesson toggle buttons at once
const lessonToggles = document.querySelectorAll('.lesson-toggle');

// Loop through each button and add a click listener
lessonToggles.forEach(function (button) {

  button.addEventListener('click', function () {

    // Read the aria-controls attribute to find which body to toggle
    // e.g. aria-controls="day1-body" → we look for id="day1-body"
    const bodyId   = button.getAttribute('aria-controls');
    const lessonBody = document.getElementById(bodyId);

    // Is the lesson currently expanded?
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    if (isExpanded) {
      // Currently open → collapse it
      button.setAttribute('aria-expanded', 'false');
      lessonBody.hidden = true;
    } else {
      // Currently closed → expand it
      button.setAttribute('aria-expanded', 'true');
      lessonBody.hidden = false;
    }

  });

});


/* ============================================================
   3. CLOSE MOBILE MENU WHEN A NAV LINK IS CLICKED
   ============================================================
   If the mobile menu is open and the user taps a link,
   we close the menu and let the smooth scroll take over.
   ============================================================ */

// Select all links inside the mobile nav menu
const mobileNavLinks = document.querySelectorAll('.nav-mobile-link');

mobileNavLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    // Close the menu
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  });
});


/* ============================================================
   4. CLOSE MOBILE MENU WHEN CLICKING OUTSIDE IT
   ============================================================
   A nice UX touch: if the user clicks anywhere outside the
   header while the menu is open, close the menu.
   ============================================================ */

document.addEventListener('click', function (event) {
  // Is the menu currently open?
  const isOpen = navToggle.getAttribute('aria-expanded') === 'true';
  if (!isOpen) return; // Nothing to do if it's already closed

  // Was the click inside the header?
  const header = document.querySelector('.site-header');
  const clickedInsideHeader = header.contains(event.target);

  if (!clickedInsideHeader) {
    // Click was outside → close the menu
    navToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.hidden = true;
  }
});
