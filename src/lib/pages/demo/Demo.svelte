<!-- src/lib/pages/demo/Demo.svelte -->
<script lang="ts">
	import { onMount } from "svelte";
	import { demoContent } from "./data";
	import Blurbs from "./Blurbs.svelte";
  import ProductBlurbs from './ProductBlurbs.svelte';
	import ZigZag from "./ZigZag.svelte";
	import Testimonials from "./Testimonials.svelte";
	import CTA from "./CTA.svelte";

	let blurbsVisible = false;
	let zigZagLeftVisible = false;
	let zigZagRightVisible = false;
	let testimonialsVisible = false;
	let ctaVisible = true;

	let blurbsSection: HTMLElement;
	let zigZagLeftSection: HTMLElement;
	let zigZagRightSection: HTMLElement;
	let testimonialsSection: HTMLElement;
	let ctaSection: HTMLElement;

	onMount(() => {
		const observerCallback = (entries: IntersectionObserverEntry[]) => {
			entries.forEach((entry) => {
				const targetId = entry.target.id;
				if (entry.isIntersecting) {
					switch (targetId) {
						case "blurbs-section":
							blurbsVisible = true;
							break;
						case "zigzag-left":
							zigZagLeftVisible = true;
							break;
						case "zigzag-right":
							zigZagRightVisible = true;
							break;
						case "testimonials-section":
							testimonialsVisible = true;
							break;
					}
				}
			});
		};

		const observer = new IntersectionObserver(observerCallback, {
			threshold: 0.2,
			rootMargin: "50px", // Trigger slightly before the element comes into view
		});

		// Observe all sections
		[
			{ el: blurbsSection, id: "blurbs-section" },
			{ el: zigZagLeftSection, id: "zigzag-left" },
			{ el: zigZagRightSection, id: "zigzag-right" },
			{ el: testimonialsSection, id: "testimonials-section" },
		].forEach(({ el, id }) => {
			if (el && !el.id) el.id = id;
			if (el) observer.observe(el);
		});

		return () => observer.disconnect();
	});

	export function showElement(elementId: string) {
		switch (elementId) {
			case "blurbs-3":
				blurbsVisible = true;
				requestAnimationFrame(() => {
					blurbsSection?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				});
				break;
			case "zz-left":
				zigZagLeftVisible = true;
				requestAnimationFrame(() => {
					zigZagLeftSection?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				});
				break;
			case "zz-right":
				zigZagRightVisible = true;
				requestAnimationFrame(() => {
					zigZagRightSection?.scrollIntoView({
						behavior: "smooth",
						block: "center",
					});
				});
				break;
		}
	}
</script>

<div class="space-y-6">
	<!-- First ZigZag Section -->
	<section
		id="zigzag-left"
		bind:this={zigZagLeftSection}
		class="transition-all duration-700 transform"
		class:opacity-0={!zigZagLeftVisible}
		class:translate-x-[-20px]={!zigZagLeftVisible}
	>
		<ZigZag
			visible={zigZagLeftVisible}
			direction="left"
			{...demoContent.zigzags.left}
		/>
	</section>

  <section
    id="blurbs-section"
    bind:this={blurbsSection}
    class="py-16 transition-all duration-700 transform"
    class:opacity-0={!blurbsVisible}
    class:translate-y-[20px]={!blurbsVisible}
  >
    <ProductBlurbs visible={blurbsVisible} />
  </section>


	<!-- Blurbs Section -->
	<section
		id="blurbs-section"
		bind:this={blurbsSection}
		class="py-16 transition-all duration-700 transform"
		class:opacity-0={!blurbsVisible}
		class:translate-y-[20px]={!blurbsVisible}
	>
		<Blurbs visible={blurbsVisible} />
	</section>

	<!-- Second ZigZag Section -->
	<section
		id="zigzag-right"
		bind:this={zigZagRightSection}
		class="transition-all duration-700 transform"
		class:opacity-0={!zigZagRightVisible}
		class:translate-x-[20px]={!zigZagRightVisible}
	>
		<ZigZag
			visible={zigZagRightVisible}
			direction="right"
			{...demoContent.zigzags.right}
		/>
	</section>

	<!-- Testimonials Section -->
	<section
		id="testimonials-section"
		bind:this={testimonialsSection}
		class="transition-all duration-700 transform"
		class:opacity-0={!testimonialsVisible}
		class:translate-y-[20px]={!testimonialsVisible}
	>
		<Testimonials visible={testimonialsVisible} />
	</section>

	<!-- CTA Section -->
	<section
		id="cta-section"
		bind:this={ctaSection}
		class="transition-all duration-700 transform"
		class:opacity-0={!ctaVisible}
		class:translate-y-[20px]={!ctaVisible}
	>
		<CTA visible={ctaVisible} />
	</section>
</div>
