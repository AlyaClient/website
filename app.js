$(document).ready(() => {
    const scrollToTopButton = $('.scroll-to-top');
    const showButton = (show) => {
        if (!show) {
            scrollToTopButton.fadeOut(200, "swing", () => {
                scrollToTopButton.removeClass('show-flex');
            });
            return;
        }

        scrollToTopButton.fadeIn(200, "swing", () => {
            scrollToTopButton.addClass('show-flex');
        });
    };

    document.addEventListener('scroll', () => {
        if(globalThis.scrollY > 300) {
            showButton(true);
        } else {
            showButton(false);
        }
    });

    scrollToTopButton.on(
        'click', () => {
            globalThis.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        }
    )
});
