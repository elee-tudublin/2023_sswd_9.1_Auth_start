<script>
	/** @type {import('./$types').PageData} */

	// dependencies
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// create form instance
	const { form, errors, enhance, delayed, message, constraints, reset } = superForm(data.form);
</script>

<div class="m-5">
	<!-- Otherwise show the form -->
  {#if $message}
  <p>{$message}</p>
  {/if}
	<h1>Sign up and register</h1>
	<!-- Bootstrap Form Layout-->
	<div class="w-75 mw-300 p-3">
		<!-- this form will post when submitted -->
		<form method="POST" use:enhance>

			<!-- email -->
			<div class="mb-3">
				<label for="email" class="form-label">Email</label>
				<input type="email" name="email" class="form-control" bind:value={$form.email} />
			</div>

			<!-- password -->
			<div class="mb-3">
				<label for="password" class="form-label">Password</label>
				<input type="password" name="password" class="form-control" bind:value={$form.password} />
			</div>

			<!-- submit button -->
			<div class="mb-3 mt-3">
				<button class="btn btn-primary">Register</button>
			</div>
		</form>
	</div>
</div>