<?php include('header.php'); ?>

<main class="main">
	<div class="row">
		<div class="xsmall-12 columns">
			
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

			<div class="page-tabs">
				<a href="#profile-section" class="page-tab is-active">Profile</a>
				<a href="#permissions-section" class="page-tab">Permissions</a>
				<a href="#groups-section" class="page-tab">Groups</a>
			</div><!-- page-tabs -->

			<div id="profile-section" class="tab-section is-active">
				<form>
					<div class="row">
						<div class="xsmall-9 medium-7 large-5 columns">
							<label for="">First Name</label>
							<input type="text" value="John">
							<label for="">Last Name</label>
							<input type="text" value="Doe">
							<label for="">Email</label>
							<input type="email" value="john@doe.com">
							<label for="">Phone</label>
							<input type="text" value="(341) 754-5670">
							<label for="">New Password</label>
							<input type="password" value="">
							<label for="">Confirm New Password</label>
							<input type="password" value="">
							<button type="submit" class="btn-primary">Save</button>
						</div>
					</div>
				</form>
			</div><!-- profile-section -->

			<div id="permissions-section" class="tab-section">
				permissions
			</div><!-- permissions-section -->

			<div id="groups-section" class="tab-section">
				groups
			</div><!-- groups-section -->

		</div>
	</div>
</main>

<?php include('footer.php'); ?>	