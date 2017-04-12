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

	/* Page Builder
	---------------------------------------------------------------------- */

	$('.page-builder-nav a').on('click', function(e) {
		var target = $(this).attr('href');
		e.preventDefault();
		$('.page-builder-nav li').removeClass('is-active');
		$(this).parent().addClass('is-active');
		$('.sidebar').removeClass('is-active');
		$(target).addClass('is-active');

		if(target === '#sidebar-page-layout') {
			$('.page-builder').addClass('show-layout-ui');
			$('.page-builder').removeClass('hide-layout-ui');
		} else {
			$('.page-builder').addClass('hide-layout-ui');
			$('.page-builder').removeClass('show-layout-ui');
		}
	});

	$('.page-section-edit-header .icon').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.page-section-edit').toggleClass('is-closed');
	});

	$('.page-layout-header .icon').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.page-layout').toggleClass('is-closed');
	});

	$('.hide-layout-ui .page-section').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
	});

	/* Forms
	---------------------------------------------------------------------- */

	//FILE
	$('.file-input input[type="file"]').each(function() {
		fileInputValues($(this));
	});

	$('.file-input input[type="file"]').on('change', function() {
		fileInputValues($(this));
	});

	$('.file-input-remove').on('click', function(e) {
		e.preventDefault();
		var theInput = $(this).parents('.file-input').find('input[type="file"]');
		theInput.val('');
		fileInputValues(theInput);
	});

	function fileInputValues(fileinput) {
		if( fileinput.val() ) {
			fileinput.parent().addClass('has-value');
		} else {
			fileinput.parent().removeClass('has-value');
		}
	}

	//LINK
	$('.link-inputs').each(function() {

		var linkInputs = $(this),
			linkTypeSelect = linkInputs.find('.link-types select'),
			linkType = linkTypeSelect.val();

		if(linkType !== "") {
			linkInputs.find('.link-type').removeClass('is-active');
			linkInputs.find('#' + linkType).addClass('is-active');
		} else {
			linkInputs.find('.link-type').removeClass('is-active');
		}

		$('.link-types select').on('change', function() {
			linkType = $(this).val();
			if(linkType !== "") {
				linkInputs.find('.link-type').removeClass('is-active');
				linkInputs.find('#'+linkType).addClass('is-active');
			} else {
				linkInputs.find('.link-type').removeClass('is-active');
			}
		});
	});

	//FIELDSET
	$('.fieldset-header-actions .icon-box-down').on('click', function(e) {
		e.preventDefault();
		$(this).closest('.fieldset').toggleClass('is-closed');
	});


})(jQuery);
