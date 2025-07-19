export function accordion() {
    document.querySelectorAll('.faq__accordion-trigger').forEach(button => {
        button.addEventListener('click', () => {
            const parentItem = button.closest('.faq__accordion-item');
            const isActive = parentItem.classList.contains('active');

            document.querySelectorAll('.faq__accordion-item').forEach(item => {
                item.classList.remove('active');
            });

            if (!isActive) {
                parentItem.classList.add('active');
            }
        });
    });
}
