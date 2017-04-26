<?php include('header.php'); ?>

	<div class="row">
		<div class="xsmall-12 columns">
			<nav class="breadcrumbs">
				<ul>
					<li><a href="index.php">Dashboard</a></li>
					<li><a href="index.php">Users</a></li>
					<li><span>Michael<span></li>
				</ul>
			</nav>
			<div class="page-header">
				<div class="row">
					<div class="xsmall-8 columns">
						<h1 class="page-title">User Roles</h1>
					</div>
					<div class="xsmall-4 columns text-right">
						<p><a href="#" class="btn-primary">Add New</a></p>
					</div>
				</div>
			</div><!-- page-header -->

			<div class="page-tabs">
				<a href="#info-section" class="page-tab">Info</a>
				<a href="#permissions-section" class="page-tab is-active">Permissions</a>
			</div><!-- page-tabs -->

			<div id="info-section" class="tab-section">
				Info
			</div>
			<div id="permissions-section" class="tab-section is-active">
				<div class="data-actions-container">
					<div class="data-actions">
						<form class="data-actions-search">
							<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="Search"></span></div>
						</form>
					</div>
				</div><!-- data-actions-container -->

				<div class="view-container">
					<div class="table-container">
						<table class="table-default">
							<thead>
								<tr>
									<th><span class="table-sort">Status <span class="arrow-down"></span></span></th>
									<th>
										<span class="icon-search table-column-search-trigger"></span>
										<span class="table-sort is-active">Label <span class="arrow-down"></span></span>
										<form class="table-column-search">
											<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="FIRST NAME"><span class="icon-cancel"></span></div>
										</form>
									</th>
									<th>Description</th>
									<th>Permissions</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>
										<div class="switch switch-small">
											<input id="toggle-1" type="checkbox">
											<label for="toggle-1"></label>
										</div>
									</td>
									<td>Manager</td>
									<td>This is a role description.</td>
									<td>
										<div class="permission-view">
											<a class="permission-view-trigger"><span class="icon-plus"></span> View Permissions</a>
											<div class="permission-view-list">
												<ul>
	                            					<li>Units Edit</li>
	                            					<li>Units Photos Index</li>
	                            					<li>Units Videos Index</li>
	                            					<li>Units Share Photos Index</li>
	                            					<li>Units Ad Maker Listings Edit</li>
	                            					<li>Units Index</li>
	                            					<li>Unit Field Upload Galleries Index</li>
	                            					<li>Unit Shares Manager Index</li>
	                            					<li>Ad Maker Listings Index</li>
	                            					<li>Units Ad Maker Listings Index</li>
	                            					<li>Ad Maker Listings Create</li>
	                            					<li>Ad Maker Listings Show</li>
	                            					<li>Ad Maker Listings Edit</li>
	                            					<li>Units Ad Maker Listings Create</li>
	                            					<li>Units Ad Maker Listings Show</li>
	                            					<li>Unit Index</li>
	                            					<li>Units Galleries Index</li>
	                            					<li>Units Galleries Edit</li>
	                            					<li>Units Galleries Photos Index</li>
	                            					<li>Units Galleries Photos Create</li>
	                            					<li>Units Galleries Photos Edit</li>
	                            					<li>Units Galleries Videos Index</li>
	                            					<li>Units Galleries Videos Create</li>
	                            					<li>Units Galleries Videos Edit</li>
	                            					<li>Alerts: Info Level</li>
	                        					</ul>
											</div>
										</div>
									</td>
								</tr>
								<tr>
									<td>
										<div class="switch switch-small">
											<input id="toggle-2" type="checkbox">
											<label for="toggle-2"></label>
										</div>
									</td>
									<td>Manager</td>
									<td>This is a role description.</td>
									<td>
										<div class="permission-view">
											<a class="permission-view-trigger"><span class="icon-plus"></span> View Permissions</a>
											<div class="permission-view-list">
												<ul>
	                            					<li>Units Edit</li>
	                            					<li>Units Photos Index</li>
	                            					<li>Units Videos Index</li>
	                            					<li>Units Share Photos Index</li>
	                            					<li>Units Ad Maker Listings Edit</li>
	                            					<li>Units Index</li>
	                            					<li>Unit Field Upload Galleries Index</li>
	                            					<li>Unit Shares Manager Index</li>
	                            					<li>Ad Maker Listings Index</li>
	                            					<li>Units Ad Maker Listings Index</li>
	                            					<li>Ad Maker Listings Create</li>
	                            					<li>Ad Maker Listings Show</li>
	                            					<li>Ad Maker Listings Edit</li>
	                            					<li>Units Ad Maker Listings Create</li>
	                            					<li>Units Ad Maker Listings Show</li>
	                            					<li>Unit Index</li>
	                            					<li>Units Galleries Index</li>
	                            					<li>Units Galleries Edit</li>
	                            					<li>Units Galleries Photos Index</li>
	                            					<li>Units Galleries Photos Create</li>
	                            					<li>Units Galleries Photos Edit</li>
	                            					<li>Units Galleries Videos Index</li>
	                            					<li>Units Galleries Videos Create</li>
	                            					<li>Units Galleries Videos Edit</li>
	                            					<li>Alerts: Info Level</li>
	                        					</ul>
											</div>
										</div>
									</td>
								</tr>
							</tbody>
						</table>
					</div><!-- table-container -->
				</div><!-- view-container-->
			</div>
		</div>
	</div>

<?php include('footer.php'); ?>	