// Hide loader immediately and on all events
const hideLoader = () => {
  const loader = document.getElementById('cd-loader');
  if (loader) {
    loader.style.display = 'none';
  }
};

// Hide on various events to ensure it works
document.addEventListener('DOMContentLoaded', hideLoader);
window.addEventListener('load', hideLoader);

// Hide immediately if DOM is ready
if (document.readyState !== 'loading') {
  hideLoader();
}

// Fallback: hide after 2 seconds
setTimeout(hideLoader, 2000);
