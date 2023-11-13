<script>
	/** @type {import('./$types').PageData} */

	// dependencies
	import { page } from '$app/stores';
	import { superForm } from 'sveltekit-superforms/client';

	export let data;

	// create form instance
	const { form, errors, enhance, delayed, message, constraints, reset } = superForm(data.form);
	//console.log('data: ', data);
</script>


<div class="m-5">
	<!--Show message after sucessful add location-->
	{#if $message}
		<h4 class="message" class:success={$page.status < 400} class:error={$page.status >= 400}>
			{$message}
		</h4>
		<p>id: {$form.id}</p>
		<p>name: {$form.name}</p>
		<p>description: {$form.description}</p>
		<p>Long,Lat: {$form.longitude}, {$form.latitude}</p>
		<p>shared: {$form.shared}</p>
		<p>shared: {$form.favourite}</p>
		<p><a href="/locations_6">Show Locations</a></p>
	{:else}
	<!-- Otherwise show the form -->
	<h1>Add Location</h1>
	<!-- Bootstrap Form Layout-->
	<div class="w-75 mw-300 p-3">
		<!-- this form will post when submitted -->
		<form method="POST" use:enhance>
			<div class="mb-3">
				<label for="category_id" class="form-label">Category</label>
				<select name="category_id" bind:value={$form.category_id} class="form-select">
					<option value="0">Choose a category</option>
					<!-- Add each caegory to the select -->
					{#each data.categories as cat}
						<option value={cat.id}>{cat.name}</option>
					{/each}
				</select>
			</div>

			<!-- name -->
			<div class="mb-3">
				<label for="name" class="form-label">Name</label>
				<input type="text" name="name" class="form-control" bind:value={$form.name} />
			</div>

			<!-- description -->
			<div class="mb-3">
				<label for="description" class="form-label">Description</label>
				<input type="text" name="description" class="form-control" bind:value={$form.description} />
			</div>

			<!-- longitude -->
			<div class="mb-3">
				<label for="longitude" class="form-label">Longitude</label>
				<input type="text" name="longitude" class="form-control" bind:value={$form.longitude} />
			</div>

			<!-- latitude -->
			<div class="mb-3">
				<label for="latitude" class="form-label">Latitude</label>
				<input type="text" name="latitude" class="form-control" bind:value={$form.latitude} />
			</div>

			<!-- shared -->
			<div class="form-check">
				<input class="form-check-input" type="checkbox" name="shared" bind:checked={$form.shared} />
				<label for="shared" class="form-check-label">Is shared (public)</label>
			</div>

			<!-- favourite -->
			<div class="form-check">
				<input class="form-check-input" type="checkbox" name="favourite" bind:checked={$form.favourite} />
				<label for="shared" class="form-check-label">Favourite</label>
			</div>
			<!-- hidden id -->
			<input type="hidden" bind:value={$form.id}>
						
			<!-- submit button -->
			<div class="mb-3 mt-3">
				<button class="btn btn-primary">Submit</button>
			</div>
		</form>
	</div>
	{/if}
</div>
