document.addEventListener('DOMContentLoaded', () => {
    // Avatar selection logic
    const avatarButtons = document.querySelectorAll('.avatar-btn');
    
    avatarButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            avatarButtons.forEach(b => {
                b.classList.remove('selected');
                const symbol = b.querySelector('.avatar-symbol');
                if (symbol) {
                    symbol.style.fontVariationSettings = "'FILL' 0";
                }
            });

            btn.classList.add('selected');
            const activeSymbol = btn.querySelector('.avatar-symbol');
            if (activeSymbol) {
                activeSymbol.style.fontVariationSettings = "'FILL' 1";
            }
        });
    });

    // Permission options selection logic
    const radios = document.querySelectorAll('input[type="radio"][name="permission"]');

    radios.forEach(radio => {
        radio.addEventListener('change', (e) => {
            document.querySelectorAll('.permission-card').forEach(card => {
                card.classList.remove('active');
                
                const box = card.querySelector('.radio-box');
                if (box) {
                    box.classList.remove('active-box');
                }

                const dot = card.querySelector('.radio-dot');
                if (dot) {
                    dot.classList.remove('active-dot');
                }

                const iconContainer = card.querySelector('.permission-icon-container');
                if (iconContainer) {
                    iconContainer.classList.remove('active-icon');
                }
            });

            if (e.target.checked) {
                const activeCard = e.target.closest('.permission-card');
                activeCard.classList.add('active');

                const box = activeCard.querySelector('.radio-box');
                if (box) {
                    box.classList.add('active-box');
                }

                const dot = activeCard.querySelector('.radio-dot');
                if (dot) {
                    dot.classList.add('active-dot');
                }

                const iconContainer = activeCard.querySelector('.permission-icon-container');
                if (iconContainer) {
                    iconContainer.classList.add('active-icon');
                }
            }
        });
    });
});