<!-- $lib/components/EmailForm.svelte -->

<script lang="ts">
  let email = '';

  function handleSubmit(event: Event) {
    event.preventDefault();
    console.log('Submitted email:', email);
  }
</script>

<form on:submit={handleSubmit} class="w-full max-w-2xl flex flex-col sm:flex-row gap-4">
  <div class="sm:w-2/3">
    <input
      type="email"
      placeholder="ernie@hemingway.me"
      bind:value={email}
      class="w-full px-6 py-4 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-xl"
      required
    />
  </div>
  <div class="sm:w-1/3">
    <button
      type="submit"
      class="w-full px-8 py-4 rounded-full text-white font-semibold bg-gradient-to-r from-[#3644FE] to-[#B345ED] hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50 transition-all duration-200 text-xl whitespace-nowrap"
      disabled={!email.trim()}
    >
      Loop me in
    </button>
  </div>
</form>