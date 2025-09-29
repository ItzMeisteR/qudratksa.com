/* eslint-disable */
// Main site JS extracted from inline script in index.html

document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Smooth scroll and remove hash from URL
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href').replace('#', '');
            const target = document.getElementById(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth' });
                // Remove hash from URL
                if (history.replaceState) {
                    history.replaceState(null, '', window.location.pathname);
                }
            }
        });
    });

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
