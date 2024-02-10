// src/contentScript.js

// Function to find and click the YouTube ad skip button
function clickSkipAdButton() {
  const adSkipButton = document.querySelector('.ytp-ad-skip-button-modern.ytp-button');
  if (adSkipButton) {
    adSkipButton.click();
  }
}

// Function to continuously check for the skip button after a delay
function checkForSkipButton() {
  // Check if the current URL is from YouTube
  if (isYouTubeUrl(window.location.href)) {
    // Set a timeout to check for the skip button after a delay
    setTimeout(() => {
      clickSkipAdButton(); // Attempt to click the skip button
      // Check again after a delay
      setTimeout(checkForSkipButton, 5000); // Check every 5 seconds
    }, 5000); // Check for the skip button after 5 seconds
  }
}

// Function to handle URL changes
function handleUrlChange() {
  // Clear any existing timeout to avoid duplicate checks
  clearTimeout(window.urlChangeTimeout);
  // Set a timeout to check for the skip button after a short delay
  window.urlChangeTimeout = setTimeout(checkForSkipButton, 2000); // Wait 2 seconds after URL change
}

// Function to check if the current URL is from YouTube
function isYouTubeUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Add event listener to trigger the skip button check when the page loads
window.addEventListener('load', () => {
  checkForSkipButton(); // Check for skip button on initial page load
  // Add event listener for URL changes
  window.addEventListener('hashchange', handleUrlChange);
  window.addEventListener('popstate', handleUrlChange);
  window.addEventListener('pushState', handleUrlChange);
});
