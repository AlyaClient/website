$(document).ready(() => {
    const scrollToTopButton = $('.scroll-to-top');
    const showButton = (show) => {
        if(!show) {
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
    );

    const modal = $('#screenshotModal');
    const modalImg = modal.find('img');
    const modalClose = modal.find('.modal-close');

    $('.screenshots img').on('click', function() {
        const fullSrc = $(this).data('full');
        modalImg.attr('src', fullSrc);
        modal.addClass('active').attr('aria-hidden', 'false');
        $('body').css('overflow', 'hidden');
    });

    modalClose.on('click', closeModal);
    modal.on('click', function(e) {
        if(e.target === modal[0]) closeModal();
    });

    $(document).on('keydown', (e) => {
        if(e.key === 'Escape' && modal.hasClass('active')) closeModal();
    });

    function closeModal() {
        modal.removeClass('active').attr('aria-hidden', 'true');
        $('body').css('overflow', '');
        setTimeout(() => modalImg.attr('src', ''), 200);
    }
});
