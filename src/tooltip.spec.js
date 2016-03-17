describe('tooltip', function() {
	var elm, scope, input;

	beforeEach(module('cp-tooltip'));
	beforeEach(function() {
		jasmine.clock().install();
	});

	beforeEach(inject(function($rootScope, $compile, $filter) {
		elm = angular.element(
			'<div>' +
				'<input type="text" cp-tooltip="hello">' +
			'</div>'
		);

		dismissClickElm = angular.element(
			'<div>' +
				'<input type="text" cp-tooltip="hello" cp-tooltip-dismiss-on-click>' +
			'</div>'
		);

		$('body').append(elm);
		$('body').append(dismissClickElm);

		scope = $rootScope.$new();

		$compile(elm)(scope);
		$compile(dismissClickElm)(scope);
	}));

	afterEach(function() {
		jasmine.clock().uninstall();
		scope.$broadcast('$destroy');
		elm.remove();
		dismissClickElm.remove();
	});

	it('Should display the tooltip when the mouse moves over', function() {
		var e = $.Event('mouseover');

		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		var tooltip = $('.cp-tooltip');
		expect(tooltip.length).toBe(1);
	});

	it('Should correctly throttle displaying the tooltip', function() {
		var e = $.Event('mouseover');

		elm.find('input').trigger(e);
		jasmine.clock().tick(500);

		expect($('.cp-tooltip').length).toBe(0);

		e = $.Event('mouseover');
		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		expect($('.cp-tooltip').length).toBe(1);
	});

	it('Should hide the tooltip on mouseout', function() {
		var e = $.Event('mouseover');

		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		expect($('.cp-tooltip').length).toBe(1);

		e = $.Event('mouseout');
		elm.find('input').trigger(e);
		jasmine.clock().tick(501);

		expect($('.cp-tooltip').length).toBe(0);
	});

	it('Should not hide the tooltip until clicked outside when using the cp-tooltip-dismiss-on-click attr', function() {
		var e = $.Event('mouseover');

		dismissClickElm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		expect($('.cp-tooltip').length).toBe(1);

		e = $.Event('mouseout');
		dismissClickElm.find('input').trigger(e);
		jasmine.clock().tick(501);

		expect($('.cp-tooltip').length).toBe(1);

		e = $.Event('click');
		$('.cp-tooltip').trigger(e);

		jasmine.clock().tick(501);

		expect($('.cp-tooltip').length).toBe(1);

		e = $.Event('click');
		dismissClickElm.find('input').trigger(e);
		jasmine.clock().tick(501);

		expect($('.cp-tooltip').length).toBe(0);
	});

});
