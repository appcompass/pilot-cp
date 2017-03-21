<?php include('header.php'); ?>


	<div class="row">
		<div class="xsmall-12 columns">
			
			<div class="page-header no-border">
				<div class="row">
					<div class="xsmall-8 columns">
						<h1 class="page-title">Images</h1>
					</div>
					<div class="xsmall-4 columns text-right">
						<p><a href="#" class="btn-primary">Add New</a></p>
					</div>
				</div>
				<div class="upload-drop">Drop files here to upload.</div>
			</div><!-- page-header -->

			<div class="data-actions-container">
				<div class="data-actions">
					<form class="data-actions-bulk">
						<div class="select">
							<select>
								<option value="">Bulk Actions</option>
								<option value="delete">Delete</option>
								<option value="edit">Edit</option>
							</select>
							<span class="icon-select"></span>
						</div>
						<button class="btn-secondary" type="submit">Update</button>
					</form>

					<div class="data-actions-filters-toggle">
						<a href="#" class="data-actions-filters-trigger"><span class="icon-filters"></span> <span class="data-actions-filters-label">Filter Results</span></a>
					</div>

					<div class="data-actions-view">
						<a href="#" class="data-list-view"><span class="icon-list"></span></a>
						<a href="#" class="data-grid-view is-active"><span class="icon-grid"></span></a>
					</div>

					<form class="data-actions-search">
						<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="Search"></span></div>
					</form>
				</div>
					
				<div class="data-actions-filters">
					<form>
						<div class="row">
							<div class="xsmall-6 columns">
								<label for="">Label</label>
								<input type="text">
							</div>
							<div class="xsmall-6 columns">
								<label for="">Label</label>
								<input type="text">
							</div>
						</div>
						<div class="row">
							<div class="xsmall-12 columns">
								<button class="btn-primary">Apply Filters</button>
								<a href="#" class="data-actions-filters-clear">Remove Filters</a>
							</div>
						</div>
					</form>
				</div>
			</div><!-- data-actions-container -->

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
					
			</div><!-- media-cards -->
		</div>
	</div>

<?php include('footer.php'); ?>	