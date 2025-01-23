---
title: "How I Redesigned Firefly Aerospace: A UX Case Study"
date: "January 24, 2025"
category: "Case Studies"
excerpt: "When your redesign project turns into acoustic analysis of rocket engines. A story about space UX, sound frequencies, and finding your niche."
readingTime: "7 min read"
author: {
  name: "Ivan K.",
  avatar: "/images/avatar.jpg"
}
---

<script>
  import Piano from '$lib/(space)/repacks/firefly/components/music/Piano.svelte';
  import HexagonPlayer from '$lib/(space)/repacks/firefly/components/mission/HexagonPlayer.svelte';
  import MissionBrief from '$lib/(space)/repacks/firefly/components/mission/MissionBrief.svelte';
  import CodeDemo from '$lib/blog/components/blocks/CodeDemo.svelte';
</script>

## Finding the Resonant Frequency

Every rocket has a voice. That's not metaphor – it's engineering. When Firefly Aerospace tests their engines, the acoustic signature tells a story about performance, health, and potential issues. As someone studying aerospace engineering and obsessed with sound analysis, this fascinated me.

It also gave me an idea for their website redesign.

## Beyond the Standard Launch Site

Most aerospace company websites follow a predictable pattern: hero video of a launch, statistics about payload capacity, and a "Contact Us" button.

But Firefly isn't just another launch provider – they're pushing the boundaries of responsive space access.

Their website should do the same.

<HexagonPlayer videoId="1045400122" />

## The Acoustic Innovation

I failed rocket motors exam with a bang. But the real rockets are the friends we made along the way. 

Instead of just showing their Blue Ghost lunar lander, I built an interactive frequency analyzer that processes actual engine test footage. Here's the acoustic mapping interface:

<Piano />

Each note corresponds to a specific engine frequency band. When you click, you're not just playing notes – you're exploring the acoustic signature of rocket science.

<!-- <CodeDemo language="typescript">
// src/lib/(space)/repacks/firefly/components/music/Piano.svelte
const notes = [
  { note: 'C5', freq: 523.25 }, // Low thrust chamber frequency
  { note: 'D5', freq: 587.33 }, // Main combustion frequency
  { note: 'E5', freq: 659.25 }, // Turbopump harmonics
  // ...
];
</CodeDemo> -->

## The Technical Implementation

The frequency analyzer isn't just for show. It uses either machine learning or the pitchy.js library (still deciding between accuracy and performance) to detect dominant frequencies in engine test footage. This creates a real-time visualization of engine health metrics.

## Mission Overview Architecture

The mission brief component presents critical data while maintaining visual hierarchy:

<MissionBrief 
  data={{
    name: "Ghost Riders in the Sky",
    type: "Lunar Mission",
    customer: "NASA",
    spacecraft: "Blue Ghost lunar lander",
    launchVehicle: "SpaceX Falcon 9",
    launchSite: "Kennedy Space Center",
    launchDate: "January 15, 2025",
    launchTime: "1:11 a.m. EST",
    landingSite: "Mare Crisium",
    landingDate: "March 2025"
  }}
/>

## Why This Matters

Space companies often struggle to balance technical accuracy with emotional resonance. By turning engine acoustics into an interactive experience, we bridge that gap. Engineers get meaningful data visualization, while general audiences get an intuitive way to understand rocket engine performance.

## Looking Forward

This redesign isn't live yet – it's a proof of concept I built to demonstrate how space industry websites can do more than just look good. They can actually help tell the engineering story behind the missions.

The acoustic analysis tool will eventually be open-sourced as part of a larger space industry UX toolkit. Because the next space race needs better tools, both in orbit and on our screens.

Want to explore the code or contribute to the acoustic analysis tool? Check out the [GitHub repo](https://github.com/yourusername/firefly-acoustic) or reach out on Twitter. Let's make space UX as innovative as the rockets themselves.