<!-- src/lib/(space)/repacks/firefly/components/mission/MissionBrief.svelte -->
<script lang="ts">
  export let data: {
    name: string;
    type: string;
    customer: string;
    spacecraft: string;
    launchVehicle: string;
    launchSite: string;
    launchDate: string;
    launchTime: string;
    landingSite: string;
    landingDate: string;
  };
</script>

<div class="grid md:grid-cols-2 gap-x-12 gap-y-4 text-sm">
  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Mission Name:</h3>
      <span class="text-white">{data.name}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Mission Type:</h3>
      <span class="text-white">{data.type}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Customer:</h3>
      <span class="text-white">{data.customer}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Spacecraft:</h3>
      <span class="text-white">{data.spacecraft}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Launch Vehicle:</h3>
      <span class="text-white">{data.launchVehicle}</span>
    </div>
  </div>

  <div class="space-y-3">
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Launch Site:</h3>
      <span class="text-white">{data.launchSite}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Launch Date:</h3>
      <span class="text-white">{data.launchDate}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Launch Time:</h3>
      <span class="text-white">{data.launchTime}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Landing Site:</h3>
      <span class="text-white">{data.landingSite}</span>
    </div>
    <div class="grid grid-cols-2 gap-2">
      <h3 class="text-[#F5FF00]/70">Landing Date:</h3>
      <span class="text-white">{data.landingDate}</span>
    </div>
  </div>
</div>
