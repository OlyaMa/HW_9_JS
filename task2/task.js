const checks = document.querySelectorAll('.interest input');

[...checks].forEach((check) => {
    check.addEventListener('change', () => {
        checkDown(check);
        checkUp(check);
    });
});

// смена checked для всех детей
function checkDown(element) {
    const elDown = element.closest('li').querySelectorAll('input');
    [...elDown].forEach((check) => {
        check.checked = element.checked;
        check.indeterminate = false;
    });
}

// смена checked для родителей
function checkUp(element) {
    const siblings = element.closest('ul').querySelectorAll('input'); // соседние checkbox

    if (element.closest('ul').closest('li')) {

        const parentCheck = element.closest('ul').closest('li').querySelector('input'); // родительский checkbox

        if ([...siblings].every(sibling => sibling.checked)) { // если все соседние отмечены
            parentCheck.checked = true;
            parentCheck.indeterminate = false;
        } else if ([...siblings].some(sibling => sibling.checked)) { // если какие-то из соседних отмечены
            parentCheck.checked = false;
            parentCheck.indeterminate = true;
        } else { // если никто не отмечен
            parentCheck.checked = false;
            parentCheck.indeterminate = false;
        }
        checkUp(parentCheck); // проверяем ещё выше

    }
}