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
						<h1 class="page-title">Users</h1>
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
									<span class="table-sort is-active">First Name <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="FIRST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span>
									<span class="table-sort">Last Name <span class="arrow-down"></span></span>
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="LAST NAME"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>
									<span class="icon-search table-column-search-trigger"></span> Email
									<form class="table-column-search">
										<div class="search-input"><span class="icon-search"></span><input type="search" placeholder="EMAIL"><span class="icon-cancel"></span></div>
									</form>
								</th>
								<th>Phone Number</th>
								<th>Date Added</th>
							</tr>
						</thead>
						<tbody>
							<tr>
								<td><input type="checkbox" name="" value=""></td>
								<td>
									<a href="#" class="table-user-avatar"><img src="assets/images/avatar_temp.png" width="32" height="32"></a>
									<a href="#" class="table-row-link"><b>Imene</b></a>
									<div class="table-row-actions"><a href="#" class="link-primary">Edit</a> | <a href="#" class="link-red">Delete</a></div>
								</td>
								<td>Saidi</td>
								<td><a href="">imene@email.com</a></td>
								<td>456-450-6009</td>
								<td>2017-01-27</td>
							</tr>
							<tr>
								<td><input type="checkbox" name="" value=""></td>
								<td>
									<a href="#" class="table-user-avatar"><span class="icon icon-user"></span></a>
									<a href="#" class="table-row-link"><b>Imene</b></a>
									<div class="table-row-actions"><a href="#" class="link-primary">Edit</a> | <a href="#" class="link-red">Delete</a></div>
								</td>
								<td>Saidi</td>
								<td><a href="">imene@email.com</a></td>
								<td>456-450-6009</td>
								<td>2017-01-27</td>
							</tr>
						</tbody>
					</table>
				</div><!-- table-container -->
				<div class="pagination">
					<ul>
						<li class="prev is-disabled"><a href="#"><span class="icon-arrow-back"></span></a></li>
						<li class="is-active"><a href="#">1</a></li>
						<li><a href="#">2</a></li>
						<li><a href="#">3</a></li>
						<li><a href="#">4</a></li>
						<li><a href="#">5</a></li>
						<li>...</li>
						<li><a href="#">23</a></li>
						<li class="next"><a href="#">Next <span class="icon-arrow-forward"></span></a></li>
					</ul>
				</div><!--pagination -->
			</div><!-- view-container-->
		</div>
	</div>

<?php include('footer.php'); ?>	