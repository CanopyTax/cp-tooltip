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

		allowInteractionElm = angular.element(
			'<div>' +
				'<input type="text" cp-tooltip="hello" cp-tooltip-allow-interaction>' +
			'</div>'
		);

		$('body').append(elm);
		$('body').append(allowInteractionElm);

		scope = $rootScope.$new();

		$compile(elm)(scope);
		$compile(allowInteractionElm)(scope);
	}));

	afterEach(function() {
		jasmine.clock().uninstall();
		scope.$broadcast('$destroy');
		elm.remove();
		allowInteractionElm.remove();
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

	it('Should not hide the tooltip until clicked outside when using the cp-tooltip-allow-interaction attr', function() {
		var e = $.Event('mouseover');

		// Show tooltip
		allowInteractionElm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		expect($('.cp-tooltip').length).toBe(1);

		// Move mouse outside of toggle element
		e = $.Event('mouseout');
		allowInteractionElm.find('input').trigger(e);
		jasmine.clock().tick(200);

		// Move mouse to tooltip element, tooltip should still be visible
		e = $.Event('mouseover');
		$('.cp-tooltip').trigger(e);
		jasmine.clock().tick(501);
		expect($('.cp-tooltip').length).toBe(1);

		// Move mouse outside of tooltip element, tooltip should be dismissed
		e = $.Event('mouseout');
		$('.cp-tooltip').trigger(e);
		jasmine.clock().tick(501);

		expect($('.cp-tooltip').length).toBe(0);
	});

});
