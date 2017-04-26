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
						<h1 class="page-title">Redirects</h1>
					</div>
					<div class="xsmall-4 columns text-right">
						<p><a href="#" class="btn-primary">Add New</a></p>
					</div>
				</div>
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
						<a href="#" class="data-actions-filters-trigger"><span class="icon-filters"></span> Filter Results</a>
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

			<div class="view-container">
				<div class="table-container">
					<table class="table-default">
						<thead>
							<tr>
								<th><input type="checkbox" name="" value=""></th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort is-active">From <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="FIRST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort">To <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="LAST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort">Type <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="LAST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort">Created <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="LAST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort">Updated <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="LAST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th width="1"></th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><div class="form-swap-value"><input type="checkbox" name="" value=""></div></td>
								<td>
									<div class="form-swap-value">/about</div>
									<div class="form-swap-input"><input type="text" value="/about"></div>
								</td>
								<td>
									<div class="form-swap-value">/team</div>
									<div class="form-swap-input"><input type="text" value="/team"></div>
								</td>
								<td>
									<div class="form-swap-value">301</div>
									<div class="form-swap-input">
										<div class="select">
											<select>
												<option value="">301</option>
												<option value="">300</option>
											</select>
											<span class="icon-select"></span>
										</div>
									</div>
								</td>
								<td><div class="form-swap-value">Created</div></td>
								<td><div class="form-swap-value">Updated</div></td>
								<td>
									<div class="table-row-actions">
										<div class="form-swap-value"><a href="#" class="link-primary form-swap-trigger">Edit</a> | <a href="#" class="link-red">Delete</a></div> 
										<div class="form-swap-input"><a href="#" class="btn btn-primary form-swap-trigger">Save</a></div> 
									</div>
								</td>
							</tr>
							<tr>
								<td><div class="form-swap-value"><input type="checkbox" name="" value=""></div></td>
								<td>
									<div class="form-swap-value">/about</div>
									<div class="form-swap-input"><input type="text" value="/about"></div>
								</td>
								<td>
									<div class="form-swap-value">/team</div>
									<div class="form-swap-input"><input type="text" value="/team"></div>
								</td>
								<td>
									<div class="form-swap-value">301</div>
									<div class="form-swap-input">
										<div class="select">
											<select>
												<option value="">301</option>
												<option value="">300</option>
											</select>
											<span class="icon-select"></span>
										</div>
									</div>
								</td>
								<td><div class="form-swap-value">Created</div></td>
								<td><div class="form-swap-value">Updated</div></td>
								<td>
									<div class="table-row-actions">
										<div class="form-swap-value"><a href="#" class="link-primary form-swap-trigger">Edit</a> | <a href="#" class="link-red">Delete</a></div> 
										<div class="form-swap-input"><a href="#" class="btn btn-primary form-swap-trigger">Save</a></div> 
									</div>
								</td>
							</tr>
						</tbody>
					</table>
					<div class="table-save">
						<button class="btn-primary">Save</button>
					</div>
				</div><!-- table-container -->
			</div><!-- view-container-->
		</div>
	</div>

<?php include('footer.php'); ?>	