// "Stamp" entrances (StaMPS): an element comes down onto the page like a rubber stamp — large and
// faint, then a hard landing with a tiny squash — in the brand's terracotta ink.
//   [data-stamp]        → on page load, in order (the capitals of the acrostic title)
//   [data-stamp="view"] → when it scrolls into view (chips, figures)
// Nothing moves when the visitor prefers reduced motion. Idempotent (view transitions).
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

const press = (tl: gsap.core.Timeline, el: Element, at: number | string) =>
  tl.from(el, { scale: 1.9, opacity: 0, rotation: -7, filter: 'blur(3px)', duration: 0.36, ease: 'expo.in' }, at)
    .to(el, { scale: 0.94, duration: 0.07, ease: 'none' }, '>')
    .to(el, { scale: 1, duration: 0.34, ease: 'back.out(4)', clearProps: 'filter' }, '>');

export function stampIn() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const onLoad = [...document.querySelectorAll<HTMLElement>('[data-stamp=""]:not([data-stamped]), [data-stamp="load"]:not([data-stamped])')];
  onLoad.forEach((el) => (el.dataset.stamped = '1'));
  if (onLoad.length) {
    const tl = gsap.timeline({ delay: 0.3 });
    onLoad.forEach((el, i) => { gsap.set(el, { display: 'inline-block', transformOrigin: '50% 60%' }); press(tl, el, 0.3 + i * 0.14); });
  }
  const onView = [...document.querySelectorAll<HTMLElement>('[data-stamp="view"]:not([data-stamped])')];
  onView.forEach((el) => {
    el.dataset.stamped = '1';
    gsap.set(el, { display: 'inline-block', transformOrigin: '50% 60%' });
    const tl = gsap.timeline({ paused: true });
    press(tl, el, 0);
    ScrollTrigger.create({ trigger: el, start: 'top 88%', once: true, onEnter: () => tl.play() });
  });
}

export function timelineFill() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  document.querySelectorAll<HTMLElement>('.timeline:not([data-tl])').forEach((tl) => {
    tl.dataset.tl = '1';
    gsap.to(tl, { '--tl': 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 65%', end: 'bottom 65%', scrub: 0.6 } });
  });
}
