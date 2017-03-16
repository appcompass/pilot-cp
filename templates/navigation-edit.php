<?php include('header.php'); ?>

<main class="main">
	<div class="row">
		<div class="xsmall-12 columns">
			
			<div class="page-header">
				<div class="row">
					<div class="xsmall-8 columns">
						<h1 class="page-title">Navigation Edit</h1>
					</div>
					<div class="xsmall-4 columns text-right">
						<p><a href="#" class="btn-primary">Add New</a></p>
					</div>
				</div>
			</div><!-- page-header -->

			
			<div class="row">
				<div class="xsmall-4 columns">
					<div class="nav-options-pages">
						<div class="nav-options-header">
							<h2 class="nav-options-title">Pages</h2>
						</div>
						<ul class="nav-option-list">
							<li>
								<div class="nav-option-item">Home</div>
							</li>
							<li>
								<div class="nav-option-item">About Us</div>
							</li>
							<li>
								<div class="nav-option-item">Services</div>
							</li>
							<li>
								<div class="nav-option-item">Contact</div>
							</li>
						</ul>
					</div><!-- nav-options-pages -->

					<div class="nav-options-links">
						<div class="nav-options-header">
							<h2 class="nav-options-title">Links</h2>
							<a href="#" class="btn-secondary btn-small nav-options-trigger">Add Link</a>
						</div>
						<form class="nav-options-form">
							<input type="text" placeholder="Title">
							<input type="text" placeholder="URL">
							<p><button class="btn-primary" type="submit">Save Link</button></p>
						</form>
						<ul class="nav-option-list">
							<li>
								<div class="nav-option-item">
									Custom Link 
									<span class="nav-option-item-actions">
										<span class="icon icon-delete"></span>
									</span>
								</div>
							</li>
							<li>
								<div class="nav-option-item">
									Custom Link 
									<span class="nav-option-item-actions">
										<span class="icon icon-delete"></span>
									</span>
								</div>
							</li>
							<li>
								<div class="nav-option-item">
									Custom Link 
									<span class="nav-option-item-actions">
										<span class="icon icon-delete"></span>
									</span>
								</div>
							</li>
							<li>
								<div class="nav-option-item">
									Custom Link with a really long name that is way too long
									<span class="nav-option-item-actions">
										<span class="icon icon-delete"></span>
									</span>
								</div>
							</li>
						</ul>
					</div><!-- nav-options-links -->
				</div>
				<div class="xsmall-8 medium-7 medium-push-1 columns">
					<div class="nav-pages">
						<h2>Main Nav</h2>
						<ul class="nav-list">
							<li>
								<div class="nav-item">
									<div class="nav-item-header">Home <span class="nav-item-actions"><span class="icon icon-edit"></span></span></div>
									<form class="nav-item-form">
										<label for="">Label</label>
										<input type="text" value="Home">
										<label for="">Icon</label>
										<input type="text" value="icon-home">
										<div><input type="checkbox"> <label>Open in new Tab</label></div>
										<div><input type="checkbox"> <label>Clickable</label></div>
										<div class="nav-item-form-actions">
											<button class="btn-primary left">Save</button> 
											<a href="#" class="link-text-secondary left">Cancel</a> 
											<a href="#" class="link-red link-icon right"><span class="icon-delete"></span> Delete</a>
										</div>
									</form>
								</div>
							</li>
							<li>
								<div class="nav-item">
									<div class="nav-item-header">About <span class="nav-item-actions"><span class="icon icon-edit"></span><span class="icon icon-box-down"></span></span></div>
									<form class="nav-item-form">
										<label for="">Label</label>
										<input type="text" value="Home">
										<label for="">Icon</label>
										<input type="text" value="icon-home">
										<div><input type="checkbox"> <label>Open in new Tab</label></div>
										<div><input type="checkbox"> <label>Clickable</label></div>
										<div class="nav-item-form-actions">
											<button class="btn-primary left">Save</button> 
											<a href="#" class="link-text-secondary left">Cancel</a> 
											<a href="#" class="link-red link-icon right"><span class="icon-delete"></span> Delete</a>
										</div>
									</form>
								</div>
								<ul>
									<li>
										<div class="nav-item">
											<div class="nav-item-header">Team <span class="nav-item-actions"><span class="icon icon-edit"></span></span></div>
											<form class="nav-item-form">
												<label for="">Label</label>
												<input type="text" value="Home">
												<label for="">Icon</label>
												<input type="text" value="icon-home">
												<div><input type="checkbox"> <label>Open in new Tab</label></div>
												<div><input type="checkbox"> <label>Clickable</label></div>
												<div class="nav-item-form-actions">
													<button class="btn-primary left">Save</button> 
													<a href="#" class="link-text-secondary left">Cancel</a> 
													<a href="#" class="link-red link-icon right"><span class="icon-delete"></span> Delete</a>
												</div>
											</form>
										</div>
									</li>
								</ul>
							</li>
							<li>
								<div class="nav-item">
									<div class="nav-item-header">Page with a really long name, like this one right here, but this name is way too long. <span class="nav-item-actions"><span class="icon icon-edit"></span></div>
									<form class="nav-item-form">
										<label for="">Label</label>
										<input type="text" value="Home">
										<label for="">Icon</label>
										<input type="text" value="icon-home">
										<div><input type="checkbox"> <label>Open in new Tab</label></div>
										<div><input type="checkbox"> <label>Clickable</label></div>
										<div class="nav-item-form-actions">
											<button class="btn-primary left">Save</button> 
											<a href="#" class="link-text-secondary left">Cancel</a> 
											<a href="#" class="link-red link-icon right"><span class="icon-delete"></span> Delete</a>
										</div>
									</form>
								</div>
							</li>
							<li>
								<div class="nav-list-empty">Drag items from the left into your menu.</div>
							</li>
						</ul>
						<button class="btn-primary" type="submit">Save</button>
					</div><!-- nav-pages -->	
				</div>
			</div>

		</div>
	</div>
</main>

<?php include('footer.php'); ?>	