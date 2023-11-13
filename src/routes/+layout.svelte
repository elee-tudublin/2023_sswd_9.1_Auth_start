<script>
// @ts-nocheck


  // logout() function - sign out and invalidate the session
  async function logout() {
    await supabase.auth.signOut();
  }

</script>

<nav class="navbar navbar-expand-sm navbar-dark bg-dark static-top">
    <ul class="navbar-nav ml-auto">
        <li class="nav-item">
            <a class="nav-link" href="/">Home</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/about">About</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/contact">Contact</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/locations">Locations</a>
        </li>
        <li class="nav-item">
            <a class="nav-link" href="/register">Register</a>
        </li>
    </ul>
</nav>
<style>
	nav a {
		color: yellow;
	}
    .btn-color {
        color: yellow;
    }


</style>

<slot />
