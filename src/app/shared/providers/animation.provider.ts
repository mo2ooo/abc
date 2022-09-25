import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AnimationProvider {

    slideInTr(i) {
        return `slide-in-tr ${(i + 1) * 0.4}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
    }

    slideInLeft(i) {
        return `slide-in-left ${(i + 1) * 0.5}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
    }

    slideInRight(i) {
        return `slide-in-right ${(i + 1) * 0.3}s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.1}s both`;
    }

    slideTop(i) {
        return `slide-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.3}s both`;
    }

    slideInBlurredBottom(i) {
        return `slide-in-blurred-bottom ${(i + 1) * 0.5}s cubic-bezier(0.230, 1.000, 0.320, 1.000) both`;
    }

    rollInBottom(i) {
        return `roll-in-blurred-bottom ${(i + 1) * 0.9}s cubic-bezier(0.230, 1.000, 0.320, 1.000) both`;
    }

    scaleUpCenter(i) {
        return `scale-up-hor-center ${(i + 1) * 0.3}s cubic-bezier(0.390, 0.575, 0.565, 1.000) both`;
    }

    jelloHorizontal(i) {
        return `jello-horizontal 0.9s ${(i + 1) * 1} both`;
    }

    rotateInCenter(i) {
        return `rotate-in-center ${(i + 1) * 0.6}s cubic-bezier(0.250, 0.460, 0.450, 0.940) both`;
    }

    bounceInFwd(i) {
        return `bounce-in-fwd ${(i + 1) * 1.1}s both`;
    }

    flipInRight(i) {
        return `flip-in-ver-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.3}s both`;
    }

    flipInTop(i) {
        return `flip-in-hor-top 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.3}s both`;
    }

    scaleInCenter(i) {
        return `scale-in-ver-center 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.3}s both`;
    }

    trackingInExpand(i) {
        return `tracking-in-expand 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) ${(i + 1) * 0.3}s both`;
    }

    slitInDiagonal(i) {
        return `roll-in-blurred-bottom 0.6s cubic-bezier(0.230, 1.000, 0.320, 1.000) ${(i + 1) * 0.3}s both`;
    }

    swingInTopFwd(i) {
        return `swing-in-top-fwd 0.5s cubic-bezier(0.175, 0.885, 0.320, 1.275) ${(i + 1) * 0.3}s both`;
    }
    puffInCenter(i) {
        return `puff-in-center .7s cubic-bezier(.47,0.000,.745,.715) ${(i + 1) * 0.3}s both`;
    }

}
