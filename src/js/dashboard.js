/**
 * Dashboard main JavaScript
 */

function dashboard() {
    return {
        currentPage: 'charge-points',
        sidebarOpen: true,
        user: { name: 'Demo User' },
        
        /**
         * Initialize the dashboard
         */
        init() {
            console.log('Alpine.js component initialized');
            
            // Initial content load
            this.loadContent('charge-points', null);
            
            // Set up hash change listener
            window.addEventListener('hashchange', () => {
                console.log('Hash changed: ' + window.location.hash);
                this.loadContentBasedOnHash();
            });
            
            // Set up HTMX event listeners
            this.setupHtmxListeners();
        },
        
        /**
         * Set up HTMX event listeners
         */
        setupHtmxListeners() {
            htmx.on('htmx:beforeRequest', function(evt) {
                console.log('HTMX request starting: ' + evt.detail.requestConfig.path);
            });
            
            htmx.on('htmx:afterRequest', function(evt) {
                const success = evt.detail.successful ? 'success' : 'failed';
                console.log(`HTMX request ${success}`);
            });
            
            htmx.on('htmx:responseError', function(evt) {
                console.error(`HTMX error: ${evt.detail.xhr.status} - ${evt.detail.xhr.statusText}`);
            });
            
            htmx.on('htmx:afterSwap', function(evt) {
                console.log('HTMX content swapped');
            });
        },
        
        /**
         * Navigate to a specific page
         * @param {string} page - The page name
         * @param {string|null} id - Optional ID for detail views
         */
        navigateTo(page, id = null) {
            console.log(`Navigating to: ${page}${id ? '/' + id : ''}`);
            this.currentPage = page;
            this.loadContent(page, id);
            window.location.hash = id ? `${page}/${id}` : page;
        },
        
        /**
         * Load content based on the current hash
         */
        loadContentBasedOnHash() {
            const hash = window.location.hash.substring(1) || 'charge-points';
            const parts = hash.split('/');
            this.currentPage = parts[0];
            const id = parts.length > 1 ? parts[1] : null;
            
            console.log(`Hash parsed: page=${this.currentPage}, id=${id || 'null'}`);
            
            this.loadContent(this.currentPage, id);
        },
        
        /**
         * Load content for a specific page
         * @param {string} page - The page name
         * @param {string|null} id - Optional ID for detail views
         */
        loadContent(page, id) {
            console.log(`Loading content: ${page}${id ? '/' + id : ''}`);
            
            const contentArea = document.getElementById('content-area');
            if (!contentArea) {
                console.error('Error: Content area not found!');
                return;
            }

            // Clear existing content
            contentArea.innerHTML = `<div class='flex justify-center items-center p-12'>
                <div class='pulse'>Loading ${page}...</div>
            </div>`;

            // Set path and check file exists
            const path = './partials/';
            const url = id 
                ? `${path}${page}/detail.html?id=${id}` 
                : `${path}${page}/list.html`;
            
            console.log(`Checking file: ${url}`);
            
            // Manual fetch to ensure file exists
            fetch(url)
                .then(response => {
                    console.log(`Fetch status: ${response.status}`);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    
                    // Now use HTMX to load the content
                    contentArea.setAttribute('hx-get', url);
                    contentArea.setAttribute('hx-trigger', 'load');
                    
                    // Manually trigger HTMX
                    htmx.process(contentArea);
                    htmx.trigger(contentArea, 'load');
                    
                    console.log('HTMX load triggered');
                })
                .catch(error => {
                    console.error(`Error: ${error.message}`);
                    contentArea.innerHTML = `
                        <div class='p-12 text-center'>
                            <div class='text-red-500 mb-4'>Error loading content: ${error.message}</div>
                            <div>Could not find: ${url}</div>
                            <div class='mt-4'>
                                <button @click="loadContent('charge-points', null)" 
                                        class='px-4 py-2 bg-black text-white'>
                                    Go to Dashboard
                                </button>
                            </div>
                        </div>
                    `;
                });
        }
    };
}

// Setup DOM Content Loaded event listener
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM fully loaded');
});