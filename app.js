gsap.registerPlugin(Flip);

const items = gsap.utils.toArray('main > .item');

let activeItem = null;

items.forEach(item => {

    let tl = gsap.timeline({paused: true});

    tl.to(item.querySelector('p'), {
        opacity: 0,
        duration: 0.5,
        x: '-100%',
    }, 0)
    tl.to(item.querySelector('.labels'), {
        opacity: 0,
        duration: 0.5,
        x: '-100%',
    },0)
    tl.to(item.querySelectorAll('button'), {
        opacity: 0,
        duration: 0.5,
        y: '200%',
        display: 'none',
    }, 0)
    tl.to(item, {
        borderRadius: 0,
    }, 0.5)
    tl.to(item.querySelector('h2'), {
        fontSize: '4vw',
    }, 0.5)
    tl.to(item.querySelector('.bg'), {
        backgroundColor: item.dataset.bg
    }, 0.5)
    tl.to(item.querySelector('img'), {
        right: '32.5%',
        top: '7%',
        width: '35%',
        ease: 'linear',
        zIndex: 2,
    }, 0.5)
    tl.to(item.querySelector('.details'), {
        opacity: 1,
        display: 'block',
        delay: 0.5,
    }, 1)
    tl.to(item.querySelector('.description'), {
        opacity: 1,
        display: 'block',
        delay: 0.5,
    }, 1)
   
    item.addEventListener('click', () => {

        if (activeItem === null) {
            activeItem = item;
            placeholder = document.createElement('div');
            placeholder.className = 'item placeholder';
            item.after(placeholder);
            document.body.style.overflow = 'hidden';
            tl.play();
        } else {
            activeItem = null;
            tl.reverse(0);
        }

        const state = Flip.getState(item);
        item.classList.toggle('full-screen');
        
        Flip.from(state, {
            duration: 0.5,
            ease: "linear",
            absolute: true,
            delay: activeItem ? 0.5 : 1,
            zIndex: 10,
            onComplete: () => {
                if (!activeItem) {
                    document.querySelector('.placeholder').remove();
                    document.body.style.overflow = 'auto';
                }
            }
        });
    })
})