/**
 * Landing Page JavaScript
 * Handles testimonials auto-scroll functionality and authentication UI
 */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  initTestimonialsScroll();
  initAuthUI();
});

/**
 * Initialize horizontal auto-scroll for testimonials
 * Creates seamless infinite scroll by duplicating cards
 */
function initTestimonialsScroll() {
  const scrollContainer = document.getElementById('testimonialsScroll');
  
  if (!scrollContainer) {
    console.warn('Testimonials scroll container not found');
    return;
  }

  // Clone all reviewer cards to create seamless loop
  const cards = scrollContainer.querySelectorAll('.reviewer-card');
  
  // Duplicate cards for infinite scroll effect
  cards.forEach(card => {
    const clone = card.cloneNode(true);
    scrollContainer.appendChild(clone);
  });

  // Reset scroll position when animation completes (handled by CSS animation)
  // The CSS animation will loop seamlessly with duplicated content
}

/**
 * Optional: Pause scroll on user interaction
 * This is already handled by CSS :hover, but can be extended here
 */
function pauseScroll() {
  const container = document.querySelector('.testimonials-container');
  if (container) {
    container.style.animationPlayState = 'paused';
  }
}

function resumeScroll() {
  const container = document.querySelector('.testimonials-container');
  if (container) {
    container.style.animationPlayState = 'running';
  }
}

/**
 * ================= AUTHENTICATION UI MANAGEMENT =================
 * Handles showing/hiding auth buttons and user profile based on authentication state
 */

/**
 * Initialize authentication UI on page load
 * Checks localStorage for authentication state and updates UI accordingly
 */
function initAuthUI() {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const currentUserEmail = localStorage.getItem('currentUser');
  
  const authButtons = document.getElementById('authButtons');
  const userProfile = document.getElementById('userProfile');
  const profileName = document.getElementById('profileName');
  const logoutBtn = document.getElementById('logoutBtn');

  if (isLoggedIn && currentUserEmail) {
    // User is authenticated - show profile, hide auth buttons
    showUserProfile(currentUserEmail);
  } else {
    // User is not authenticated - show auth buttons, hide profile
    showAuthButtons();
  }

  // Add logout event listener
  if (logoutBtn) {
    logoutBtn.addEventListener('click', handleLogout);
  }
}

/**
 * Show user profile section and hide auth buttons
 * @param {string} userEmail - The email of the authenticated user
 */
function showUserProfile(userEmail) {
  const authButtons = document.getElementById('authButtons');
  const userProfile = document.getElementById('userProfile');
  const profileName = document.getElementById('profileName');

  if (authButtons) {
    authButtons.style.display = 'none';
  }

  if (userProfile && profileName) {
    // Extract name from email (part before @) or use email as fallback
    const userName = getUserNameFromEmail(userEmail);
    profileName.textContent = userName;
    userProfile.style.display = 'flex';
  }
}

/**
 * Show auth buttons and hide user profile
 */
function showAuthButtons() {
  const authButtons = document.getElementById('authButtons');
  const userProfile = document.getElementById('userProfile');

  if (userProfile) {
    userProfile.style.display = 'none';
  }

  if (authButtons) {
    authButtons.style.display = 'flex';
  }
}

/**
 * Extract a display name from email address
 * Uses the part before @ and capitalizes first letter
 * @param {string} email - User's email address
 * @returns {string} Display name for the user
 */
function getUserNameFromEmail(email) {
  if (!email) return 'User';
  
  // Get the part before @
  const namePart = email.split('@')[0];
  
  // Capitalize first letter and return
  return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}

/**
 * Handle logout functionality
 * Clears authentication state from localStorage and updates UI
 * Note: This does not modify auth.js, only handles UI state on landing page
 */
function handleLogout() {
  // Clear authentication state from localStorage
  localStorage.removeItem('currentUser');
  localStorage.removeItem('isLoggedIn');
  
  // Update UI to show auth buttons
  showAuthButtons();
  
  // Optional: Show a brief confirmation message
  console.log('Logged out successfully');
}

