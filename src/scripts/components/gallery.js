import { Fancybox } from "@fancyapps/ui/dist/fancybox/";

function initGalleryVideo() {
    Fancybox.bind('[data-fancybox="video"]', {
        type: "video",
        Youtube: {
            autoplay: true,
        },
    });
}


function initStationGalleryButtons() {
    document.querySelectorAll('.media-gallery__station-button').forEach(button => {
        button.addEventListener('click', function () {
            const galleryName = this.getAttribute('data-fancybox-trigger');
            const items = Array.from(document.querySelectorAll(`[data-fancybox="${galleryName}"]`)).map(link => ({
                src: link.getAttribute('href'),
                thumb: link.querySelector('img')?.getAttribute('src'),
                type: 'image',
            }));
            if (items.length) {
                Fancybox.show(items, {
                    Thumbs: {
                        autoStart: true,
                    },
                    Toolbar: {
                        display: [
                            "close",
                            "zoom",
                            "fullscreen",
                            "thumbs"
                        ],
                    },
                    Carousel: {
                        infinite: false,
                    },
                });
            }
        });
    });
}
export function gallery() {
    initGalleryVideo();
    initStationGalleryButtons();
}
