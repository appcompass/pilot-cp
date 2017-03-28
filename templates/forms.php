<?php include('header.php'); ?>

	<div class="row">
		<div class="xsmall-12 columns">
			<div class="page-header">
				<h1 class="page-title">Form Examples</h1>	
			</div><!-- page-header -->
		
			<div>
				<label>Text <span class="required">*</span></label>
				<input type="text" class="error">
				<ul class="form-error">
					<li>This field is required</li>
				</ul>
			</div>
			<div>
				<label>Password</label>
				<div class="input-desc">This is an input description.</div>
				<input type="password">
			</div>
			<div>
				<label>Textarea</label>
				<textarea rows="8"></textarea>
			</div>
			<div>
				<label>Date</label>
				<input type="date">
			</div>
			<div>
				<label>Date Time</label>
				<input type="datetime-local">
			</div>
			<div>
				<label>Time</label>
				<input type="time">
			</div>
			<div>
				<label>Select</label>
				<div class="select">
					<select>
						<option value="">Item 1</option>
						<option value="">Item 2</option>
						<option value="">Item 3</option>
					</select>
					<span class="icon-select"></span>
				</div>
			</div>
			<div>
				<input type="checkbox" id="checkbox-single-example">
				<label for="checkbox-single-example">Single Checkbox</label>
			</div>
			<div>
				<label>Checkbox Group</label>
				<ul class="checkbox-group">
					<li>
						<input type="checkbox" id="checkbox-example-1">
						<label for="checkbox-example-1">Checkbox 1</label>
					</li>
					<li>
						<input type="checkbox" id="checkbox-example-2">
						<label for="checkbox-example-2">Checkbox 2</label>
					</li>
				</ul>
			</div>
			<div>
				<label>Checkbox Group Inline</label>
				<ul class="checkbox-group-inline">
					<li>
						<input type="checkbox" id="checkbox-inline-example-1">
						<label for="checkbox-inline-example-1">Checkbox 1</label>
					</li>
					<li>
						<input type="checkbox" id="checkbox-inline-example-2">
						<label for="checkbox-inline-example-2">Checkbox 2</label>
					</li>
				</ul>
			</div>
			<div>
				<label>Radio Group</label>
				<ul class="radio-group">
					<li>
						<input type="Radio" id="radio-example-1" name="radio-group">
						<label for="radio-example-1" >Radio 1</label>
					</li>
					<li>
						<input type="Radio" id="radio-example-2" name="radio-group">
						<label for="radio-example-2">Radio 2</label>
					</li>
				</ul>
			</div>
			<div>
				<label>Radio Group Inline</label>
				<ul class="radio-group-inline">
					<li>
						<input type="Radio" id="radio-inline-example-1" name="radio-group-inline">
						<label for="radio-inline-example-1">Radio 1</label>
					</li>
					<li>
						<input type="Radio" id="radio-inline-example-2" name="radio-group-inline">
						<label for="radio-inline-example-2">Radio 2</label>
					</li>
				</ul>
			</div>
			<div>
				<label>File</label>
				<div class="file-input">
					<input type="file" id="file">
					<label for="file">Choose File</label>
					<div class="file-input-value">
						<span class="file-input-image">
							<span class="file-input-remove icon-cancel"></span>
							<img src="http://placehold.it/320x213" width="320" height="213">
						</span>
					</div>
				</div>
			</div>
			<div>
				<label>Repeatable Fieldset</label>
				<div class="repeatable-fieldset">
					<table>
						<thead>
							<tr>
								<th>Key <div class="input-desc">This is an input description.</div></th>
								<th>Value <div class="input-desc">This is an input description.</div></th>
								<th class="rf-actions"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input type="text"></td>
								<td><input type="text"></td>
								<td class="rf-actions"><a class="link-icon link-red"><span class="icon-delete"></span></a></td>
							</tr>
							<tr>
								<td>
									<div class="select">
										<select>
											<option value="">Item 1</option>
											<option value="">Item 2</option>
											<option value="">Item 3</option>
										</select>
										<span class="icon-select"></span>
									</div>
								</td>
								<td>
									<div class="file-input">
										<input type="file" id="file-rf">
										<label for="file-rf">Choose File</label>
										<div class="file-input-value">
											<span class="file-input-image">
												<span class="file-input-remove icon-cancel"></span>
												<img src="http://placehold.it/100x100" width="100" height="100">
											</span>
										</div>
									</div>
								</td>
								<td class="rf-actions"><a class="link-icon link-red"><span class="icon-delete"></span></a></td>
							</tr>
							<tr>
								<td>
									<input type="checkbox" id="checkbox-rf-example">
									<label for="checkbox-rf-example">Check me</label>
								</td>
								<td>
									<ul class="radio-group-inline">
										<li>
											<input type="Radio" id="radio-rf-example-1" name="radio-group-rf">
											<label for="radio-rf-example-1">Radio 1</label>
										</li>
										<li>
											<input type="Radio" id="radio-rf-example-2" name="radio-group-rf">
											<label for="radio-rf-example-2">Radio 2</label>
										</li>
									</ul>
								</td>
								<td class="rf-actions"><a class="link-icon link-red"><span class="icon-delete"></span></a></td>
							</tr>
						</tbody>
					</table>
					<button class="btn-secondary">Add Row</button>
				</div><!--repeatable-fieldset -->
			</div>

			<div>
				<label>Fieldset</label>
				<div class="fieldset draggable">
					<div class="fieldset-header">
						<div class="fieldset-heading">Fieldset Heading</div>
						<div class="input-desc">Fieldset Heading</div>
						<div class="fieldset-header-actions">
							<span class="icon icon-delete"></span>
							<span class="icon icon-box-down"></span>
						</div>
					</div>
					<div class="fieldset-fields">
						<div>
							<label for="">Label</label>
							<input type="text">
						</div>
						<div>
							<label for="">Form Field Name</label>
							<input type="text">
						</div>
						<div>
							<label for="">Addtional Classes</label>
							<input type="text">
						</div>
						<div>
							<input type="checkbox" id="required-example">
							<label for="required-example">Required</label>
						</div>
						<div>
							<label for="">Placeholder</label>
							<input type="text">
						</div>
					</div>
				</div><!-- fieldset -->
			</div>


			<div>
				<label>Wysiwyg</label>
				<div class="editor">
					<div class="editor-place">
						Edit me.
					</div>
				</div>
				<!-- QUILL -->
				<link href="//cdn.quilljs.com/1.2.2/quill.snow.css" rel="stylesheet">
				<script src="//cdn.quilljs.com/1.2.2/quill.min.js"></script>
				<script>
					var quill = new Quill('.editor-place', {
						theme: 'snow'
					});
				</script>
			</div>

			<div>
				<label>Add Link</label>
				<div class="link-inputs">
					<div class="row">
						<div class="xsmall-6 columns">
							<div class="select link-types">
								<select>
									<option value="">Select Link Type</option>
									<option value="page-link">Page Link</option>
									<option value="product-link">Product Link</option>
									<option value="external-link">External Link</option>
								</select>
								<span class="icon-select"></span>
							</div>
						</div>
						<div class="xsmall-6 columns">
							<div id="page-link" class="select link-type">
								<select>
									<option value="">Select Page Link</option>
									<option value="">About</option>
									<option value="">Home</option>
								</select>
								<span class="icon-select"></span>
							</div>
							<div id="product-link" class="select link-type">
								<select>
									<option value="">Select Product Link</option>
									<option value="">About</option>
									<option value="">Home</option>
								</select>
								<span class="icon-select"></span>
							</div>
							<div id="external-link" class="link-type">
								<input type="text">
							</div>
						</div>
					</div>
				</div><!-- link-inputs -->
			</div>

			<div>
				<label>Link Text</label>
				<div class="row">
					<div class="xsmall-6 columns">
						<input type="text">
					</div>
					<div class="xsmall-6 columns">
						<div class="checkbox-align-input">
							<input type="checkbox" id="checkbox-tab-example">
							<label for="checkbox-tab-example">Open in new tab</label>
						</div>
					</div>
				</div>
			</div>
			<div>
				<label>Media Upload/Selection</label>
				<div class="add-media">
					<button class="btn-secondary add-media-btn">Add Media</button></p>
				</div>
			</div>
			<div>
				<label><span class="required">Searchable Dropdown</span></label>
			</div>
			<div>
				<label><span class="required">Searchable Textarea</span></label>
			</div>
			<div>
				<label><span class="required">Syntax Highlighted Textarea</span></label>
			</div>

		</div>
	</div>

	<div class="add-media-modal-holder hide">
		<div class="add-media-header">
			<h2 class="add-media-heading">Add Media</h2>
			<span class="add-media-header-close"><span class="icon-cancel"></span></span>
		</div>
		<div class="add-media-content">
			<div class="upload-drop">Drop files here to upload.</div>
			
			<div class="data-actions-container">
				<div class="data-actions">
					<form class="data-actions-select">
						<div class="select">
							<select>
								<option value="">All Images</option>
								<option value="">Gallery 1</option>
								<option value="">Gallery 2</option>
							</select>
							<span class="icon-select"></span>
						</div>
					</form>

					<div class="data-actions-view">
						<a href="#" class="data-list-view"><span class="icon-table"></span></a>
						<a href="#" class="data-grid-view is-active"><span class="icon-card"></span></a>
					</div>

					<form class="data-actions-search">
						<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="Search"></span></div>
					</form>
				</div>
			</div>
			<div class="view-container">
				<div class="media-cards">
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/320x213" width="320" height="213">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>

					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/100x100" width="100" height="100">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>

					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/600x400" width="600" height="400">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>

					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
					<div class="media-card">
						<a href="#" class="media-card-thumb">
							<span class="thumb-container">
								<span class="thumb-center">
									<img src="http://placehold.it/400x600" width="400" height="600">
								</span>
							</span>
						</a>
						<ul class="media-card-info">
							<li><span>Status:</span> Active</li>
							<li><span>Type:</span> N/A</li>
							<li><span>Dimensions:</span> 3264 x 2448</li>
							<li><span>Uploaded By:</span> Michael</li>
							<li><span>Uploaded On:</span> 2017-10-07</li>
						</ul>
						<div class="media-card-actions">
							<input type="checkbox" class="media-card-checkbox left">
							<a href="#" class="media-card-delete right"><span class="icon-delete"></span> Delete</a>
						</div>
					</div>
				</div><!-- media-cards -->
			</div><!-- view-container -->
		</div><!-- add-media-content -->
	</div><!-- add-media-modal-holder -->

	<script src="https://cdnjs.cloudflare.com/ajax/libs/tingle/0.9.0/tingle.min.js"></script>
	<script type="text/javascript">
		/* Add Media Modal
		---------------------------------------------------------------------- */
		var mediaModal = new tingle.modal({
		    cssClass: ['add-media-modal'],
		    footer: true,
		    stickyFooter: true,
		    onOpen: function() {
		        var mediaModalClose = document.querySelector('.add-media-header-close');
				mediaModalClose.addEventListener('click', function(){
					mediaModal.close();
				});
		    },
		});

		var mediaModalLink = document.querySelector('.add-media-btn');
		mediaModalLink.addEventListener('click', function(){
			mediaModal.open();
		});

		mediaModal.setContent(document.querySelector('.add-media-modal-holder').innerHTML);
		mediaModal.setFooterContent('<button class="btn-primary btn-save-media">Add Media</button>');
	</script>


<?php include('footer.php'); ?>	