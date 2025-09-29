/* eslint-disable */
// Main site JS extracted from inline script in index.html

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // base page title (kept as original content)
    const baseTitle = document.title || 'مركز القدرات';
    // mapping section id -> readable title (used only for document.title)
    const sectionTitles = {
        'basics': 'أساسيات اختبار القدرات',
        'grades': 'الدرجات ومتطلبات الجامعات',
        'resources': 'أفضل مصادر وتجميعات القدرات',
        'planning': 'خطط وجداول مذاكرة القدرات',
        'faq': 'الأسئلة الشائعة عن اختبار القدرات',
        'ai-assistant': 'مساعدك الذكي لشرح القدرات',
        'motivation': 'التحفيز والدعم النفسي'
    };

    function updateTitleForSection(sectionId) {
        const sTitle = sectionTitles[sectionId];
        if (sTitle) {
            document.title = sTitle + ' — ' + baseTitle;
        } else {
            document.title = baseTitle;
        }
    }

    // Smooth scroll and set clean shareable query param (e.g. ?section=planning)
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Update URL with ?section=<id> so the link is shareable and clean (no #)
                try {
                    const url = new URL(window.location.href);
                    url.searchParams.set('section', targetId);
                    // Use replaceState so navigation doesn't create history spam
                    if (history.replaceState) history.replaceState(null, '', url.pathname + url.search);
                } catch (err) {
                    // Fallback for older browsers
                    if (history.replaceState) history.replaceState(null, '', window.location.pathname + '?section=' + encodeURIComponent(targetId));
                }
                // Update the document title to reflect the selected section (non-visual change)
                try { updateTitleForSection(targetId); } catch (e) { /* noop if function unavailable */ }
            }
        });
    });

    // On load: if ?section=... is present, scroll to that section
    try {
        const initialUrl = new URL(window.location.href);
        const initialSection = initialUrl.searchParams.get('section');
        if (initialSection) {
            const el = document.getElementById(initialSection);
            if (el) {
                // small timeout to allow layout to settle
                setTimeout(() => {
                    el.scrollIntoView({ behavior: 'smooth' });
                    try { updateTitleForSection(initialSection); } catch (e) { /* noop */ }
                }, 50);
            }
        }
    } catch (err) {
        // ignore URL parsing errors
    }

    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
        document.querySelectorAll('#mobile-menu a').forEach(link => {
            link.addEventListener('click', () => { mobileMenu.classList.add('hidden'); });
        });
    }
});

function calculateWeightedScore() {
    const hsPercent = parseFloat(document.getElementById('hs-percent').value) || 0;
    const quPercent = parseFloat(document.getElementById('qu-percent').value) || 0;
    const taPercent = parseFloat(document.getElementById('ta-percent').value) || 0;
    const hsScore = parseFloat(document.getElementById('hs-score').value) || 0;
    const quScore = parseFloat(document.getElementById('qu-score').value) || 0;
    const taScore = parseFloat(document.getElementById('ta-score').value) || 0;
    const totalPercent = hsPercent + quPercent + taPercent;
    const percentWarning = document.getElementById('percent-warning');
    if (percentWarning) {
        if (Math.round(totalPercent) !== 100 && totalPercent > 0) {
            percentWarning.classList.remove('hidden');
        } else {
            percentWarning.classList.add('hidden');
        }
    }
    const weightedScore = (hsScore * hsPercent / 100) + (quScore * quPercent / 100) + (taScore * taPercent / 100);
    const resultEl = document.getElementById('result');
    if (resultEl) resultEl.textContent = weightedScore.toFixed(2);
}

function filterResources(filter, clickedButton) {
    const quantResourceCards = document.querySelectorAll('#quantitative-resources-grid .resource-card');
    const quantFilterButtons = document.querySelectorAll('#resources .filter-button');
    quantFilterButtons.forEach(button => button.classList.remove('active'));
    if (clickedButton) clickedButton.classList.add('active');
    quantResourceCards.forEach(card => {
        const category = card.dataset.category;
        card.style.display = (filter === 'all' || category === filter) ? 'flex' : 'none';
    });
}

function switchAITab(tabName) {
    const aiTabs = {
        qa: document.getElementById('content-qa'),
        explain: document.getElementById('content-explain'),
        generate: document.getElementById('content-generate')
    };
    const aiTabButtons = document.querySelectorAll('.ai-tab-button');
    Object.values(aiTabs).forEach(tab => { if (tab) tab.classList.add('hidden'); });
    aiTabButtons.forEach(btn => btn.classList.remove('active'));
    if (aiTabs[tabName]) aiTabs[tabName].classList.remove('hidden');
    // Set active class on the corresponding button (buttons have ids: tab-qa, tab-explain, tab-generate)
    const activeBtn = document.getElementById('tab-' + tabName);
    if (activeBtn) activeBtn.classList.add('active');
}

function toggleNimrDetails(button) {
    const detailsDiv = button.nextElementSibling;
    if (!detailsDiv) return;
    const isHidden = detailsDiv.classList.contains('hidden');

    if (isHidden) {
        detailsDiv.classList.remove('hidden');
        button.innerHTML = 'إخفاء التفاصيل <i data-lucide="arrow-up" class="inline-block w-4 h-4 transition-transform"></i>';
    } else {
        detailsDiv.classList.add('hidden');
        button.innerHTML = 'اقرأ التفاصيل الكاملة <i data-lucide="arrow-down" class="inline-block w-4 h-4 transition-transform"></i>';
    }
    if (typeof lucide !== 'undefined' && lucide.createIcons) lucide.createIcons();
}
