// Dark mode toggle
(function() {
    const STORAGE_KEY = 'theme-preference';
    const DARK_CLASS = 'dark-mode';
    
    // Get theme from localStorage or default to dark
    const getTheme = () => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) return stored;
        return 'dark'; // default dark
    };
    
    // Apply theme
    const applyTheme = (theme) => {
        if (theme === 'dark') {
            document.body.classList.add(DARK_CLASS);
        } else {
            document.body.classList.remove(DARK_CLASS);
        }
        localStorage.setItem(STORAGE_KEY, theme);
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const current = document.body.classList.contains(DARK_CLASS) ? 'dark' : 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    };
    
    // Apply theme immediately to avoid flash
    applyTheme(getTheme());
    
    // Initialize on page load
    document.addEventListener('DOMContentLoaded', () => {
        // Add click listener to toggle button(s)
        const toggleButtons = document.querySelectorAll('.theme-toggle');
        toggleButtons.forEach(btn => {
            btn.addEventListener('click', toggleTheme);
            // Update button text based on current theme
            const updateText = () => {
                const isDark = document.body.classList.contains(DARK_CLASS);
                btn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
                btn.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
            };
            updateText();
            // Update text when theme changes (via storage event from other tabs)
            window.addEventListener('storage', (e) => {
                if (e.key === STORAGE_KEY) {
                    applyTheme(getTheme());
                    updateText();
                }
            });
            // Also update when theme changes via this page
            const observer = new MutationObserver(updateText);
            observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
        });
    });
})();