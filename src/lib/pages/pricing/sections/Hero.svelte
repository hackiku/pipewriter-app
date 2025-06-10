<!-- src/lib/pages/pricing/sections/hero/Hero.svelte -->
<script lang="ts">
  import { FileText, Zap, Users, Sparkles } from "lucide-svelte";

	export const HEADLINE = "text-[#171717] dark:text-[#CFCFCF]";

</script>


<div class="container mx-auto px-4">
	<div class="text-center space-y-6 max-w-4xl mx-auto">
		
		<!-- Badge -->
		<div class="inline-flex items-center gap-2 px-4 py-2 rounded-full
								bg-gradient-to-r from-[#3644FE]/10 to-[#B345ED]/10 
								border border-primary/20">
			<Zap class="w-4 h-4 text-primary" />
			<span class="text-sm font-medium text-primary">
				Pricing
			</span>
		</div>
		
		<!-- Main headline -->
		<h1 class="text-[5vh] md:text-[7vh] lg:text-[10vh]
								font-bold leading-[1.1] tracking-tight
								{HEADLINE}">
			Turn $12/month into
			<span class="bg-gradient-to-r from-[#3644FE] to-[#B345ED] 
										bg-clip-text text-transparent">
				$500+ Project Premiums
			</span>
		</h1>
		
		<!-- Subheadline -->
		<p class="text-lg md:text-2xl text-muted-foreground leading-relaxed max-w-3xl mx-auto">
			Stop delivering copy in Word docs that clients judge. 
			Create professional wireframes in Google Docs that help you charge more and revise less.
		</p>

		<!-- Social proof numbers -->
		<!-- <div class="flex flex-col sm:flex-row items-center justify-center gap-8 text-sm text-muted-foreground pt-4">
			<div class="flex items-center gap-2">
				<Users class="w-4 h-4 text-primary" />
				<span><strong class="text-foreground">200+</strong> writers building better UX</span>
			</div>
			<div class="flex items-center gap-2">
				<FileText class="w-4 h-4 text-primary" />
				<span><strong class="text-foreground">100+</strong> professional elements</span>
			</div>
			<div class="flex items-center gap-2">
				<Sparkles class="w-4 h-4 text-primary" />
				<span><strong class="text-foreground">14-day</strong> free trial</span>
			</div>
		</div> -->

	</div>
</div>
