angular.module('cp-tooltip')
	.directive('cpTooltip', function() {
		var idCounter = 0;
		var TIMEOUT = 1000;
		return {
			restrict: "A",
			link: function(scope, el, attr) {
				var id = ++idCounter;
				var timeout1, timeout2;
				var tooltipEl;
				var tooltipDisplayed = false;
				var instant = attr.cpTooltipInstant || attr.cpTooltipInstant == "";
				var dismissOnClick = attr.cpTooltipDismissOnClick || attr.cpTooltipDismissOnClick == "";

				/** Setup main hover event for the tooltip **/
				el.on('mouseenter.cptooltip'+id, function(e) {
					if(timeout1) clearTimeout(timeout1);
					if (timeout2) clearTimeout(timeout2);
					timeout1 = setTimeout(function() {
						if(!tooltipDisplayed) {
							renderTooltip(e);
						}
					}, instant ? 100 : TIMEOUT);
				});

				el.on('mouseleave.cptooltip'+id, function() {
					if(!dismissOnClick) dismissTooltip();
				});

				$(document).on('click', function(e) {
					if(dismissOnClick && !$(e.target).hasClass('cp-tooltip')) dismissTooltip();
				});

				/** Cleanup events **/
				scope.$on('$destroy', function() {
					closeTooltip();
					clearTimeout(timeout1);
					clearTimeout(timeout2);
					el.off('mouseenter.cptooltip'+id);
					el.off('mouseleave.cptooltip'+id);
				});

				function renderTooltip(e) {
					tooltipDisplayed = true;

					var rect = el[0].getBoundingClientRect();
					var topScroll = $(document).scrollTop();

					tooltipEl = $(
						`
						<span class="cp-tooltip" style="left:${e.clientX}px; top:${topScroll + rect.top + rect.height + 4}px;">${attr.cpTooltip}</span>
						`
					).hide();
					$('body').append(tooltipEl)

					var width = tooltipEl.width();
					var height = tooltipEl.height();
					var documentWidth = $(document).width();

					var leftPos = rect.left;
					var topPos = topScroll + rect.top + rect.height + 4;

					if((leftPos + width + 10) > documentWidth) {
						leftPos = leftPos - (width + 15);
					}

					if((topPos + height) > window.innerHeight) {
						topPos = topPos - (height + 40);
					}

					tooltipEl.css({
						left: leftPos,
						top: topPos
					}).show();
				}

				function dismissTooltip() {
					if(timeout2) clearTimeout(timeout2);
					timeout2 = setTimeout(function() {
						clearTimeout(timeout1);
						closeTooltip();
					}, instant ? 100 : 500);
				}

				function closeTooltip() {
					tooltipDisplayed = false;
					if(tooltipEl) tooltipEl.remove();
				}
			}
		}
	});
