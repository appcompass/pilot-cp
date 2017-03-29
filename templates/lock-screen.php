<?php include('header.php'); ?>

	<div style="height:2000px;">Testing Lock Screen.</div>

	<div class="lock-screen-modal-container hide">	
		<div class="lock-screen-user">
			<div class="user-avatar"><img src="assets/images/avatar_temp.png" width="50" height="50"></div>
			<div class="lock-screen-username">john@example.com</div>
		</div>
		<div class="lock-screen-content">
			<h1>You've been Idle</h1>
			<form>
				<label for="">Enter your password</label>
				<input type="password">
				<div class="align-space-between">
					<button class="btn-primary" type="submit">Continue</button>
					<a href="#" class="link-text-tertiary">Go to Log In</a>
				</div>
			</form>
		</div>
	</div>

	<script src="https://cdnjs.cloudflare.com/ajax/libs/tingle/0.9.0/tingle.min.js"></script>
	<script type="text/javascript">
		/* Lock Screen Modal
		---------------------------------------------------------------------- */

		var lockScreenModal = new tingle.modal({
		    cssClass: ['lock-screen-modal'],
		     beforeClose: function() {
		     	return false;
		     }
		});

		var lockScreenBlur = document.querySelector('.site');
		lockScreenBlur.className += ' tingle-content-wrapper';
		lockScreenModal.open();
		lockScreenModal.setContent(document.querySelector('.lock-screen-modal-container').innerHTML);
	</script>

<?php include('footer.php'); ?>	