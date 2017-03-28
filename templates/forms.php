<?php include('header.php'); ?>

	<div class="row">
		<div class="xsmall-12 columns">
			<div class="page-header">
				<h1 class="page-title">Form Examples</h1>	
			</div><!-- page-header -->
			<form>
				<div>
					<label>Text <span class="required">*</span></label>
					<input type="text" class="error">
					<div class="form-error">This field is required</div>
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
					<label>Dynamic Key Value Fieldset</label>
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
									<td class="rf-actions"><a class="link-icon link-red"><span class="icon-cancel"></span></a></td>
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
									<td class="rf-actions"><a class="link-icon link-red"><span class="icon-cancel"></span></a></td>
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
									<td class="rf-actions"><a class="link-icon link-red"><span class="icon-cancel"></span></a></td>
								</tr>
							</tbody>
						</table>
						<button class="btn-secondary">Add Row</button>
					</div><!--repeatable-fieldset -->
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
				<div>
					<label><span class="required">Media Upload/Selection (can select from gallery or upload via Dropzone)</span></label>
				</div>
				<div>
					<label><span class="required">Wysiwyg</span></label>
				</div>
				<div>
					<label><span class="required">Add Link Field</span></label>
				</div>
				<div>
					<label><span class="required">Repeatable Fieldset</span></label>
				</div>

			</form>
		</div>
	</div>

<?php include('footer.php'); ?>	