// @codekit-prepend "../../bower_components/";

(function($) {

	/* Navigation
	---------------------------------------------------------------------- */

	$('.search-input .icon-search').on('click', function() {
 		$(this).next().focus();	
	});


	/* Notifications
	---------------------------------------------------------------------- */

	$('.notifications-toggle, .notifications-close').on('click', function(e) {
		e.preventDefault();
		$('.notifications-toggle, .notifications-panel').toggleClass('is-active');	
	});

	$('.notifications-category-header').on('click', function(e) {
		e.preventDefault();
		$(this).parent().toggleClass('is-active');	
	});


	/* Table
	---------------------------------------------------------------------- */

	$('.table-sort').on('click', function(e) {
		e.preventDefault();
		if($(this).hasClass('is-active')) {
			$(this).toggleClass('is-reverse');
		} else {
			$(this).closest('tr').find('.table-sort').removeClass('is-active');
			$(this).addClass('is-active');
		}
	});

	$('.data-actions-filters-trigger').on('click', function(e) {
		e.preventDefault();
		$(this).add('.data-actions-filters').toggleClass('is-active');
	});

	$('.table-column-search-trigger').on('click', function(e) {
		e.preventDefault();
		$(this).parent().find('.table-column-search').addClass('is-active');
	});

	$('.table-column-search .icon-cancel').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.table-column-search').removeClass('is-active');
	});


	/* Tabs
	---------------------------------------------------------------------- */

	$('.page-tab').on('click', function(e) {
		e.preventDefault();
		var getTab = $(this).attr('href');
		$(this).parent().find('.page-tab').removeClass('is-active');
		$(this).parent().siblings('.tab-section').removeClass('is-active');
		$(this).addClass('is-active');
		$(getTab).addClass('is-active');
	});


	/* Navigation
	---------------------------------------------------------------------- */

	$('.nav-options-trigger').on('click', function(e) {
		e.preventDefault();
		$(this).parent().siblings('.nav-options-form').toggleClass('is-active');
	});

	$('.nav-item-actions .icon-edit').on('click', function(e) {
		e.preventDefault(); 
		$(this).closest('.nav-item').toggleClass('is-active');
	});

	$('.nav-item-actions .icon-box-down').on('click', function(e) {
		e.preventDefault();
		$(this).closest('li').toggleClass('hide-children'); 
	});


})(jQuery);