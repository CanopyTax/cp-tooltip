angular.module('bs-tooltip')
	.directive('bsTooltip', function() {
		var idCounter = 0;
		var TIMEOUT = 1000;
		return {
			restrict: "A",
			link: function(scope, el, attr) {
				var id = ++idCounter;
				var timeout1, timeout2;
				var tooltipEl;
				var tooltipDisplayed = false;

				/** Setup main hover event for the tooltip **/
				el.on('mousemove.bstooltip'+id, function(e) {
					if(timeout1) clearTimeout(timeout1);
					timeout1 = setTimeout(function() {
						if(!tooltipDisplayed) {
							renderTooltip(e);
						}
					}, TIMEOUT);
				});

				el.on('mouseout.bstooltip'+id, function() {
					if(timeout2) clearTimeout(timeout2);
					timeout2 = setTimeout(function() {
						clearTimeout(timeout1);
						closeTooltip();
					}, 500);
				});

				/** Cleanup events **/
				scope.$on('$destroy', function() {
					closeTooltip();
					clearTimeout(timeout1);
					clearTimeout(timeout2);
					el.off('mousemove.bstooltip'+id);
					el.off('mouseout.bstooltip'+id);
				});

				function renderTooltip(e) {
					tooltipDisplayed = true;
					tooltipEl = $(
						`
						<span class="bs-tooltip" style="left:${e.clientX}px; top:${e.clientY + 20}px;">${attr.bsTooltip}</span>
						`
					);
					$('body').append(tooltipEl)
				}

				function closeTooltip() {
					tooltipDisplayed = false;
					tooltipEl.remove();
				}
			}
		}
	});
