describe('multi-selector', function() {
	var elm, scope, input;

	beforeEach(module('bs-tooltip'));
	beforeEach(function() {
		jasmine.clock().install();
	});

	beforeEach(inject(function($rootScope, $compile, $filter) {
		elm = angular.element(
			'<div>' +
				'<input type="text" bs-tooltip="hello">' +
			'</div>'
		);

		$('body').append(elm);

		scope = $rootScope.$new();

		$compile(elm)(scope);
	}));

	afterEach(function() {
		jasmine.clock().uninstall();
		scope.$broadcast('$destroy');
		elm.remove();
	});

	it('Should display the tooltip when the mouse moves over', function() {
		var e = $.Event('mousemove');
		e.clientX = 100;
		e.clientY = 200;

		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		var tooltip = $('.bs-tooltip');
		expect(tooltip.length).toBe(1);
	});

	it('Should correctly position the tooltip', function() {
		var e = $.Event('mousemove');
		e.clientX = 100;
		e.clientY = 200;

		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);
		var tooltip = $('.bs-tooltip');
		var position = tooltip.position();
		expect(position.left).toBe(100);
		expect(position.top).toBe(220);
	});

	it('Should correctly throttle displaying the tooltip', function() {
		var e = $.Event('mousemove');
		e.clientX = 100;
		e.clientY = 200;

		elm.find('input').trigger(e);
		jasmine.clock().tick(500);

		e = $.Event('mousemove');
		e.clientX = 100;
		e.clientY = 210;
		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		var tooltip = $('.bs-tooltip');
		var position = tooltip.position();
		expect(position.left).toBe(100);
		expect(position.top).toBe(230);
	});

	it('Should hide the tooltip on mouseout', function() {
		var e = $.Event('mousemove');
		e.clientX = 100;
		e.clientY = 200;

		elm.find('input').trigger(e);
		jasmine.clock().tick(1001);

		expect($('.bs-tooltip').length).toBe(1);

		e = $.Event('mouseout');
		elm.find('input').trigger(e);
		jasmine.clock().tick(501);

		expect($('.bs-tooltip').length).toBe(0);
	});
});
