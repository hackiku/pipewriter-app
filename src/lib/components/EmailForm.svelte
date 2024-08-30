<!-- $lib/components/EmailForm.svelte -->

<script lang="ts">
  let email = '';

  function handleSubmit(event: Event) {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Submitted email:', email);
  }
</script>

<form on:submit={handleSubmit} class="w-full max-w-md flex space-x-2">
  <input
    type="email"
    placeholder="ernie@hemingway.app"
    bind:value={email}
    class="flex-1 px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    required
  />
  <button
    type="submit"
    class="px-6 py-2 rounded-r-full text-white font-semibold bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200"
    disabled={!email.trim()}
  >
    Loop me in
  </button>
</form>