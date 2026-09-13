// script.js
function selectIcon(clickedBtn) {
    const buttons = document.querySelectorAll('.icon-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
        const icon = btn.querySelector('.icon-symbol');
        if(icon) icon.style.fontVariationSettings = "'FILL' 0";
    });
    
    clickedBtn.classList.add('selected');
    const clickedIcon = clickedBtn.querySelector('.icon-symbol');
    if(clickedIcon) clickedIcon.style.fontVariationSettings = "'FILL' 1";
}

function selectColor(clickedBtn) {
    const buttons = document.querySelectorAll('.color-btn');
    buttons.forEach(btn => {
        btn.classList.remove('selected');
    });
    
    clickedBtn.classList.add('selected');
}

document.addEventListener('DOMContentLoaded', () => {
    const iconButtons = document.querySelectorAll('.icon-btn');
    iconButtons.forEach(btn => {
        btn.addEventListener('click', () => selectIcon(btn));
    });

    const colorButtons = document.querySelectorAll('.color-btn');
    colorButtons.forEach(btn => {
        btn.addEventListener('click', () => selectColor(btn));
    });
});