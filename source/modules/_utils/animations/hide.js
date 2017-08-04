import anime from 'animejs';

function hide(el) {
	return anime({
		targets: el,
		opacity: 0,
		height: 0,
		marginBottom: 0,
		marginTop: 0,
		paddingBottom: 0,
		paddingTop: 0,
		easing: 'easeInOutQuart',
		duration: 300,
		begin() {
			el.style.overflow = 'hidden';
		},
		complete() {
			el.style.display = 'none';
		}
	});
}

export default hide;
